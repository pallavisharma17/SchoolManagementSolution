import Sequelize from 'sequelize';
import { db } from '../db'
import { Batch } from '../interfaces/Batch'
import { Courses } from './Course'
import { Students } from './Student'

export const Batches = db.define<Batch, any>('batch', {
    batchName: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export const BatchStudent = db.define('BatchStudent', {

})
Batches.belongsTo(Courses, { foreignKey: 'cid' })

Batches.belongsToMany(Students, {
    through: BatchStudent, onDelete: 'cascade'
})

