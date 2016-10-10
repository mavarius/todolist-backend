const fs = require('fs')
const path = require('path')
const uuid = require('uuid')

const todosJSON = path.join(__dirname, '../data/todos.json')

// GET ALL TASKS
exports.getAll = function (cb) {
  fs.readFile(todosJSON, (err, buffer) => {
    if (err) return cb(err)

    let data
    try {
      data = JSON.parse(buffer)
    } catch (e) {
      data = []
    }

    cb(null, data)
  })
}

// GET BY ID
exports.getById = function (filterId, cb) {
  exports.getAll((err, tasks) => {
    if (err) return cb(err)
    let filtered = tasks.filter(task => (task.id === filterId))
    cb(null, filtered)
  })
}

// FILTER BY COMPLETION
exports.getByCompletion = function (query, cb) {
  exports.getAll((err, tasks) => {
    if (err) return cb(err)

    if (query.category) {
      tasks = tasks.filter(task => (query.isComplete === true))
    } else {
      tasks = tasks.filter(task => (query.isComplete === false))
    }

    cb(null, tasks)
  })
}

// WRITE TO TODOS
exports.write = function (newData, cb) {
  let json = JSON.stringify(newData)
  fs.writeFile(todosJSON, json, cb)
}

// ADD NEW TASK
exports.create = function (newTask, cb) {
  newTask.id = uuid()
  newTask.isComplete = false

  exports.getAll((err, tasks) => {
    if (err) return cb(err)
    tasks.push(newTask)
    exports.write(tasks, cb)
  })
}

// UPDATE TASK
exports.replace = function (filter, updatedTask, cb) {
  exports.getAll((err, tasks) => {
    if (err) return cb(err)

    tasks = tasks.map(task => {
      if (task.id === filter.id) {
        let oldId = task.id
        task = updatedTask
        task.id = oldId
        return task
      } else {
        return task
      }
    })

    exports.write(tasks, cb)
  })
}

// DELETE TASK
exports.delete = function (filterId, cb) {
  exports.getAll((err, tasks) => {
    if (err) return cb(err)
    tasks = tasks.filter(task => (task.id !== filterId))
    exports.write(tasks, cb)
  })
}
