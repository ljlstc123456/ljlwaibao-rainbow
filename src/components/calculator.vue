<template>
  <div @touchmove="move($event)">
  	<div class="formula">
  		<div class="A" @touchmove="onA($event)">?</div>
  		<div class="plus"></div>
  		<div class="B">?</div>
  		<div class="equal"></div>
  		<div class="result">
  			<div class="C">?</div>
  			<div class="D"></div>
  		</div>
  		
  	</div>
    <div class="digit-bar">
    	<div>
    		<span class="plus">+</span>
    		<span class="reduce">-</span>
    		<span class="equal">=</span>
    		<span v-for="(item,index) in 21" @touchstart="start($event)">{{item-1}}</span>
    	</div>
    </div>
    <div class="test" :style="{top:top+'px',left:left+'px'}">2</div>
  </div>
</template>
<script>
import {offsetLeft,offsetTop} from "../unit.js"
export default {
  props: {
    visible: {
      default: false
    }
  },
  data(){
    return {
      top:10,
      left:10
    }
  },
  computed: {
    
  },
  watch:{
    
  },
  mounted(){
  	let a = document.querySelector(".A") ;
    console.log(a.scrollWidth+6);
    console.log(offsetLeft(a)) ;
    console.log(offsetTop(a)) ;
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

  	start(e){
  		console.log(e) ;
  	},
  	move(e){
  		this.left = e.touches[0].clientX ;
  		this.top = e.touches[0].clientY ;
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
	.test{
		position: fixed;
		width: 30px;
		height: 30px;
		background: red;
		color: #fff;
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
			&:hover{
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
			border: 3PX dashed #fff;
			border-radius: 8px;
			background-color: rgba(255, 255, 255, .5);
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
				&.plus{
					border-radius: 8px;
					background: #CE48FF;
				}
				&.reduce{
					border-radius: 8px;
					background: #7FDD14;
				}
				&.equal{
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
