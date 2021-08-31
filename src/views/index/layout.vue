<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible style="background: #fff">
      <div class="logo" >{{name}}</div>
      <a-menu mode="inline" :default-selected-keys="[menus[0].name]">
        <template  v-for="(item) in menus">
        <template v-if="!item.hidden">
          <template v-if="item.children && item.children.length>0">
            <a-sub-menu :key="item.name">
              <span slot="title"><a-icon :type="item.meta.icon"/>{{ item.meta.title }}</span>
              <a-menu-item v-for="(sub) in item.children" :key="sub.name">
                <router-link :to="sub.path">
                  {{ sub.meta.title }}
                </router-link>
              </a-menu-item>
            </a-sub-menu>
          </template>
          <a-menu-item v-else :key="item.name">
            <router-link :to="item.path">
              <a-icon :type="item.meta.icon" />
              <span>{{ item.meta.title }}</span>
            </router-link>
          </a-menu-item>
        </template>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="headerlayout">
        <a-icon
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
         <a-button type="link" @click="handleLogout">退出登录</a-button>
      </a-layout-header>
        <a-layout-content class="layoutContent" >
          <router-view></router-view>
        </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import {pageRouter} from '@/router'
import { Modal } from 'ant-design-vue'
export default {
  data() {
    return {
      collapsed: false,// 折叠
      menus: [],// 菜单
      name:"admin"// 姓名
    };
  },
  created () {
    this.menus = pageRouter ? pageRouter : [];
  },
  methods: {
     // 退出登录  
    handleLogout () {
      Modal.confirm({
        title: '提示',
        content: '您确定要退出登录吗？',
        cancelText: '取消',
        okText: '确定',
        onOk: () => {
          window.localStorage.removeItem('token')
          this.$router.push("/Login")
        },
        onCancel () {}
      })
    },
  }
};
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
  min-height: 100vh;
  background: #fff
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(14, 154, 247, 0.2);
  margin: 16px;
  text-align: center;
  line-height: 32px;
}
.headerlayout{
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff !important; 
  padding: 0
}
.layoutContent{
  background: #fff;
  padding: 24px;
  margin: 24px 16px;
  border-radius: 4px;
  min-height: 80vh !important;
}
</style>
