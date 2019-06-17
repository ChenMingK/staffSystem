const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const constant = require('./const')
const bodyParser = require('body-parser') // 处理POST请求的中间件
const app = express()
app.use(cors())
// 添加json解析,what?
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// 查询数据
app.get('/data', (req, res) => {
  const query = req.query // 获取URL中的参数，即前端接口的params配置
  const sql = `SELECT * FROM ${query.table}`
  const conn = connect()
  conn.query(sql, (err, results) => {
    if (err) {
      res.json({
        error_code: 1,
        msg: '查询失败'
      })
    } else {
      if (results && results.length === 0) {
        res.json({
          error_code: 2,
          msg: '没有数据'
        })
      } else {
        res.json({
          error_code: 0,
          msg: '获取成功',
          data: results
        })
      }
    }
    conn.end() // 注意关闭数据库链接
  })
})

// 插入数据
app.post('/insert', (req, res) => {
  const query = req.query // 获取URL中的参数，即前端接口的params配置
  const paramObj = JSON.parse(req.body.obj) // req.body => 前端的data选项对象，前端是序列化后传过来的
  let sql, sqlParams = []
  switch (query.table) {
    case 'information':
      sql = `INSERT INTO ${query.table}(emp_number, empname, emp_sex, emp_birth, emp_card, emp_birthplace, 
        emp_phone, emp_address, dep_number, dep_age) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      // emp_number:int(11) dep_number:int(11) dep_age:smallint(6)
      for (let key of Object.keys(paramObj)) {
        if (key === 'emp_number' || key === 'dep_number' || key === 'dep_age') {
          sqlParams.push(parseInt(paramObj[key]))    
        } else {
          sqlParams.push(paramObj[key])
        }
      }
    // 操作薪资表
    case 'salary':
      sql = `INSERT INTO ${query.table}(pay_month, emp_number, pay_number, pay_prize, pay_overtime, pay_absence, 
        pay_money) VALUES(?, ?, ?, ?, ?, ?, ?)`
      for (let key of Object.keys(paramObj)) {
        if (key === 'pay_month') {
          sqlParams.push(paramObj[key])
        } else { // 其他都为整型
          sqlParams.push(parseInt(paramObj[key]))
        }
      }
    case 'atendence':
      sql = `INSERT INTO ${query.table}(att_month, emp_number, att_number, leave_number, abs_number, late_number)
             VALUES(?, ?, ?, ?, ?, ?)`
      for (let key of Object.keys(paramObj)) {
          sqlParams.push(parseInt(paramObj[key])) // 全部为int
      }
      break;
    case 'leave_t':
      sql = `INSERT INTO ${query.table}(leave_number, leave_date, emp_number, leave_reason, req_date, leave_approve)
             VALUES(?, ?, ?, ?, ?, ?)`
      // leave_number(int) emp_number(int) 其他都为varchar
      for (let key of Object.keys(paramObj)) {
        if (key === 'leave_number' || key === 'emp_number') {
          sqlParams.push(parseInt(paramObj[key]))
        } else { // 其他都为整型
          sqlParams.push(paramObj[key])
        }
      }
      sqlParams.push('No') // 员工申请的请假状态初始都为'No'
      break;
  }
  const conn = connect()
  conn.query(sql, sqlParams, function (err, result) {
    if (err) {
      res.json({
        error_code: 1,
        msg: '插入失败'
      })
    } else {
      res.json({
        error_code: 0,
        msg: '插入成功'
      })
    }
    conn.end()
  })
  
})

// 更新数据
app.post('/update', (req, res) => {
  const query = req.query // 获取URL中的参数，即前端接口的params配置
  const paramObj = JSON.parse(req.body.obj) // req.body => 前端的data选项对象，前端是序列化后传过来的
  let sql, sqlParams = []
  switch (query.table) {
    case 'information':
      sql = `UPDATE ${query.table} SET empname = ?, emp_sex = ?, emp_birth = ?, emp_card = ?, 
             emp_birthplace = ?, emp_phone = ?, emp_address = ?, dep_number = ?, dep_age = ? WHERE emp_number = ?`
      // emp_number:int(11) dep_number:int(11) dep_age:smallint(6)
      for (let key of Object.keys(paramObj)) {
        if (key === 'emp_number' || key === 'dep_number' || key === 'dep_age') {
          sqlParams.push(parseInt(paramObj[key]))    
        } else {
          sqlParams.push(paramObj[key])
        }
      }
      sqlParams.push(sqlParams.shift()) // 主键参数放到最后
      break;
    case 'salary':
      sql = `UPDATE ${query.table} SET pay_month = ?, pay_number = ?, pay_prize = ?, pay_overtime = ?, 
             pay_absence = ?, pay_money = ? WHERE emp_number = ?`
      for (let key of Object.keys(paramObj)) {
        if (key === 'pay_month') {
          sqlParams.push(paramObj[key])
        } else { // 其他都为整型
          sqlParams.push(parseInt(paramObj[key]))
        }
      }
      sqlParams.push(...sqlParams.splice(1, 1)) // 第2项拿出来放到最后(主键)
      break;
    case 'atendence':
      sql = `UPDATE ${query.table} SET att_month = ?, att_number = ?, leave_number = ?, abs_number = ?, late_number = ?
             WHERE emp_number = ?`
      // keys中第二个为emp_number
      for (let key of Object.keys(paramObj)) {
          sqlParams.push(parseInt(paramObj[key])) // 全部为int
      }
      sqlParams.push(...sqlParams.splice(1, 1)) // emp_number放到最后
      break;
    case 'leave_t':
      sql = `UPDATE ${query.table} SET leave_number = ?, leave_date = ?, leave_reason = ?, req_date = ?, leave_approve = ?
             WHERE emp_number = ?`
      // 第三个为emp_number，第三个放到最后
      for (let key of Object.keys(paramObj)) {
        if (key === 'leave_number' || key === 'emp_number') {
          sqlParams.push(parseInt(paramObj[key]))
        } else { // 其他都为整型
          sqlParams.push(paramObj[key])
        }
      }
      sqlParams.push(...sqlParams.splice(2, 1))
      break;
  }
  const conn = connect()
  conn.query(sql, sqlParams, function (err, result) {
    if (err) {
      res.json({
        error_code: 1,
        msg: '更新失败'
      })
    } else {
      res.json({
        error_code: 0,
        msg: '更新成功'
      })
    }
    conn.end()
  })
})

// 删除数据
app.get('/delete', (req, res) => {
  const query = req.query
  let { table, key, value } = query
  // 这里注意一点，如果是删除员工信息表，由于其他表以该表作为外键，所以需要将其他表中该表信息全部删除才能删除

  const sql = `DELETE FROM ${table} WHERE ${key} = ${value}`
  const conn = connect()
  conn.query(sql, (err, results) => {
    if (err) {
      res.json({
        error_code: 1,
        msg: '删除失败'
      })
    } else {
      res.json({
        error_code: 0,
        msg: '删除成功'
      })
    }
    conn.end() // 注意关闭数据库链接
  })
})

// 登录验证
app.get('/login', (req, res) => {
  const query = req.query // 获取URL中的参数，即前端接口的params配置
  const sql = `SELECT * FROM user WHERE username = '${query.username}'` // 注意这里使用${}外面要加引号,sql语句本身视为字符串，'user1'是要加上字符串的
  const conn = connect()
  conn.query(sql, (err, results) => {
    // 查询后首先检查用户名是否存在 不存在->error_code: 1 msg:'用户名不存在' 如果没有会返回undefined而不是一个空数组
    if (!results || results.length === 0) {
      res.json({
        error_code: 1,
        msg: '用户名不存在'
      })
    }
    // 然后检查密码是否正确 -> 不正确->error_code: 2 msg:'用户名或密码错误'
    else { 
      // 用户名存在以及密码正确 -> error_code: 0 msg:'success' -> 前端不显示msg直接跳转路由, 同时将权限数据传给前端, 0: 用户 1: 管理员
      if (results[0].password === query.password) { 
        res.json({
          error_code: 0,
          msg: 'success',
          privilege: results[0].privilege
        })
      }
      // 否则返回用户名或密码错误的msg
      else {
        res.json({
          error_code: 2,
          msg: '用户名或密码错误'
        })
      }
    }
    conn.end() // 注意关闭数据库链接
  })
})

// 建立数据库连接
function connect() {
  return mysql.createConnection({
    host: constant.dbHost,
    user: constant.dbUser,
    password: constant.dbPwd,
    database: 'employ'
  })
}

const server = app.listen(3000, () => {
  const host = server.address().address
  const port = server.address().port
  console.log('server is listening at http://%s:%s', host, port)
})