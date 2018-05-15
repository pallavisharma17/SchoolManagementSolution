import express, { Router, Request } from 'express';
import { students } from './students'
import { teachers } from './teachers'
import { subjects } from './subjects'
import { courses } from './courses'
import { batches } from './batches'

export const route: Router = Router()

route.use('/students', students)
route.use('/teachers', teachers)
route.use('/subjects', subjects)
route.use('/courses', courses)
route.use('/batches', batches)
