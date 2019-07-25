<template>
  <!-- 区分那种卡 -->
  <div class="article" :class="cardType">
    <div class="cover">
      <img v-if="cover" :src="cover" alt="cover">
    </div>
    <div class="article-title">
      <h3 v-clampy="2">
        {{ card && (card.title || '') }}
      </h3>
    </div>
    <!-- 只有文章卡才会有内容 -->
    <p v-if="cardType === 'article-card'" v-clampy="3" class="content">
      {{ card && (card.title || '') }}
    </p>
    <div class="des">
      <span class="title">最新咨询</span>
      <span class="empty" />
      <!-- 文章卡阅读和投资 -->
      <template v-if="typeIndex === 0">
        <span class="data">
          {{ card && (card.read === 0 ? 0 : card.read) }}
          阅读</span>
        <span class="data">
          {{ card && (card.ups === 0 ? 0 : card.ups) }}
          投资</span>
      </template>
      <!-- 商品卡销量和金额 -->
      <template v-else>
        <span class="data">
          {{ card && (card.sale === 0 ? 0 : card.sale) }}
          销量</span>
        <span class="data money">
          {{ cardEosValue }}EOS/份</span>
      </template>
    </div>
    <div class="line" />
    <div class="info">
      <div class="author">
        <avatar class="avatar" :size="'30px'" :src="avatarImg" />
        <span class="username">
          {{ card && (card.nickname || card.author || '') }}
        </span>
      </div>
      <div class="date">
        1小时
      </div>
    </div>
  </div>
</template>

<script>

import avatar from '@/components/avatar/index.vue'
import { precision } from '@/utils/precisionConversion'

export default {
  name: 'ArticleCard',
  components: {
    avatar
  },
  props: {
    typeIndex: {
      type: Number,
      default: 0
    },
    cardType: {
      // 区分卡类型
      // 1. recommend-card 推荐
      // 2. article-card 文章
      // 3. commodity-card 商品
      type: String,
      required: true
    },
    card: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    cover() {
      console.log(this.card)
      if (!this.card) return ''
      return this.card.cover ? this.$backendAPI.getAvatarImage(this.card.cover) : ''
    },
    avatarImg() {
      if (!this.card) return ''
      return this.card.avatar ? this.$backendAPI.getAvatarImage(this.card.avatar) : ''
    },
    cardEosValue() {
      if (!this.card) return 0
      return precision(this.card.eosprice, 'eos')
    }
  }
}
</script>

<style lang="less" scoped>
.imgObjectFitCover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.line {
  height: 1px;
  background: #eee;
}
.empty {
  flex: 1;
}
.article {
  display: flex;
  flex-direction: column;
  background: #fff;
  box-sizing: border-box;
  border-radius: 10px;
  margin-top: 40px;
  overflow: hidden;
  transition: all 0.3s;
  &.recommend-card {
    max-width: 373px;
    flex: 0 0 373px;
    height: 394px;
    .article-title {
      height: 56px;
      margin: 20px;
      h3 {
        font-size: 20px;
        font-weight: 600;
        line-height: 28px;
      }
    }
  }
  &.article-card {
    margin-top: 40px;
    .article-title {
      margin: 47px 40px 0 40px;
      h3 {
        font-size: 24px;
        font-weight: 500;
        line-height: 33px;
      }
    }
  }
  &.commodity-card {
    margin-top: 40px;
    width: 270px;
    flex: 0 0 270px;
    // height: 284px;
    &:nth-child(3n-1) {
      margin-left: 40px;
      margin-right: 40px;
    }
    .article-title {
      height: 44px;
      margin: 12px 12px 0 12px;
      h3 {
        font-size: 16px;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
        line-height: 22px;
      }
    }
  }
  &:hover {
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.1);
  }
  &-title {
    h3 {
      font-size: 20px;
      font-weight: 600;
      color: rgba(0, 0, 0, 1);
      cursor: pointer;
      margin: 0;
      padding: 0;
    }
  }
}

// 卡片封面
.cover {
  width: 100%;
  cursor: pointer;
  overflow: hidden;
  img {
    .imgObjectFitCover();
    transition: all 0.3s;
  }
}
// 卡牌内容
.content {
  font-size: 20px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 28px;
  margin: 20px 40px;
  cursor: pointer;
}

.des {
  display: flex;
  .title {
    font-weight: 500;
    color: rgba(136, 108, 255, 1);
    cursor: pointer;
  }

  .data {
    font-weight: 400;
    color: rgba(178, 178, 178, 1);
    &.money {
      color: #f7b500;
    }
  }
}

.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .date {
    text-align: right;
    flex: 0 0 60px;
    font-weight: 400;
    color: #b2b2b2;
  }
}
.author {
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  .avatar {
    flex: 0 0 30px;
  }
  .username {
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
    margin-left: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
  }
}

// 区分style

// cover
.recommend-card .cover {
  height: 187px;
  img {
    &:hover {
      transform: scale(1.04);
    }
  }
}
.article-card .cover {
  height: 390px;
  img {
    &:hover {
      transform: scale(1.02);
    }
  }
}
.commodity-card .cover {
  height: 134px;
  img {
    &:hover {
      transform: scale(1.02);
    }
  }
}

// line
.recommend-card .line {
  margin: 0 20px;
}
.article-card .line {
  margin: 40px;
}
.commodity-card .line {
  margin: 12px;
}

// des
.recommend-card .des {
  margin: 0 20px 20px 20px;
  .title {
    font-size: 16px;
    line-height: 20px;
  }

  .data {
    font-size: 16px;
    line-height: 20px;
    &:nth-of-type(3) {
      margin-right: 20px;
    }
  }
}
.article-card .des {
  margin: 0 40px;
  .title {
    font-size: 20px;
    line-height: 28px;
  }
  .data {
    font-size: 20px;
    line-height: 28px;
    &:nth-of-type(3) {
      margin-right: 40px;
    }
  }
}
.commodity-card .des {
  margin: 12px 12px 0;
  .title {
    font-size: 14px;
    line-height: 17px;
  }
  .data {
    font-size: 14px;
    line-height: 17px;
    &:nth-of-type(3) {
      margin-right: 10px;
    }
  }
}

// info
.recommend-card .info {
  margin: 20px 20px 0 20px;
  .date {
    flex: 0 0 60px;
    font-size: 16px;
    line-height: 20px;
  }
}
.article-card .info {
  margin: 0 40px 40px 40px;
  .date {
    flex: 0 0 150px;
    font-size: 20px;
    line-height: 28px;
  }
}
.commodity-card .info {
  margin: 0 12px 12px 12px;
  .date {
    flex: 0 0 80px;
    font-size: 14px;
    line-height: 28px;
  }
}

// author
.recommend-card .author .username {
  font-size: 16px;
  line-height: 20px;
}
.article-card .author .username {
  font-size: 20px;
  line-height: 28px;
}
.commodity-card .author .username {
  font-size: 14px;
  line-height: 17px;
}
</style>