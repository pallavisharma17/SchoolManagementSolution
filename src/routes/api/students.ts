import express, { Router, Request } from 'express'
import { Students } from '../../models/Student'
import { Batches } from '../../models/Batch'

export const students: Router = Router();

students.get('/', (req, res) => {
    return Students.findAll({
        attributes: ['id', 'studentRoll', 'studentName']
    })
        .then((allStudents) => {
            res.status(200).send(allStudents);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error retreiving students ' + err
            })
        })
});

students.get('/:id', (req, res) => {
    return Students.find({
        attributes: ['id', 'studentRoll', 'studentName'],
        where: { id: [req.params.id] }
    })
        .then((student) => {
            res.status(200).send(student);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error retreiving student ' + err
            })
        })
});

students.get('/:id/batches', (req, res) => {
    return Batches.findAll({
        attributes: ['batchName'],
        include: [{
            model: Students,
            attributes: ['studentName'],
            where: { id: [req.params.id] }
        }],
    })
        .then((batches) => {
            res.status(200).send(batches);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error retreiving batches ' + err
            })
        })
});

//add a student
students.post('/', (req, res) => {
    return Students.create({
        studentRoll: req.body.studentRoll,
        studentName: req.body.studentName,
    })
        .then((student) => {
            res.status(200).send(student);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error creating student ' + err
            })
        })
})

//updating a student
students.put('/:id', (req, res) => {
    return Students.update(
        { studentName: req.body.studentName },
        { where: { id: [req.params.id] } }
    )
        .then((student) => {
            res.status(200).send(student);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error updating student ' + err
            })
        })
})

//delete a student
students.delete('/:id', (req, res) => {
    return Students.destroy({
        where: { id: [req.params.id] }
    })
        .catch((err) => {
            res.status(500).send({
                error: 'Error deleting student ' + err
            })
        })
})