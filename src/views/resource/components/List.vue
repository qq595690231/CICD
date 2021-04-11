<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 使用 Form 组件：行内表单 -->
        <el-form
          :inline="true"
          :model="form"
          class="demo-form-inline">
          <el-form-item label="审批人">
            <el-input
              v-model="formInline.user"
              placeholder="审批人"
            ></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select
              v-model="formInline.region"
              placeholder="活动区域"
            >
              <!-- 请求接口进行下拉菜单项设置 -->
              <el-option
                v-for="item in resourceCategories"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              @click="onReset"
            >重置
            </el-button>
            <el-button
              type="primary"
              :disabled="isLoading"
              @click="onSubmit"
            >查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 使用 Table 组件 -->
      <el-table
        :data="resources"
        style="width: 100%"
        v-loading="isLoading"
      >
        <el-table-column
          type="index"
          label="编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源名称">
        </el-table-column>
        <el-table-column
          prop="url"
          label="资源路径">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
        </el-table-column>
        <!-- 设置过滤器需要使用作用域插槽获取数据 -->
        <el-table-column
          label="添加时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createdTime | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              @click="handleDelete(scope.row)"
              type="danger"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件结构 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.current"
        :page-sizes="[10, 15, 20]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        :disabled="isLoading"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getResourcePages } from '@/services/resource'
export default {
    name: 'ResourceList',
    data () {
        return {
            formInline: {},
            resources: []
        }
    },
    create () {
        this.loadResources()
    },
    methods: {
        async loadResources () {
            const { data } = await getResourcePages({})
            console.log(data)
        }
    }
}
</script>

<style>

</style>
