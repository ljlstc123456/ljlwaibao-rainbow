<template>
  <div class="bg bgperfect">
    <back></back>
    <div class="ptFont title">拼搭步骤</div>
    	<div class="step-imgs" :style="{backgroundImage:'url('+bgUrl[now-1]+')'}"></div>
    <div class="footer ptFont">
    	<div class="page-info">{{now}}/{{max}}</div>
    	<div class="btn">
    		<span class="icon prev" v-tap="{ handler:prevStep}"></span>
    		<span class="icon next" v-tap="{ handler:nextStep}"></span>
    	</div>
    </div>
  </div>  
</template>
<script>
import back from "../components/back";
export default {
  name: 'control',
  data(){
    return {
      active:0,
      index:1,
      bgUrl:[],
      max:1,
      now:1
    }
  },
  computed: {
    
  },
  created(){
    this.index = this.$route.query.id ;
    let maxArr = [0,29,8,8];
    this.max = maxArr[this.index] ;
    for(let i=1;i<=this.max;i++){
    	this.bgUrl.push(require(`../../static/imgs/demo/step${this.index}/step${i}.jpg`));
    }
    // console.log(this.$route.query) ;
    //this.changeActive(this.$route.name) ;
  },
  beforeDestroy(){
   
  },
  components: {
   back,
   
  },
  
  methods:{
  	nextStep(){
  		if(this.now < this.max){
  			this.now ++ ;
  		}
  	},
  	prevStep(){
  		if(this.now>1){
  			this.now -- ;
  		}
  	}
  }
}

</script>
<style lang="less">
  .iPhoneX .footer{
    height:138px !important;
    padding-bottom: 30px !important;
  }
</style>
<style lang="less" scoped>
.bg{
  background-color: #fff;
}
.title{
  width: 50%;
  margin: auto;
  padding-top: 60px;
  margin-bottom: 70px;
  font-size: 32px;
  color:#FCB415;
}
.step-imgs{
	width: 100%;
	height: 450px;
	margin: auto;
	background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
}

.footer {
  position: fixed;
  display: flex;
  justify-content: space-between;
  padding-left: 50px;
  color: #fff;
  font-size: 30px;
  padding-right: 50px;
  align-items: center;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 108px;
  background-image: linear-gradient(-180deg, #FFE964 3%, #EFC41F 100%);
  .btn{
  	.icon{
  		transition: all .3s;
  		margin-left: 20px;
  	}
  	.icon:active{
		transform: scale(1.1, 1.1);
  	}
  }
}
</style>