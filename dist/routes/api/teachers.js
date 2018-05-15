"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Batch_1 = require("../../models/Batch");
const Lecture_1 = require("../../models/Lecture");
const Teacher_1 = require("../../models/Teacher");
exports.teachers = express_1.Router();
exports.teachers.get('/', (req, res) => {
    return Teacher_1.Teachers.findAll({
        attributes: ['id', 'teacherName']
    })
        .then((allTeachers) => {
        res.status(200).send(allTeachers);
    })
        .catch((err) => {
        res.status(500).send({
            error: 'Error retreiving teachers ' + err
        });
    });
});
exports.teachers.get('/:id', (req, res) => {
    return Teacher_1.Teachers.find({
        attributes: ['id', 'teacherName'],
        where: { id: [req.params.id] }
    })
        .then((teacher) => {
        res.status(200).send(teacher);
    })
        .catch((err) => {
        res.status(500).send({
            error: 'Error retreiving teacher ' + err
        });
    });
});
exports.teachers.get('/:id/batches', (req, res) => {
    return Lecture_1.Lectures.findAll({
        attributes: ['bid'],
        include: [{
                model: Batch_1.Batches,
                attributes: ['batchName']
            }],
        where: { tid: [req.params.id] },
        group: ['bid']
    })
        .then((batches) => {
        res.status(200).send(batches);
    })
        .catch((err) => {
        res.status(500).send({
            error: 'Error retreiving batches ' + err
        });
    });
});
//add a new teacher
exports.teachers.post('/', (req, res) => {
    return Teacher_1.Teachers.create({
        teacherName: req.body.teacherName,
        sid: req.body.sid
    })
        .then((teacher) => {
        res.status(200).send(teacher);
    })
        .catch((err) => {
        res.status(500).send({
            error: 'Error creating teacher ' + err
        });
    });
});
//updating a teacher
exports.teachers.put('/:id', (req, res) => {
    return Teacher_1.Teachers.update({ teacherName: req.body.teacherName }, { where: { id: [req.params.id] } })
        .then((result) => {
        res.status(200).send(result);
    })
        .catch((err) => {
        res.status(500).send({
            error: 'Error updating teacher ' + err
        });
    });
});
//delete a teacher
exports.teachers.delete('/:id', (req, res) => {
    return Teacher_1.Teachers.destroy({
        where: { id: [req.params.id] }
    })
        .catch((err) => {
        res.status(500).send({
            error: 'Error deleting teacher ' + err
        });
    });
});
