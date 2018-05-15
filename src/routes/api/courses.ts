import express, { Router, Request } from 'express'
import { Courses } from '../../models/Course'
import { Batches } from '../../models/Batch'
import { Lectures } from '../../models/Lecture'
import { Teachers } from '../../models/Teacher'
import { Students } from '../../models/Student'
import { Subjects } from '../../models/Subject'

export const courses: Router = Router();

courses.get('/', (req, res) => {
    return Courses.findAll({
        attributes: ['id', 'courseName']
    })
        .then((allCourses) => {
            res.status(200).json(allCourses);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error retreiving Courses ' + err
            })
        })
});

courses.get('/:id', (req, res) => {
    return Courses.find({
        attributes: ['id', 'courseName'],
        where: { id: [req.params.id] }
    })
        .then((course) => {
            res.status(200).json(course);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error retreiving Course ' + err
            })
        })
});

courses.get('/:id/batches', (req, res) => {
    return Batches.findAll({
        attributes: ['id', 'batchName'],
        include: [{
            model: Courses,
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
            })
        })
});

courses.get('/:id/batches/:bid', (req, res) => {
    return Batches.find({
        attributes: ['id', 'batchName'],
        include: [{
            model: Courses,
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
            })
        })
});

courses.get('/:id/batches/:bid/lectures', (req, res) => {
    return Lectures.findAll({
        attributes: ['id'],
        include: [{
            model: Batches,
            attributes: ['batchName'],

            include: [{
                model: Courses,
                attributes: ['courseName'],
                required: true
            }],

            where: {
                cid: [req.params.id],
                id: [req.params.bid]
            }
        },
        {
            model: Teachers,
            attributes: ['teacherName']
        }
        ]
    })
        .then((lectures) => {
            res.status(200).send(lectures);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error retreiving lectures ' + err
            })
        })
});

courses.post('/:id/batches/:bid/lectures', (req, res) => {
    return Lectures.create({
        bid: req.params.bid,
        tid: req.body.tid
    })
        .then((lecture) => {
            res.status(200).json(lecture);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error creating lecture ' + err
            })
        })
});


courses.get('/:id/batches/:bid/lectures/:lid', (req, res) => {
    return Lectures.findOne({
        attributes: ['id'],
        include: [{
            model: Batches,
            attributes: ['batchName'],

            include: [{
                model: Courses,
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
            })
        })
});

courses.get('/:id/batches/:bid/teachers', (req, res) => {
    Teachers.findAll({
        attributes: ['id', 'teacherName'],
        include: [
            {
                model: Subjects,
                attributes: ['id', 'subjectName'],

                include: [{
                    model: Courses,
                    attributes: ['id']
                }],

                where: { cid: [req.params.id] }
            }
        ]
    })
        .then((teachers) => {
            res.status(200).json(teachers);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error retreiving teachers ' + err
            })
        });
})


courses.get('/:id/batches/:bid/students', (req, res) => {
   
    return Batches.find({
        attributes: ['batchName'],
        include: [{
            model: Students,
            attributes: ['studentRoll', 'studentName']
        }],
        where: { id: [req.params.bid] }
    })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error retreiving students ' + err
            })
        })
});

//add a course
courses.post('/', (req, res) => {
    return Courses.create({
        courseName: req.body.courseName,
    })
        .then((course) => {
            res.status(200).send(course);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error creating course ' + err
            })
        })
})

//delete a course
courses.delete('/:id', (req, res) => {
    return Courses.destroy({
        where: { id: [req.params.id] }
    })
        .catch((err) => {
            res.status(500).send({
                error: 'Error deleting course ' + err
            })
        })
})

//update a course
courses.put('/:id', (req, res) => {
    return Courses.update(
        { courseName: req.body.courseName },
        { where: { id: [req.params.id] } }
    )
        .then((course) => {
            res.status(200).send(course);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error updating course ' + err
            })
        })
})

//add a new batch
courses.post('/:id/batches', (req, res) => {
    return Batches.create({
        batchName: req.body.batchName,
        cid: req.params.id
    })
        .then((batch) => {
            res.status(200).json(batch);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error creating batch ' + err
            })
        })
})

//delete a batch
courses.delete('/:id/batches/:bid', (req, res) => {
    return Batches.destroy({
        where: { id: [req.params.bid] }
    })
        .catch((err) => {
            res.status(500).send({
                error: 'Error deleting batch ' + err
            })
        })
})

//updating a batch
courses.put('/:id/batches/:bid', (req, res) => {
    return Batches.update(
        { batchName: req.body.batchName },
        { where: { id: [req.params.bid] } }
    )
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error updating batch ' + err
            })
        })
})