<template>
  <div class="wrap">
    <i v-for="(item,i) in ball" :key="i" class="icon" :ref="'color'+item.index" :class="'color'+item.index" @click="sendCode(item.code,item)"></i>
  </div>
</template>
<script>
import {randomFrom} from "../unit.js"
export default {
  props: {
    ball: {
      default: []
    },
    position: {
      default: []
    }
  },
  data() {
    return {
      poolTimer: 0,
      pool:[]
    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {
    this.$nextTick(function() {
      this.pool = Object.assign([],this.ball) ;
      this.findBall() ;
      this.poolTimer = setInterval(()=>{
      	this.findBall() ;
      },100) ;
    });
  },
  created() {

  },
  beforeDestroy() {
  	clearInterval(this.poolTimer) ;
  },
  components: {
    // BottomBar,
    // jheader
  },

  methods: {
    sendCode(code,item){
      this.$emit( "setindex", item.index );
      var $el = $(this.$refs["color" + item.index]) ;
      var p  = $el.attr("data-p") ;
      var that = this;
      $el.velocity("stop",true).velocity({
        p: {
          opacity: 0,
          scale: "4"
        },
        o: {
          duration: 300
        }
      }).velocity({
        p: {
          scale: "1"
        },
        o: {
          duration: 500,
          complete: (elements)=> {
            //console.log(elements) ;
            $(elements).removeAttr("style") ;
            that.position.push(p);
            that.pool.push(item);
          }
        }
      });
      // var that = this ;
      // var p  = $el.attr("data-p") ;
      // console.log(index,p) ;
      playMusic();
      this.$hybrid({
          "action":"send",
          "params":JSON.stringify({
            "code":code
          })
        }) ;
    },
    findBall() {
      if (this.position.length <= 0) {
        return;
      }
      //选择一个坑
      let p = this.position.splice(randomFrom(0, this.position.length-1), 1);
      //选择一个元素
      let item = this.pool.splice(randomFrom(0, this.pool.length-1), 1);
      this.upBall(this.$refs["color" + item[0].index], item[0], p[0]);
    },
    //气球上升
    upBall(el, item, p, objs) {
      $(el).removeAttr("style").attr("data-p",p).velocity({
        p: { bottom: p + "rem" },
        o: {
          duration: randomFrom(1500, 3000),
          easing: [.26, .93, .67, .87]
        }
      }).velocity({
        p: { translateY: "10px" },
        o: {
          duration: 1000,
          loop: randomFrom(4, 7)
        }
      }).velocity({
        p: {
          opacity: 0
        },
        o: {
          duration: 300,
          complete: (elements)=> {
            //console.log(elements) ;
            $(elements).removeAttr("style") ;
            this.position.push(p);
            this.pool.push(item);
          }
        }
      });
    }
  }
}

</script>
<style lang="less" scoped>
.wrap {
  height: 700px;
  width: 100/6%;
  position: relative;
  i {
    position: absolute;
    left: 10%;
    bottom: -300px;
    overflow: visible;
    /* &.active{
      background-size: 100% 100%;
       transform: scale(1.1, 1.1); 
    } */
  }
}

</style>
