
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.accountname"
        :placeholder="$t('player.accountname')"
        style="width: 200px"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        {{ $t('player.btnFilter') }}
      </el-button>

      <!-- 新增按钮 -->
      <el-button
        type="success"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        {{ $t('player.btnCreate') }}
      </el-button>
    </div>
    <el-table
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        header-align="center"
        align="center"
        label="ID"
      >
        <template v-slot="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="登陆账户"
      >
        <template v-slot="{row}">
          <span>{{ row.accountname }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Pagination from '@/components/Pagination/index.vue'
import { getPlayers } from '@/api/players'
import { Player } from '@/api/types'

// todo 导入分页
@Component({
  name: 'PlayerList',
  components: {
    Pagination
  }
})
export default class extends Vue {
  //* 玩家数据
  private list: Player[] = []
  //* 加载状态
  private listLoading = true
  //* 条数
  private total = 0;
  //* 查询页码
  private listQuery = {
    page: 1,
    limit: 10
  };

  created() {
    this.getList()
  }

  // todo新增玩家
  handleCreate() {
    this.$router.push('/players/create')
  }

  // todo 过滤
  handleFilter() {
    // todo 重置页码
    this.listQuery.page = 1
    this.getList()
  }

  private async getList() {
    this.listLoading = true

    // todo 传入参数
    const { data }: any = await getPlayers(this.listQuery)

    this.list = data.players
    this.total = data.total
    this.listLoading = false
  }
}
</script>
