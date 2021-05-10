<template>
  <div class="bg">
    <back></back>
    <!-- <div class="bgMusic bgperfect" :class="play?'':'play'" @click="changeMusic"></div> -->
    <div class="title"><i class="icon musictitle"></i></div>
    <div class="myswiper" ref="myswiper">
      <div class="items" v-if="active==1">
        <img v-for="(item,n) in active1Arr" @click="sendCode(active1Code[n])" :class="nowActive==(1+'-'+n)?'active':''" :src="item" alt="">
      </div>
      <div class="items" v-if="active==2">
        <img v-for="(item,n) in active2Arr" @click="sendCode(active2Code[n])" :class="nowActive==(2+'-'+n)?'active':''" :src="item" alt="">
      </div>
      <div class="items" v-if="active==3">
        <img v-for="(item,n) in active3Arr" @click="sendCode(active3Code[n])" :class="nowActive==(3+'-'+n)?'active':''" :src="item" alt="">
      </div>
      <div class="items" v-if="active==5">
        <img v-for="(item,n) in active5Arr" @click="sendCode(active5Code[n])" :class="nowActive==(5+'-'+n)?'active':''" :src="item" alt="">
      </div>
      <div class="items" v-if="active==4">
        <img v-for="(item,n) in active4Arr" @click="sendCode(active4Code[n])" :class="nowActive==(4+'-'+n)?'active':''" :src="item" alt="">
      </div>
      <div class="items" v-if="active==6">
        <img v-for="(item,n) in active6Arr" @click="sendCode(active6Code[n])" :class="nowActive==(6+'-'+n)?'active':''" :src="item" alt="">
      </div>
    </div>
    <div class="footer">
      <div @click="active = 1"><i class="icon musicm1" :class="active==1?'active':''"></i></div>
      <div @click="active = 2"><i class="icon musicm2" :class="active==2?'active':''"></i></div>
      <div @click="active = 3"><i class="icon musicm3" :class="active==3?'active':''"></i></div>
      <div @click="active = 5"><i class="icon musicm5" :class="active==5?'active':''"></i></div>
      <div @click="active = 4"><i class="icon musicm4" :class="active==4?'active':''"></i></div>
      <div @click="active = 6"><i class="icon musicm6" :class="active==6?'active':''"></i></div>
    </div>
  </div>
</template>
<script>
import back from "../components/back";
import codes from "../code.js"
export default {
  name: 'moreMusic',
  data() {
    return {
      active: 1,
      play:true,
      nowActive:0,
      lock:0,
      active1Arr:[],
      active1Code:codes["dw"],
      active2Arr:[],
      active2Code:codes["yin"],
      active3Arr:[],
      active3Code:codes["dh"],
      active4Arr:[],
      active4Code:codes["jtt"],
      active5Arr:[],
      active5Code:codes["yx"],
      active6Arr:[],
      active6Code:codes["sh"],
    }
  },
  watch: {
    active(curVal, oldVal) {　　　　　　　　　　 
      this.$nextTick(function() {
        this.$refs.myswiper.scrollLeft = 0;
      }) ;
    },
  },
  computed: {

  },
  created() {
    for (let i = 1; i <= 22; ++i) {
      this.active1Arr.push(require(`../../static/imgs/control/dongw${i}.png`))
    }
    for (let i = 1; i <= 21; ++i) {
      this.active2Arr.push(require(`../../static/imgs/control/yin${i}.png`))
    }
    for (let i = 1; i <= 29; ++i) {
      this.active3Arr.push(require(`../../static/imgs/control/dongh${i}.png`))
    }
    for (let i = 1; i <= 11; ++i) {
      this.active4Arr.push(require(`../../static/imgs/control/jtt${i}.png`))
    }
    for (let i = 1; i <= 7; ++i) {
      this.active5Arr.push(require(`../../static/imgs/control/yx${i}.png`))
    }
    for (let i = 1; i <= 6; ++i) {
      this.active6Arr.push(require(`../../static/imgs/control/sh${i}.png`))
    }
    //this.changeActive(this.$route.name) ;
  },
  beforeDestroy(){
    resetMachine() ;
  },
  mounted: function() {
    this.$nextTick(function() {
      //cloud('cloud') ;
    })
  },
  components: {
    back
    // jheader
  },

  methods: {
    sendCode(code){
      if(this.lock){
        return ;
      }
      playMusic();
      this.lock = 1;
        this.$hybrid({
            "action":"send",
            "params":JSON.stringify({
              "code":code
            })
        }) ;
        setTimeout(()=>{
          this.lock = 0;
        },200) ;
    },
    changeMusic(){
      this.play = !this.play;
    }
  }
}

</script>
<style lang="less">
  .iPhoneX .footer{
    height:138px !important;
    padding-bottom: 30px !important;
  }
  .iPhoneX .myswiper .items img:last-child{
    margin-right: 70px;
  }
</style>
<style lang="less" scoped>
.bg {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-image: url('../../static/imgs/control/bgmusic.jpg');
  .title {
    width: 50%;
    margin: auto;
    padding-top: 30px;
    text-align: center;
  }
}

.bgMusic{
  position: absolute;
  top: 30px;
  right: 100px;
  width: 80px;
  height: 80px;
  background-image: url('../../static/imgs/mute.png');
  transition: all .2s;
  &:active{
    transform: scale(1.1, 1.1);
  }
}
.bgMusic.play{
  background-image: url('../../static/imgs/play.png');
}

.myswiper {
  position: absolute;
  bottom: 0;
  top: 142px;
  left: 0;
  width: 100%;
  padding-top: 30px;
  overflow-x: scroll;
  .items {
    white-space: nowrap;
    padding: 0 35px;
    img {
      height: 434px;
      margin: 0 35px;
      width: auto;
      transition: all .2s;
      &:active{
        transform: scale(1.1, 1.1);
      }
    }
  }
}

.footer {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 108px;
  background-image: linear-gradient(-180deg, #C397FF 6%, #985DE9 100%);
  div {
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 42px;
    &:last-child {
      margin: 0;
    }
  }
}

</style>
