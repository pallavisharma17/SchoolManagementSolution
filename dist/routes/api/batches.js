"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Batch_1 = require("../../models/Batch");
exports.batches = express_1.Router();
exports.batches.get('/', (req, res) => {
    return Batch_1.Batches.findAll({
        attributes: ['id', 'batchName']
    })
        .then((batches) => {
        res.status(200).json(batches);
    })
        .catch((err) => {
        res.status(500).send({
            error: 'Error retreiving batches ' + err
        });
    });
});
