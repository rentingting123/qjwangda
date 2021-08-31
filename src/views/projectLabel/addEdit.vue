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
			v-bind="formItemLayoutWithOutLabel">
			<a-form-model-item label="项目类型" prop="policyIcon">
				<a-input v-model="form.policyIcon" placeholder="请输入项目类型" allowClear  style="width: 60%; margin-right: 8px"/>
			</a-form-model-item>
			<a-form-model-item
				v-for="(domain, index) in dynamicValidateForm.domains"
				:key="domain.key"
				v-bind="index === 0 ? formItemLayout : {}"
				:label="index === 0 ? '项目进程' : ''"
				:prop="'domains.' + index + '.value'"
				:rules="{
					required: true,
					message: '请输入项目进程',
					trigger: 'blur',
				}"
			>
      <a-input
        v-model="domain.value"
        placeholder="请输入项目进程"
        style="width: 60%; margin-right: 8px"
      />
      <a-icon
        v-if="dynamicValidateForm.domains.length > 1"
        class="dynamic-delete-button"
        type="minus-circle-o"
        :disabled="dynamicValidateForm.domains.length === 1"
        @click="removeDomain(domain)"
      />
    </a-form-model-item>
    <a-form-model-item v-bind="formItemLayoutWithOutLabel">
      <a-button type="dashed" style="width: 60%" @click="addDomain">
        <a-icon type="plus" /> 添加进程
      </a-button>
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
			dynamicValidateForm: {
        domains: [],
      },
			formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          // xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
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
		submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      let index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now(),
      });
    },
  },
};
</script>
