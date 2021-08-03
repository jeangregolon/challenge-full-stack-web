const { Router } = require('express')
const { Student } = require('../models')

const router = Router()

// Response messages
const genericError = 'Unavailable server. Try again later.'
const successCreate = 'Student profile created successfully!'
const successUpdate = 'Student profile updated successfully!'
const successDelete = 'Student profile deleted successfully!'
const notFound = 'Student profile not found.'
const emptyTable = 'No students found.'

// Returns all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.findAll()
    if (students) {
      res.status(200).send(students)
    } else {
      res.status(404).json({ message: emptyTable })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: genericError })
  }
})

// Returns a students by RA
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id)
    if (student) {
      res.status(200).send(student)
    } else {
      res.status(404).json({ message: notFound })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: genericError })
  }
})

// Creates a students
router.post('/', async (req, res) => {
  try {
    const { name, email, cpf } = req.body
    await Student.create({ name, email, cpf })
    res.status(200).json({ message: successCreate })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: genericError })
  }
})

// Updates a students by RA
router.put('/:id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id)
    if (student) {
      const { name, email } = req.body
      await Student.update(
        { name, email },
        {
          where: {
            id: req.params.id
          }
        }
      )
      res.status(200).json({ message: successUpdate })
    } else {
      res.status(404).json({ message: notFound })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: genericError })
  }
})

// Deletes a student
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id)
    if (student) {
      await Student.destroy({
        where: {
          id: req.params.id
        }
      })
      res.status(200).json({ message: successDelete })
    } else {
      res.status(404).json({ message: notFound })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: genericError })
  }
})

module.exports = router
