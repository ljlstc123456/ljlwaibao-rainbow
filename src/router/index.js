import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

// import index  from '@/pages/index'
import home  from '@/pages/home'
import homem  from '@/pages/homem' 
import control  from '@/pages/control'
import moreColor from '@/pages/moreColor'
import moreMusic  from '@/pages/moreMusic'
import moreImg  from '@/pages/moreImg'
import create  from '@/pages/create'
import demo  from '@/pages/demo'
import demoDetail from '@/pages/demoDetail'
import demoStep from '@/pages/demoStep'
import demoStep1 from '@/pages/demoStep1'
import test from '@/pages/test'
export default new Router({
  //mode:"history",
  routes: [
    {
      path: '/test',
      name: 'test',
      component: test,
      meta: { title: '引导页'}
    },
    {
      path: '/homem',
      name: 'homem',
      component: homem,
      meta: { title: '首页'}
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: { title: '首页'}
    },
    {
      path: '/home/control',
      name: 'control',
      component: control,
      meta: { title: '控制模式'}
    },
    {
      path: '/home/control/moreColor',
      name: 'moreColor',
      component: moreColor,
      meta: { title: '更多颜色'}
    },
    {
      path: '/home/control/moreMusic',
      name: 'moreMusic',
      component: moreMusic,
      meta: { title: '更多声音'}
    },
    {
      path: '/home/control/moreImg',
      name: 'moreImg',
      component: moreImg,
      meta: { title: '更多图片'}
    },
    {
      path: '/home/create',
      name: 'create',
      component: create,
      meta: { title: '创作模式'}
    },
    {
      path: '/home/demo',
      name: 'demo',
      component: demo,
      meta: { title: ''}
    },
    {
      path: '/home/demo/demoDetail',
      name: 'demoDetail',
      component: demoDetail,
      meta: { title: '协作与竞赛'}
    },
    {
      path: '/home/demo/demoStep',
      name: 'demoStep',
      component: demoStep,
      meta: { title: '协作与竞赛'}
    },
    {
      path: '/home/demo/demoStep1',
      name: 'demoStep1',
      component: demoStep1,
      meta: { title: '协作与竞赛'}
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})
