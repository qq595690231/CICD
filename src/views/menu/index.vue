<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button
        @click="$router.push({ name: 'menu-create'})"
        >添加菜单</el-button>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          type='index'
          label="编号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="菜单名称">
        </el-table-column>
        <el-table-column
          prop="level"
          label="菜单级数">
        </el-table-column>
        <el-table-column
          prop="icon"
          label="前端图标">
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="排序">
        </el-table-column>
        <el-table-column
          label="操作"
          width="180px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getAllMenus, deleteMenu } from '@/services/menu'
export default {
    name: 'MenuIndex',
    data () {
      return {
          tableData: []
      }
    },
    created () {
      this.loadAllMenus()
    },
    methods: {
      async loadAllMenus () {
        const { data } = await getAllMenus()
        // console.log(data)
        if (data.code === '000000') {
          this.tableData = data.data
        }
      },
      handleEdit (rowData) {
        // console.log(rowData.id)
        this.$router.push({
          name: 'menu-edit',
          params: {
            id: rowData.id
          }
        })
      },
      handleDelete (rowData) {
        // console.log(rowData)
        this.$confirm('确定删除吗？', '提示')
        .then(async () => {
          const { data } = await deleteMenu(rowData.id)
          // console.log(data)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            this.loadAllMenus()
          }
        })
        .catch(() => {
          this.$message.info('已取消')
        })
      }
    }
}
</script>

<style lang="scss" scoped></style>
