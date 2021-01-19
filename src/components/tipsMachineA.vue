<template>
  <div class="modal">
    <div class="dialog animated slideInDown">
      <img :src="src[type]" alt="">
      <div class="footer">
        <a href="javascript:;" @click="close"></a>
        <a href="javascript:;" @click="submit"></a>
      </div>
      <div class="people"></div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      type:0,
      src:[require("../../static/imgs/dialogm.png"),require("../../static/imgs/dialogmax.png"),require("../../static/imgs/dialogmute.png")],
      ready:false,
      resolve: '',
      reject: '',
      promise: '', // 保存promise对象
    }
  },
  computed: {
    
  },
  mounted(){
    setTimeout(()=>{
      this.ready = true ;
    },800) ;
  },
  created(){
    this.ready = false ;
  },
  beforeDestroy(){
    this.ready = false ;
  },
  components: {
    // BottomBar,
    // jheader
  },
  
  methods:{
    close(){
      if(this.ready){
        //this.$emit( "update:visible", false );
        this.reject('cancel');
      }
    },
    //确定,将promise断定为完成态
    submit() {
      this.resolve('submit');
      //this.$emit( "update:visible", false );
    },
    //显示confirm弹出,并创建promise对象，给父组件调用
    confirm(type = 0) {
      this.type = type ;
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
      return this.promise; //返回promise对象,给父级组件调用
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
  z-index: 11;
  .people{
     position: absolute;
     background-image:url(../../static/imgs/dialogp.png);
      background-size: 100% 100%;
     width: 118px;
     height: 122px;
     bottom: -2PX;
     right: -2PX;
  }
  .dialog{
    width: 660px;
    height: 350px;
    border-radius: 25px;
    background-image:url(../../static/imgs/dialogbg.png);
    background-size: 100% 100%;
    position: relative;
    overflow: visible;
    text-align: center;
    padding-top:50px;
    img{
      width: 201px;
    }
  }
}
.footer{
  position: absolute;
  bottom: 5px;
  left: 0;right: 0;
  text-align: center;
  a{
    display: inline-block;
    width: 128px;
    height: 64px;
    background-size: 100% 100%;
    &:active{
      transform: scale(0.9, 0.9);
    }
    &:first-child{
      background-image: url('../../static/imgs/dialog-cancel.png')
    }
    &:last-child{
      margin-left: 30px;
      background-image: url('../../static/imgs/dialog-ok.png')
    }
  }
}
</style>
