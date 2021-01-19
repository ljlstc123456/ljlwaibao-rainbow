<template>
  <div class="bg bgperfect">
    <back></back>  
    <div class="ptFont title">游戏模式</div>
      <div class="gamebar">
        <div class="slidebtn" @touchstart="move"></div>
        <div class="slidebtn slidebtnB" @touchstart="move"></div>
        <div class="machineA">
          <div class="progress1" :style="{height:aprogress1+'px'}"></div>
          <div class="progress2" :style="{height:aprogress2+'px'}"></div>
        </div>
        <div class="machineB">
          <div class="progress1" :style="{height:bprogress1+'px'}"></div>
          <div class="progress2" :style="{height:bprogress2+'px'}"></div>
        </div>
        <div class="img"></div>
      </div>

    <tips ref="tips" v-show="tipsVisble"></tips>
  </div>
</template>
<script>
import back from "../components/back"
import tips from "../components/tipsMachineA"
export default {
  name: 'control',
  data(){
    return {
      tipsVisble:true,
      aprogress1:0,
      aprogress2:0,
      bprogress1:0,
      bprogress2:0,
      codea:["F10196FF","F101C8FF","F101FEFF","F10296FF","F102C8FF","F102FEFF","F103FFFF"],
      codeb:["G10196FF","G101C8FF","G101FEFF","G10296FF","G102C8FF","G102FEFF","G103FFFF"],
      hasSenda:'',
      hasSendb:''
    }
  },
  computed: {
    
  },
  created(){
    
  },
  mounted() {
    this.$refs.tips.confirm().then(() => {
      this.tipsVisble = false;
    }).catch(() => {
      this.tipsVisble = false;
    })
  },
  components: {
   back,
   tips
    // jheader
  },
  beforeDestroy(){
    resetMachine();
  },
  methods:{
      sendCodeSingle(code,type){
        if(code == this['hasSend'+type]) {
          return ;
        }
        console.log(code) ;
        this['hasSend'+type] = code ;
        //return ;
        this.$hybrid({
          "action":"send",
            "params":JSON.stringify({
              "code":code
            })
        }) ;
      },
      move(e){
        let odiv = e.target; //获取目标元素
        let type =  odiv.getAttribute("class").indexOf("slidebtnB") != -1?'b':'a' ;
        //算出鼠标相对元素的位置
        let disX = e.touches[0].clientX - odiv.offsetLeft;
        let disY = e.touches[0].clientY - odiv.offsetTop;
        document.ontouchmove = (e)=>{
          if(e.touches.length>1) {
            return ;
          }
          //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
          let top = e.touches[0].clientY - disY;
          
          

          if(top<=25) {
            console.log(type+"顺时针最大速度") ;
            this.sendCodeSingle(this['code'+type][2],type)//顺时针最大速度
            this[type+"progress1"] = 100 ;
            return
          }
          if(top >=155) {
            console.log(type+"逆时针最大速度") ;
            this.sendCodeSingle(this['code'+type][5],type)//逆时针最大速度
            this[type+"progress2"] = 90 ;
            return ;
          }

          

          if(top>=90) {
            if(top< 95) {
              console.log(type+"停止") ;
              this.sendCodeSingle(this['code'+type][6],type)//停止
            } else {
              if(top<=120) { 
                console.log(type+"逆时针最小速度") ;
                this.sendCodeSingle(this['code'+type][3],type)//逆时针最小速度
              } else {
                console.log(type+"逆时针第二速度") ;
                this.sendCodeSingle(this['code'+type][4],type)//逆时针第二速度
              }
            }
            
            this[type+"progress1"] = 0 ;
            this[type+"progress2"] =  top - 90 ;
          }
          if(top<90) {
            if(top>85) {
              console.log(type+"停止") ;
              this.sendCodeSingle(this['code'+type][6],type)//停止
            } else {
              if(top>58) { 
                console.log(type+"顺时针最小速度") ;
                this.sendCodeSingle(this['code'+type][0],type)//逆时针最小速度
               } else {
                console.log(type+"顺时针第二速度") ;
                this.sendCodeSingle(this['code'+type][1],type)//逆时针第二速度
               }
            }

            this[type+"progress2"] = 0 ;
            this[type+"progress1"] = 90 - top ;
          }
          //移动当前元素
          odiv.style.top = top + 'px';
        };
        document.ontouchend = (e) => {
            document.ontouchmove = null;
            document.ontouchend = null;
        };
      }  
    }
}

</script>
<style lang="less">
  .iPhoneX .line{
    padding: 0 50px;
  }
</style>
<style lang="less" scoped>
.bg{
  background-image: url('../../static/imgs/bggame.png') ;
  background-color: #fff;
  padding: 0 20px;
  position: relative;
  height: 100vh;
}
.gamebar{
  width: 309Px;
  height: 212Px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -155Px;
  margin-top: -106Px;
  .slidebtn{
    width: 30Px;
    height: 36Px;
    position: absolute;
    z-index: 11;
    top: 88Px;
    left: 38Px;
    background-repeat: no-repeat;
    background-image: url('../../static/imgs/slidebtn.png');
    background-size: 100% 100%;
  }
  .slidebtnB{
    left: auto;
    right: 38Px;
  }
  .img{
    position: relative;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-image: url('../../static/imgs/gamebar.png');
    background-size: 100% 100%;
    z-index: 10;
  }
  .machineA,.machineB{
    z-index: 6;
    position: absolute;
    top: 18Px;
    left: 35Px;
    width: 40Px;
    height: 180Px;
    background: #ccc;
  }
  .machineB{
    left: auto;
    right: 35Px;
  }
  .progress1,.progress2{
    position: absolute;
    z-index: 7;
    height: 1px;
    background-color: #ffab06;
    width: 40Px;
  }
  .progress1{
    bottom: 88Px;
  }
  .progress2{
    top: 92Px;
  }
}
.title{
  width: 50%;
  margin: auto;
  padding-top: 60px;
  margin-bottom: 70px;
  font-size: 32px;
  color: #fff;
}
</style>
