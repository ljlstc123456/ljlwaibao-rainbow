<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="child-view" :class="isPhoneX?'iPhoneX':''" ref="inner"></router-view>
    </transition>
    <bluetoothDialog :visible.sync="visibleInner"></bluetoothDialog>
    <!-- <audio  ref="audio" preload="auto">
        <source :src="music" type="audio/mpeg">
    </audio> -->
  </div>
</template>
<script>
import bluetoothDialog from "./components/dialog"
import { mapGetters } from 'vuex'
// import music from "./music"
export default {
  name: 'App',
  data(){
    return {
      transitionName: 'slide-left',
      visibleInner:false,
      isPhoneX:"deviceInfo" in window?window.deviceInfo.name=="iPhoneX":false
    }
  },
  computed: {
    ...mapGetters([
      'play'
    ])
  },
  created(){
    if((this.$route.name=="home"||this.$route.name=="homem")&&this.play){
        this.$hybrid({
          "action":"playMusic",
          "params":"{}",
          "callback":function(){}
        }) ;
      }else{
        this.$hybrid({
          "action":"stopMusic",
          "params":"{}",
          "callback":function(){}
        }) ;
      }
    //this.changeActive(this.$route.name) ;
  },
  mounted() {
    this.$nextTick(function() {
      window.openBlue = ()=>{
        if(this.$route.name == "demoDetail"){
          this.$refs["inner"].resetInterpreter() ;
        }
        this.visibleInner = true ;
      };
      // var audio = this.$refs["audio"];
      window.playMusic = ()=>{
        this.$hybrid({
          "action":"active",
          "params":"{}",
          "callback":function(){}
        }) ;
      }

      window.resetMachine = ()=>{
        setTimeout(()=>{
          this.$hybrid({
            "action":"send",
            "params":JSON.stringify({
              "code":"A1FFFFFF"
            })
          }) ;
        },200) ;
      }
    });
  },
  components: {
    bluetoothDialog
  },
   watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      if((to.name=="home"||to.name=="homem")&&this.play){
        this.$hybrid({
          "action":"playMusic",
          "params":"{}",
          "callback":function(){}
        }) ;
      }else{
        this.$hybrid({
          "action":"stopMusic",
          "params":"{}",
          "callback":function(){}
        }) ;
      }

      if(to.path=="/"||to.path=="/index"){
        this.transitionName = "" ;
      }else{
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    }
  },
  methods:{
    changeActive(name){
      
    }
  }
}

</script>
<style lang="less">
.child-view {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  transition: all .3s linear;
  background-color: #000;
}

.slide-left-enter, .slide-right-leave-active {
  transform: translate(100%, 0);
}
.slide-left-leave-active, .slide-right-enter {
  transform: translate(-100%, 0);
}
.slide-left-enter-active,.slide-right-enter-active{
  transition: all .3s .1s linear;
}
.slide-left-leave-active,.slide-right-leave-active{
  transition: all .3s .2s linear;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;

 /*  预加载 */
  &:after{
    content: " ";
    display: block;
    position: absolute;
    left: -1000px;
    background-image:url('../static/imgs/control/bg.jpg') ,url('../static/imgs/control/bgcolor.jpg'),url('../static/imgs/control/bgimg.jpg'),url('../static/imgs/control/bgmusic.jpg');
  }
}


</style>
