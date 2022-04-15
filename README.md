### Router-Loading

基于Vue(2.0) + Bus + Axios拦截器

> 注意: 该插件依赖 axios

### 安装

```
npm i @glodon/routerLoading -S
```

### 使用

```javascript
import Vue from "vue";
import { appLoading } from "@/components/app-router-loading/install";
import axios from "axios";

Vue.use(appLoading, axios);

//如果需要对axios进行配置
Vue.prototype.$axios.defaults.baseURL = 'https://api.example.com';

```

### 例子

```angular2html

<template>
  //用该组件包裹router-view组件
  <app-loading>
    <router-view></router-view>
    <template slot="loading"> 自定义Loading...</template>
  </app-loading>
</template>

<script>
export default {
  name: 'Demo',
  data: () => ({}),
  methods: {
    // 请求函数
    getUserInfo() {
        this.$axios('/getUserInfo')
    }
  }
}
</script>
```
###属性
| 参数	    | 说明	                       | 类型	 | 可选值	 | 默认值 |
|--------|---------------------------|-----|------|-----|
|overlookPath| 该数组中包含的路由路径, 不会触发loading; |Array| -    | [ ] |
|overlookRegExp| 该正则匹配成功的路径,不会触发loading;   |RegExp|-|null|

###插槽

| 名称	    | 说明	              |
|--------|------------------|
|default| 必须为router-view组件 |
|loading| 自定义Loading组件     |


<div style="font-size: .8em;float: none;text-align: right;">
  <span style="font-weight: 500;color: #4e6e8e;">文档更新时间:</span> 
  <span style="font-weight: 400;color: #767676;">2022-04-14 21:14:48</span>
</div>