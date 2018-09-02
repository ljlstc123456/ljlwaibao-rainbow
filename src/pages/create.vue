<template>
  <div class="index">
    <back></back>
  </div>
</template>
<script>
  import back from "../components/back"
export default {
  name: 'index',
  data(){
    return {
      // transitionName:"fade",
      // active:1
   
    }
  },
  computed: {
    
  },
  created(){
  
  },
  mounted(){
    this.$nextTick(()=>{
      //block() ;
      
    }) ;
  },
  components: {
   
    back
    // BottomBar,
    // jheader
  },
  beforeDestroy(){
    
  },
  methods:{
    test(){
      alert(1) ;
    }
  }
}

</script>
<style lang="less" scoped>
.index{
  height: 100%;
  overflow: hidden;
  iframe{
    width: 100%;
    height: 100%;
  }
}
</style>
