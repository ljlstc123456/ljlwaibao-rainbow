<template>
  <div @touchmove="move($event)" @touchend="end">
  	<div class="formula">
  		<div class="A" :class="[hoverA, activeA]">{{Atext}}</div>
  		<div class="plus" :class="[hoverPlus, activePlus]">{{plustext}}</div>
  		<div class="B" :class="[hoverB, activeB]">{{Btext}}</div>
  		<div class="equal" :class="[hoverEqual, activeEqual]">{{equaltext}}</div>
  		<div class="result" :class="result!==''?'active':''">
  			<div class="C">?</div>
  			<div class="D">{{result}}</div>
  		</div>
  		
  	</div>
    <div class="digit-bar">
    	<div>
    		<span class="plus1"  @touchstart="start($event,'+')">+</span>
    		<span class="reduce" @touchstart="start($event,'-')">-</span>
    		<span class="equal1" @touchstart="start($event,'=')">=</span>
    		<span v-for="(item,index) in 21" @touchstart="start($event,item-1)">{{item-1}}</span>
    	</div>
    </div>
    <div class="select" :class="selectClass" :style="{top:top+'px',left:left+'px'}">{{selectText}}</div>
  </div>
</template>
<script>
import {offsetLeft,offsetTop} from "../unit.js"
import codes from "../code.js"
export default {
  props: {
    visible: {
      default: false
    }
  },
  data(){
    return {
      top:10,
      left:10,
      ACenter:{},
      plusPosition:{},
      BCenter:{},
      equalPosition:{},
      resultCenter:{},
      hasDrag:false,
      selectClass:"",
      selectText:"",
      pointOffset:"",
      hoverA:"",
      activeA:"",
      hoverB:"",
      activeB:"",
      Atext:"?",
      Btext:"?",
      hoverPlus:"",
      activePlus:"",
      plustext:"",
      hoverEqual:"",
      activeEqual:"",
      equaltext:"",
      activeResult:"",
      result:""
    }
  },
  computed: {
  },
  watch:{
  },
  mounted(){
    //计算圆心和举行的区域
    this.ACenter = this.setCenter(document.querySelector(".A")) ;
    this.plusPosition = this.setPostion(document.querySelector(".plus")) ;
    this.BCenter = this.setCenter(document.querySelector(".B")) ;
    this.equalPosition = this.setPostion(document.querySelector(".equal")) ;
    this.resultCenter = this.setCenter(document.querySelector(".result")) ;
  },
  created(){
    
  },
  beforeDestroy(){
    
  },
  components: {
    // BottomBar,
    // jheader
  },
  
  methods:{
    setPostion(a){
      return {
        x0:offsetLeft(a),
        x1:offsetLeft(a)+a.scrollWidth+6,
        y0:offsetTop(a),
        y1:offsetTop(a)+a.scrollHeight+6
      }
    },
    setCenter(a){
      let r = (a.scrollWidth+6)/2 ;
      return {
        x:offsetLeft(a)+r,
        y:offsetTop(a)+r,
        r:r
      }
    },
    /** 
     *  判断一个点是否在圆的内部 
     *  @param point  测试点坐标 
     *  @param circle 圆心坐标 
     *  @param r 圆半径 
     *  返回true为真，false为假 
     *  */  
    pointInsideCircle(point, circle, r) {  
        if (r===0) return false  ;
        var dx = circle[0] - point[0]  ;
        var dy = circle[1] - point[1]  ;
        return dx * dx + dy * dy <= r * r  ;
    },
    pointInsideRect(point,rect){
      if(point[0]>=rect.x0&&point[0]<=rect.x1){
        if(point[1]>=rect.y0&&point[1]<=rect.y1){
          return true;
        }
      }
      return false ;
    },
    getResult(){
      let result = "";
      let code = codes["digit"][41] ;
      if(this.plustext!==""
        &&this.equaltext!==""
        &&this.Atext!==""
        &&this.Btext!==""
        &&this.Atext!=="?"
        &&this.Btext!=="?"){
        result = this.Atext+(this.plustext=="+"?this.Btext:0-this.Btext) ;
        this.result =  result;

        if(result>=0){
          code = codes["digit"][result] ;
        }
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
                "code":"B1113002"
              })
          }) ;
        },200) ;

        
      }else{
        this.result = "" ;
      }
    },
  	start(e,n){
  		switch(n){
        case "+":
          this.selectClass = "plus";break;
        case "-":
          this.selectClass = "reduce";break;
        case "=":
          this.selectClass = "equal";break;
        default:
          this.selectClass = "normal";break;
      }
      this.pointOffset = {
        x:e.touches[0].clientX - offsetLeft(e.target),
        y:e.touches[0].clientY - offsetTop(e.target)
      }
      this.left = offsetLeft(e.target) ;
      this.top = offsetTop(e.target) ;
      this.selectText = n ;
      this.hasDrag = true;
  	},
    end(){
      if(!this.hasDrag){
        return ;
      }
      
      if(this.hoverA == 'hover'){
        this.Atext = this.selectText ;
        this.activeA = 'active' ;
        this.hoverA = '' ;
      }
      if(this.hoverB == 'hover'){
        this.Btext = this.selectText ;
        this.activeB = 'active' ;
        this.hoverB = '' ;
      }
      if(this.hoverPlus == 'hover'){
        this.plustext = this.selectText ;
        this.activePlus = this.selectClass =="plus"?'active1':'active2' ;
        this.hoverPlus = '' ;
      }
      if(this.hoverEqual == 'hover'){
        this.equaltext = this.selectText ;
        this.activeEqual = 'active' ;
        this.hoverEqual = '' ;
      }
      this.selectClass = "" ;
      this.selectText = "" ;
      this.hasDrag = false;
      if(this.result !==''){
        this.result = "" ;
        setTimeout(()=>{
          this.getResult() ;
        },600) ;
      }else{
        this.getResult() ;
      }
      
    },
  	move(e){
      if(this.hasDrag){
        this.left = e.touches[0].clientX - this.pointOffset.x ;
        this.top = e.touches[0].clientY - this.pointOffset.y ;
        if(this.selectClass=="normal"){ //判断是否进入A，B位
          this.putNormal() ;
        }else{
          this.putPluseAndReduce() ;
        }
      }
      
  	},
    putNormal(){
      //是否在A位
      if(this.pointInsideCircle([this.left,this.top], [this.ACenter.x,this.ACenter.y], this.ACenter.r)){
        this.hoverA = "hover" ;
        //this.activeA = "" ;
      }else{
        this.hoverA = "" ;
      }
      //是否在B位
      if(this.pointInsideCircle([this.left,this.top], [this.BCenter.x,this.BCenter.y], this.BCenter.r)){
        this.hoverB = "hover" ;
        //this.activeB = "" ;
      }else{
        this.hoverB = "" ;
      }
    },
    putPluseAndReduce(){
      if(this.selectClass == "plus"||this.selectClass == "reduce"){
        //是否在符号位
        if(this.pointInsideRect([this.left,this.top], this.plusPosition)){
          this.hoverPlus = "hover" ;
          this.activePlus = "" ;
        }else{
          this.hoverPlus = "" ;
        }
      }else{
        //是否在等号位
        if(this.pointInsideRect([this.left,this.top], this.equalPosition)){
          this.hoverEqual = "hover" ;
          this.activeEqual = "" ;
        }else{
          this.hoverEqual = "" ;
        }
      }
    },
  	onA(e){
  		console.log(1) ;
  	},
    scan(){
      this.scanError = false ;
      this.$hybrid({
          "action":"bluetooth",
          "params":"{}",
          "callback":(data)=>{
            if(data.length<=0){
              this.scanError = true;
            }else{
              this.scanError = false;
            }
            this.list = this.list.concat(data) ;
           }
        }) ;
    },
    unlink(){
      playMusic();
      this.list.map((item)=>{
        return item.status = 0;
      }) ;
      this.$hybrid({
        "action":"unlink",
        "params":"{}",
        "callback":"test"
      }) ;
    },
    link(id,index){
      this.list.map((item)=>{
        return item.status = 0;
      }) ;
      playMusic() ;
      this.$hybrid({
          "action":"link",
          "params":JSON.stringify({
            "peripheralID":id+""
          }),
          "callback":(status)=>{
            this.list[index].status = status ;
            this.list = this.list.slice(0) ;
            setTimeout(()=>{
              this.close();
            },2000) ;
           }
        }) ;
    },
    close(){
      if(this.ready){
        this.$emit( "update:visible", false );
      }
    }
  }
}

</script>
<style lang="less">
  .iPhoneX .digit-bar{
    bottom:138px !important;
  }
</style>
<style lang="less" scoped>
	.select{
		position: fixed;
    display: inline-block;
    font-size: 26px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 50%;
    background: #FCB415;
    color: #fff;
    visibility: hidden;
    &.normal{
      visibility: visible;
    }
    &.plus{
      visibility: visible;
      border-radius: 8px;
      background: #CE48FF;
    }
    &.reduce{
      visibility: visible;
      border-radius: 8px;
      background: #7FDD14;
    }
    &.equal{
      visibility: visible;
      border-radius: 8px;
      background: #15CAFC;
    }
	}
	.formula{
		width: 935px;
		padding-top: 50px;
		margin: auto;
		display: flex;
		justify-content: space-around;
		align-items: center;
		.A,.B,.C,.D,.result{
			width: 200px;
			height: 200px;
			line-height: 200px;
			font-size: 120px;
			text-align: center;
			color: #fff;
			border-radius: 50%;
			background-color: rgba(255, 255, 255, .5);
			border: 3PX dashed #fff;
      &.hover,&.hover.active{
        background: rgba(142,142,142,0.50);
        border-color: transparent;
        color: transparent;
      }
      &.active{
        background: #fff;
        border-color: transparent;
        color: #FCB415;

      }
		}
		.result{
			position: relative;
			background-color:transparent;
			perspective: 1000px;
			border-color: transparent;
			.C,.D{
				position: absolute;
				left: -3PX;
				top: -3PX;
				backface-visibility: hidden;
				transition: all 1s;
				transform: rotateY(0deg);
			}
			.D{
				transform: rotateY(-180deg);
				background: transparent;
			}
			&.active{
        background-color: rgba(255, 255, 255, .5);;
        border-color: transparent;
        color: transparent;
				.C{
					transform: rotateY(180deg);
				}
				.D{
					background: #FCB415;
					color: #fff;
					border-color:#FCB415 ;
					transform: rotateY(0deg);
				}
			}
		}
		.plus,.equal{
			width: 60px;
			height: 60px;
      line-height: 60px;
      font-size: 40px;
			border: 3PX dashed #fff;
			border-radius: 8px;
			background-color: rgba(255, 255, 255, .5);
      color: transparent;
      &.hover{
        background: rgba(142,142,142,0.50);
        border-color: transparent;
        color: transparent;
      }
		}
    .plus.active1{
      background: #CE48FF;
      border-color: transparent;
      color: #fff;
    }
    .plus.active2{
      background: #7FDD14;
      border-color: transparent;
      color: #fff;
    }
    .equal.active{
      background: #15CAFC;
      border-color: transparent;
      color: #fff;
    }
	}
	.digit-bar{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 108px;
		padding-bottom: 18px;
		div{
			margin: auto;
			width: 720px;
			height: 140px;
			background: #fff;
			border-radius: 16PX;
			border: 2PX solid #FCB415;
			padding-top: 20px;
			span{
				float: left;
				display: inline-block;
				font-size: 26px;
				width: 40px;
				height: 40px;
				line-height: 40px;
				margin-left: 18px;
				margin-bottom: 20px;
				text-align: center;
				border-radius: 50%;
				background: #FCB415;
				color: #fff;
				transition: all .3s;
				&.plus1{
					border-radius: 8px;
					background: #CE48FF;
				}
				&.reduce{
					border-radius: 8px;
					background: #7FDD14;
				}
				&.equal1{
					border-radius: 8px;
					background: #15CAFC;
				}
				&:active{
					transform: scale(1.1, 1.1)
				}
			}
		}
	}
</style>
