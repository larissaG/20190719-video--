import axios from "axios";
// import config from '~config';
// import qs from 'qs';
// import { Message } from "element-ui";
import Cookies from "js-cookie";
const api = axios.create({
  baseURL: location.protocol+'//fsapi.shihanbainian.com/1/',
  // baseURL: process.env.API_LOCATION,
  timeout: 10000, // 超时时间
  responseType: "json", // default
  headers: {
    "Content-Type": "application/json"
  },
  // params: {
  //   OrgStdId: 0,
  //   hospStdId: 0,
  // },
  // data: {
  //   OrgStdId: 0,
  //   hospStdId: 0,
  // },
  // 通过Qs.stringify转换为表单查询参数
  // transformRequest: [data => qs.stringify(data)],
  // `validateStatus` defines whether to resolve or reject the promise for a given
  // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
  // or `undefined`), the promise will be resolved; otherwise, the promise will be
  // rejected.
  validateStatus: status => status === 200
});

// 请求拦截
api.interceptors.request.use(
  apiconfig => {
    const token = Cookies.get("ssap_token");
    if (token) {
      apiconfig.headers["csrf-token"] = token;
    }
    if ("loading" in _.get(apiconfig, "params", {}))
      apiconfig.params.loading = true;
    return apiconfig;
  },
  e => Promise.reject(e)
);

// 响应拦截
api.interceptors.response.use(
  (res = {}) => {
    if ("loading" in _.get(res, "config.params", {}))
      res.config.params.loading = false;
    if (
      res.headers["content-type"] &&
      res.headers["content-type"].indexOf("application/x-download") !== -1
    ) {
      return res;
    }
    if (res.config && res.config.responseType === "arraybuffer") {
      return res;
    }
    if (/^2\d{2}/.test(res.status)) {

      const data = res.data;
      const code = data.code;
      // 登录超时
      // if (code === "C_3") {
      //   const signoutUrl = `${
      //     process.env.NODE_ENV != "production"
      //       ? "http://user.test.com"
      //       : "https://user.zhenshi.com"
      //   }/login?target=${encodeURIComponent(window.location.href)}`;
      //   console.log(signoutUrl);
      //   return (window.location.href = signoutUrl);
      // } else 
      if (code !== 0) {
        alert(data.msg || "数据异常，请稍后重试~");
        return Promise.reject(res);
      } else {
        // 成功 code === 0
        return Promise.resolve(res && res.data && res.data.data);
      }
    }
    return false;
  },
  e => {
    // vm.$message.error("网络出错，请稍后再试~");
    alert("网络出错，请稍后再试~");
    // console.log(e.response.data && e.response.data.messsage);
    return Promise.reject(e);
  }
);
export default api;
