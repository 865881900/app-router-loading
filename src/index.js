import { routerEventOption } from "./routerEventOption.js";
import AppLoadingComponent from "./index.vue";

let tag = 0;
export const AppRouterLoading = {
  install(Vue, axios) {
    // 创建事件总线
    loadingEvent = new Vue(routerEventOption);
    // 注册全局vue组件
    Vue.component("AppLoading", AppLoadingComponent);

    // 配置求取拦截, 在headers上添加tag字段,为请求的唯一标识
    axios.interceptors.request.use(function (config) {
      config.tag = tag;
      loadingEvent.$emit("addQueue", tag++);
      return config;
    });

    // 配置响应拦截, 从headers上获取tag字段
    axios.interceptors.response.use(function (response) {
      loadingEvent.$emit("moveItem", response.config.tag);
      return response;
    });
  },
};

export let loadingEvent;
