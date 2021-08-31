<template>
		<a-modal
			:visible="visible"
			:title="Title"
			:confirm-loading="loading"
      @ok="handleOk"
      @cancel="handleCancel"
			>
		<a-form-model
			ref="ruleForm"
			:model="form"
			:rules="rules"
			layout="horizontal"
			:label-col=" { span: 6 }"
			:wrapper-col=" { span: 14 }">
			<a-form-model-item label="项目归类" prop="policyIcon">
				<a-input v-model="form.policyIcon" placeholder="请输入项目归类" allowClear />
			</a-form-model-item>
		</a-form-model>
	</a-modal>
</template>
<script>
// import { departmentSave } from "@/api/Interface/operate" //接口

export default {
  data() {
    return {
			Title:'添加',
			loading: false,
			form:{},
			rules: {
        policyIcon: [{ required: true, message: '请输入责任处室', trigger: 'blur' }],
        policyTitle: [{ required: true, message: '请输入标题', trigger: 'blur' }],
      },
    };
  },
	props:['visible','details'],
	watch: {
		details(val){
			if(val){
				this.form = ''
				this.Title = '添加'
			}else{
				this.Title = '修改',
				this.form = val
			}
		}
	},
	mounted(){
	},
  methods: {
		//提交 添加 修改
    handleOk() {
			this.$refs.ruleForm.validate(valid => {
        if (valid) {
					let obj = {
						companyId:this.details.companyId,
						departmentManagers: this.form.departmentManagers, //部门标题
						departmentName: this.form.departmentName, //图标
						parentsId: this.details.type === 1? this.details.departmentCode :this.details.parentsId, //上级部门ID
						departmentCode: this.details.type === 1? '' : this.details.departmentCode, //部门ID 有代表修改
					};
					this.loading = true;
					console.log(obj);
					// departmentSave(obj).then(res=>{
					// 	if(res.data.code === 200 ){
					// 		this.$message.success('操作成功');
					// 		this.$emit('visibleCancel',true);
					// 	}else{
					// 		this.$message.error(res.data.message);
					// 	}
					// 	this.loading = false;
					// })
				} else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleCancel() {
      this.$emit('visibleCancel');
		},
  },
};
</script>
