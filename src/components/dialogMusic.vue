<template>
  <div class="modal" v-if="visible" @click.self="close">
    <div class="dialog animated slideInDown">
      <h2>选择声音</h2>
      <div class="content">
        <div class="left">
          <div v-for="n in 4" :class="select==(n-1)?'active':''" @click="selectItem(n-1)">
            <i class="icon" :class="classIcon[n-1]"></i>
          </div>
        </div>
        <div class="right" ref="right">
          <i class="icon" @click="active = n" :class="active==n?list[select].type+n+' active':list[select].type+n" v-for="n in list[select].num"></i>
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
    type:{
      default:""
    }
  },
  data(){
    return {
      list:[{type:"sdw",num:18},{type:"syin",num:21},{type:"sdh",num:12},{type:"syx",num:7}],
      select:0,
      active:0,
      classIcon:["smenu4","smenu9","smenu6","smenu10"]
    }
  },
  computed: {
    
  },
  watch:{
    select(curVal, oldVal) {　　　　　　　　　　 
      this.$nextTick(()=> {
        this.$refs.right.scrollTop = 0;
      }) ;
    },
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
    selectItem(index){
      this.select = index;
      this.active=0;
    },
    close(){
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
    height: 440px;
    border-radius: 16px;
    background: #CEAAFF;
    overflow: hidden;
    h2{
      font-size: 28px;
      line-height: 64px;
      color: #fff;
      font-family: ptFont,ptFont1;
      background: #9253E8;
      border-radius: 16px 16px 0 0;
    }
    .content{
      display: flex;
      .left{
        width: 118px;
        background: #A468F5;
        height: 386px;
        div{
          height: 64px;
          line-height: 0px;
          border-bottom: 1px solid #9253E8;
          border-left: 8px solid transparent;
          display: flex;
          justify-content: center;
          align-items: center;
          i{
            margin-left: -10px;
          }
          &.active{
            border-left: 8px solid #A7FFBD;
          }
        }
      }
      .right{
        flex: 1;
        background: #CEAAFF;
        height: 386px;
        display: flex;
        padding: 36px 0;
        flex-wrap: wrap;
        overflow-y: scroll;
        i{
          margin-left: 33px;
          margin-bottom: 30px;
          transition: all 0.3s;
          &.active{
            transform: scale(1.1, 1.1);
          }
        }
      }
    }
  }
}
</style>
