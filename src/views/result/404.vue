<template>
  <a-result status="404" title="404" sub-title="抱歉，未找到此页面。">
    <template #extra>
      <router-link :to="{path:'/home'}">
        <a-button>
          返回首页
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
