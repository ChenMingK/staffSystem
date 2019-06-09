<template>
  <div class="login">
    <div class="bg-wrap"></div><!--用渐变做背景-->
    <div class="loginForm-wrap">
      <div class="text-wrap">
        <span>员工管理系统</span>
      </div>
      <div class="form-wrap">
        <div class="input-user-wrap">
          <span class="icon-member2"></span>
          <input type="text" placeholder="用户名" v-model="username">
        </div>
        <div class="input-password-wrap">
          <span class="icon-password"></span>
          <input type="password" placeholder="密码" v-model="password"  @keyup.enter="loginCheck">
        </div>
        <div class="warning-wrap">
          <span class="icon-warning"></span>
          <span class="warning-text">{{warningMsg}}</span>
        </div>
        <div class="login-btn" @click="loginCheck">
          <span>登录</span>
        </div>
        <div class="footer-text">
          <span>温馨提示:未登录过的新用户，自动注册<br>注册过的用户可凭账号密码登录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { login } from '../api/home.js'
  export default {
    data: function () {
      return {
        username: '',
        password: '',
        ifWarningShow: false,
        warningMsg: ''
      }
    },
    methods: {
      loginCheck() {
        let username = this.username
        let password = this.password
        if (!username || !password) {
          this.showWarningMsg('用户名和密码不能为空')
          return
        }
        login(username, password).then(res => {
          let info = res.data // res.data.data才是
          const errorCode = info.error_code
          // 检查error_code和msg来确定下一步操作
          if (errorCode === 0) { // 正确
            this.$router.push({ name: 'home', params: { privilege: info.privilege, username: username } })
          } else if (errorCode === 1) { // 用户名不存在
            this.showWarningMsg('用户名不存在')
          } else { // 用户名或密码错误
            this.showWarningMsg('用户名或密码错误')
          }
        })   
      },
      showWarningMsg(msg) {
        this.ifWarningShow = true
        this.warningMsg = msg
        let el = document.querySelector('.warning-wrap')
        el.style.opacity = 1
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import '@/assets/styles/global.scss';
  .login {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    .bg-wrap {
      width: 100%;
      height: 100%;
      background-image: linear-gradient(160deg, #b100ff 20%,#00b3ff 80%);
    }
    .loginForm-wrap {
      @include absCenter;
      width: 400px;
      height: 400px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .text-wrap {
        @include center;
        font-size: 25px;
        color: white;
        letter-spacing: 5px;
        font-weight: bold;
        margin-bottom: 15px;
        font-family: '楷体'
      }
      .form-wrap {
        width: 100%;
        height: 300px;
        background: white;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, .7);
        box-sizing: border-box;
        padding: 20px 10px 20px 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 5px;
        .input-user-wrap {
          display: flex;
          width: 80%;
          border: 1px solid #00b3ff;
          border-radius: 5px;
          padding: 10px;
          box-sizing: border-box;
          margin-bottom: 15px;
          align-items: center;
          span {
            &:before {
              font-size: 18px;
              color: black;
            }
            margin-right: 10px;
          }
          input {
            border: none;
            outline: none;
            height: 20px;
            line-height: 20px;
          }
        }
        .input-password-wrap {
          display: flex;
          width: 80%;
          border: 1px solid #00b3ff;
          border-radius: 5px;
          padding: 10px;
          box-sizing: border-box;
          align-items: center;
          span {
            &:before {
              font-size: 18px;
              color: black;
            }
            margin-right: 10px;
          }
          input {
            border: none;
            outline: none;
            height: 20px;
            line-height: 20px;
          }
        }
        .warning-wrap {
          width: 80%;
          height: 20px;
          opacity: 0;
          margin: 10px 0 10px 0;
          transition: all .2s linear;
          span::before {
            color: orangered;
            margin-right: 3px;
          }
          .warning-text {
            font-size: 12px;
            letter-spacing: 5px;
            color: orangered;
          }
        }
        .login-btn {
          width: 80%;
          height: 40px;
          border-radius: 5px;
          background: skyblue;
          @include center;
          font-size: 20px;
          font-family: '楷体';
          color: white;
          letter-spacing: 10px;
          cursor: pointer;
        }
        .footer-text {
          width: 80%;
          margin-top: 15px;
          line-height: 20px;
          font-size: 12px;
          letter-spacing: 2px;
          color: #4cbb15;
        }
      }
    }
  }
</style>
