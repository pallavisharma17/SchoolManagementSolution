import express, { Router, Request } from 'express'
import { Batches } from '../../models/Batch'

export const batches: Router = Router();

batches.get('/', (req, res) => {
    return Batches.findAll({
        attributes: ['id', 'batchName']
    })
        .then((batches) => {
            res.status(200).json(batches);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error retreiving batches ' + err
            })
        })
});
