import Vue from 'vue'
import VueRouter from 'vue-router'
// import { message } from 'ant-design-vue'
// 页面布局
import indexLayout from '@/views/index/layout.vue'

// 项目列表
import projectList from '@/views/projectList' 
// 项目分类
import projectSort from '@/views/projectSort' 
// 项目标签
import projectLabel from '@/views/projectLabel' 
//  政策服务
import policy from '@/views/policy' 
// 人员管理
import personnel from '@/views/personnel' 
// 责任处室
import department from '@/views/department' 
// 展示图
import banner from '@/views/banner' 


//登录
import login from '@/views/login'


// 结果页
import result403 from '@/views/result/403' //403
import result404 from '@/views/result/404' //404
 


Vue.use(VueRouter)

export const pageRouter = [
  {
    path: '/projectList',
    name: 'projectList',
    component: projectList,
    meta: {
      title: '项目列表',
      icon: "unordered-list" 
    },
  },
  // 项目分类
  {
    path: '/projectSort',
    name: 'projectSort',
    component: projectSort,
    meta: {
      title:'项目分类',
      icon: "appstore"
    }
  },
  // 项目标签
  {
    path: '/projectLabel',
    name: 'projectLabel',
    component: projectLabel,
    meta: {
      title: '项目标签',
      icon: "tag"
    },
  },
  
  {
    path: '/policy',
    name: 'policy',
    component: policy,
    meta: {
      title: '政策服务',
      icon: "audit"
    },
  },
  {
    path: '/personnel',
    name: 'personnel',
    component: personnel,
    meta: {
      title: '人员管理',
      icon: "user"
    },
  },
  {
    path: '/department',
    name: 'department',
    component: department,
    meta: {
      title: '责任处室',
      icon: "bell"
    },
  },  
  {
    path: ' banner',
    name: 'banner',
    component:  banner,
    meta: {
      title: '展示图',
      icon: "file-image"
    },
  },
];


const routes = [
  {
    path: '/',
    name: 'index',
    component: indexLayout,
    redirect: '/projectList',
    children: [ 
      ...pageRouter,
     ]
  },
  {
    path: '/login',
    name: '登录',
    component: login,
  },
  {
    path: '/403',
    name: '403',
    component: result403,
  },
  {
    path: '*',
    hidden: true,
    component: result404,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// router.beforeEach((to, from, next) => {
//   //对于登录页面不拦截
//   if (to.path === '/login') {
//     next();
//   } else {
//     let token = localStorage.getItem('token');
//     //用户访问登录后页面时 必须校验token是否存在，不存在去登陆页
//     if (token === null || token === '') {
//       next('/login');
//       message.destroy();
//       // message.error({
//       //     content: '未登录或登录失效',
//       // });
//     } else {
//       next();
//     }
//   }
// })
export default router
