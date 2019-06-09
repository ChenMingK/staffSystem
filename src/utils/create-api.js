import CreateAPI from 'vue-create-api'
import Vue from 'vue'
import Form from '../components/common/Form.vue'
import Edit from '../components/common/Edit.vue'
import Toast from '../components/common/Toast.vue'

Vue.use(CreateAPI)
Vue.createAPI(Form, true)
Vue.createAPI(Edit, true)
Vue.createAPI(Toast, true)
