<template>
  <div class="bg bgperfect">
    <back></back>  
    <div class="ptFont title">示例模式</div>
    <div class="myswiper">
      <div class="wrap">
        <div v-for="n in 1">
          <img :src="url" alt="">
          <span @click="go('/home/demo/demoStep',n)"></span>
        </div>
      </div>
    </div>
  </div>  
</template>
<script>
import back from "../components/back"
export default {
  name: 'control',
  data(){
    return {
      url:require('../../static/imgs/demo/demo1.gif')
    }
  },
  computed: {
    
  },
  created(){
    //this.changeActive(this.$route.name) ;
  },
  components: {
   back
    // jheader
  },
  beforeDestroy(){
    resetMachine();
  },
  methods:{
    go(url,id){
      playMusic() ;
      setTimeout(()=>{
        this.$router.push({path:url,query:{id:id}}) ;
      },0) ;
      
    }
  }
}

</script>
<style lang="less">
  .iPhoneX .myswiper{
     padding:0px 90px !important;
  }
  
</style>
<style lang="less" scoped>
.bg{
  background-image: url('../../static/imgs/control/bg.jpg') ;
  padding: 0 20px;
}
.title{
  width: 50%;
  margin: auto;
  padding-top: 60px;
  margin-bottom: 70px;
  font-size: 32px;
  color: #fff;
}
.myswiper{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding:0px 60px;
  left: 0;
  top:174px ;
  overflow-x: scroll;
  .wrap{
    height: 100%;
    width: auto;
    white-space:nowrap; 
    div{
      position: relative;
      display: inline-block;
      margin-right: 88px;
      padding-top: 88px;
      padding-left: 168px;
      width: 717px;
      height: 493px;
      
      background-image: url('../../static/imgs/demo/item.png');
      background-size: 100% 100%;
      span{
        display: inline-block;
        position: absolute;
        width: 174px;
        height: 56px;
        background-image: url('../../static/imgs/demo/btn.png');
        background-size: 100% 100%;
        right: 56px;
        bottom: 45px;
        transition: all .3s;
        &:active{
          transform: scale(1.1, 1.1)
        }
      }
      img{
        float: left;
        width: 260px;
        height: 330px;
      }
    }
  }
  
  
}
</style>