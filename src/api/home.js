import axios from 'axios'
// 请求表中的数据
export function getData(table) {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/data`,
    params: {
      table: table // 需要查询的表
    }
  })
}

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

// 更新操作
export function updateData(table, paramObj) {
  return axios({
    method: 'post',
    url: `${process.env.VUE_APP_BASE_URL}/update`,
    params: {
      table
    },
    data: {
      obj: JSON.stringify(paramObj)
    }
  })
}

// 删除操作，只需要给表名和主键
export function deleteData(table, key, value) {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/delete`,
    params: {
      table,
      key,
      value
    }
  })
}

// 登录请求
export function login(username, password) {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/login`,
    params: {
      username,
      password
    }
  })
}
