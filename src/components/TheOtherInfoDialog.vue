<template>
  <div class="other-info-dialog">
    <el-dialog title="其他信息填写" :visible="visible" width="60%" @close="handleClose">
      <div>
        <ul class="list-wrap" ref="listWrap">
          <li v-for="item in list" :key="item.id" class="list-item" :class="{ 'active' : focusId === item.id }">
            {{ item.name }}
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary"
                  :autofocus="buttonFocus"
                  :class="{ 'confirm-focusing': buttonFocus }"
                  @click="handleConfirm" >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TheOtherInfoDialog',
  data () {
    return {
      focusId: 1, // 当前聚焦项的id
      buttonFocus: false, // 确认按钮是否聚焦
      list: [
        {
          id: 1,
          name: '这是选项 aaa'
        },
        {
          id: 2,
          name: '这是选项 bbb'
        },
        {
          id: 3,
          name: '这是选项 ccc'
        },
        {
          id: 4,
          name: '这是选项 ddd'
        }
      ]
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible (val) {
      val && this.bindEvent(this)
    }
  },
  methods: {
    // 关闭弹框
    handleClose () {
      this.$emit('closeDialog')
    },
    // 确认信息
    handleConfirm () {
      this.$message({
        type: 'success',
        message: '保存成功'
      })
      this.handleClose()
    },
    // 绑定键盘事件
    bindEvent (_this) {
      document.onkeydown = function (e) {
        let ev = e || window.event
        let keyCode = ev.keyCode
        switch (keyCode) {
          case 13: // enter回车
            if (!_this.buttonFocus) {
              _this.buttonFocus = true
            } else {
              _this.handleConfirm()
            }
            break
          case 38: // PgUp向上
            _this.focusId-- // 垂直方向移动
            _this.focusId === 0 && (_this.focusId = _this.list[_this.list.length - 1].id)
            break
          case 40: // PgDn向下
            _this.focusId++ // 垂直方向移动
            _this.focusId === _this.list[_this.list.length - 1].id + 1 && (_this.focusId = 1)
            break
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.other-info-dialog{
  .list-wrap{
    margin: 0;
    padding: 0;
    .list-item{
      list-style: none;
      padding: 10px;
      &.active{
        background: #ddd;
        color: #3293ff;
      }
    }
  }
  .confirm-focusing{
    border: 1px solid #93ed2b;
  }
}
</style>
