"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Course_1 = require("../../models/Course");
const Batch_1 = require("../../models/Batch");
const Lecture_1 = require("../../models/Lecture");
const Teacher_1 = require("../../models/Teacher");
const Student_1 = require("../../models/Student");
exports.courses = express_1.Router();
exports.courses.get('/', (req, res) => {
    return Course_1.Courses.findAll({
        attributes: ['id', 'courseName']
    })
        .then((allCourses) => {
        res.status(200).json(allCourses);
    })
        .catch((err) => {
        res.status(500).send({
            error: 'Error retreiving Courses ' + err
        });
    });
});
exports.courses.get('/:id', (req, res) => {
    return Course_1.Courses.find({
        attributes: ['id', 'courseName'],
        where: { id: [req.params.id] }
    })
        .then((course) => {
        res.status(200).send(course);
    })
        .catch((err) => {
        res.status(500).send({
            error: 'Error retreiving Course ' + err
        });
    });
});
exports.courses.get('/:id/batches', (req, res) => {
    return Batch_1.Batches.findAll({
        attributes: ['id', 'batchName'],
        include: [{
                model: Course_1.Courses,
                attributes: ['courseName'],
                required: true
            }],
        where: { cid: [req.params.id] }
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
exports.courses.get('/:id/batches/:bid', (req, res) => {
    return Batch_1.Batches.find({
        attributes: ['id', 'batchName'],
        include: [{
                model: Course_1.Courses,
                attributes: ['courseName'],
                required: true
            }],
        where: {
            cid: [req.params.id],
            id: [req.params.bid]
        }
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
exports.courses.get('/:id/batches/:bid/lectures', (req, res) => {
    return Lecture_1.Lectures.findAll({
        attributes: ['id'],
        include: [{
                model: Batch_1.Batches,
                attributes: ['batchName'],
                include: [{
                        model: Course_1.Courses,
                        attributes: ['courseName'],
                        required: true
                    }],
                where: {
                    cid: [req.params.id],
                    id: [req.params.bid]
                }
            }]
    })
        .then((lectures) => {
        res.status(200).send(lectures);
    })
        .catch((err) => {
        res.status(500).send({
            error: 'Error retreiving lectures ' + err
        });
    });
});
exports.courses.get('/:id/batches/:bid/lectures/:lid', (req, res) => {
    return Lecture_1.Lectures.findOne({
        attributes: ['id'],
        include: [{
                model: Batch_1.Batches,
                attributes: ['batchName'],
                include: [{
                        model: Course_1.Courses,
                        attributes: ['courseName'],
                        required: true
                    }],
                where: {
                    cid: [req.params.id],
                    id: [req.params.bid]
                }
            }],
        where: {
            id: [req.params.lid]
        }
    })
        .then((lectures) => {
        res.status(200).send(lectures);
    })
        .catch((err) => {
        res.status(500).send({
            error: 'Error retreiving lectures ' + err
        });
    });
});
exports.courses.get('/:id/batches/:bid/teachers', (req, res) => {
    return Lecture_1.Lectures.findAll({
        attributes: ['id'],
        include: [{
                model: Batch_1.Batches,
                attributes: ['batchName'],
                include: [{
                        model: Course_1.Courses,
                        attributes: ['courseName'],
                        required: true
                    }],
                where: {
                    cid: [req.params.id],
                    id: [req.params.bid]
                }
            },
            {
                model: Teacher_1.Teachers,
                attributes: ['teacherName']
            }],
        group: ['tid']
    })
        .then((lectures) => {
        res.status(200).send(lectures);
    })
        .catch((err) => {
        res.status(500).send({
            error: 'Error retreiving lectures ' + err
        });
    });
});
exports.courses.get('/:id/batches/:bid/students', (req, res) => {
    return Batch_1.Batches.findAll({
        attributes: ['batchName'],
        include: [{
                model: Course_1.Courses,
                attributes: ['courseName'],
            },
            {
                model: Student_1.Students,
                attributes: ['studentName']
            }],
        where: {
            cid: [req.params.id],
            id: [req.params.bid]
        }
    })
        .then((students) => {
        res.status(200).send(students);
    })
        .catch((err) => {
        res.status(500).send({
            error: 'Error retreiving students ' + err
        });
    });
});
//add a course
exports.courses.post('/', (req, res) => {
    return Course_1.Courses.create({
        courseName: req.body.courseName,
    })
        .then((course) => {
        res.status(200).send(course);
    })
        .catch((err) => {
        res.status(500).send({
            error: 'Error creating course ' + err
        });
    });
});
//delete a course
exports.courses.delete('/:id', (req, res) => {
    return Course_1.Courses.destroy({
        where: { id: [req.params.id] }
    })
        .catch((err) => {
        res.status(500).send({
            error: 'Error deleting course ' + err
        });
    });
});
//update a course
exports.courses.put('/:id', (req, res) => {
    return Course_1.Courses.update({ courseName: req.body.courseName }, { where: { id: [req.params.id] } })
        .then((course) => {
        res.status(200).send(course);
    })
        .catch((err) => {
        res.status(500).send({
            error: 'Error updating course ' + err
        });
    });
});
//add a new batch
exports.courses.post('/:id/batches', (req, res) => {
    return Batch_1.Batches.create({
        batchName: req.body.batchName,
        cid: req.params.id
    })
        .then((batch) => {
        res.status(200).send(batch);
    })
        .catch((err) => {
        res.status(500).send({
            error: 'Error creating batch ' + err
        });
    });
});
//delete a batch
exports.courses.delete('/:id/batches/:bid', (req, res) => {
    return Batch_1.Batches.destroy({
        where: { id: [req.params.bid] }
    })
        .catch((err) => {
        res.status(500).send({
            error: 'Error deleting batch ' + err
        });
    });
});
//updating a batch
exports.courses.put('/:id/batches/:bid', (req, res) => {
    return Batch_1.Batches.update({ batchName: req.body.batchName }, { where: { id: [req.params.bid] } })
        .then((result) => {
        res.status(200).send(result);
    })
        .catch((err) => {
        res.status(500).send({
            error: 'Error updating batch ' + err
        });
    });
});
