<template>
  <div class="video">
    <div class="video-item">
      <video
        @click="clickVideo"
        class="video-content"
        :src="src"
        :id="'video'+id"
        controls="controls"
      ></video>
      <div class="sub-content">
      <div class="name">{{name}}</div>
      <like-it :id="id" :likeStatus="likeStatus" 
        :likeNum="likeNum"/></div>
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
  props: {
    src: {
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
    }
  },
  methods: {
    clickVideo(e) {
      console.log(e);
      let video1 = e;
      if (video1.paused) {
        video1.play();
      } else {
        video1.pause();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.video-item {
  width: 750px;
  box-sizing: border-box;
  padding: 35px 32px 20px;
  color: #fff;
  .sub-content{
    display: flex;
    justify-content:space-between;
    margin-top:25px;
  }
  .name {
    font-size: 24px;
    line-height: 72px;
    color: white;
    font-weight: bold;
    width: 600px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.video-content {
  width: 686px;
  height: 390px;
  border-radius: 10px;
}
</style>
