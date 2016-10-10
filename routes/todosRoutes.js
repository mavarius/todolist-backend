// REQUIRES
const express = require('express')
const router = express.Router()
const Todos = require('../models/Todos')

// ROUTES
router.get('/', (req, res) => {
  Todos.getConditional(req.query, (err, todoList) => {
    if (err) return res.status(400).send(err)
    res.send(todoList)
  })
})

router.post('/', (req, res) => {
  Todos.create(req.body, err => {
    if (err) return res.status(400).send(err)
    res.send('New task added.')
  })
})

router.put('/:id', (req, res) => {
  Todos.toggleComplete(req.params, err => {
    if (err) return res.status(400).send(err)
    res.send('Status changed.')
  })
})

router.delete('/:id', (req, res) => {
  Todos.delete(req.params.id, err => {
    if (err) return res.status(400).send(err)
    res.send(`${req.params.id} deleted`)
  })
})

// EXPORTS
module.exports = router
