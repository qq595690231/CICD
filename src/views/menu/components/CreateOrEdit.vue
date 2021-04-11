<template>
  <div class="menu-create-or-edit">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ isEdit ? '编辑菜单' : '添加菜单' }}</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径">
          <el-input v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select v-model="form.parentId" placeholder="请选择上级菜单">
            <!-- 无上级菜单 -->
            <el-option
              label="无上级菜单"
              :value="-1"
            ></el-option>
            <!-- 选择一级菜单   拿到数据后渲染到选择框-->
            <el-option
              v-for="item in parentMenuList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="前端图标">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-radio-group v-model="form.shown">
            <!-- label 的数据会在选择后设置给 v-model 的 shown -->
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.orderNum" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="back">返回</el-button>
          <el-button @click="refresh">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getEditMenuInfo, createOrUpdateMenu } from '@/services/menu'
export default {
    name: 'CreateOrEdit',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        // 表单数据
        form: {
            parentId: -1,
            name: '',
            href: '',
            icon: '',
            orderNum: 5,
            description: '',
            shown: true
        },
        // 存储上级菜单数据
        parentMenuList: []
      }
    },
    created () {
        // 加载上级菜单
        this.loadMenuInfo()
    },
    // 先能获取到表单信息，再提交
    methods: {
      async onSubmit () {
        const { data } = await createOrUpdateMenu(this.form)
        if (data.code === '000000') {
        this.$message.success('提交成功')
        this.$router.push({
          name: 'menu'
        })
        }
      },
      back () {
        this.$router.push({
          name: 'menu'
        })
      },
      refresh () {
        // this.$refs.ruleForm.resetFields()
        this.form = {
            parentId: -1,
            name: '',
            href: '',
            icon: '',
            orderNum: 5,
            description: '',
            shown: true
        }
      },
      async loadMenuInfo () {
          const id = this.$route.params.id || -1
          //   请求上级菜单数据
          const { data } = await getEditMenuInfo(id)
          if (data.code === '000000') {
          this.parentMenuList = data.data.parentMenuList
          // console.log(data)// 检测是否成功拿到数据
          if (data.data.menuInfo) {
            this.form = data.data.menuInfo
          }
        }
      }
    }
}
</script>

<style lang="scss" scoped></style>
