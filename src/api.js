
/**========================分         割         线==================
 *                             _ooOoo_
 *                            o8888888o
 *                            88" . "88
 *                            (| -_- |)
 *                            O\  =  /O
 *                         ____/`---'\____
 *                       .'  \\|     |//  `.
 *                      /  \\|||  :  |||//  \
 *                     /  _||||| -:- |||||-  \
 *                     |   | \\\  -  /// |   |
 *                     | \_|  ''\---/''  |   |
 *                     \  .-\__  `-`  ___/-. /
 *                   ___`. .'  /--.--\  `. . __
 *                ."" '<  `.___\_<|>_/___.'  >'"".
 *               | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *               \  \ `-.   \_ __\ /__ _/   .-` /  /
 *          ======`-.____`-.___\_____/___.-`____.-'======
 *                             `=---='
 *          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *                    永无BUG 专用签名
*/
import axios from 'axios';
import qs from 'qs';
import Vue from 'vue'
import { ToastPlugin } from 'vux';
Vue.use(ToastPlugin);


const instance = axios.create({
  baseURL: "/api",
  timeout: 8000,
  headers: { "content-type": "application/x-www-form-urlencoded" }
});

instance.interceptors.response.use(function(response) {
  //对响应数据做些事

  if (response.data.status != 1) {
    Vue.$vux.toast.text(response.data.msg, 'middle');
    return { dataset: {} }
  } else {
    return response.data;
  }
}, function(error) {
  Vue.$vux.toast.show({
    text: '服务器出错',
    type: 'warn'
  });
  //请求错误时做些事
  return Promise.reject(erro);
});

const post = (url, param) => instance.post(url, qs.stringify(param));
const get = (url, param) => instance.post(url + "?" + qs.stringify(param));

export default {
  getTest: (param) => post("/user/browsing/UserBrowsingMsgOpt.action", param),
  getImg: (param) => post("/php/goods/get_img.php", param),
  goodsInfo: (param) => post("/user/browsing/UserBrowsingGoodsOpt.action", param),
  goodsDetail:(param) => get("/php/goods/get_goods_detail.php", param),
  
}
