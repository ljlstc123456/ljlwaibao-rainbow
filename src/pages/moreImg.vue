<template>
  <div class="bg">
    <back></back>
    <div class="title"><i class="icon imgtitle"></i></div>
    <div class="myswiper" ref="myswiper">
      <div class="items" v-if="active==1">
        <img v-for="(item,n) in active1Arr" @click="sendCode(active1Code[n],active1Codem[n])" :class="nowActive==(1+'-'+n)?'active':''" :src="item" alt="">
      </div>
      <div class="items" v-if="active==2">
        <img v-for="(item,n) in active2Arr" @click="sendCode(active2Code[n],active2Codem[n])" :class="nowActive==(2+'-'+n)?'active':''" :src="item" alt="">
      </div>
      <div class="items" v-if="active==3">
        <img v-for="(item,n) in active3Arr" @click="sendCode(active3Code[n],active3Codem[n])" :class="nowActive==(3+'-'+n)?'active':''" :src="item" alt="">
      </div>
      <div class="items" v-if="active==4">
        <img v-for="(item,n) in active4Arr" @click="sendCode(active4Code[n],active4Codem[n])" :class="nowActive==(4+'-'+n)?'active':''" :src="item" alt="">
      </div>
      <div class="items" v-if="active==5">
        <img v-for="(item,n) in active5Arr" @click="sendCode(active5Code[n],active5Codem[n])" :class="nowActive==(5+'-'+n)?'active':''" :src="item" alt="">
      </div>
      <div class="items" v-if="active==6">
        <img v-for="(item,n) in active6Arr" @click="sendCode(active6Code[n],active6Codem[n])" :class="nowActive==(6+'-'+n)?'active':''" :src="item" alt="">
      </div>
      <div class="items" v-if="active==7">
        <div class="img" v-for="(item,n) in active7Arr" @click="sendCode(active7Code[n],active7Codem[n])">
          <div>{{item}}</div>
          <div>{{item}}</div>
        </div>
      </div>
      <div class="items" v-if="active==8">
        <div class="img" v-for="(item,n) in active8Arr" @click="sendCode(active8Code[n],active8Codem[n])">
          <div>{{item}}</div>
          <div>{{active8Arrp[n]}}</div>
        </div>
      </div>
      <div class="items" v-if="active==9">
        <div class="img word" v-for="(item,n) in active9Arr" @click="sendCode(active9Code[n],active9Codem[n])">
          <div>{{item}}</div>
          <div>{{active9Arrp[n]}}</div>
        </div>
      </div>
      <div v-if="active == 10">
        <calculator></calculator>  
      </div>
    </div>
    <div class="footer">
      <div @click="active = 1"><i class="icon imgm1" :class="active==1?'active':''"></i></div>
      <div @click="active = 2"><i class="icon imgm2" :class="active==2?'active':''"></i></div>
      <div @click="active = 3"><i class="icon imgm3" :class="active==3?'active':''"></i></div>
      <div @click="active = 4"><i class="icon imgm4" :class="active==4?'active':''"></i></div>
      <div @click="active = 5"><i class="icon imgm5" :class="active==5?'active':''"></i></div>
      <div @click="active = 6"><i class="icon imgm6" :class="active==6?'active':''"></i></div>
      <div @click="active = 9"><i class="icon imgm9" :class="active==9?'active':''"></i></div>
      <div @click="active = 7"><i class="icon imgm7" :class="active==7?'active':''"></i></div>
      <div @click="active = 8"><i class="icon imgm8" :class="active==8?'active':''"></i></div>
      <div @click="active = 10"><i class="icon imgm10" :class="active==10?'active':''"></i></div>
    </div>
  </div>
</template>
<script>
import back from "../components/back";
import calculator from "../components/calculator";
import codes from "../code.js"
export default {
  name: 'moreMusic',
  data() {
    return {
      active: 1,
      nowActive:0,
      active1Arr:[],
      active1Code:codes["sg"],
      active1Codem:codes["sgm"],
      active2Arr:[],
      active2Code:codes["jt"],
      active2Codem:codes["jtm"],
      active3Arr:[],
      active3Code:codes["bq"],
      active3Codem:codes["bqm"],
      active4Arr:[],
      active4Code:codes["fz"],
      active4Codem:codes["fzm"],
      active5Arr:[],
      active5Code:codes["sw"],
      active5Codem:codes["swm"],
      active6Arr:[],
      active6Code:codes["letter"],
      active6Codem:codes["letterm"],
      active7Arr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
      active7Code:codes["digit"],
      active7Codem:codes["digitm"],
      active8Arr:codes["texthanzi"],
      active8Arrp:codes["textpinyin"],
      active8Code:codes["han"],
      active8Codem:codes["hanm"],
      active9Arr:codes["textyinyu"],
      active9Arrp:codes["textyinbiao"],
      active9Code:codes["word"],
      active9Codem:codes["wordm"],
      lock:0
    }
  },
  watch: {
    active(curVal, oldVal) {　　　　　　　　　　 
      this.$nextTick(()=> {
        this.$refs.myswiper.scrollLeft = 0;
      }) ;
    },
  },
  computed: {

  },
  created() {
    for (let i = 1; i <= 10; ++i) {
      this.active1Arr.push(require(`../../static/imgs/control/sg${i}.png`))
    }
    for (let i = 1; i <= 14; ++i) {
      this.active2Arr.push(require(`../../static/imgs/control/jt${i}.png`))
    }
    for (let i = 1; i <= 12; ++i) {
      this.active3Arr.push(require(`../../static/imgs/control/biao${i}.png`))
    }
    for (let i = 1; i <= 12; ++i) {
      this.active4Arr.push(require(`../../static/imgs/control/fzz${i}.png`))
    }
    for (let i = 1; i <= 8; ++i) {
      this.active5Arr.push(require(`../../static/imgs/control/sw${i}.png`))
    }
    for (let i = 11; i <= 36; ++i) {
      this.active6Arr.push(require(`../../static/imgs/control/num${i-1}.png`))
    }
    //this.changeActive(this.$route.name) ;
  },
  mounted: function() {
    this.$nextTick(function() {
      //cloud('cloud') ;
    })
  },
  components: {
    back,
    calculator
    // jheader
  },
  beforeDestroy(){
    resetMachine() ;
  },
  methods: {
    sendCode(code,codem){
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
        this.$hybrid({
            "action":"send",
            "params":JSON.stringify({
              "code":codem
            })
        }) ;
      },200) ;

      setTimeout(()=>{
        this.lock = 0;
      },400) ;
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
  background-image: url('../../static/imgs/control/bgimg.jpg');
  .title {
    width: 50%;
    margin: auto;
    padding-top: 30px;
    text-align: center;
  }
}

.myswiper {
  position: absolute;
  bottom: 0;
  top: 142px;
  padding-top: 30px;
  left: 0;
  width: 100%;
  overflow-x: scroll;
  .items {
    white-space: nowrap;
    padding: 0 35px;
    font-family: PF,PF1 !important; 
    img {
      height: 434px;
      margin: 0 35px;
      width: auto;
      transition: all .2s;
      &:active{
        transform: scale(1.1, 1.1);
      }
    }
    .img {
      display: inline-block;
      height: 434px;
      font-size: 150px;
      &.word{
        font-size: 120px;
      }
      color: rgb(22, 193, 65);
      font-weight: bold;
      width: 517px;
      background-image: url('../../static/imgs/control/musicBg.png') ;
      background-size: cover;
      margin: 0 35px;
      transition: all .2s;
      &:active{
        transform: scale(1.1, 1.1);
      }
      div:first-child{
        height: 335px;
        line-height: 400px
      }
      div:last-child{
        line-height: 44px;
        color: #fff;
        font-size: 30px;
        letter-spacing: 2px;
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
  background-image: linear-gradient(-180deg, #FFE964 3%, #EFC41F 100%);
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
