import Vue from 'vue'
import App from './App'
import router from './router/router'
import store from './store/'

import './config/rem'

//引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

//Mint-ui按需引入
import Popup from 'mint-ui/lib/popup'
import 'mint-ui/lib/popup/style.css'
Vue.component('mt-popup', Popup)
import Picker from 'mint-ui/lib/picker'
import 'mint-ui/lib/picker/style.css'
Vue.component('mt-picker', Picker)

import 'mint-ui/lib/toast/style.css'  //引入mint-ui的toast样式
import 'mint-ui/lib/font/style.css'  //引入mint-ui自带图标

Vue.config.productionTip = false  //关闭生产模式下给出的提示

/**
   * global变量配置
   */
global.baseUrl = ''  //域名地址前缀

if (process.env.NODE_ENV == 'development') {  //本地调试环境
	global.baseUrl = 'http://127.0.0.1:5000'
}else if(process.env.NODE_ENV == 'test'){  //测试环境
	global.baseUrl = ''
}else if(process.env.NODE_ENV == 'production'){  //线上环境
	global.baseUrl = ''
}

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})