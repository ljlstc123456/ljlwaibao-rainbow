<template>
  <div class="main bgperfect">
    <div class="bgMusic bgperfect" :class="play?'':'play'" @click="changeMusic"></div>
    <div class="bluetooth bgperfect" @click="changeBlue"></div>
    <div class="title">
      <img src="../../static/imgs/home/title.png" alt="">
    </div>
    <div class="menu">
      <div class="item1 bgperfect" :class="actives[0]==1?'active':''" v-tap="{ handler:go, params:['/home/control',0]}"></div>
      <div class="item2 bgperfect" :class="actives[1]==1?'active':''" v-tap="{ handler:go, params:['/home/demo',1]}"></div>
      <div class="item3 bgperfect" :class="actives[2]==1?'active':''" v-tap="{ handler:goBlocky, params:[]}"></div>
    </div>
    <div class="footer">
      <img src="../../static/imgs/home/b1.png" class="balloon1 animateb1" alt="">
      <img src="../../static/imgs/home/footer.png" class="bg" alt="">
      <img src="../../static/imgs/home/cloud1.png" class="cloud1 animateb5" alt="">
      <img src="../../static/imgs/home/cloud2.png" class="cloud2 animateb6" alt="">
      <img src="../../static/imgs/home/b2.png" class="balloon2 animateb2" alt="">
      <img src="../../static/imgs/home/b3.png" class="balloon3 animateb3" alt="">
      <img src="../../static/imgs/home/b4.png" class="balloon4 animateb4" alt="">
    </div>
  </div>
</template>
<script>
import { mapGetters,mapMutations } from 'vuex'
export default {
  name: 'home',
  data() {
    return {
      actives: [0, 0, 0],
      visibleInner:false
      // transitionName:"fade",
      // active:1
    }
  },
  computed: {
    ...mapGetters([
      'play'
    ])
  },
  created() {
    //this.changeActive(this.$route.name) ;
  },
  components: {
    
    // jheader
  },

  methods: {
    ...mapMutations(['setPlay']),
    changeMusic(){
      this.setPlay(!this.play) ;
      if(this.play){
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
    },
    go(url, index) {
      playMusic() ;
      this.setActive(index);
      setTimeout(()=>{
        this.$router.push({path:url}) ;
      },0) ;
    },
    goBlocky(){
      playMusic() ;
      // setTimeout(()=>{
        window.location.href = "./blockly/index.html" ;
      // },200) ;
    },
    changeBlue(){
      playMusic() ;
      this.$hybrid({
          "action":"isopen",
          "params":"{}",
          "callback":(status)=>{
            if(status == 1){
              window.openBlue() ;
            }
          }
      }) ;
    },
    setActive(index) {
      if (this.actives[index] == 1) { return; }
      this.actives[index] = 1;
      this.actives = this.actives.concat([]);
      setTimeout(() => {
        this.actives[index] = 0;
        this.actives = this.actives.concat([]);
      }, 300);
    }
  }
}

</script>
<style lang="less" scoped>
img{
  pointer-events:none !important;
}
.main {
  background-image: url('../../static/imgs/home/index.jpg');
}
.title{
  text-align: center;
  width: 60%;
  margin: auto;
  padding-top: 60px;
  img{
    width: 258px;
  }
  /* background-image: url(''); */
}
.bluetooth ,.bgMusic{
  position: absolute;
  top: 60px;
  right: 60px;
  width: 80px;
  height: 80px;
  background-image: url('../../static/imgs/bluetooth.png');
  transition: all .2s;
  &:active{
    transform: scale(1.1, 1.1);
  }
}
.bgMusic{
  background-image: url('../../static/imgs/mute.png');
  right: 180px;
}
.bgMusic.play{
  background-image: url('../../static/imgs/play.png');
}
.menu {
  margin-top: 70px;
  display: flex;
  display: -webkit-flex;
  justify-content: space-around;
  -webkit-justify-content: space-around;
  div {
    width: 258px;
    height: 215px;
    transition: all .3s;
    &.active {
      transform: scale(1.1, 1.1);
    }
    &.item1 {
      background-image: url('../../static/imgs/home/menu1.png')
    }
    &.item2 {
      background-image: url('../../static/imgs/home/menu2.png')
    }
    &.item3 {
      background-image: url('../../static/imgs/home/menu3.png')
    }
  }
}

.footer{
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  margin-left: 30px;
  width: 945px;
  height: 164px;
  img{
    position: absolute;
  }
  .bg{
    left: 0;
    top: 0;
    height: 100%;
  }
  .balloon1{
    left: -50px;
    top: -80px;
    height:146px;
  }
  .balloon2{
    left: 550px;
    top: -80px;
    height:69px;
  }
  .balloon3{
    right: 230px;
    top: -15px;
    height:70px;
  }
  .balloon4{
    right: 130px;
    top: -45px;
    height:70px;
  }
  .cloud1{
    left: 180px;
    top: -90px;
    height: 70px;
  }
  .cloud2{
    left: 360px;
    top: -40px;
    height: 68px;
  }
}

</style>
