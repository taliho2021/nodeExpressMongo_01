<<<<<<< HEAD:controllers/importers.js
const Importer = require("../models/importer");
=======
import {validationResult } from ('express-validator')
const path = require('path')
>>>>>>> 8a99a38784ca770d248781ba67616cbbcb7d7b2e:controllers/importers.ts

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

<<<<<<< HEAD:controllers/importers.js
exports.deleteImporter = async (req, res, next) => {
	const cId = req.params.clientId;
=======


//     Importer.findOneAndUpdate ({cliendtId: cId}, (err, foundImporter)
//         .then(foundImporter => {
//             if (!foundImporter) {
//                 const error = new Error('Not authorized!')
//                 error.statusCode = 403
//                 throw error
//             }
//             foundImporter.name = name
//             foundImporter.address1 = address1
//             foundImporter.address2 = address2
//             foundImporter.city = city
//             foundImporter.state = state
//             foundImporter.country = country
//             foundImporter.phone1 = phone1
//             foundImporter.website = website
//             foundImporter.email1 = emnail1
//             return foundImporter.save()
//         })
//         .then(result =>{
//             res.status(200).json({message: 'Importer updated', foundImporter: result})
//         })
//         .catch(err => {
//             if (!err.statusCode){
//                 err.statusCode = 500
//             }
//             next(err)
//         })
// )

// Add a new importer to DB
exports.addImporter = (async (req, res, next ) => {
    const importer = new Importer({
        clientId: req.body.clientId,
        name: req.body.name,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        phone1: req.body.phone1,
        website: req.body.website,
        email1: req.body.email1
     })
     try{
       const newImporter = await importer.save()
       console.log('Saved the importer to DB', newImporter)
       res.status(201).json(newImporter)
     } catch (err) {
         res.status(400).json({message: err.message})

     }
})

exports.deleteImporter = (req, res, next) => {
    const cId = req.params.clientId
    Importer.findOne({clientId: cId}, (err, foundImporter)
    )}

        // try {
        //     const cId = req.params.clientId
        //     Importer.findOne({clientId: cId}, function(err, foundImporter))
        //         .then(data => {
        //             if (!data){
        //                 const error = new Error('Could not find the importer')
        //                 error.statusCode = 404
        //                 throw error
        //             }
        //         res.status(200).json({ message: 'Importer fetched', importer:data})
        //         window.alert(data.value|json)
        //         })
        // }

        // catch (err) {
        //     if (!err.statusCode) {
        //         err.statusCode = 500
        //     }
        //     next(err)
        // }
>>>>>>> 8a99a38784ca770d248781ba67616cbbcb7d7b2e:controllers/importers.ts

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
