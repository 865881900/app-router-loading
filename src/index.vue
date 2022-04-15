<!--
	@file: 给router-view中的组件添加蒙层效果
	根据该路由中的http所有的请求状态, 判断是否显示蒙层
	当路由组件中有http请求未完成,则展示loading组件
	当路由组件中的所有http请求完成,则显示该组件
	@author: ChaoPengWang(wangcp-a@glodon.com)
	@update: 2022/4/14 6:32 PM
-->

<template>
  <div class="app-loading">
    <slot name="default"></slot>
    <div
      v-show="routerQueue.length > 0 && !isOverlook"
      class="app-loading-membrane"
    >
      <slot name="loading">
        <div>加载中...</div>
      </slot>
    </div>
  </div>
</template>
<script>
import { loadingEvent } from "./index";

export default {
  name: "AppRouterLoading",
  data: () => ({
    routerQueue: loadingEvent.routerQueue,
  }),
  props: {
    //数组中包含的路由路径,将忽略该功能;
    overlookPath: {
      type: Array,
      default: () => [],
    },

    //正则匹配路由路径成功,忽略该功能;
    overlookRegExp: {
      type: RegExp,
      default: null,
    },
  },
  computed: {
    isOverlook() {
      return (
        (this.overlookRegExp ? this.overlookRegExp.test(this.toPath) : false) ||
        this.overlookPath.includes(this.toPath)
      );
    },
  },

  watch: {
    $route: {
      handler: function (to, from) {
        this.toPath = to.path;
        // 目标路由是否被忽略
        if (from.path && to.path !== from.path) {
          //路由切换后,清空队列
          loadingEvent.$emit("emptyQueue");
        }
      },
    },
  },
};
</script>

<style>
.app-loading {
  height: 100%;
  width: 100%;
  position: relative;
}

.app-loading-membrane {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: rgba(136, 134, 134, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>
