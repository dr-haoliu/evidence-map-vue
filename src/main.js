import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ECharts from 'vue-echarts' // refers to components/ECharts.vue in webpack

Vue.config.productionTip = false


import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'

// If you want to use ECharts extensions, just import the extension package, and it will work
// Taking ECharts-GL as an example:
// You only need to install the package with `npm install --save echarts-gl` and import it as follows
import 'echarts-gl'

// register component to use
Vue.component('v-chart', ECharts)

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


import HighchartsVue from 'highcharts-vue'
Vue.use(HighchartsVue)




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
