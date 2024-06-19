/* eslint-disable no-undef */
const mongoose = require('mongoose')
const logger = require('./utils/logger')
// const config = require('./utils/config')

// if (process.argv.length < 3) {
//     logger.info('give password as argument')
//     process.exit(1)
// }

const url = process.env.TEST_MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'HTML is easy',
    important: true,
})

note.save().then(() => {
    logger.info('note saved!')
    mongoose.connection.close()
})

// Note.find({}).then(result => {
//     result.forEach(note => {
//       logger.info(note)
//     })
//     mongoose.connection.close()
// })