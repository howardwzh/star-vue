// models/user.js
const db = require('../config/db.js'), 
      todoModel = '../schema/list.js'; // 引入user的表结构
const TodolistDb = db.Todolist; // 引入数据库

const Todolist = TodolistDb.import(todoModel); // 用sequelize的import方法引入表结构，实例化了User。

const getTodolistById = function* (id){ // 注意是function* 而不是function 对于需要yield操作的函数都需要这种generator函数。
  const todolist = yield Todolist.findAll({ // 用yield控制异步操作，将返回的Promise对象里的数据返回出来。也就实现了“同步”的写法获取异步IO操作的数据
    where: {
      user_id: id
    },
    attributes: ['id', 'content', 'status'] // 只需返回这三个字段的结果即可
  });

  return todolist // 返回数据
}

// 新增一个方法，通过用户名查找
const createTodolist = function* (data){
  yield Todolist.create({
    user_id: data.id,
    content: data.content,
    status: data.status
  })

  return true
}

// 新增一个方法，通过用户名查找
const removeTodolist = function* (id, user_id){
  yield Todolist.destroy({
    where: {
      id: id,
      user_id: user_id
    }
  })

  return true
}

// 新增一个方法，通过用户名查找
const updateTodolist = function* (id, user_id, status){
  yield Todolist.update({
    status
  },{
    where: {
      id: id,
      user_id: user_id
    }
  })

  return true
}

module.exports = {
  getTodolistById,
  createTodolist,
  removeTodolist,
  updateTodolist
}