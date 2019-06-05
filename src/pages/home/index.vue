<template>
  <div class="mod-home">
    <el-form ref="form" :model="form" :inline="true" label-width="80px">
      <el-form-item label="姓名:">
        <el-input v-model="form.name"
                  focus-index="0"
                  v-focus="focusIndex === 0"></el-input>
      </el-form-item>
      <el-form-item label="性别:">
         <el-radio-group v-model="form.sex">
          <el-radio :label="1" v-focus="focusIndex === 1" focus-index="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="爱好:">
        <el-checkbox-group v-model="form.interest">
          <el-checkbox label="足球" v-focus="focusIndex === 2" focus-index="2"></el-checkbox>
          <el-checkbox label="篮球"></el-checkbox>
          <el-checkbox label="羽毛球"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="运动频率:">
        <el-select v-model="form.frequency" placeholder="请选择" v-focus="focusIndex === 3" focus-index="3">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="其他信息:">
        <el-button type="primary" v-focus="focusIndex === 4" focus-index="4">其他信息填写</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      focusIndex: 0, // 用来存放下一个应该聚焦的index值
      form: {
        name: '',
        sex: 1,
        interest: [],
        frequency: ''
      },
      options: [
        {
          label: '从来不',
          value: 0
        },
        {
          label: '一周一次',
          value: 1
        },
        {
          label: '一周二次',
          value: 2
        },
        {
          label: '一周三次',
          value: 3
        },
        {
          label: '一周四次',
          value: 4
        },
        {
          label: '一周五次',
          value: 5
        },
        {
          label: '一周六次',
          value: 6
        },
        {
          label: '每天',
          value: 7
        }
      ]
    }
  },
  created () {
    this.bindEvent(this)
  },
  methods: {
    nextFocus (index) {
      console.log(index, 'index')
      this.focusIndex = index + 1
    },
    bindEvent (_this) {
      document.onkeydown = function (e) {
        // var ev = e || window.event
        console.log(document.activeElement, 'element')
        _this.findCurrentFocusIndex(document.activeElement)
      }
    },
    // 找到对应的focus-index
    findCurrentFocusIndex (element) {
      let index = element.getAttribute('focus-index')
      if (!index) {
        element = element.parentNode
        this.findCurrentFocusIndex(element)
      } else {
        this.focusIndex = Number(index) + 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss'
</style>
