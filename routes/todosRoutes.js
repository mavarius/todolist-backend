// REQUIRES
const express = require('express')
const router = express.Router()
const Todos = require('../models/Todos')

// ROUTES
router.get('/', (req, res) => {
  Todos.getAll((err, todoList) => {
    if (err) return res.status(400).send(err)
    res.send(todoList)
  })
})

// router.get('/', (req, res) => {
//   Todos.getByCompletion(req.query, (err, todoList) => {
//     if (err) return res.status(400).send(err)
//     res.send(todoList)
//   })
// })

router.post('/', (req, res) => {
  Todos.create(req.body, err => {
    if (err) return res.status(400).send(err)
    res.send('New task added.')
  })
})

router.put('/:id', (req, res) => {
  Todos.replace(req.params, req.body, err => {
    if (err) return res.status(400).send(err)
    res.send('Status changed.')
  })
})

router.delete('/:id', (req, res) => {
  Todos.delete(req.params.id, err => {
    if (err) return res.status(400).send(err)
    res.send('Task deleted.')
  })
})

router.delete('/complete', (req, res) => {
  Todos.deleteComplete((err, deletedTasks) => {
    if (err) return res.status(400).send(err)
    res.send('Completed tasks deleted.')
  })
})

// EXPORTS
module.exports = router
