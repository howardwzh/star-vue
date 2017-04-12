// controllers/user.js 

const todolist = require('../models/todolist.js')

const getTodolist = function* (){
  const id = this.params.id; // 获取url里传过来的参数里的id
  const result = yield todolist.getTodolistById(id);  // 通过yield “同步”地返回查询结果
  this.body = result // 将请求的结果放到response的body里返回
}

const createTodolist = function* (){
  const data = this.request.body; // post过来的数据存在request.body里
  const result = yield todolist.createTodolist(data);

  this.body = {
    success: true
  }
}

const removeTodolist = function* (){
  const id = this.params.id;
  const user_id = this.params.userId;
  const result = yield todolist.removeTodolist(id, user_id);

  this.body = {
    success: true
  }
}

const updateTodolist = function* (){
  const id = this.params.id;
  const user_id = this.params.userId;
  let status = this.params.status;
  status === '0' ? status = 1 : status = 0; // 状态反转（更新）
  console.log('updateTodolist:' + status)
  const result = yield todolist.updateTodolist(id, user_id, status);

  this.body = {
    success: true
  }
}


module.exports = (router) => {
  router.get('/todolist/:id', getTodolist); // 定义url的参数是id
  router.post('/todolist', createTodolist);
  router.delete('/todolist/:userId/:id', removeTodolist);
  router.put('/todolist/:userId/:id/:status', updateTodolist);
}