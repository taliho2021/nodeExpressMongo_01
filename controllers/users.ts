const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.getUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.getUser = async (req, res, next) => {
	try {
		const cUser = req.params.username;
		const foundUser = await User.findOne({ username: cUser });

		if (!foundUser) {
			return res.status(404).send("No user matching the username found");
		}

		const token = jwt.sign({ id: cUser }, process.env.SECRET, {
			expiresIn: 10000,
		});
		res.setHeader("Authorization", "Bearer " + token);
		res.json(foundUser);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.addOneUser = async (req, res, next) => {
	const hashedPassword = await bcrypt.hash(req.body.password, 10);
	const user = new User({
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		password: hashedPassword,
		roles: req.body.roles,
		date: new Date(),
	});

	try {
		const newUser = await user.save();
		res.status(201).json(newUser);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

exports.adminBoard = (req, res) => {
	res.status(200).send("ANA Link Admin Board");
};

exports.moderatorBoard = (req, res) => {
	res.status(200).send("Moderator Content for ANA Link, Ltd.");
};

exports.login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).send("Email & Password are required");
	}

	try {
		const user = await User.findOne({ email });

		if (!user || !bcrypt.compareSync(password, user.password)) {
			return res.status(401).send("Invalid credentials");
		}

		const token = jwt.sign({ email }, process.env.TOKEN_KEY, {
			expiresIn: "2h",
		});

		user.token = token;
		res.setHeader("Authorization", "Bearer " + token);
		res.status(200).json(user);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.updateUser = async (req, res, next) => {
	// TBD: update user logic
};
