/* eslint-disable */
import qs from 'qs'
import request from '@/utils/request'
import utils from '@/utils/utils'

import endpoint from './endpoint'
import { paginationUrl } from './pagination_url'

export default {
  /**
   * 获取token
   * @param {Object} params idProvider publickey(toLowerCase) sign username
   */
  auth(params) {
    // 推荐人id
    let referral = utils.getCookie('referral')
    if (referral) Object.assign(params, { referral: referral })

    return request.post(
      `/login/auth`,
      params
    )
  },
  async wx(url) {
    return request.get(
      `${endpoint.wx}?url=${url}`
    )
  },
  getArticleInfo(hashOrId) {
    // post hash获取; p id 短链接;
    const url = /^[0-9]*$/.test(hashOrId) ? 'p' : 'post'
    return request.get(`/${url}/${hashOrId}`)
  },
  getImg(hash) {
    return `${process.env.ssImgAddress}${hash}`
  },
  async getComments(signid) {
    return request.get('/comment/comments', {
      params: {signid}
    })
  },
  async getFans(uid, page = 1) {
    return request.get('/follow/fans', {
      params: {
        uid, page
      }
    })
  },
  async getFollows(uid, page = 1) {
    return request.get('/follow/follows', {
      params: {
        uid, page
      }
    })
  },
  async follow(uid) {
    return request.post('/follow/follow', { uid })
  },
  async unfollow(uid) {
    return request.post('/follow/unfollow', { uid })
  },
  async getMyUserData () {
    return request.get('/user/stats')
  },
  async getUser({ id }) {
    return request.get(`/user/${id}`)
  },
  /**
   * BasePull 分页组件
   * @param {Object} param params参数
   */
  async getBackendData({ url, params }) {
    const pullApiUrl = paginationUrl
    return request({
      url: pullApiUrl[url],
      method: 'get',
      noLoading: true,
      params
    })
  },
  async getCaptcha(email, { geetest_challenge, geetest_validate, geetest_seccode }) {
    return request.post(`/login/captcha?email=${email}`, {
      geetest_challenge,
      geetest_validate,
      geetest_seccode
    }, { noLoading: true })

    return request.get('/login/captcha', { params: {email}, noLoading: true })
  },
  async verifyEmail(email) {
    return request({
      url: '/login/verify',
      method: 'get',
      params: { email },
      noLoading: true
    })
  },
  async register({email,password,captcha, referral}) {
    return request.post('/login/regist', { email, password, captcha: captcha.toString(), referral })
  },
  async login({username, password}) {
    return request.post('/login/account', { username, password })
  },
  async sendPost({ title, author, desc, content }) {
    const stringifyData = qs.stringify({
      'data[title]': title,
      'data[author]': author,
      'data[desc]': desc,
      'data[content]': content
    })
    return request({
      method: 'post',
      url: `/post/ipfs`,
      data: stringifyData,
      config: { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    })
  },
  async reading(id) {
    return request.post(`/posts/${id}/reading`, {}, { noLoading: true })
  },
  async like(id, time) {
    return request.post(`/posts/${id}/like`, { time })
  },
  async dislike(id, time) {
    return request.post(`/posts/${id}/dislike`, { time })
  },
  async myPoints(params) {
    return request.get(`/user/points`, { params })
  },
  /**
   * 文章导入
   * @param {String} url 导入地址
   */
  importArticle(url) {
    return request({
      method: 'post',
      url: '/posts/importer',
      data:{ url },
      timeout: 40000,
    })
  },
  /**
   * 发布文章接口 通用方法 私有方法
   * @param {String} url 接口地址
   * @param {Object} param1 文章参数
   * @param {String || null} signature 签名
   */
  _sendArticle(
    url,
    { signId = null, author, hash, title, fissionFactor, cover, isOriginal, tags },
    signature = null
  ) {
    // 账号类型
    let idProvider = (utils.getCookie('idProvider')).toLocaleLowerCase()
    return request({
      method: 'POST',
      url,
      data: {
        author,
        cover,
        fissionFactor,
        hash,
        platform: idProvider,
        publickey: signature ? signature.publicKey : null,
        sign: signature ? signature.signature : null,
        signId,
        title,
        is_original: isOriginal,
        tags
      }
    })
  },
  /**
   * 发布文章
   * @param {Object} params 参数, 签名 非钱包用户需要签名
   */
  publishArticle({ article, signature }) {
    return this._sendArticle('/post/publish', article, signature)
  },
  /**
   * 编辑文章
   * @param {Object} params 参数, 签名 非钱包用户需要签名
   */
  editArticle({ article, signature }) {
    return this._sendArticle('/post/edit', article, signature)
  },
  // 创建草稿
  createDraft({ title, content, cover, fissionFactor, isOriginal, tags }) {
    return request({
      method: 'POST',
      url: '/draft/save',
      data: {
        title,
        content,
        cover,
        fissionFactor,
        isOriginal,
        tags
      }
    })
  },
  // 更新草稿
  updateDraft({ id, title, content, cover, fissionFactor, isOriginal, tags }) {
    return request({
      method: 'POST',
      url: '/draft/save',
      data: {
        id,
        title,
        content,
        cover,
        fissionFactor,
        isOriginal,
        tags
      }
    })
  },
  /**
   * 上传图片
   * @param {String} type 上传类型
   * @param {Object} data 上传数据
   */
  uploadImage(type, data) {
    const url = {
      avatar: '/user/uploadAvatar',
      artileCover: '/post/uploadImage'
    }
    const formdata = new FormData()
    formdata.append('image', data)
    return request({
      method: 'POST',
      url: url[type],
      data: formdata
    })
  },
  // 搜索推荐
  searchRecommend(params){
    return request('/search/recommend', params)
  },
  // 推荐作者||用户
  usersRecommend(params){
    return request('/users/recommend', params)
  },
  // 获取任务状态
  userPointStatus() {
    return request('/user/pointStatus')
  },
  // 领取任务积分
  userClaimTaskPoint(data) {
    return request({
      method: 'POST',
      url: '/user/claimTaskPoint',
      data: data
    })
  },
  // 获取首页统计数据
  postsStats() {
    return request('/posts/stats')
  },
  // 阅读获取积分
  postsIdReadnew(id, time) {
    return request.post(`/posts/${id}/readnew`, { time })
  },
  // 购买商品 可能会有区分 暂未合并
  reportOrder(data) {
    let address = { // 缺地址
      'eos': '',
      'ont': '',
      'vnt': process.env.VUE_APP_VNT_CONTRACT
    }
    // 平台类型
    let idProvider = utils.getCookie('idProvider').toLocaleLowerCase()
    let contract = address[idProvider] // 合约地址

    Object.assign(data, {
      contract: contract,
      platform: idProvider,
      symbol: idProvider.toUpperCase()
    })
    return request({ method: 'POST', url: '/order/order', data })
  },
  // 赞赏 可能会有区分 暂未合并
  support(data) {
    let address = { // 缺地址
      'eos': '',
      'ont': '',
      'vnt': process.env.VUE_APP_VNT_CONTRACT
    }
    // 平台类型
    let idProvider = utils.getCookie('idProvider').toLocaleLowerCase()
    let contract = address[idProvider] // 合约地址

    Object.assign(data, {
      contract: contract,
      platform: idProvider,
      symbol: idProvider.toUpperCase()
    })
    return request({ method: 'POST', url: '/support/support', data })
  },
  // 提交订单hash
  orderSaveHash(data) {
    return request({ method: 'POST', url: '/order/saveTxhash', data })
  },
  // 提交订单hash
  supportSaveHash(data) {
    return request({ method: 'POST', url: '/support/saveTxhash', data })
  },
  registerGT() {
    return request({
      url:`/gt/register-slide?t=${(new Date()).getTime()}`,
      method: 'get',
      dataType: "json",
    })
  }
}
