import express, { Router, Request } from 'express'
import { Batches } from '../../models/Batch'
import { Lectures } from '../../models/Lecture'
import { Teachers } from '../../models/Teacher'

export const teachers: Router = Router();

teachers.get('/', (req, res) => {
    return Teachers.findAll({
        attributes: ['id', 'teacherName']
    })
        .then((allTeachers) => {
            res.status(200).send(allTeachers);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error retreiving teachers ' + err
            })
        })
});

teachers.get('/:id', (req, res) => {
    return Teachers.find({
        attributes: ['id', 'teacherName'],
        where: { id: [req.params.id] }
    })
        .then((teacher) => {
            res.status(200).send(teacher);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error retreiving teacher ' + err
            })
        })
});

teachers.get('/:id/batches', (req, res) => {
    return Lectures.findAll({
        attributes: ['bid'],
        include: [{
            model: Batches,
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
            })
        })
});

//add a new teacher
teachers.post('/', (req, res) => {
    return Teachers.create({
        teacherName: req.body.teacherName,
        sid: req.body.sid
    })
        .then((teacher) => {
            res.status(200).send(teacher);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error creating teacher ' + err
            })
        })
})

//updating a teacher
teachers.put('/:id', (req, res) => {
    return Teachers.update(
        { teacherName: req.body.teacherName },
        { where: { id: [req.params.id] } }
    )
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(500).send({
                error: 'Error updating teacher ' + err
            })
        })
})

//delete a teacher
teachers.delete('/:id', (req, res) => {
    return Teachers.destroy({
        where: { id: [req.params.id] }
    })
        .catch((err) => {
            res.status(500).send({
                error: 'Error deleting teacher ' + err
            })
        })
})