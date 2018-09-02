<template>
  <div class="modal" v-if="visible" @click.self="close">
    <div class="dialog animated slideInDown">
      <h2>灯光颜色</h2>
      <div class="content">
      	<div v-for="n in 24" @click="selectColor('#000000')">
      	<i class="icon" :class="'scolor'+n" ></i>
      	</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    visible: {
      default: false
    },
    callbackStr:{
    	default: "xxxxx"
    }
  },
  data(){
    return {
      list:[{type:"sdw",num:18},{type:"syx",num:7},{type:"sdh",num:10}],
    }
  },
  computed: {
    
  },
  watch:{
    // visible(newQuestion, oldQuestion){
    //   if(newQuestion == true){
    //     this.$hybrid({
    //       "action":"bluetooth",
    //       "callback":(data)=>{
    //         this.list = data ;
    //        }
    //     }) ;
    //   }
    // }
  },
  mounted(){
    
  },
  created(){
    
  },
  components: {
    // BottomBar,
    // jheader
  },
  
  methods:{
  	selectColor(color){
  		this.close(color) ;
  	},
    selectItem(index){
      this.select = index;
      this.active=0;
    },
    close(color){
      var color = color || null ;
      var json = {
  			callback:this.callbackStr,
  			data:color
  		};
  		window.frames[0].postMessage(JSON.stringify(json),"*") ;
      this.$emit( "update:visible", false );
    }
  }
}

</script>
<style lang="less" scoped>
.modal{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .5);
  display: flex;
  justify-content: center;
  align-items: center;
  .dialog{
    width: 600px;
    /* height: 400px; */
    border-radius: 16px;
    overflow: hidden;
    h2{
      font-size: 28px;
      line-height: 64px;
      color: #fff;
      font-family: ptFont;
      background: #FFA800;
      border-radius: 16px 16px 0 0;
    }
    .content{
      display: flex;
      background: #FFE9C0;
      padding: 24px 36px 0 0;
      flex-wrap: wrap;
      overflow: scroll;
      i{
      	width: 56px;
      	height: 56px;
      	margin-left: 36px;
      	margin-bottom: 30px;
      }
    }
  }
}
</style>
