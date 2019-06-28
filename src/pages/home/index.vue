<template>
  <div class="mod-home">
    <el-form ref="form" :model="form" :inline="true" label-width="80px">
      <el-form-item label="姓名:">
        <el-input v-model="form.name"
                  focus-index="0"
                  class="focus-element"
                  :autofocus="firstFocus"
                  v-focus="focusIndex === 0"></el-input>
      </el-form-item>
      <el-form-item label="性别:">
         <el-radio-group v-model="form.sex">
          <el-radio v-for="(item, key) in dict['sex']"
                    :key="key"
                    :label="item.value"
                    v-focus="key === 0 && focusIndex === 1"
                    focus-index="1"
                    selected-prop="sex"
                    class="focus-element">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="爱好:">
        <el-checkbox-group v-model="form.interest">
          <el-checkbox v-for="(item, key) in dict['interest']"
                       :key="key"
                       :label="item.value"
                       v-focus="focusIndex === 2"
                       focus-index="2"
                       class="focus-element">{{ item.label }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="运动频率:">
        <el-select ref="selectEle" v-model="form.frequency" placeholder="请选择" focus-index="3" class="focus-element">
          <el-option v-for="item in dict['frequency']"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="其他信息:">
        <el-button :autofocus="buttonFocus"
                   focus-index="4"
                   class="focus-element"
                   :class="{ 'focusing' : buttonFocus }">其他信息填写</el-button>
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
      // 字典数据
      dict: {
        // 性别
        sex: [
          {
            label: '男',
            value: 1
          },
          {
            label: '女',
            value: 2
          }
        ],
        // 爱好
        interest: [
          {
            label: '足球',
            value: 1
          },
          {
            label: '篮球',
            value: 2
          },
          {
            label: '羽毛球',
            value: 3
          }
        ],
        // 运动频率
        frequency: [
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
      },
      firstFocus: true, // 第一个聚焦
      buttonFocus: false, // 提交按钮聚焦
      typeDict: ['input', 'raido', 'checkbox', 'select', 'button'] // 表单组件类型
    }
  },
  watch: {
    'focusIndex' (val) {
      switch (val) {
        case 3:
          this.$refs.selectEle.focus()
          break
        case 4:
          this.buttonFocus = true
          this.$refs.selectEle.blur()
          break
        default:
          break
      }
    }
  },
  created () {
    this.bindEvent(this)
  },
  methods: {
    // 聚焦到下一个
    nextFocus () {
      this.focusIndex++
    },
    // 水平方向移动
    moveHorizontal (e, direct) {
      console.log(e, 'event')
      let target = e.target
      let isLeft = direct === -1 // 向左
      let next = isLeft ? target.previousSibling : target.nextSibling
      console.log(next, 'next')
      switch (this.typeDict[this.focusIndex]) {
        case 'radio':
          next.focus()
          break
        case 'checkbox':
          break
        case 'select':
          break
        case 'button':
          break
        default:
          break
      }
    },
    // 垂直方向移动
    moveVertical () {

    },
    // 确认当前聚焦的表单的值
    confirmCurrent () {

    },
    // 绑定键盘事件
    bindEvent (_this) {
      document.onkeydown = function (e) {
        let ev = e || window.event
        let keyCode = ev.keyCode
        console.log(document.activeElement, 'element')
        // console.log(keyCode, 'keyCode')
        // _this.findCurrentFocusIndex(document.activeElement, keyCode)
        switch (keyCode) {
          case 13: // enter回车
            // isDoc && this.submit()
            _this.confirmCurrent() // 确认当前聚焦的值
            _this.nextFocus() // 聚焦下一个
            break
          case 38: // PgUp向上
            _this.moveVertical() // 垂直方向移动
            break
          case 40: // PgDn向下
            _this.moveVertical() // 垂直方向移动
            break
          case 37: // Home向左
            _this.moveHorizontal() // 水平方向移动
            break
          case 39: // End向右
            _this.moveHorizontal(ev) // 水平方向移动
            break
          default:
            break
        }
      }
    },
    // 找到对应的focus-index
    findCurrentFocusIndex (element, keyCode) {
      let isDoc = element === document
      let index = !isDoc ? element.getAttribute('focus-index') : -1
      // let first = document.querySelectorAll('.el-input__inner')[0]
      if (index === null) {
        element = element.parentNode
        this.findCurrentFocusIndex(element, keyCode)
      } else {
        // isDoc && first.focus() // 当前是document则返回第一个
        switch (keyCode) {
          case 13: // enter回车
            isDoc && this.submit()
            this.confirmCurrent() // 确认当前聚焦的值
            this.nextFocus(index) // 聚焦下一个
            break
          case 38: // PgUp向上
            this.moveVertical() // 垂直方向移动
            break
          case 40: // PgDn向下
            this.moveVertical() // 垂直方向移动
            break
          case 37: // Home向左
            this.moveHorizontal(element, index) // 水平方向移动
            break
          case 39: // End向右
            this.moveHorizontal(element, index) // 水平方向移动
            break
          default:
            break
        }
      }
    },
    // 提交事件
    submit () {
      this.$message({
        type: 'info',
        message: '提交成功'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss'
</style>
<style lang="scss">
.el-button{
  &.focusing{
    // box-shadow: 0 0 2px 0 #409EFF;
    color: #409EFF;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
}
</style>
