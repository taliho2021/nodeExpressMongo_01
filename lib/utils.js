const crypto = require("crypto");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const pathToKey = path.join(__dirname, "..", "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");

/**
 * Validates a plaintext password with its hash and salt
 *
 * @param {string} password - The plaintext password to validate
 * @param {string} hash - The hash of the real password
 * @param {string} salt - The salt used to hash the real password
 *
 * @returns {boolean} - True if the password is valid, false otherwise
 */
async function validPassword(password, hash, salt) {
	const hashVerify = (
		await crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512")
	).toString("hex");
	return hash === hashVerify;
}

/**
 * Generates a hash and salt for a plaintext password
 *
 * @param {string} password - The plaintext password to hash
 *
 * @returns {object} - An object containing the salt and hashed password
 */
function genPassword(password) {
	var salt = crypto.randomBytes(32).toString("hex");
	var genHash = crypto
		.pbkdf2Sync(password, salt, 10000, 64, "sha512")
		.toString("hex");

	return {
		salt: salt,
		hash: genHash,
	};
}

/**
 * Issues a JWT for a user object
 *
 * @param {object} user - The user object
 *
 * @returns {object} - An object containing the JWT and its expiry date
 */
function issueJWT(user) {
	const _id = user._id;

	const expiresIn = "1d";

	const payload = {
		sub: _id,
		iat: Date.now(),
	};

	const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
		expiresIn: expiresIn,
		algorithm: "RS256",
	});

	return {
		token: "Bearer " + signedToken,
		expires: expiresIn,
	};
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.issueJWT = issueJWT;
