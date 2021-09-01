<template>
  <div>
    <div :style="{ marginBottom: '16px' }">
      <a-button @click="add" size="small">
        添加项目分类
      </a-button>
    </div>
    <a-tabs v-model="activeKey" hide-add type="editable-card" @edit="onEdit">
      <a-tab-pane v-for="pane in panes" :key="pane.key" :tab="pane.title" :closable="pane.closable">
        <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-model-item label="项目属性">
            <div>
              <a-tag
                v-for="(item , index) in shuxList"
                v-model="form.resource1"
                :key="index"
                closable
                @close="() => handleClose(item, 1)">
                {{ item }}
              </a-tag>
              <a-input
                v-if="inputVisible1"
                ref="input"
                type="text"
                size="small"
                placeholder="请输入项目属性"
                :style="{ width: '150px' }"
                :value="inputValue1"
                @blur="handleInputConfirm(1)"
                @keyup.enter="handleInputConfirm(1)"
              />
              <a-tag v-else style="background: #fff; borderStyle: dashed;" @click="showInput(1)">
                <a-icon type="plus" /> 添加
              </a-tag>
            </div>
          </a-form-model-item>
          <a-form-model-item label="项目状态">
            <a-radio-group v-model="form.resource">
              <a-radio  v-for="(item , index) in zhuangtList" :key="index" :value="index">
                {{item}}
              </a-radio>
            </a-radio-group>
            <a-input-search
              style="width:200px"
              placeholder="请输入项目状态"
              enter-button="添加"
              size="small"
              @search="onSearch"
            />
          </a-form-model-item>
           <a-form-model-item label="项目类别">
            <a-radio-group v-model="form.resource">
             <a-radio  v-for="(item , index) in leibList" :key="index" :value="index">
                {{item}}
              </a-radio>
            </a-radio-group>
            <a-input-search
              style="width:200px"
              placeholder="请输入项目类别"
              enter-button="添加"
              size="small"
              @search="onSearch"
            />
          </a-form-model-item>
           <a-form-model-item label="项目进程">
            <a-radio-group v-model="form.resource">
              <a-radio  v-for="(item , index) in jinchengList" :key="index" :value="index">
                {{item}}
              </a-radio>
            </a-radio-group>
            <a-input-search
              style="width:200px"
              placeholder="请输入项目进程"
              enter-button="添加"
              size="small"
              @search="onSearch"
            />
          </a-form-model-item>
          
        </a-form-model>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
export default {
  data() {
    const panes = [
      { title: '招商引资项目', key: '1' },
      { title: '基础设施项目', key: '2' },
    ];
    return {
      activeKey: panes[0].key,
      panes,
      newTabIndex: 0,
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
      shuxList:['用地项目','非项目用地'],//项目属性
      zhuangtList:['在谈','签约','在谈','签约','签约'],//项目状态
      jinchengList:['项目筹备','项目签约','进场装修','设备安装','竣工投产'],//项目状态
      leibList:['新兴产业项目','制造产业项目','制造产业项目','制造产业项目','制造产业项目'],//项目状态
      form: {
        resource1: 1,
        resource2: 1,
        resource3: 1,
        resource4: 1,
      },
      inputVisible1: false,// 项目属性
      inputValue1: '',
      inputVisible2: false,// 项目状态
      inputValue2: '',
      inputVisible3: false,// 项目进程
      inputValue3: '',
      inputVisible4: false,// 项目类别
      inputValue4: '',
    };
  },
  methods: {
    callback(key) {
      console.log(key);
    },
    onEdit(targetKey, action) {
      this[action](targetKey);
    },
    add() {
      const panes = this.panes;
      const activeKey = `${this.newTabIndex++}`;
      panes.push({
        title: `招商引资项目 ${activeKey}`,
        content: `Content of new Tab ${activeKey}`,
        key: activeKey,
      });
      this.panes = panes;
      this.activeKey = activeKey;
    },
    remove(targetKey) {
      let activeKey = this.activeKey;
      let lastIndex;
      this.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1;
        }
      });
      const panes = this.panes.filter(pane => pane.key !== targetKey);
      if (panes.length && activeKey === targetKey) {
        if (lastIndex >= 0) {
          activeKey = panes[lastIndex].key;
        } else {
          activeKey = panes[0].key;
        }
      }
      this.panes = panes;
      this.activeKey = activeKey;
    },
    onSearch(value) {
      console.log(value);
    },
     handleClose(removedTag,type) {
      // const tags = this.tags.filter(tag => tag !== removedTag);
      if(type == 1) {
        this.shuxList.splice();
      }
    },

    showInput() {
      this.inputVisible1 = true;
      this.$nextTick(function() {
        this.$refs.input.focus();
      });
    },

    // handleInputChange(e) {
    //   this.inputValue = e.target.value;
    // },

    handleInputConfirm() {
      const inputValue = this.inputValue;
      let tags = this.tags;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      console.log(tags);
      Object.assign(this, {
        tags,
        inputVisible1: false,
        inputValue: '',
      });
    },
  },
};
</script>
