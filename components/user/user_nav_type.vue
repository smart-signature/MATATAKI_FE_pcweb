<template>
  <!-- 币种 -->
  <nav class="nav">
    <a
      v-for="(item, index) in typeIcon"
      :key="index"
      href="javascript:;"
      :class="[$route.name === item.url && 'active', item.url === '' && 'disabled']"
      @click="toggleNav(item.url)"
    >
      <img
        :src="item.icon"
        alt="icon"
      >
      <span>{{ item.title }}</span></a>
  </nav>
</template>

<script>
import iconEOS from '@/assets/img/icon_EOS.svg'
import iconONT from '@/assets/img/icon_ONT.svg'
import iconVNT from '@/assets/img/icon_VNT.svg'
import iconETH from '@/assets/img/icon_ETH.svg'
import iconBTC from '@/assets/img/icon_BTC.svg'
import iconRMB from '@/assets/img/icon_RMB.svg'
export default {
  props: {
  },
  data() {
    return {
      typeIcon: [ // todo 完善路由
        { icon: iconEOS, title: 'EOS', url: 'user-account' },
        { icon: iconONT, title: 'ONT', url: 'user-account-ont' },
        { icon: iconVNT, title: 'VNT', url: '' },
        { icon: iconETH, title: 'ETH', url: '' },
        { icon: iconBTC, title: 'BTC', url: '' },
        { icon: iconRMB, title: 'RMB', url: '' }
      ]
    }
  },
  computed: {
    navList() {
      return this[this.navListUrl]
    }
  },
  methods: {
    toggleNav(url) {
      if (url === this.$route.name) return
      if (!url) return
      this.$router.push({
        name: url,
        params: {
          id: this.$route.params.id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.nav {
  display: flex;
  margin-top: 40px;
  padding-left: 10px;
  padding-right: 10px;
  a {
    font-size:20px;
    font-weight:400;
    color:rgba(0,0,0,1);
    line-height:33px;
    text-decoration: none;
    margin-right: 60px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    text-align: center;
    &.active {
      font-weight:bold;
    }
    &.disabled {
      filter: opacity(0.5);
    }
    img {
      width: 60px;
      height: 60px;
    }
    span {
    font-size:20px;
    color:rgba(0,0,0,1);
    line-height:28px;
    margin-top: 10px;
    }
    &:nth-last-child(1) {
      margin-right: 0;
    }
  }
}
</style>
