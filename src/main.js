// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import hybrid from './hybrid'
import router from './router';
import "../static/style.less";
import mixin from "./mixin";
var VueTap = require('vue2-tap')
Vue.use(VueTap)
//移动端点击延迟补丁
if ('addEventListener' in document) {
    // document.addEventListener('DOMContentLoaded', function() {
    //     FastClick.attach(document.body);
    // },{ passive: false });
    // FastClick.attach(document.body);
    document.addEventListener("touchstart", function() {},false);
}

window.deviceInfo = {
  name:window.location.href.indexOf("iPhoneX")!=-1?"iPhoneX":"",
}

Vue.prototype.$hybrid = hybrid ;

// Vue.component('jheader', jheader) ;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App},
  template: '<App/>',
  store
})
