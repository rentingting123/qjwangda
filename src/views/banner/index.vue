<template>
  <div>
    <div class="flexTit">
      <a-button size="small" type="primary" @click="addEditFun()">添加</a-button>
    </div>
   <a-table
    :columns="columns"
    :data-source="data"
    :pagination="pagination"
    row-key="id"
    size="middle"
    @change="handlePagination">
    <template slot="img" slot-scope="text">
      <img :src="text" alt="" class="bannerimg">
    </template>
    <template slot="operation">
      <a-space>
        <span class="icon-wrap">
          <a-icon type="form" @click="addEditFun(item)"/>
        </span>
        <span class="icon-wrap">
          <a-popconfirm
            title="确定要删除吗？"
            ok-text="确定"
            cancel-text="取消"
            @confirm="deletOrigan(item.departmentCode)"
          >
            <a-icon type="delete"/>
          </a-popconfirm>
        </span>
      </a-space>
    </template>  
  </a-table>
  <addEdit
			:visible='visible'
			@visibleCancel="visibleCancel"
			:details="details"/>
</div>
  
</template>

<script>
import moment from 'moment';
import addEdit from './addEdit'
// import { getUsersPage } from '@/api/user';
const data = [
  {
    aa:'http://manager.zyxfkj.cn/image/785?q=80_80_80',
    bb:"标题1",
    cc:"文件",
    dd:"2021-08-31",
    index:1
  },
  {
    aa:'http://manager.zyxfkj.cn/image/958',
    bb:"标题1",
    cc:"文件",
    dd:"2021-08-31",
    index:2
  },
   {
    aa:'http://manager.zyxfkj.cn/image/785',
    bb:"标题1",
    cc:"文件",
    dd:"2021-08-31",
    index:3
  }
];
const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    width:60,
    align: 'center',
  },
  {
    title: '图片',
    key: 'aa',
    dataIndex: 'aa',
    align: 'center',
    scopedSlots: { customRender: 'img'} 
  },
  {
    title: '创建时间',
    key: 'dd',
    dataIndex: 'dd',
    align: 'center'
  },
  { 
    title: '操作', 
    key: 'operation',
    scopedSlots: { customRender: 'operation'} 
  },
];
export default {
  name: 'UserManager',
  components: {
    addEdit
  },
  data(){
    return{
      data,
      columns,
      // data: [],
      loading: false,
      visible: false,
      details: {},//ID
      pagination: {
        current: 1,
        total: 0,
        pageSize: 10,
        size: 'small',
        showTotal: (total) => `共 ${total} 条`
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
    //添加修改
    addEditFun(item){
			this.details = item ? item : ''
			this.visible = true
    },
    dateFormat(timer){
      return moment(timer).format('YYYY/MM/DD hh:mm');
    },
    // 弹框回调
		visibleCancel(val){
			this.visible = false;
			if(val){
				this.getUsersPage()
			}
		},
  }
};
</script>

<style  scoped>
.flexTit{
  display: flex;
  justify-content: flex-end;
}
.bannerimg{
  height: 80px;
}
</style>