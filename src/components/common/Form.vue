<template>
  <div class="form">
    <div class="mask"></div>
    <div class="form-wrap">
      <div class="title">
        <span class="icon-edit"></span>
        新增员工信息
      </div>
      <div class="list-wrap">
        <div v-for="(value, key) in inputList" :key="key" class='list-item-wrap'>
            <div class="text-wrap">{{transfer(key)}}</div>
            <input type="text" :name="key">
        </div><!--v-for遍历对象，注意(value, key)顺序是反过来的-->
        <div class="btn-wrap">
          <div class="check-btn-wrap" @click="submit">
            <span class="check-text">确认</span>
          </div>
          <div class="cancel-btn-wrap" @click="hide">
            <span class="check-text">取消</span>
          </div>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
  import { insertData } from '../../api/home.js'
  export default {
    name: 'Form',
    props: {
      inputList: Object,
      tableName: String // 当前要操作的是哪个数据库表名
    },
    methods: {
      hide() {
        this.$emit('hide')
      },
      // 该表单组件直接访问后端
      submit() {
        let params = this.getInputValue()
        insertData(this.tableName, params).then(res => {
          let text = res.data.error_code === 0 ? '添加数据成功' : '添加数据失败'
          this.$emit('submit', text)
          // this.$parent.$parent.flushData() // 上一级为一个匿名父组件，再上一级为调用create-api的
        })
      },
      getInputValue() {
        const params = {}
        let nodes = document.querySelectorAll('.list-item-wrap input')
        for (let i = 0; i < nodes.length; i++) {
          params[nodes[i].name] = nodes[i].value
        }
        return params // 以input的value组成的对象
      },
      // 不显示传输格式，显示文本形式
      transfer(key) {
        switch (key) {
          case 'emp_number': return '员工编号'
          case 'empname': return '员工姓名'
          case 'emp_sex': return '性别'
          case 'emp_birth': return '出生年月'
          case 'emp_card': return '身份证'
          case 'emp_birthplace': return '出生地'
          case 'emp_phone': return '电话号码'
          case 'emp_address': return '住址'
          case 'dep_number': return '宿舍号'
          case 'dep_age': return '工龄'
          case 'pay_month': return '月份'
          case 'pay_number': return '基本工资'
          case 'pay_prize': return '奖金'
          case 'pay_overtime': return '加班费'
          case 'pay_absence': return '缺勤扣除工资'
          case 'pay_money': return '最终工资'
          case 'att_month': return '月份'
          case 'att_number': return '出勤次数'
          case 'leave_number': return '请假编号'
          case 'abs_number': return '缺勤次数'
          case 'late_number': return '迟到次数'
          case 'leave_date': return '请假时间'
          case 'req_date': return '申请时间'
          case 'leave_approve': return '是否批准'
          case 'leave_reason': return '请假理由'
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import '@/assets/styles/global.scss';
  .form {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .mask {
      background: rgba(0, 0, 0, .5);
      z-index: 100;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .form-wrap {
      z-index: 200;
      width: 500px;
      height: 500px;
      box-sizing: border-box;
      padding: 20px;
      background: white;
      @include absCenter;
      @include center;
      .title {
        position: absolute;
        top: 0;
        left: 0;
        @include center;  
        width: 100%;
        height: 30px;
        padding: 5px;
        box-sizing: border-box;
        background: #3bc5ff;
        color: #fff;
        .icon-edit {
          @include center;
          margin-right: 10px;
          &::before {
            color: white;
          } 
        }
      }
      .list-wrap {
        width: 450px;
        height: 430px;
        margin-top: 20px;
        border: 1px solid #d8dce5;
        border-radius: 3px;
        .list-item-wrap {
          box-sizing: border-box;
          margin: 10px;
          height: 28px;
           position: relative;
          @include center;
          .text-wrap {
            display: flex;
            flex: 0 0 20%;
            justify-content: flex-end;
            font-family: '宋体';
            font-size: 14px;
            margin-right: 30px; 
          }
          input {
            flex: 0 0 50%;
            padding: 0 10px 0 10px;
            width: 50%;
            -webkit-appearance: none;
            background: #FFFFFF;
            border-radius: 4px;
            border: 1px solid #d8dce5;
            box-sizing: border-box;
            color: #5a5e66;
            outline: none;
            height: 20px;
            line-height: 20px;
          }
        }  
        .btn-wrap {
          display: flex;
          justify-content: flex-end;
          margin: 10px;
          font-family: 'Microsoft Yahei';
          font-size: 12px;
          .check-btn-wrap {
            @include center;
            box-sizing: border-box;
            background: #409eff;
            border-radius: 3px;
            margin-right: 10px;
            width: 56px;
            height: 28px;
            color: white;
            cursor: pointer;
          }
          .cancel-btn-wrap {
            @include center;
            border: 1px solid #d8dce5;
            background: #FFFFFF;
            border-radius: 3px;
            width: 56px;
            height: 28px;
            color: #5a5e66;
            cursor: pointer;
          }
        }
      } 
    }
  }
</style>
