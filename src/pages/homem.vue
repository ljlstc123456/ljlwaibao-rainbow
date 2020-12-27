<template>
  <div class="main bgperfect">
    <div class="bgMusic bgperfect" :class="play?'play':''" @click="changeMusic"></div>
    <div class="bluetooth bgperfect" @click="changeBlue"></div>
    <div class="title">
      <img src="../../static/imgs/home1/title.png" alt="">
    </div>
    <div class="menu">
      <div class="item1 bgperfect" :class="actives[0]==1?'active':''" v-tap="{ handler:go, params:['/home/control',0]}"></div>
      <div class="item2 bgperfect" :class="actives[1]==1?'active':''" v-tap="{ handler:go, params:['/home/demo',1]}"></div>
      <div class="item3 bgperfect" :class="actives[2]==1?'active':''" v-tap="{ handler:goBlocky, params:[]}"></div>
    </div>
    <div class="footer">
      <img src="../../static/imgs/home1/b1.png" class="balloon1 animateb1" alt="">
      <img src="../../static/imgs/home1/footer.png" class="bg" alt="">
      <!-- <img src="../../static/imgs/home1/cloud1.png" class="cloud1 animateb5" alt=""> -->
      <img src="../../static/imgs/home1/cloud2.png" class="cloud2 animateb6" alt="">
      <img src="../../static/imgs/home1/b2.png" class="balloon2 animateb2" alt="">
      <img src="../../static/imgs/home1/b3.png" class="balloon3 animateb3" alt="">
      <img src="../../static/imgs/home1/b4.png" class="balloon4 animateb4" alt="">
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
    //window.setMoble(true) ;
    window.isMobile = true;
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
      setTimeout(()=>{
        window.location.href = "./blockly/index.html" ;
      },200) ;
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
<style lang="less">
  .iPhoneX .menu {
    padding: 0 140px !important;
    div{
      width:342px !important;
      height: 290px !important;
    }
  }
  .iPhoneX .balloon1{
     left: 120px !important;
  }
</style>
<style lang="less" scoped>
img{
  pointer-events:none !important;
}
.main {
  background-image: url('../../static/imgs/home1/index.jpg');
  /* &>div{
    width: 1334px;
    height: 100%;
    margin: auto;
    position: relative;
  } */
}
.title{
  text-align: center;
  width: 60%;
  margin: auto;
  padding-top: 35px;
  img{
    width: 259px;
  }
  /* background-image: url(''); */
}
.bluetooth ,.bgMusic{
  position: absolute;
  top: 60px;
  right: 60px;
  width: 72px;
  height: 72px;
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
  margin-top: 36px;
  padding: 0 100px;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  div {
    width: 312px;
    height: 262px;
    transition: all .3s;
    &.active {
      transform: scale(1.1, 1.1);
    }
    &.item1 {
      background-image: url('../../static/imgs/home1/menu1.png')
    }
    &.item2 {
      background-image: url('../../static/imgs/home1/menu4.png')
    }
    &.item3 {
      background-image: url('../../static/imgs/home1/menu3.png')
    }
  }
}

.footer{
  position: absolute;
  left: 0;
  bottom: 30px;
  width:100%;
  text-align: center;
  height: 201px;
  img{
    position: absolute;
  }
  .bg{
    position: relative;
    z-index: 2;
    width: 1224px;
    height: 201px;
  }
  .balloon1{
    left: 33px;
    top: -60px;
    width: 123px;
    height:157px;
  }
  .balloon2{
    right: 200px;
    top: -60px;
    width: 76px;
    height:100px;
  }
  .balloon3{
    right:450px;
    top: -70px;
    width: 76px;
    height:100px;
  }
  .balloon4{
    right: 280px;
    top: -65px;
    width: 73px;
    height:96px;
  }
  .cloud2{
    left: 360px;
    top: -50px;
    height: 68px;
  }
}

</style>
