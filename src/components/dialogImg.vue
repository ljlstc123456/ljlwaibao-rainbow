<template>
  <div class="modal" v-if="visible" @click.self="close">
    <div class="dialog animated slideInDown">
      <h2>选择图片</h2>
      <div class="content">
        <div class="left">
          <div v-for="n in 6" :class="select==(n-1)?'active':''" @click="selectItem(n-1)">
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
      list:[{type:"ssg",num:10},{type:"sjt",num:12},{type:"sbq",num:12},{type:"sfz",num:12},{type:"ssw",num:8},{type:"snum",num:36}],
      select:0,
      active:0,
      classIcon:["smenu7","smenu5","smenu3","smenu8","smenu1","smenu2"]
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
    border-radius: 16px;
    overflow: hidden;
    h2{
      font-size: 28px;
      line-height: 64px;
      color: #fff;
      font-family: ptFont,ptFont1;
      background: #16C141;
      border-radius: 16px 16px 0 0;
    }
    .content{
      display: flex;
      .left{
        width: 118px;
        background: #20D94E;
        height: 386px;
        div{
          height: 64px;
          line-height: 0;
          border-bottom: 1px solid #16C141;
          display: flex;
          justify-content: center;
          align-items: center;
          border-left: 8px solid transparent;
          i{
            margin-left: -10px;
          }
          &:last-child{
            border-bottom: none;
          }
          &.active{
            border-left: 8px solid #A7FFBD;
          }
        }
      }
      .right{
        flex: 1;
        background: #A7FFBD;
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
