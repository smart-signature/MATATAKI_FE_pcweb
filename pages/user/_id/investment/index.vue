<template>
  <userLayout>
    <template slot="main">
      <user-nav nav-list-url="user" />
      <!-- todo 目前得不到页数, 页面太后没数据会一直loading  -->
      <el-row v-loading="loading" class="card-container">
        <no-content-prompt :list="articleCardData.articles">
          <el-col
            v-for="(item, index) in articleCardData.articles"
            :key="index"
            :span="8"
          >
            <n-link
              target="_blank"
              :to="{
                name: 'p-id',
                params: { id: item.id }
              }"
            >
              <article-card-mini :card="item" class="card-container-block" />
            </n-link>
          </el-col>
        </no-content-prompt>
      </el-row>

      <user-pagination
        v-show="!loading"
        :current-page="currentPage"
        :params="articleCardData.params"
        :api-url="articleCardData.apiUrl"
        :total="total"
        :page-size="9"
        class="pagination"
        @paginationData="paginationData"
        @togglePage="togglePage"
      />
    </template>
    <template slot="info">
      <userInfo />
    </template>
  </userLayout>
</template>

<script>
import userLayout from '@/components/user/user_layout.vue'
import userInfo from '@/components/user/user_info.vue'
import userNav from '@/components/user/user_nav.vue'
import userPagination from '@/components/user/user_pagination.vue'
import articleCardMini from '@/components/artifcle_card_mini/index.vue'
export default {
  components: {
    userLayout,
    userInfo,
    userNav,
    userPagination,
    articleCardMini
  },
  data() {
    return {
      articleCardData: {
        params: {
          user: this.$route.params.id,
          pagesize: 9
        },
        apiUrl: 'userArticlesSupportedList',
        articles: []
      },
      currentPage: Number(this.$route.query.page) || 1,
      loading: false, // 加载数据
      total: 0
    }
  },
  computed: {

  },
  methods: {
    paginationData(res) {
      this.articleCardData.articles = res.data.list
      this.total = res.data.count || 0
      this.loading = false
    },
    togglePage(i) {
      this.loading = true
      this.articleCardData.articles = []
      this.currentPage = i
      this.$router.push({
        query: {
          page: i
        }
      })
    }
  }
}
</script>

<style lang="less" scoped src="../../index.less">
</style>
