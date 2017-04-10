<template>
  <el-row class="content-login">
    <el-col :xs="24" :sm="{span: 6,offset: 9}">
      <span class="title">
       欢迎登录 
      </span>
      <el-row>
        <el-input 
          v-model="account" 
          placeholder="账号"
          type="text">
        </el-input>
        <el-input 
          v-model="password" 
          placeholder="密码"
          type="password">
        </el-input>
        <el-button type="primary" @click="loginToDo">登录</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import md5 from 'md5'

export default {
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    loginToDo () {
      let self = this
      let obj = {
        name: self.account,
        password: md5(self.password)
      }
      self.$http.post('/auth/user', obj) // 将信息发送给后端
      .then((res) => { // axios返回的数据都在res.data里
        if (res.data.success) { // 如果成功
          sessionStorage.setItem('demo-token', res.data.token) // 用sessionStorage把token存下来
          self.$message({ // 登录成功，显示提示语
            type: 'success',
            message: '登录成功！'
          })
          self.$router.push('/todolist') // 进入todolist页面，登录成功
        } else {
          self.$message.error(res.data.info) // 登录失败，显示提示语
          sessionStorage.setItem('demo-token', null) // 将token清空
        }
      }, () => {
        self.$message.error('请求错误！')
        sessionStorage.setItem('demo-token', null) // 将token清空
      })
    }
  }
}
</script>

<style lang="scss">
  .content-login{
    padding:16px;
    .title{
      font-size:28px;
    }
    .el-input{
      margin: 12px 0;
    }
    .el-button{
      width: 100%;
      margin-top: 12px; 
    }
  }
</style>
