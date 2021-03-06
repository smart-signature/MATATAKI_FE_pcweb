/* eslint-disable */
import moment from 'moment'
export default {
  setCookie(name, value, days = 1) {
    let d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
  },
  getCookie(name) {
    let v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
  },
  delCookie(name) {
    this.setCookie(name, '', -1);
  },
  deleteAllCookies() {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      let eqPos = cookie.indexOf('=');
      let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  },
  isNDaysAgo(n, time) {
    const nowTime = moment()
      .subtract(n, 'days')
      .format('YYYY-MM-DD')
    const timeFormat = moment(time).format('YYYY-MM-DD')
    return moment(nowTime).isAfter(timeFormat)
  },
  isNull(v) {
    return v === '' || v === null || v === undefined || JSON.stringify(v) === '{}' || JSON.stringify(v) === '[]';
  },
  sleep(time) {
   return new Promise(resolve => setTimeout(resolve, time))
  },
  isEmptyArray(arr){
    return Array.isArray(arr) && arr.length !== 0
  }
};
