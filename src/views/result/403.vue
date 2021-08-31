<template>
  <a-result status="403" title="403" sub-title="抱歉，你没有访问该页面的权限，请联系管理员">
    <template #extra>
       <router-link :to="{path:'/Login'}">
          <a-button>
            返回登录页
          </a-button>
        </router-link>
    </template>
  </a-result>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
