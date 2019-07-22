<template>
  <div class="video">
    <div class="video-item" :ref="'item'+id">
      <!-- 播放暂停按钮 -->
      <div class="show-warp" v-show="iconPlayShow" @click="clickCover">
        <img class="post-img" :src="poster" />
        <img class="icon_play" src="../assets/img/play-icon.png" />
      </div>
      <video
        class="video-content"
        :src="src"
        :id="'video'+id"
        playsinline="true"
        x5-playsinline
        webkit-playsinline="true"
        x5-video-player-type="h5"
        x-webkit-airplay="true"
        @click="clickVideo"
        @ended="onPlayerEnded($event)"
      ></video>
      <!-- :poster="poster" -->
      <div class="sub-content">
        <div class="name">{{name}}</div>
        <like-it :id="id" :likeStatus="likeStatus" :likeNum="likeNum" />
      </div>
    </div>
  </div>
</template>
<script>
import LikeIt from "./LikeIt.vue";

export default {
  name: "videoItem",
  components: {
    LikeIt
  },
  data() {
    return {
      iconPlayShow: true,
      // showPosterImg:true,
      playOrPause: false
    };
  },
  props: {
    src: {
      type: String,
      default: ""
    },
    poster: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    likeStatus: {
      type: String,
      default: ""
    },
    likeNum: {
      type: String,
      default: ""
    },
    playStatus: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    playStatus: {
      handler(newStatus, oldStatus) {
        if (newStatus == true) {
          this.playvideo(this.$event);
        } else {
          this.pauseVideo();
        }
      }
    }
  },
  methods: {
    clickVideo(){
      this.$emit("changeCurrentId",null);
    },
    clickCover(){
       this.$emit("changeCurrentId",this.id);
    },
    playvideo(event) {
      let video = document.getElementById("video" + this.id);
      console.log("playvideo：" + this.id);
    
      this.iconPlayShow = false;
      // this.showPosterImg = false;
      this.playOrPause = true;
      video.play();
    },
    pauseVideo() {
      //暂停\播放

      let video = document.getElementById("video" + this.id);
      if (this.playOrPause) {
        video.pause();
        this.iconPlayShow = true;
        // this.showPosterImg = true;
      } else {
        video.play();
        this.iconPlayShow = false;
        //  this.showPosterImg = false;
      }
      this.playOrPause = !this.playOrPause;
    },
    onPlayerEnded(player) {
      // this.showPosterImg = true;
      this.iconPlayShow = true;
      //视频结束
      // this.isVideoShow = true;
    }
    // clickVideo(e) {
    //   console.log(e);
    //   let video1 = e;
    //   if (video1.paused) {
    //     video1.play();
    //   } else {
    //     video1.pause();
    //   }
    // }
  }
};
</script>

<style lang="less" scoped>
.video-item {
  width: 100%;
  box-sizing: border-box;
  padding: 75px 32px 0px;
  color: #fff;
  position: relative;
  margin-bottom: -40px;
  border-color: black;
  .post-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 686px;
    height: 390px;
    border-radius: 20px;
  }
  .sub-content {
    display: flex;
    justify-content: space-between;
    margin-top: 0.35rem;
  }
  .name {
    font-size: 28px;
    line-height: 72px;
    color: white;
    font-weight: bold;
    width: 600px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.icon_play {
  position: absolute;
  top: 1.6rem;
  width: 1.8rem;
  height: 1.8rem;
  left: 3.74rem;
}
.show-warp {
  position: relative;
  z-index: 1;
}
.video-content {
  position: relative;
  z-index: 0;
  width: 686px;
  height: 390px;
  border-radius: 20px;
}
</style>
