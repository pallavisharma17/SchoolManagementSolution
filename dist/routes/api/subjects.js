"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Subject_1 = require("../../models/Subject");
const Teacher_1 = require("../../models/Teacher");
exports.subjects = express_1.Router();
exports.subjects.get('/', (req, res) => {
    return Subject_1.Subjects.findAll({
        attributes: ['id', 'subjectName']
    })
        .then((allSubjects) => {
        res.status(200).send(allSubjects);
    })
        .catch((err) => {
        res.status(500).send({
            error: 'Error retreiving subjects ' + err
        });
    });
});
exports.subjects.get('/:id', (req, res) => {
    return Subject_1.Subjects.find({
        attributes: ['id', 'subjectName'],
        where: { id: [req.params.id] }
    })
        .then((subject) => {
        res.status(200).send(subject);
    })
        .catch((err) => {
        res.status(500).send({
            error: 'Error retreiving subject ' + err
        });
    });
});
exports.subjects.get('/:id/teachers', (req, res) => {
    return Teacher_1.Teachers.findAll({
        attributes: ['id', 'teacherName'],
        where: { sid: [req.params.id] }
    })
        .then((teachers) => {
        res.status(200).send(teachers);
    })
        .catch((err) => {
        res.status(500).send({
            error: 'Error retreiving teachers ' + err
        });
    });
});
//add a new subject
exports.subjects.post('/:id', (req, res) => {
    return Subject_1.Subjects.create({
        subjectName: req.body.subjectName,
        cid: req.body.id
    })
        .then((subject) => {
        res.status(200).send(subject);
    })
        .catch((err) => {
        res.status(500).send({
            error: 'Error creating subject ' + err
        });
    });
});
//updating a subject
exports.subjects.put('/:id', (req, res) => {
    return Subject_1.Subjects.update({ subjectName: req.body.subjectName }, { where: { id: [req.params.id] } })
        .then((result) => {
        res.status(200).send(result);
    })
        .catch((err) => {
        res.status(500).send({
            error: 'Error updating subject ' + err
        });
    });
});
//delete a subject
exports.subjects.delete('/:id', (req, res) => {
    return Subject_1.Subjects.destroy({
        where: { id: [req.params.id] }
    })
        .catch((err) => {
        res.status(500).send({
            error: 'Error deleting subject ' + err
        });
    });
});
