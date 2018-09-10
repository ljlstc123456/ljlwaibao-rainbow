<template>
  <div class="bg bgperfect">
    <back></back>  
    <div class="myswiper" :style="{backgroundImage:'url('+bgUrl[index]+')'}">
      <i class="icon" :class="active==0?'round':'play'" @click="run"></i>
    </div>

    <tips ref="tips" v-show="tipsVisble"></tips>
  </div>  
</template>
<script>
import back from "../components/back";
import {runCode,resetInterpreter} from "../runCode.js" ;
import codes from "../demoCodes.js" ;
import tips from "../components/tipsMachineA"
export default {
  name: 'control',
  data(){
    return {
      active:0,
      tipsVisble:false,
      index:1,
      bgUrl:["",require('../../static/imgs/demo/detail1.png'),require('../../static/imgs/demo/detail2.png'),require('../../static/imgs/demo/detail3.png')]
    }
  },
  computed: {
    
  },
  created(){
    this.index = this.$route.query.id ;
    // console.log(this.$route.query) ;
    //this.changeActive(this.$route.name) ;
  },
  beforeDestroy(){
    resetInterpreter() ;
  },
  components: {
   back,
   tips
    // jheader
  },
  
  methods:{
    resetInterpreter(){
      this.active = 0;
      resetInterpreter();
    },
    run(){
      playMusic() ;
      var lastCode = codes["test"+this.index];
      //console.log(lastCode) ;
      if(this.active==0){
        this.tipsVisble = true ;
        this.$refs.tips.confirm().then(() => {
          this.active = 1;
          runCode(lastCode) ;
          this.tipsVisble = false;
        }).catch(() => {
          this.tipsVisble = false;
        })
      }else{
        this.resetInterpreter() ;
      }
      
    }
  }
}

</script>
<style lang="less" scoped>
.bg{
  background-color: #fff ;
}
.myswiper{
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  position: absolute;
  padding-left: 114px;
  bottom: 120px;
  width: 100%;
  left: 0;
  top:120px ;
  padding-left:114px ;
  text-align: left;
  img{
      max-width: 100%;
      max-height: 100%;
    }
  i{
    position: absolute;
    right: 80px;
    bottom: 80px;
    transition: .3s all;
    &:active{
      transform: scale(1.1,1.1);
    }
  }
}
</style>