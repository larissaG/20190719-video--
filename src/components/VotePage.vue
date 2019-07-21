<template>
  <div class="vote-page">
    <div class="cover" v-show="showBeforeCover">
      <img src="../assets/img/before.jpg" />
    </div>
    <div class="video-list" v-show="!showBeforeCover">
      <div class="head-logo">
        <img class="logo" src="../assets/img/logo.jpg" />
      </div>
      <vote-item
        v-for="(item,index) in voteList"
        :key="index"
        :name="item.sh_name"
        :id="item.sh_id"
        :src="item.sh_video_url"
        :likeStatus="item.sh_is_like"
        :likeNum="item.sh_like_num"
      />
    </div>
  </div>
</template>
<script>
import VoteItem from "./VideoItem.vue";
import Fingerprint2 from "fingerprintjs2";
import Cookies from "js-cookie";

export default {
  data() {
    this.listBottomText = ["数据加载中", "上拉加载", "没有更多了"];
    return {
      showBeforeCover: true,
      page: 1,
      page_size: 20,
      totalPage: null,
      //listArea
      listTextNow: this.listBottomText[0],
      voteList: []
    };
  },
  components: {
    VoteItem
  },
  methods: {
    closeBeforeCover() {
      setTimeout(() => {
        this.showBeforeCover = false;
      }, 3000);
    },
    getPage() {
      this.listTextNow = this.listBottomText[0];
      this.$fetch("all.getPage", {
        page: this.page,
        page_size: this.page_size
      }).then(data => {
        this.page++;
        this.totalPage = data.sh_total_rows;
        this.voteList = [].concat(this.voteList, data.sh_items);
        this.listTextNow = this.listBottomText[1];
      });
    },
    useFingerprint() { 
      let options = {fonts: {extendedJsFonts: true}, excludes: {userAgent: true}}
      if (window.requestIdleCallback) {
        requestIdleCallback(function() {
          //必须在v2.0语法提供options参数
          Fingerprint2.getV18(options, function(result, components) {
            console.log(result); //结果是哈希指纹
            console.log(components); //组件是{key：'foo'的数组，值：'组件值'}
              Cookies.set("device", result);
          });
        });
      } else {
        setTimeout(function() {
          Fingerprint2.getV18(options, function(result, components) {
            console.log(result); //结果是哈希指纹
            console.log(components); //组件是{key：'foo'的数组，值：'组件值'}
            Cookies.set("device", result);
          });
        }, 500);
      }

      
    },
    loadMore() {
      //可滚动容器的高度
      let innerHeight = document.querySelector("#app").clientHeight; //屏幕尺寸高度
      let outerHeight = document.documentElement.clientHeight; //可滚动容器超出当前窗口显示范围的高度
      let scrollTop = document.documentElement.scrollTop;
      if (innerHeight < outerHeight + scrollTop) {
        //加载更多操作
        // console.log("loadmore");
        // 判断是否有更多数据
        if (Math.ceil(this.totalPage / this.page_size) <= this.page) {
          this.getPage();
        } else {
          this.listTextNow = this.listBottomText[2];
        }
      }
    }
  },
  created() {
    this.closeBeforeCover();
    this.getPage();
    this.useFingerprint();
    window.addEventListener("scroll", this.loadMore);
  }
};
</script>

<style lang="less" scoped>
.vote-page {
  background-color: black;
  .head-logo {
    width: 750px;
    height: 90px;
    background-color: white;
    .logo {
      width: 160px;
      height: 90px;
      margin: 0px 20px;
    }
  }
}
.cover {
  width: 100%;
  img {
    width: 100%;
  }
}
</style>
