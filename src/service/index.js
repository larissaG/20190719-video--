import axios from "./config.js";

// 根据 ./apiModules文件夹中 生成fetchCfg -- 实现方法 webpack-require.context()
// fetchCfg = {
//     system,
//     user
// };
const fetchCfg = {};
// 通过 require.context 可以让webpack自动引用指定文件夹中的文件
// 我们将它存到 fetchCfg 上以供 fetch 方法使用
const requireContext = require.context("./apiModules", false, /\.js$/);
requireContext.keys().forEach(path => {
  let module = path.replace(".js", "").replace("./", "");
  fetchCfg[module] = requireContext(path).default;
});

const fetchParam = param => {
  var valid = /[a-z]+(\.[a-z])+/.test(param);
  if (!valid) {
    throw new Error("[Error in fetch]: fetch 参数格式为 moduleName.apiName");
  } else {
    return {
      moduleName: param.split(".")[0],
      apiName: param.split(".")[1]
    };
  }
};

export default function fetch(moduleInfo, payload, query) {
  // let prefix = "/api";
  let moduleName = fetchParam(moduleInfo)["moduleName"];
  let apiName = fetchParam(moduleInfo)["apiName"];
  // 判断没有找到传入模块
  if (!fetchCfg.hasOwnProperty(moduleName)) {
    throw new Error(
      `[Error in fetch]: 在api配置文件中未找到模块 -> ${moduleName}`
    );
  }
  // 判断没有找到对应接口
  if (!fetchCfg[moduleName].hasOwnProperty(apiName)) {
    throw new Error(
      `[Error in fetch]: 在模块${moduleName}中未找到接口 -> ${apiName}`
    );
  }
  let fetchInfo = fetchCfg[moduleName][apiName];
  let method = fetchInfo["method"];
  // let url = `${prefix}/${fetchInfo["url"]}`;
  let url = `${fetchInfo["url"]}`;

  if (method === "get") {
    if (query) {
      return axios[method](`${url}${query}`);
    } else {
      return axios[method](url, {
        params: payload
      });
    }
  } else {
    return axios[method](url, payload);
  }
}
