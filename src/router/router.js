import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

////路由懒加载写法
//const index = r => require.ensure([], () => r(require('../page/index')), 'index')
//const suggestion = r => require.ensure([], () => r(require('../page/suggestion')), 'suggestion')

//非懒加载写法
import index from '../page/index'
import suggestion from '../page/suggestion'

const routes = [
	{
		path: '/',
		component: index
	},
	{
		path: '/index',
		component: index
	},
	{
		path: '/suggestion',
		component: suggestion
	}
]

export default new Router({
	mode: 'hash',
	routes
})