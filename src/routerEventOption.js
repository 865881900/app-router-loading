/**
 * @file: 适用router-view的Loading组件options对象
 * @author: ChaoPengWang(wangcp-a@glodon.com)
 * @update: 2022/4/14 5:49 PM
 */
export const routerEventOption = {
  data: () => ({
    //当前未完成的请求队列
    routerQueue: [],
  }),

  methods: {
    /**
     * @expository: 根据isDeleteFun的返回结果,从routerQueue队列中,删除该元素;
     * @param isDeleteFun 判断是否删除回调
     * @data: 2022/4/14 6:28 PM
     * @author: ChaoPengWang(wangcp-a@glodon.com)
     * @return void
     */
    deleteItemByTag(isDeleteFun) {
      const { routerQueue } = this;
      for (let i = 0; i < routerQueue.length; i++) {
        if (isDeleteFun(routerQueue[i])) {
          this.routerQueue.splice(i, 1);
          break;
        }
      }
    },
  },

  beforeCreate() {
    //当有http请求发出后,添加Id和状态到队列中
    this.$on("addQueue", (tag) => {
      this.routerQueue.push(tag);
    });

    //请求完成,根据tag,从队列中删除该元素;
    this.$on("moveItem", (tag) => {
      this.deleteItemByTag((item) => {
        return item === tag;
      });
    });

    //切换路由后,清空队列
    this.$on("emptyQueue", () => {
      this.routerQueue.length = 0;
    });
  },
};
