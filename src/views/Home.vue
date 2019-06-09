<template>
  <div class="home">
    <div class="header">
      <div class="night">
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
      </div>
      <div class="left-wrapper">
        <img src="../assets/images/logo.png" alt="">
        <span class="header-text">员工管理系统</span>
      </div>
      <div class="right-wrapper">
        <div class="icon-wrap">
          <span class="icon-member"></span>
        </div>
        <div class="login-text">欢迎您:{{loginUser}}</div>
        <div class="icon-wrap">
          <span class="icon-quit"></span>
        </div>
        <div class="quit-text" @click="backToLogin">注销</div>
      </div>
    </div>
    <div class="aside">
      <div class="aside-list" 
           v-for="(item, index) in asideList" 
           :key="index"
           @click="switchTab(index)">
        <span :class="item.icon" class="icon"></span>
        <div class="aside-list-text">{{item.text}}</div>
      </div>
    </div>
    <div class="main">
      <div class="main-top">
        <img src="../assets/images/category.png">首页<span class="split">/</span>{{navigate()}}
      </div>
      <transition name="fade">
        <component :is="chooseComponent(currentTab)"></component>
      </transition>
    </div>
    <div class="footer">
      <span class="footer-text">Copyright © 2019 chenmk | Powered by HNU University</span>
    </div>
  </div>
</template>

<script>
  import Welcome from '../components/Welcome.vue'
  import StaffInfo from '../components/StaffInfo.vue'
  import LeaveTable from '../components/LeaveTable.vue' // 请假表组件
  import SalaryTable from '../components/SalaryTable.vue'
  import GateTable from '../components/GateTable.vue'
  export default {
    data: function () {
      return {
        asideList: [
          { text: '首页', icon: 'icon-home' },
          { text: '员工信息管理',  icon: 'icon-member' },
          { text: '薪资管理', icon: 'icon-money' },
          { text: '出勤管理', icon: 'icon-attend' },
          { text: '员工请假', icon: 'icon-quit' }
        ],
        currentTab: 0,
        loginUser: '',
        welcome: Welcome,
        StaffInfo,
        LeaveTable,
        SalaryTable,
        GateTable
      }
    },
    computed: {
      privilege() {
        return this.$store.state.privilege
      }
    },
    methods: {
      chooseComponent(componentId) {
        switch (componentId) {
          case 0: 
            return this.welcome
          case 1: 
            return this.StaffInfo
          case 2: 
            return this.SalaryTable
          case 3: 
            return this.GateTable
          case 4:
            return this.LeaveTable
        }
      },
      switchTab(index) {
        this.currentTab = index
      },
      navigate() {
        switch (this.currentTab) {
          case 0: return 'Home'
          case 1: return '员工信息管理'
          case 2: return '薪资管理'
          case 3: return '出勤管理'
          case 4: return '员工请假管理'
        }
      },
      backToLogin() {
        this.$router.push({ path: 'login' })
      }
    },
    mounted() {
      let privilege = this.$route.params.privilege
      let username = this.$route.params.username
      this.loginUser = username
      this.$store.dispatch('setPrivilege', privilege) // action名，参数
    }
  }
</script>

<style lang='scss' scoped>
  @import '@/assets/styles/global.scss';
  @import '@/assets/styles/star.scss';
  $marginTop: 50px;
  .home {
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    top: 0;
    left: 0;
    overflow: hidden;
    .header {
      width: 100%;
      height: $marginTop;
      position: absolute;
      top: 0;
      left: 0;
      background: rgb(10, 47, 88);
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 20px;
      .left-wrapper {
        @include center;
        img {
          width: 40px;
          // height: 20px;
          margin-right: 10px;
        }
        .header-text {
          letter-spacing: 5px;
          font-size: 20px;
          color: white;
          font-weight: bold;
        }
      }
      .right-wrapper {
        @include center;
        color: white;
        font-weight: bold;
        .icon-wrap {
          @include center;
          .icon-member:before {
            font-size: 20px;
            color: white;
          } 
          .icon-quit:before {
            font-size: 16px;
            color: white;
          }
        }
        .login-text {
          font-size: 15px;
          margin-left: 5px;
          margin-right: 5px;
          box-sizing: border-box;
          letter-spacing: 5px;
          cursor: pointer;
        }
        .quit-text {
          font-size: 15px;
          margin-left: 5px;
          letter-spacing: 5px;
          cursor: pointer;
        }
      }
    }
    .aside {
      position: relative;
      top: $marginTop;
      box-sizing: border-box;
      flex: 0 0 20%;
      background: #eef1f6;
      display: flex;
      flex-direction: column;
      .aside-list {
        width: 100%;
        height: 100px;
        padding-left: 30px;
        box-sizing: border-box;
        border-top: 1px solid #ccc;
        display: flex;
        align-items: center;
        transition: all linear .3s;
        cursor: pointer;
        &:hover {
          background: rgba(0,191,255,.3);
        }
        &:last-child {
          border-bottom: 1px solid #ccc;
        }
        .aside-list-text {
          color: #019fde;
          font-weight: bold;
          letter-spacing: 5px;
        }
        span {
          width: 20px;
          @include center;
          margin-right: 10px;
        }
        .icon {
          font-size: 25px;
          color: skyblue;  
          &:before { // 有的svg是通过:before来添加的，颜色统一
            font-size: 25px;
            color: skyblue; 
          }
        }
      }
    }
    .main {
      position: relative;
      top: $marginTop;
      flex: 1;
      background: #f7f7f7;
      .main-top {
        position: absolute;
        top: 0;
        height: 30px;
        width: 100%;
        background: rgba(0, 0, 0, .1);
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-weight: bold;
        letter-spacing: 5px;
        img {
          box-sizing: border-box;
          margin-left: 5px;
          margin-right: 5px;
          width: 17px;
        }
        .split {
          color: gray;
          
        }
      }
    }
    .footer {
      position: absolute;
      height: 50px;
      left: 20%;
      width: 80%;
      bottom: 0;
      background: #eef1f6;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
      font-size: 15px;
      font-weight: bold;
      color: gray;
      @include center;
    }
  }
</style>
