import express, { Router, Request } from 'express'
import { Subjects } from '../../models/Subject'
import { Teachers } from '../../models/Teacher'

export const subjects: Router = Router();

subjects.get('/', (req, res) => {
    return Subjects.findAll({
        attributes: ['id', 'subjectName']
    })
        .then((allSubjects) => {
            res.status(200).send(allSubjects);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error retreiving subjects ' + err
            })
        })
});

subjects.get('/:id', (req, res) => {
    return Subjects.find({
        attributes: ['id', 'subjectName'],
        where: { id: [req.params.id] }
    })
        .then((subject) => {
            res.status(200).send(subject);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error retreiving subject ' + err
            })
        })
});

subjects.get('/:id/teachers', (req, res) => {
    return Teachers.findAll({
        attributes: ['id', 'teacherName'],
        where: { sid: [req.params.id] }
    })
        .then((teachers) => {
            res.status(200).send(teachers);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error retreiving teachers ' + err
            })
        })
});

//add a new subject
subjects.post('/:id', (req, res) => {
    return Subjects.create({
        subjectName: req.body.subjectName,
        cid: req.body.id
    })
        .then((subject) => {
            res.status(200).send(subject);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error creating subject ' + err
            })
        })
})

//updating a subject
subjects.put('/:id', (req, res) => {
    return Subjects.update(
        { subjectName: req.body.subjectName },
        { where: { id: [req.params.id] } }
    )
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error updating subject ' + err
            })
        })
})

//delete a subject
subjects.delete('/:id', (req, res) => {
    return Subjects.destroy({
        where: { id: [req.params.id] }
    })
        .catch((err) => {
            res.status(500).send({
                error: 'Error deleting subject ' + err
            })
        })
})