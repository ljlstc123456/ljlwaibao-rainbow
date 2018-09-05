<template>
  <div class="modal" v-if="visible" @click.self="close">
    <div class="dialog animated slideInDown">
      <h2>蓝牙连接</h2>
      <div class="content" v-if="list.length>0">
        <div class="list" v-for="(item,index) in list" @click="link(item.status,item.peripheralID,index)">
          <span>{{item.name}}</span>
          <span :class="item.status == 1?'active':''"></span>
        </div>
      </div>
      <div class="nodata" v-if="list.length<=0">
        <div v-if="!scanError">
          <img src="../../static/imgs/home/leida.png" class="roll" alt="">
          <div>正在搜索</div>
        </div>
        <div v-else>
          没有搜索到设备，<i @click="scan">点击重试</i>
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
    }
  },
  data(){
    return {
      list:[],
      scanError:false,
      ready:false
    }
  },
  computed: {
    
  },
  watch:{
    visible(newQuestion, oldQuestion){
      if(newQuestion == true){
        this.list = [] ;
        this.scan();
      }
    }
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
    link(status,id,index){
      if(status == 1){
        this.unlink() ;
        return ;
      }
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
  z-index: 10;
  .dialog{
    width: 600px;
    height: 400px;
    border-radius: 25px;
    background: #fff;
    position: relative;
    overflow: auto;
    .content{
      height: 336px;
      overflow-y: auto;
    }
    .nodata{
      position: absolute;
      top: 64px;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #fff;
      border-radius:0 0 25px 25px;
      padding-top: 100px;
      text-align: center;
      color: #F89627;
      font-size: 20px;
      img{
        width: 100px;
        height:100px;
      }
    }
    h2{
      font-size: 28px;
      line-height: 64px;
      color: #fff;
      font-family: ptFont,ptFont1;
      background-image: linear-gradient(-180deg, #F89627 0%, #FF7B08 99%);
      border-radius: 24px 24px 0 0;
    }
    .list{
      font-size: 24px;
      font-family: ptFont,ptFont1;
      padding: 13px 76px 13px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1PX solid #ccc;
      background: #fff;
      &:active{
        background: #eee;
      }
      span.active{
        background-image: url('../../static/imgs/link.png');
      }
      span:last-child{
        display: inline-block;
        width: 73px;
        height: 56px;
        background-size: 100% 100%;
        background-image: url('../../static/imgs/unlink.png');
      }
    }
  }
}
</style>
