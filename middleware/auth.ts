const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const User = require("../models/user");
const Role = require("../models/role");

exports.signup = async (req, res) => {
	// Create an user object with hashed password
	const hashedPassword = await bcrypt.hash(req.body.password, 10);
	const newUser = new User({
		username: req.body.username,
		email: req.body.email,
		password: hashedPassword,
	});

	try {
		const user = await newUser.save();

		if (req.body.roles) {
			const roles = await Role.find({
				name: { $in: req.body.roles },
			});

			user.roles = roles.map((role) => role._id);
		} else {
			const role = await Role.findOne({ name: "user" });

			user.roles = [role._id];
		}

		await user.save();

		res.send({ message: "User was registered successfully!" });
	} catch (err) {
		res.status(500).send({ message: err.message });
	}
};

exports.signin = async (req, res) => {
	try {
		const user = await User.findOne({
			username: req.body.username,
		}).populate("roles", "-__v");

		if (!user) {
			return res.status(404).send({ message: "User Not found." });
		}

		const passwordIsValid = await bcrypt.compare(
			req.body.password,
			user.password
		);

		if (!passwordIsValid) {
			return res.status(401).send({
				accessToken: null,
				message: "Invalid Password!",
			});
		}

		const token = jwt.sign({ id: user._id }, process.env.SECRET, {
			expiresIn: "1h", // 1 hour
		});

		var authorities = [];

		for (let i = 0; i < user.roles.length; i++) {
			authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
		}
		res.status(200).send({
			id: user._id,
			username: user.username,
			email: user.email,
			roles: authorities,
			accessToken: token,
		});
	} catch (err) {
		res.status(500).send({ message: err.message });
	}
};
