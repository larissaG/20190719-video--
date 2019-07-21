<template>
<div class="warp">
  <div :class="'like-it like-it-'+id" @click="clickLike">
      <div :class="'heart like-'+like"></div>
      <span>{{likeNum}}</span>
     
  </div>
   <div class="success-cover" v-show="showSuccCover" @click="clickCover">
      <img src="../assets/img/success.jpg" />
    </div>
</div>
</template>

<script>
export default {
  data(){
    return{
      showSuccCover:false,
      number:"",
      like:""
    }
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
  methods:{
    getData(){
      this.num=this.likeNum;
      this.like=this.likeStatus;
    },
    clickLike(){

      let sh_is_like ="1"
      if(this.like=='1'){
        sh_is_like='0'
      }
      
      this.$fetch('all.likeAction',{
        sh_is_like:sh_is_like,
        id:this.id
      }).then((data)=>{
         this.like=data.sh_is_like;
        this.num=data.sh_num;
        if(data.sh_is_like==="0"){
          // alert('取消点赞成功')
        }else{
         this.showSuccCover=true;
        }
       
      })
    },
    clickCover(e){
      e.preventDefault();
      this.showSuccCover=!this.showSuccCover;
    }

  },mounted(){
    this.getData();
  }
};
</script>

<style lang="less" scoped>
.like-it{
  width: 50px;
  text-align: center;
  color:#555;
  .heart{
    width: 48px;
    height: 40px;
    background:url('../assets/img/blankheart.png') no-repeat center center;
    background-size:100% 100%; 
    margin-bottom:10px;
  }
  .heart.like-1{
    background:url('../../src/assets/img/redheart.png') no-repeat center center;
    background-size:100% 100%; 
  }
} 
.success-cover{
  position: absolute;
  width: 750px;
  height: auto;
  left: 0;
  top:0;
  z-index: 1;
  height: 100%;
  img{
    width: 100%;
  }
}
</style>
