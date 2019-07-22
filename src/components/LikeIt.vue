<template>
  <div class="warp">
    <div :class="'like-it like-it-'+id" @click="clickLike">
      <div :class="'heart like-'+like"></div>
      <span>{{num}}</span>
    </div>
    <!-- <div class="success-cover" v-show="showSuccCover" @click="clickCover">
      <img src="../assets/img/success.jpg" />
    </div> -->
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  data() {
    return {
      // showSuccCover: false,
      num: "",
      like: ""
    };
  },
  props: {
    likeStatus: {
      type: String,
      default: ""
    },
    likeNum: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    }
  },
  methods: {
    //  closeSuccCover() {
    //   setTimeout(() => {
    //     this.showSuccCover = false;
    //   }, 2000);
    // },
    getData() {
      this.num = this.likeNum;
      this.like = this.likeStatus;
    },
    clickLike() {
      let sh_is_like = "1";
      if (this.like == "1") {
        sh_is_like = "0";
      }

      this.$fetch("all.likeAction", {
        sh_is_like: sh_is_like,
        id: this.id,
         device:Cookies.get("device")
      }).then(data => {
        this.like = data.sh_is_like;
        this.num = data.sh_num;
        if (data.sh_is_like === "0") {
          // alert('取消点赞成功')
        } else {
          this.showSuccCover = true;
          // this.closeSuccCover()
        }
      });
    },
    clickCover(e) {
      e.preventDefault();
      this.showSuccCover = false;
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style lang="less" scoped>
.like-it {
  width: 50px;
  text-align: center;
  color: #555;
  z-index:1;
  position: relative;
  .heart {
    width: 48px;
    height: 40px;
    background: url("../assets/img/blankheart.png") no-repeat center center;
    background-size: 100% 100%;
    margin-bottom: 10px;
  }
  .heart.like-1 {
    background: url("../../src/assets/img/redheart.png") no-repeat center center;
    background-size: 100% 100%;
  }
}
.success-cover {
  position: fixed;
  width: 750px;
  height: auto;
  left: 0;
  top: 0;
  z-index: 1;
  height: 100%;
  background: black;
  img {
    width: 100%;
  }
}
</style>
