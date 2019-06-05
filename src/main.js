// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/scss/vars.scss'
import echarts from 'echarts'

Vue.use(ElementUI)
Vue.prototype.echarts = echarts
Vue.config.productionTip = false

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el, obj) { // 这是需要页面刚加载就能进行聚焦操作使用的钩子函数,可以省略的，视具体需求而定
    // console.log(obj);
    if (obj.value) { // 对值进行判断
      // 聚焦元素
      el.focus()
    }
  },
  // 当指令所在组件的 VNode 及其子 VNode 全部更新后调用
  componentUpdated: function (el, obj) { // 这是每当绑定的值发生改变时触发的钩子函数
    // console.log(obj);  //可以打印看一下
    if (obj.value) {
      el.focus()
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
