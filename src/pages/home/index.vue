<template>
  <div class="mod-home">
    <el-form ref="form" :model="form" :inline="true" label-width="80px">
      <el-form-item label="姓名:" class="focus-item-wrap" data-type="input">
        <el-input v-model="form.name"
                  class="focus-element"
                  :autofocus="firstFocus"></el-input>
      </el-form-item>
      <el-form-item label="性别:" class="focus-item-wrap" data-type="radio">
         <el-radio-group v-model="form.sex">
          <el-radio v-for="(item, key) in dict['sex']"
                    :key="key"
                    :label="item.value"
                    class="focus-element">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="爱好:" class="focus-item-wrap" data-type="checkbox">
        <el-checkbox-group v-model="form.interest">
          <el-checkbox v-for="(item, key) in dict['interest']"
                       :key="key"
                       :label="item.value"
                       class="focus-element">{{ item.label }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="运动频率:" class="focus-item-wrap" data-type="select">
        <el-select ref="selectEle" id="selectEle" v-model="form.frequency" placeholder="请选择" class="focus-element">
          <el-option v-for="item in dict['frequency']"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="其他信息:" class="focus-item-wrap" data-type="button">
        <el-button :autofocus="buttonFocus"
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
  created () {
    this.bindEvent(this)
  },
  methods: {
    // 找到当前的元素使其失焦，找到下一个聚焦元素
    nextFocus (target, isCheckbox) {
      // 如果是复选框，则找到是否是最后一个
      let isLast, _current
      if (isCheckbox) {
        _current = this.findCurrent(target, 'focus-element')
        let children = _current.parentNode.children
        isLast = [].indexOf.call(children, _current) === children.length - 1
      }
      let current = (isCheckbox && !isLast) ? _current : this.findCurrent(target, 'focus-item-wrap') // 找到当前表单类型
      let next = current ? current.nextElementSibling : null
      let nextFocus = next ? this.findNextFocus(next) : null // 找到下一表单类型中的聚焦元素

      if (isCheckbox) {
        this.confirmCurrent(target)
        isLast && this.confirmFocus(target, nextFocus)
      } else {
        this.confirmFocus(target, nextFocus)
      }
    },
    // 当前失焦，聚焦到下一个
    confirmFocus (target, nextFocus) {
      if (target.getAttribute('id') === 'selectEle') {
        this.$refs.selectEle.blur()
      } else {
        target.blur()
      }
      if (nextFocus && nextFocus.className.includes('el-select')) {
        this.$refs.selectEle.focus()
      } else {
        nextFocus && nextFocus.focus()
      }
    },
    // 递归查找当前表单类型
    findCurrent (current, type) {
      if (current && current.className && current.className.includes(`${type}`)) {
        return current
      }
      current = current ? current.parentNode : null
      return current ? this.findCurrent(current, type) : current
    },
    // 递归找到下一表单类型中的聚焦元素
    findNextFocus (next) {
      if (next && next.className && next.className.includes('focus-element')) {
        return next
      }

      let child = null
      let findChildren = (children) => {
        if (children && children.length > 0) {
          for (let i = 0; i < children.length; i++) {
            let current = children[i]
            if (current.className.includes('focus-element')) {
              child = current
              break
            }
            findChildren(current.children)
          }
        }
        return child
      }
      next = next ? findChildren(next.children) : null
      return next ? this.findNextFocus(next) : next
    },
    // 找到前一个或者后一个兄弟聚焦元素
    findSiblingFocus (current, isLeft) {
      let nextSibling = isLeft ? current.previousElementSibling : current.nextElementSibling
      if (nextSibling && nextSibling.className && nextSibling.className.includes('focus-element')) {
        return nextSibling
      }
      nextSibling = nextSibling ? (isLeft ? nextSibling.previousElementSibling : nextSibling.nextElementSibling) : null
      return nextSibling ? this.findSiblingFocus(nextSibling, isLeft) : nextSibling
    },
    // 水平方向移动
    moveHorizontal (target, direct) {
      let isLeft = direct === -1 // 向左
      let current = this.findCurrent(target, 'focus-element') // 找到当前表单类型
      console.log(current, 'current')
      let nextFocus = this.findSiblingFocus(current, isLeft) // 找到下一表单类型中的聚焦元素
      console.log(nextFocus, 'nextFocus')
      nextFocus && nextFocus.focus()
    },
    // 垂直方向移动
    moveVertical (target, direct) {
      let isDown = direct === -1 // 向下
      console.log(isDown, 'isDown')
    },
    // 确认当前聚焦的表单的值
    confirmCurrent (target) {
      console.log(target.value, 'target value')
      this.form.interest.push(Number(target.value))
    },
    // 绑定键盘事件
    bindEvent (_this) {
      document.onkeydown = function (e) {
        let ev = e || window.event
        let keyCode = ev.keyCode
        let target = ev.target
        console.log(target, 'target')
        let isCheckbox = target.className.includes('el-checkbox__original')
        switch (keyCode) {
          case 13: // enter回车
            // _this.confirmCurrent() // 确认当前聚焦的值
            _this.nextFocus(target, isCheckbox) // 聚焦下一个
            break
          case 38: // PgUp向上
            _this.moveVertical(target, 1) // 垂直方向移动
            break
          case 40: // PgDn向下
            _this.moveVertical(target, -1) // 垂直方向移动
            break
          case 37: // Home向左
            _this.moveHorizontal(target, -1) // 水平方向移动
            break
          case 39: // End向右
            _this.moveHorizontal(target, 1) // 水平方向移动
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
