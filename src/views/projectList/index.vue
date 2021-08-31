<template>
  <a-table :columns="columns" :data-source="data" class="components-table-demo-nested">
    <template slot="operation">
      <a-button type="link" size="small">查看</a-button>
      <a-button type="link" size="small">编辑</a-button>
      <a-button type="link" size="small">删除</a-button>
    </template>
    <a-table
      slot="expandedRowRender"
      :columns="innerColumns"
      :data-source="innerData"
      :pagination="false"
    >
      <span slot="status" > <a-badge status="success" />Finished </span>
      <template slot="operation">
        <a-button type="link" size="small">查看</a-button>
        <a-button type="link" size="small">编辑</a-button>
        <a-button type="link" size="small">删除</a-button>
      </template>
    </a-table>
  </a-table>
</template>
<script>
const columns = [
  { title: '项目图片', dataIndex: 'name', key: 'name' },
  { title: '项目名称', dataIndex: 'platform', key: 'platform' },
  { title: '项目进程', dataIndex: 'version', key: 'version' },
  { title: '责任处室', dataIndex: 'upgradeNum', key: 'upgradeNum' },
  { title: '发起人', dataIndex: 'creator', key: 'creator' },
  { title: '分管领导', dataIndex: 'creator', key: 'creator' },
  { title: '日期', dataIndex: 'createdAt', key: 'createdAt' },
  { title: '项目状态', dataIndex: 'creator', key: 'creator' },
  { title: '操作', key: 'operation', scopedSlots: { customRender: 'operation' } },
];

const data = [];
for (let i = 0; i < 3; ++i) {
  data.push({
    key: i,
    name: 'Screem',
    platform: 'iOS',
    version: '10.3.4.5654',
    upgradeNum: 500,
    creator: 'Jack',
    createdAt: '2014-12-24 23:12:00',
  });
}

const innerColumns = [
  { title: 'Date', dataIndex: 'date', key: 'date' },
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Status', key: 'state', scopedSlots: { customRender: 'status' } },
  { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
  {
    title: 'Action',
    dataIndex: 'operation',
    key: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];

const innerData = [];
for (let i = 0; i < 3; ++i) {
  innerData.push({
    key: i,
    date: '2014-12-24 23:12:00',
    name: 'This is production name',
    upgradeNum: 'Upgraded: 56',
  });
}

export default {
  data() {
    return {
      data,
      columns,
      innerColumns,
      innerData,
    };
  },
};
</script>
