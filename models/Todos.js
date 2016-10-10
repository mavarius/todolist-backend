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

// FILTER BY QUERY
exports.getConditional = function (query, cb) {
  exports.getAll((err, tasks) => {
    if (err) return cb(err)

    if (query.complete) {
      tasks = tasks.filter(task => (task.complete.toString() === query.complete))
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
  newTask.complete = false

  exports.getAll((err, tasks) => {
    if (err) return cb(err)
    tasks.push(newTask)
    exports.write(tasks, cb)
  })
}

// TOGGLE TASK COMPLETION
exports.toggleComplete = function (filter, cb) {
  exports.getAll((err, tasks) => {
    if (err) return cb(err)

    tasks = tasks.map(task => {
      if (task.id === filter.id) {
        task.complete === false ? task.complete = true : task.complete = false
        return task
      } else {
        return task
      }
    })

    exports.write(tasks, cb)
  })
}

// DELETE TASK BY ID
exports.delete = function (filter, cb) {
  exports.getAll((err, tasks) => {
    if (err) return cb(err)

    if (!filter) {
      return cb(err)
    } else if (filter === 'complete') {
      tasks = tasks.filter(task => (task.complete !== true))
    } else {
      tasks = tasks.filter(task => (task.id !== filter))
    }

    exports.write(tasks, cb)
  })
}
