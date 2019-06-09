<template>
  <div class="salary-table">
    <div class="header">
      <div class="search-wrapper">
        <div class="search-icon-wrap">
          <span class="icon-search"></span>
        </div>
        <input type="text"
               placeholder="输入文字后回车搜索...">
      </div>
      <div class="button-wrapper">
        <div class="add-button"
             :class="{'btn-disabled': privilege === 0}"
             @click="showForm">新增</div> 
        <div class="sort-button">
          <select name="sort" id="">
            <option value="default" class="option-text">默认排序</option>
            <option value="number" class="option-text">按员工编号</option>
          </select>
        </div>
      </div>
    </div>
    <div class="form-wrapper">
      <div class="table-header-warpper">
        <div class="col1 col">员工编号</div>
        <div class="col2 col">基本工资</div>
        <div class="col3 col">奖金</div>
        <div class="col4 col">加班费</div>
        <div class="col5 col">缺勤扣除工资</div>
        <div class="col6 col">最终工资</div>
        <div class="col-operation">操作</div>
      </div>
      <div class="table-header-warpper list-item" v-for="(item, index) in pagingList[currentPage - 1]" :key="index">
        <div class="col1 col">{{item.emp_number}}</div>
        <div class="col2 col">{{item.pay_number}}</div>
        <div class="col3 col">{{item.pay_prize}}</div>
        <div class="col4 col">{{item.pay_overtime}}</div>
        <div class="col5 col">{{item.pay_absence}}</div>
        <div class="col6 col">{{item.pay_money}}</div>
        <div class="col-operation">
          <div class="edit-btn"
               :class="{'btn-disabled': privilege === 0}"
               @click="showEditComponent(item)">
            <span>编辑</span>
          </div>
          <div class="delete-btn"
               :class="{'btn-disabled': privilege === 0}"
               @click="deleteItem(item)">
            <span>删除</span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-wrapper">
      <div class="curr-page-wrapper">
        当前第<span>{{currentPage}}</span>页
      </div>
      <div class="first-page-wrapper" @click="firstPage">
        首页
      </div>
      <div class="prev-page-wrapper" @click="prevPage">
        上一页
      </div>
      <div class="next-page-wrapper" @click="nextPage">
        下一页
      </div>
    </div>
  </div>
</template>

<script>
  import { getData, deleteData } from '../api/home.js' // axios方法
  import { SALARY_FORM } from '../utils/const.js'
  import { componentMixin } from '../utils/mixin.js' // mixin混入
  export default {
    mixins: [componentMixin],
    data: function () {
      return {
        month: 1, // 月份
        salaryMessages: [],
        currentPage: 1, // 当前页
        pagingList: [], // 分页后的数组
        allPages: 0, // 当前总页数:用于禁止下一页
        formComponent: null,
        editComponent: null,
        toastComponent: null
      }
    },
    methods: {
      showForm() {
        let node = event.currentTarget // 获取触发点击事件的节点
        if (node.className.search('btn-disabled') !== -1) { // node.className返回一个字符串包含类名
          return // 不会创建表单
        }
        this.hideForm() // vue-create-api只允许同时存在一个动态创建的组件
        this.formComponent = this.$createForm({
            $props: {
              inputList: SALARY_FORM, // 之后改成const放在utils
              tableName: 'salary'
            },
            $events: {
              submit: this.flushData, // 使用flushData方法作为子组件submit事件的回调
              hide: this.hideForm // 点击取消时删除组件
            }
        }).show()
      },
      showEditComponent(item) {
        let node = event.currentTarget // 获取触发点击事件的节点
        if (node.className.search('btn-disabled') !== -1) { // node.className返回一个字符串包含类名
          return // 不会创建表单
        }
        this.hideForm()
        this.editComponent = this.$createEdit({
          $props: {
            EditList: item, // 本行的内容
            disableKeys: ['emp_number'], // 不允许修改的键
            tableName: 'salary'
          },
            $events: {
              submit: this.flushData, // 使用flushData方法作为子组件submit事件的回调
              hide: this.hideForm // 点击取消时删除组件
            }
        }).show()
      },
      showToast(text) {
        this.toastComponent = this.$createToast({
          $props: {
            text: text
          }
        }).show()
        setTimeout(() => { // 隔对话框显示的时间后自动删除该组件
          this.hideForm()
        }, 2000)
      },
      // 刷新数据
      flushData(text) {
        if (text === 'flush') { // mounted时使用，请求数据并分页
          getData('salary').then(res => {
            let info = res.data // res.data.data才是
            this.salaryMessages = info.data
            this.paging(this.salaryMessages) // 公有方法,各组件绑定this调用即可
          })
        } else {
          this.hideForm()
          this.showToast(text)
          // 向后端请求数据然后更新
          getData('salary').then(res => {
            let info = res.data
            this.salaryMessages = info.data
            this.paging(this.salaryMessages) // 公有方法,各组件绑定this调用即可
          })
        }
      },
      deleteItem(item) {
        let node = event.currentTarget // 获取触发点击事件的节点
        if (node.className.search('btn-disabled') !== -1) { // node.className返回一个字符串包含类名
          return // 不会创建表单
        }
        // 携带表名，主键名，主键值
        deleteData('salary', 'emp_number', item.emp_number).then(res => {
          let text = res.data.error_code === 0 ? '删除数据成功' : '删除数据失败'
          this.flushData(text)
        })
      }
    },
    mounted() {
      this.flushData('flush')
    }
  }
</script>

<style lang='scss' scoped>
  @import '@/assets/styles/global.scss';
  .salary-table {
    @include table-wrap;
    .header {
      height: 50px;
      position: relative;
      margin-bottom: 10px;
      box-sizing: border-box;
      padding: 10px;
      background: #ccc;
      display: flex;
      .search-wrapper {
        width: 200px;
        background: white;
        display: flex;
        box-sizing: border-box;
        border-radius: 5px;
        padding: 5px;
        .search-icon-wrap {
          @include center;
        }
        input {
          @include search-style;
        }
      }
      .button-wrapper {
        display: flex;
        box-sizing: border-box;
        margin-left: 20px;
      }
      .add-button {
        @include add-btn;
      }
      .sort-button {
        @include sort-btn;
      }
    }
    .form-wrapper {
      position: relative;
      .table-header-warpper {
        background: rgba(100,149,237, .3);
        display: flex;
        box-sizing: border-box;
        @include table-border;
        .col1 {
          flex: 0 0 10%;
          @include center;
          box-sizing: border-box;
          @include table-border;
        }
        .col2 {
          flex: 0 0 10%;
          @include center;
          box-sizing: border-box;
          @include table-border;
        }
        .col3 {
          flex: 0 0 12.5%;
          @include center;
          box-sizing: border-box;
          @include table-border;
        }
        .col4 {
          flex: 0 0 12.5%;
          @include center;
          box-sizing: border-box;
          @include table-border;
        }
        .col5 {
          flex: 0 0 20%;
          @include center;
          box-sizing: border-box;
          @include table-border;
        }
        .col6 {
          flex: 0 0 20%;
          @include center;
          box-sizing: border-box;
          @include table-border;
        }
        .col-operation {
          flex: 0 0 15%;
          display: flex;
          justify-content: space-around;
          align-items: center;
          box-sizing: border-box;
          @include table-border;
          .edit-btn {
            @include edit-btn;
          }
          .delete-btn {
            @include delete-btn;
          }
        }
      }
      .list-item {
        background: white;
        &:hover {
          background: rgba(117, 167, 233, 0.1);
        }
      }
    }
    .footer-wrapper {
      @include footer-style;
    }
  }
</style>
