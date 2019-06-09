# staff-system

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 页面展示
<img src="https://github.com/ChenMingK/ImagesStore/blob/master/imgs/staffSystem.png">

### 体验地址
<a href="http://cmk1018.cn/works/">传送门</a>

# 前端开发记录
## 禁止点击事件的触发
需求分析：以用户身份登录时不能允许添加、删除记录操作，需要将按钮置为灰色同时原先设置的点击事件不能触发，通过权限值（privilege）来动态绑定样式。

```html
<div class="edit-btn"
     :class="{'btn-disabled': privilege === 0}"
     @click="showEditComponent(item)"> <!--根据权限来判断是否禁用按钮-使用动态样式-->
  <span>编辑</span>
</div>
```
方案1：纯CSS实现，给动态绑定的class添加一下样式
- 鼠标悬浮到该元素上时显示禁止红圈圈`cursor: not-allowed`
- 鼠标原有的事件不能实现`pointer-events:none`

这样做有一个问题，设置了`pointer-events`后发现cursor样式失效了，即鼠标悬浮在该按钮上不是禁止的样式而是默认的样式


方案2：JS在事件处理程序中做相应判断并返回
- 绑定的事件回调中通过`event.currentTarget`获取触发点击事件的节点（绑定该事件的节点），`event.target`是你点击的节点，其会向上冒泡到`event.currentTarget`
- 获取节点后判断其类名中是否存在我们动态添加的`'btn-disabled'`

```js
showEditComponent() {
  let node = event.currentTarget // 获取触发点击事件的节点
  if (node.className.search('btn-disabled') !== -1) { // node.className返回一个字符串包含类名
    return // 不会创建表单
  }
}
```
## v-for循环对象
需求分析：创建表单时，需要知道哪些信息需要编辑，对于添加一条记录来说只需要员工信息的key，对于编辑一条记录而言不仅需要key，还需要value（即已有的值）；显然我们需要传一个对象给表单组件，一般用v-for来遍历数组，那么v-for能不能遍历对象呢？当然可以。

```html
<!--对象遍历：注意书写顺序，value在key之前-->
<div v-for="(value, key, index) in object" :key="key">
  {{ index }}. {{ key }} - {{ value }}
</div>
<!--数组遍历-->
<div v-for="(value, index) in array" :key="index">
  {{ value }} - {{ index }}
</div>
<!--数组对象遍历-->
<div v-for="(value, key, index) in objectArray" :key="index">
  {{ value }} - {{ index }}
</div>
```
## vue-create-api使用技巧（如何进行组件通信以及销毁的注意事项）

## 动态组件切换及过渡效果
左侧tab的实现本来应该用前端路由来实现的，即点击不同的tab切换不同的路由视图；这里使用的是动态组件的方式，即切换不同的tab就切换main部分（右侧）的组件，好处是我们如果想实现过渡效果，比如淡入淡出，只需要在外层添加transition即可。

```html
<transition name="fade">
  <component :is="chooseComponent(currentTab)"></component>
</transition>
```
## vue项目引入Echarts
- `npm install echarts`
- main.js添加如下代码
```js
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
```
- 使用时注意将`echarts.init()'之类的改为`this.$echarts.init(dom)` `new this.$echarts.graphic.LinearGradient`
- 也有说法可以按需导入什么的
## mixin混入与写utils方法导入的区别
mixin混入相比（公共方法）写在utils的好处是可以不用手动绑定this直接通过this.xxx调用公有方法，因为其相当于把methods注入了methods选项中，书写更为简洁

比如分页操作

```js
paging(data) {
  let arr = []
  let pages = Math.floor(data.length / 10) + 1
  for (let i = 0; i < pages; i++) {
    arr[i] = []
    for (let j = 0; j < 10; j++) {
      if ((i === pages - 1) && (i * 10 + j === data.length)) { // 25 -> max: [2][4]
        break
      } 
      arr[i][j] = data[i * 10 + j]
    }
  }
  this.pagingList = arr
  this.allPages = arr.length + 1
}
```
每个组件的data选项都有pagingList和allPages这两个属性，使用mixin则直接this.paging(data)即可，如果写成一个方法export导出import导入就需要paging.call(this, data)
## axios前后端交互注意事项
params选项是携带在URL后面的参数，即URL&后面的，data选项对于GET请求无效，POST请求如果想传送一个对象给后端需要将这个对象使用JSON.stringify序列化，后端通过JSON.parse来获取这个对象（如果不这么做会无法传输？）
```js
export function insertData(table, paramObj) {
  return axios({
    method: 'post', // POST请求data选项才有用?
    url: `${process.env.VUE_APP_BASE_URL}/insert`,
    params: {
      table // 需要插入的表
    },
    data: {
      obj: JSON.stringify(paramObj) // 必须为序列化的对象? plain object?
    }
  })
}
```
## 按钮与文字配色方案记录
`border-radius`3px比较好看
```scss
// 编辑按钮 黄底白字
@mixin edit-btn {
  color: white;
  width: 40%;
  height: 20px;
  background: #efbe37;
  border-radius: 3px;
  cursor: pointer;
  @include center;
  font-size: 12px;
  transition: all .2s linear;
  &:hover {
    opacity: .5;
  }
}

// 删除按钮 红底白字
@mixin delete-btn {
  color: white;
  width: 40%;
  height: 20px;
  background: #fa5555;
  border-radius: 3px;
  cursor: pointer;
  @include center;
  transition: all .2s linear;
  font-size: 12px;
  &:hover {
    opacity: .5;
  }
}

// 添加按钮 蓝底白字
@mixin add-btn {
  @include center;
  background: skyblue;
  color: white;
  width: 100px;
  border-radius: 5px;
  font-size: 14px;
  // cursor: not-allowed;
  &:hover {
    cursor: pointer;
  }
}

// 切换页数按钮 灰底白字
@mixin grey-button {
  background: gray;
  color: white;
  border-radius: 3px;
  width: 80px;
  font-size: 12px;
  height: 25px;
  @include center;
  cursor: pointer;
  transition: all .2s linear;
  &:hover {
    background: rgba(0, 0, 0, .3);
  }
}

```
# 后端开发记录
## express处理POST请求
需要添加处理POST请求的中间件
- `npm install body-parser`
- `cosnt bodyParser = require('body-parser)`
- `app.use(bodyParser.json())`
- `app.use(bodyParser.urlencoded({extended: false}))`

前端axios的data选项可以通过req.body来接收，params选项可以通过req.query来接收
## 数据库操作细节问题
```js
const sql = `SELECT * FROM user WHERE username = '${query.username}'` 
// 注意这里使用${}外面要加引号,sql语句本身视为字符串，'user1'是要加上字符串的`
```
## 利用数据库级联操作
员工信息表中的emp_number（员工编号）作为其他表的外键被引用，那么删除员工信息的时候就会有一个问题：由于员工信息中的员工编号是作为外键被其他表引用的，数据库会报错。
这就需要利用数据库的级联操作，我们在建表时添加foreign key(emp_number) references information(emp_number) on delete cascade 字样，这样我们后台连接数据库执行删除员工信息的时候只需要普通地执行删除操作数据库就会自动帮我们删除其他表中引用该外键的相关记录。如果不这么做的话，可能需要先查询其他表中对应的记录全部删除后再删除本表的记录。
```sql
create table leave_t(leave_number int primary key,
                    leave_date varchar(20),
                    emp_number int,
                    leave_reason varchar(50),
                    req_date varchar(20),
                    leave_approve varchar(5),
                    foreign key(emp_number) references information(emp_number)
on delete cascade);
```
