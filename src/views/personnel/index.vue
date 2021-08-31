<template>
  <Table
    class="table"
    style="margin-top:10px;"
    :columns="columns"
    :data-source="data"
    :pagination="pagination"
    row-key="id"
    size="middle"
    @change="handlePagination">
    <template #departmentList="{record}">
      {{ departFormat(record.departmentList) }}
    </template>
    <template #gmtCreate="{record}">
      {{ dateFormat(record.gmtCreate) }}
    </template>
  </Table>
</template>

<script>
import moment from 'moment';
import { Table} from 'ant-design-vue';

// import { getUsersPage } from '@/api/user';

const columns = [
  {
    title: '用户名',
    key: 'userName',
    dataIndex: 'userName',
    align: 'center'
  },
  {
    title: '手机号',
    key: 'telephone',
    dataIndex: 'telephone',
    align: 'center'
  },
  {
    title: '所属部门',
    key: 'departmentList',
    dataIndex: 'departmentList',
    slots: { customRender: 'departmentList'},
    align: 'center'
  },
  {
    title: '创建时间',
    key: 'gmtCreate',
    dataIndex: 'gmtCreate',
    slots: { customRender: 'gmtCreate'},
    align: 'center'
  }
];
export default {
  name: 'UserManager',
  components: {
    Table
  },
  data(){
    return{
      columns,
      data: [],
      loading: false,
      pagination: {
        current: 1,
        total: 0,
        pageSize: 10,
        size: 'small',
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`
      }
    };
  },
  created(){
    // this.getUsersPage();
  },
  methods: {
    handlePagination(pagination){
      this.getUsersPage(pagination.current);
    },
    // async getUsersPage(index,size){
      // this.loading = true;
      // index = index || this.pagination.current;
      // size = size || this.pagination.pageSize;
      // const {data} = await getUsersPage(index,size);
      // this.loading = false;
      // if(data.success){
      //   const { current,size,total,records} = data.data;
      //   this.data = records;
      //   this.pagination = {
      //     ...this.pagination,
      //     current,
      //     total,
      //     pageSize: size
      //   };
      // }
    // },
    dateFormat(timer){
      return moment(timer).format('YYYY/MM/DD hh:mm');
    },
    departFormat(departmentList){
      return departmentList.join(', ');
    }
  }
};
</script>

<style  scoped>
</style>