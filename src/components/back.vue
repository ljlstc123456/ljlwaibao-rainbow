<template>
  <div class="back" v-tap="back">
   
  </div>
</template>
<script>
export default {
  props: {
    visible: {
      default: false
    }
  },
  data(){
    return {
      // transitionName:"fade",
      // active:1
    }
  },
  computed: {
    
  },
  created(){
    //this.changeActive(this.$route.name) ;
  },
  methods:{
    back(){
      playMusic();
      this.$router.go(-1);
    }
  }
}

</script>
<style lang="less" scoped>
  .back{
    position: fixed;
    height: 96px;
    width: 104px;
    background-size: 100% 100%;
    background-position: center center;
    background-image: url('../../static/imgs/back.png') ;
    left: 0;
    top: 30px;
    &:active{
      background-image: url('../../static/imgs/back1.png') ;
    }
  }
</style>
