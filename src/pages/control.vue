<template>
  <div class="bg bgperfect">
    <back></back>  
    <div class="ptFont title">控制模式</div>
    <div class="line">
      <i v-for="(n,i) in colorCode" :key="i" 
      :class="'deng'+(i+1)+(colorCodeIndex==i?' active':'')" 
       class="icon" 
       v-tap="{ handler:sendCode, params:[n,i,'colorCodeIndex']}"
       ></i>
      <i class="icon stop" v-tap="{ handler:sendCode, params:['E1000000',-1,'colorCodeIndex']}"></i>
      <i class="icon getmore" @click="go('/home/control/moreColor')"></i>
    </div>
    <div class="line">
      <i v-for="(n,i) in musicCode" :key="i" 
      :class="'dong'+(i+1)+(musicCodeIndex==i?' active':'')" class="icon" 
      v-tap="{ handler:sendCode, params:[n,i,'musicCodeIndex']}"></i>
      <i class="icon stop" 
      v-tap="{ handler:sendCode, params:['B13FFFFF',-1,'musicCodeIndex']}"></i>
      <i class="icon getmore" @click="go('/home/control/moreMusic')"></i>
    </div>
    <div class="line">
      <i v-for="(n,i) in imgCode" :key="i" 
      :class="'biao'+(i+1)+(imgCodeIndex==i?' active':'')" class="icon" 
      v-tap="{ handler:sendCode, params:[n,i,'imgCodeIndex']}"></i>
      <i class="icon stop" v-tap="{ handler:sendCode, params:['C1FFFFFF',-1,'imgCodeIndex']}"></i>
      <i class="icon getmore" @click="go('/home/control/moreImg')"></i>
    </div>
    <div class="line">
      <i class="icon a1" :class="machineAIndex==0?'active':''" v-tap="{ handler:sendMachine, params:['F10196FF',0,'machineAIndex']}"></i>
      <i class="icon a2" :class="machineAIndex==1?'active':''" v-tap="{ handler:sendMachine, params:['F101C8FF',1,'machineAIndex']}"></i>
      <i class="icon a3" :class="machineAIndex==2?'active':''" v-tap="{ handler:sendMachine, params:['F101FEFF',2,'machineAIndex']}"></i>
      <i class="icon a-1" :class="machineAIndex==3?'active':''" v-tap="{ handler:sendMachine, params:['F10296FF',3,'machineAIndex']}"></i>
      <i class="icon a-2" :class="machineAIndex==4?'active':''" v-tap="{ handler:sendMachine, params:['F102C8FF',4,'machineAIndex']}"></i>
      <i class="icon a-3" :class="machineAIndex==5?'active':''" v-tap="{ handler:sendMachine, params:['F102FEFF',5,'machineAIndex']}"></i>
      <i class="icon stop" v-tap="{ handler:sendCode, params:['F103FFFF',-1,'machineAIndex']}"></i>
      <div class="placehold">
        <i class="icon stopboth" v-tap="{ handler:sendCode, params:['A2FFFFFF',-1,'machineAB']}"></i>
      </div>
      <div class="placehold">
        <i class="icon getgame" @click="go('/home/control/game')"></i>
      </div>
    </div>
    <div class="line">
      <i class="icon b1" :class="machineBIndex==0?'active':''" v-tap="{ handler:sendMachine, params:['G10196FF',0,'machineBIndex']}"></i>
      <i class="icon b2" :class="machineBIndex==1?'active':''" v-tap="{ handler:sendMachine, params:['G101C8FF',1,'machineBIndex']}"></i>
      <i class="icon b3" :class="machineBIndex==2?'active':''" v-tap="{ handler:sendMachine, params:['G101FEFF',2,'machineBIndex']}"></i>
      <i class="icon b-1" :class="machineBIndex==3?'active':''" v-tap="{ handler:sendMachine, params:['G10296FF',3,'machineBIndex']}"></i>
      <i class="icon b-2" :class="machineBIndex==4?'active':''" v-tap="{ handler:sendMachine, params:['G102C8FF',4,'machineBIndex']}"></i>
      <i class="icon b-3" :class="machineBIndex==5?'active':''" v-tap="{ handler:sendMachine, params:['G102FEFF',5,'machineBIndex']}"></i>
      <i class="icon stop" v-tap="{ handler:sendCode, params:['G103FFFF',-1,'machineBIndex']}"></i>
      <div class="placehold"></div>
      <div class="placehold"></div>
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
      lock:0,
      tipsVisble:false,
      colorCodeIndex:-1,
      musicCodeIndex:-1,
      imgCodeIndex:-1,
      machineAIndex:-1,
      machineBIndex:-1,
      machineAB:-1,
      colorCode:['E1FF0000','E1FFFFFF','E1FFFF00','E100FF00','E10000FF','E1FF00FF','E1FF8080'],
      musicCode:['B1101001','B1101002','B1101003','B1101004','B1101005','B1101006','B1101007'],
      imgCode:  ['C103000F','C103001F','C103002F','C103003F','C103004F','C103005F','C103006F']
      // transitionName:"fade",
      // active:1
    }
  },
  computed: {
    
  },
  created(){
    //this.changeActive(this.$route.name) ;
  },
  components: {
   back,
   tips
    // jheader
  },
  beforeDestroy(){
    console.log(1) ;
    resetMachine();
  },
  methods:{
    go(url){
      playMusic();
      this.$router.push({path:url}) ;
    },
    sendCodeSingle(code){
      setTimeout(()=>{
        this.lock = 0;
      },200) ;
      this.$hybrid({
        "action":"send",
          "params":JSON.stringify({
            "code":code
          })
      }) ;
    },

    sendMachine(code,index,type){
      this.tipsVisble = true ;
      this.$refs.tips.confirm().then(() => {
        this.sendCode(code,index,type) ;
        this.tipsVisble = false;
      }).catch(() => {
        this.tipsVisble = false;
      })
    },
    sendCode(code,index,type){
      //
      if(this.lock){
        return;
      }
      playMusic();
      let newcode = code ;
      if(this[type] == index){
        this[type] = -1 ;
        switch(type){
          case "colorCodeIndex":newcode = "E1000000";break;
          case "musicCodeIndex":newcode = "B13FFFFF";break;
          case "imgCodeIndex":newcode = "C1FFFFFF";break;
          case "machineAIndex":newcode = "F103FFFF";break;
          case "machineBIndex":newcode = "G103FFFF";break;
          default:break;
        }
      }else{
        this[type] = index ;
      }
      if(type == 'machineAB'){
          this.machineAIndex = -1 ;
          this.machineBIndex = -1 ;
        }
      this.lock = 1;
      this.sendCodeSingle(newcode) ;
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
  /* width: 100%;
  height: 100%; */
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
.line{
  display: flex;
  justify-content: space-around;
  margin-bottom: 45px;
  transition: all .2s;
  .icon{
    border-radius:36px;
  }
  &:nth-child(7){
    margin-bottom: 0;
  }
  .icon:active,.icon.active{
    transform: scale(1.2, 1.2);
    border:2PX solid rgb(255, 176, 0);
    &.stop,&.getmore,&.stopboth{
      border: none;
    }
  }

  .placehold{
    position: relative;
    display: inline-block;
    height:216/3px;
    width:216/3px;
    i{
      position: absolute;
      left: 0;top: 0;
    }
  }
}
</style>
