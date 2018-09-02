<template>
  <div class="bg">
    <div class="icon deng" :class="'colord'+setindex"></div>
    <back></back>
    <div class="title"><i class="icon colortitle"></i></div>
    <!-- <swiper class="myswiper" :options="swiperOption" ref="mySwiper" @someSwiperEvent="">
   
      <swiper-slide>
        <i v-for="n in 8" class="icon" :class="'color'+n"></i>
      </swiper-slide>
      <swiper-slide>
        <i v-for="n in 8" class="icon" :class="'color'+(n+8)"></i>
      </swiper-slide>
      <swiper-slide>
        <i v-for="n in 8" class="icon" :class="'color'+(n+16)"></i>
      </swiper-slide>
     
    </swiper> -->
    <div class="myswiper">
      <balloon v-for="(item,index) in balls" @setindex="val=>setindex = val" :key="index" :ball="item" :position="positions[index]"></balloon>
    </div>
  </div>
</template>
<script>
import back from "../components/back";
import balloon from "../components/balloon";
export default {
  name: 'moreColor',
  data(){
    return {
      poolTimer:0,
      setindex:0,
      balls:[
      [{index:3,code:'E159BC76'},{index:2,code:'E131F6C6'},{index:5,code:'E1357AB7'},{index:4,code:'E164FFF2'},{index:8,code:'E170DC22'}],
      [{index:1,code:'E11EBCAF'},{index:6,code:'E11588EC'},{index:10,code:'E1C71F8B'},{index:15,code:'E1DF173A'},{index:14,code:'E1A7529E'},{index:18,code:'E1FA9727'},{index:12,code:'E1CC3EA5'}],
      [{index:13,code:'E1D4A4FD'},{index:17,code:'E1F3FF4D'},{index:7,code:'E1A4B3FD'},{index:9,code:'E1AD4422'},{index:11,code:'E1CB5621'},{index:23,code:'E1FFA681'},{index:24,code:'E1FFDB00'}],
      [{index:16,code:'E1EA368D'},{index:19,code:'E1FDA4E1'},{index:20,code:'E1FF7B44'},{index:22,code:'E1FF561F'},{index:21,code:'E1FF45CC'}],
      ],
      positions:[[1.8,4.7],[1,3.1,4.5],[1.1,3.2,4.7],[1.7,3.5]]
    }
  },
  computed: {
    
  },
  created(){
    //this.changeActive(this.$route.name) ;
  },
  mounted: function () {
    // this.$nextTick( function(){
    //   this.poolTimer = animate([1,2],[1,3],this.$refs) ;
    // })
  },
  beforeDestroy(){
    resetMachine() ;
  },
  components: {
    back,
    balloon
    // jheader
  },
  
  methods:{
    
  }
}

</script>
<style lang="less" scoped>
.bg{
  background-repeat: no-repeat; 
  background-position: center center; 
  background-size: cover; 
  background-image: url('../../static/imgs/control/bgcolor.jpg') ;
  .title{
    width: 50%;
    margin: auto;
    padding-top: 30px;
    text-align: center;
    .icon{
      position: static;
    }
  }
  .icon{
    position: absolute;
   /*  transition: all .3s; */
  }
  /* .icon:active{
    transform: scale(.95, .95);
  } */
}

.deng{
  position: absolute;
  top: 0;
  right: 55px;
}
.myswiper{
  position: absolute;
  bottom: 0;
  width: 100%;
  top:90px ;
   padding: 0 20px;
  overflow: hidden;
  display: flex;
  justify-content: space-around;
}
</style>
