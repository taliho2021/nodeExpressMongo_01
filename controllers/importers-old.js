// const { validationResult } = require("express-validator");
// const path = require("path");

// const Importer = require("../models/importer");

// exports.getImporters = async (req, res, next) => {
// 	try {
// 		const importers = await Importer.find();
// 		res.json(importers);
// 	} catch (err) {
// 		res.status(500).json({ message: err.message });
// 	}
// };

// exports.getImporter = (req, res, next) => {
// 	const cId = req.params.clientId.toUpperCase();

// 	Importer.findOne({ clientId: cId }, (err, foundImporter) => {
// 		if (foundImporter) {
// 			res.json(foundImporter);
// 		} else {
// 			res.send(err, "No importer matching Id found");
// 		}
// 	});
// };

// exports.updateImporter = (req, res, next) => {
// 	const cId = req.params.clientId;
// 	const errors = validationResult(req);
// 	if (!errors.isEmpty()) {
// 		const error = new Error("Validation failed, entered data is incorrect");
// 		error.statusCode = 422;
// 		throw error;
// 	}
// 	const name = req.body.name;
// 	const address1 = req.body.address1;
// 	const address2 = req.body.address2;
// 	const city = req.body.city;
// 	const state = req.body.state;
// 	const country = req.body.country;
// 	const phone1 = req.body.phone1;
// 	const website = req.body.website;
// 	const email1 = req.body.email1;

// 	Importer.findOne(cId)
// 		.then((importer) => {
// 			importer.name = name;
// 			importer.address1 = address1;
// 			importer.address2 = address2;
// 			importer.city = city;
// 			importer.state = state;
// 			importer.country = country;
// 			importer.phone1 = phone1;
// 			importer.website = website;
// 			importer.email1 = email1;
// 			return importer.save();
// 		})
// 		.then((result) => {
// 			res.send({ messafe: "Importer updated" });
// 		})
// 		.catch((err) => console.log(err));
// };

// Importer.findOneAndUpdate(
// 	{ cliendtId: cId },
// 	(err, foundImporter)
// 		.then((foundImporter) => {
// 			if (!foundImporter) {
// 				const error = new Error("Not authorized!");
// 				error.statusCode = 403;
// 				throw error;
// 			}
// 			foundImporter.name = name;
// 			foundImporter.address1 = address1;
// 			foundImporter.address2 = address2;
// 			foundImporter.city = city;
// 			foundImporter.state = state;
// 			foundImporter.country = country;
// 			foundImporter.phone1 = phone1;
// 			foundImporter.website = website;
// 			foundImporter.email1 = emnail1;
// 			return foundImporter.save();
// 		})
// 		.then((result) => {
// 			res
// 				.status(200)
// 				.json({ message: "Importer updated", foundImporter: result });
// 		})
// 		.catch((err) => {
// 			if (!err.statusCode) {
// 				err.statusCode = 500;
// 			}
// 			next(err);
// 		})
// );

// // Add a new importer to DB
// exports.addImporter = async (req, res, next) => {
// 	const importer = new Importer({
// 		clientId: req.body.clientId,
// 		name: req.body.name,
// 		address1: req.body.address1,
// 		address2: req.body.address2,
// 		city: req.body.city,
// 		state: req.body.state,
// 		country: req.body.country,
// 		phone1: req.body.phone1,
// 		website: req.body.website,
// 		email1: req.body.email1,
// 	});
// 	try {
// 		const newImporter = await importer.save();
// 		console.log("Saved the importer to DB", newImporter);
// 		res.status(201).json(newImporter);
// 	} catch (err) {
// 		res.status(400).json({ message: err.message });
// 	}
// };

// exports.deleteImporter = async (req, res, next) => {
// 	const cId = req.params.clientId;
// 	Importer.findOne({ clientId: cId }, (err, foundImporter));

// 	try {
// 		const cId = req.params.clientId;
// 		Importer.findOne({ clientId: cId }, (err, foundImporter)).then((data) => {
// 			if (!data) {
// 				const error = new Error("Could not find the importer");
// 				error.statusCode = 404;
// 				throw error;
// 			}
// 			res.status(200).json({ message: "Importer fetched", importer: data });
// 			window.alert(data.value | json);
// 		});
// 	} catch (err) {
// 		if (!err.statusCode) {
// 			err.statusCode = 500;
// 		}
// 		next(err);
// 	}
// };

// exports.adminBoard = (req, res) => {
// 	res.status(200).send("Admin Content.");
// };

// exports.moderatorBoard = (req, res) => {
// 	res.status(200).send("Moderator Content.");
// };
