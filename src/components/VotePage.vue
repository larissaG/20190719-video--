<template>
  <div class="vote-page">
    <div class="cover" v-show="showBeforeCover">
      <div class="enter" @click="stop">{{content}}</div>
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
        :poster="item.sh_image"
        :playStatus="item.sh_id==currentId"
        @changeCurrentId= "getCurrentId"
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
      page_size: 50,
      totalPage: null,
      //listArea
      listTextNow: this.listBottomText[0],
      voteList: [],
      totalTime: 5,
      content: "",
      clock: null,
      currentId:null
    };
  },
  components: {
    VoteItem
  },
  methods: {
    getCurrentId(childId){
      console.log(childId);
      this.currentId=childId;
    },
    stop() {
      window.clearInterval(this.clock);
      this.showBeforeCover = false;
    },
    countDown() {
      this.content = this.totalTime + "s后进入";
      this.clock = window.setInterval(() => {
        this.totalTime--;
        this.content = this.totalTime + "s后进入";
        if (this.totalTime <= 0) {
          window.clearInterval(this.clock);
          this.showBeforeCover = false;
        }
      }, 1000);
    },
    closeBeforeCover() {
      // setTimeout(() => {
      //   this.showBeforeCover = false;
      // }, 3000);
    },
    getPage() {
      this.listTextNow = this.listBottomText[0];
      this.$fetch("all.getPage", {
        page: this.page,
        page_size: this.page_size,
        device: Cookies.get("device")
      }).then(data => {
        this.page++;
        this.totalPage = data.sh_total_rows;
        this.voteList = [].concat(this.voteList, data.sh_items);
        this.listTextNow = this.listBottomText[1];
      });
    },
    useFingerprint() {
       if(Cookies.get("device")){
        return !1;
      }
      let options = {
        fonts: { extendedJsFonts: true },
        excludes: { userAgent: true }
      };
      if (window.requestIdleCallback) {
        requestIdleCallback(function() {
          //必须在v2.0语法提供options参数
          Fingerprint2.getV18(options, function(result, components) {
            // console.log(result); //结果是哈希指纹
            // console.log(components); //组件是{key：'foo'的数组，值：'组件值'}
            Cookies.set("device", result);
          });
        });
      } else {
        setTimeout(function() {
          Fingerprint2.getV18(options, function(result, components) {
            // console.log(result); //结果是哈希指纹
            // console.log(components); //组件是{key：'foo'的数组，值：'组件值'}
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

        if (this.page <= Math.ceil(this.totalPage / this.page_size)) {
          this.getPage();
        } else {
          this.listTextNow = this.listBottomText[2];
        }
      }
    }
  },
  created() {
    this.countDown();
    this.getPage();
    this.useFingerprint();
    window.addEventListener("scroll", this.loadMore);
  }
};
</script>

<style lang="less" scoped>
.vote-page {
  background-color: black;
  height: 100%;
  .video-list {
    margin-bottom: 50px;
    width: 100%;
  }
  .head-logo {
    width: 100%;
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
  position: relative;
  width: 750px;
  height: 100%;
  background: url("../assets/img/before.jpg") repeat top center;
  background-size: 100% auto;
  .enter {
    position: absolute;
    right: 20px;
    top: 30px;
    padding: 15px;
    border-radius: 5px;
    font-size: 24px;
    color: #fff;
    background-color: rgba(116, 113, 113, 0.61);
  }
  width: 100%;
  img {
    width: 100%;
  }
}
</style>
