// 员工申请请假的表单数据，拿出来的原因是如果数据库没有任何数据，要添加数据的话就不能直接拿数据库中数据的格式
// 顺序是按数据库中的表中属性的顺序,也可以让某些属性不显示在表单中
export const LEAVE_FORM = {
  leave_number: 0, // 随便赋一个默认值，因为Form子组件只需要键不需要初始值
  leave_date: '',
  emp_number: 0,
  leave_reason: '',
  req_date: ''
}

export const STAFF_MESSAGES_FORM = {
  emp_number: 0,
  empname: '',
  emp_sex: '',
  emp_birth: '',
  emp_card: '',
  emp_birthplace: '',
  emp_phone: '',
  emp_address: '',
  dep_number: 0,
  dep_age: 0
}

export const GATE_FORM = {
  att_month: 0,
  emp_number: 0,
  att_number: 0,
  leave_number: 0,
  abs_number: 0,
  late_number: 0
}

export const SALARY_FORM = {
  pay_month: '',
  emp_number: 0,
  pay_number: 0,
  pay_prize: 0,
  pay_overtime: 0,
  pay_absence: 0,
  pay_money: 0
}
