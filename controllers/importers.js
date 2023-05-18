const Importer = require("../models/importer");

exports.getImporters = async (req, res) => {
	try {
		const importers = await Importer.find();
		res.json(importers);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.getImporter = async (req, res) => {
	const cId = req.params.clientId.toUpperCase();

	try {
		const foundImporter = await Importer.findOne({ clientId: cId });
		if (!foundImporter) {
			return res.status(404).send("No importer matching Id found");
		}
		res.json(foundImporter);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.updateImporter = async (req, res, next) => {
	const cId = req.params.clientId;
	const updatedData = req.body;

	try {
		const result = await Importer.findOneAndUpdate(
			{ clientId: cId },
			updatedData,
			{ new: true }
		);
		if (!result) {
			return res.status(404).send("Importer not found");
		}
		res
			.status(200)
			.json({ message: "Importer updated", foundImporter: result });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.addImporter = async (req, res) => {
	const importer = new Importer(req.body);

	try {
		const newImporter = await importer.save();
		res.status(201).json(newImporter);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

exports.deleteImporter = async (req, res, next) => {
	const cId = req.params.clientId;

	try {
		const result = await Importer.findOneAndDelete({ clientId: cId });
		if (!result) {
			return res.status(404).send("Importer not found");
		}
		res.status(200).json({ message: "Importer deleted", importer: result });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.adminBoard = (req, res) => {
	res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
	res.status(200).send("Moderator Content.");
};
