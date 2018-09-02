<template>
  <div class="index">
    <!-- 缓存数据 -->
    <img src="../../static/imgs/home/b1.png" >
      <img src="../../static/imgs/home/footer.png">
      <img src="../../static/imgs/home/cloud1.png">
      <img src="../../static/imgs/home/cloud2.png">
      <img src="../../static/imgs/home/b2.png">
      <img src="../../static/imgs/home/b3.png">
      <img src="../../static/imgs/home/b4.png">
      <img src="../../static/imgs/home/index.jpg">
      <img src="../../static/imgs/bluetooth.png" alt="">
      <img src="../../static/imgs/home/menu1.png" alt="">
      <img src="../../static/imgs/home/menu2.png" alt="">
      <img src="../../static/imgs/home/menu3.png" alt="">
      <img src="../../static/imgs/control/bg.jpg" alt="">
      <img src="../../static/imgs/control/bgimg.jpg" alt="">
      <img src="../../static/imgs/control/bgmusic.jpg" alt="">
  </div>
</template>
<script>
export default {
  name: 'index',
  data(){
    return {
      // transitionName:"fade",
      // active:1
    }
  },
  computed: {
    
  },
  created(){
    setTimeout(()=>{
      this.$router.replace("/home") ;
    },4000) ;
  },
  components: {
    // BottomBar,
    // jheader
  },
  
  methods:{
    
  }
}

</script>
<style lang="less" scoped>
.index{
  width: 100%; 
  height: 100%; 
  overflow: hidden;
  background-repeat: no-repeat; 
  background-position: center center; 
  background-size: cover; 
  background-image: url('../../static/imgs/startup.png');
  img{
    visibility: hidden;
  }
}
</style>
