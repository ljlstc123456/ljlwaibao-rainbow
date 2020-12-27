<template>
  <div class="bg bgperfect">
    <back></back>  
    <div class="ptwFont title">协作与竞赛</div>
    <div class="myswiper">
      <div class="wrap">
        <div v-for="n in 3">
          <h3 class="ptwFont">{{info[n].title}}</h3>
          <p>{{info[n].p}}</p>
          <ul>
            <li v-for="(item,index) in info[n].block">
              <a href="javascript:;" class="icon" :class="item"></a>
            </li>
          </ul>
          <img :src="info[n].url" alt="">
          <span class="step" @click="go('/home/demo/demoStep',n)"></span>
          <span :class="n == 3?'other':''" @click="go('/home/demo/demoStep1',n)"></span>
        </div>
      </div>
    </div>
  </div>  
</template>
<script>
import back from "../components/back"
export default {
  name: 'control',
  data(){
    return {
      // url:["",require('../../static/imgs/demo/demo2.gif'),require('../../static/imgs/demo/demo3.gif')],
      // info:["",
      // {
      //   title:"打蛋机",
      //   p:"打蛋机是食品加工中常用的搅拌调和装置，用来打粘稠浆体，如糖浆，面浆，乳酪等。通过电机带动大齿轮旋转，与大齿轮连接的小齿轮就会加速旋转",
      //   url:require('../../static/imgs/demo/demo1.gif'),
      //   block:["demoItem4","demoItem6","demoItem7"]
      // },
      // {
      //   title:"基础功能",
      //   p:"连接线连接不同积木，电源给积木供电，主控制器控制积木，RGB灯发出彩光，扬声器播放音乐，电机转动，显示屏显示图片",
      //   url:require('../../static/imgs/demo/demo2.gif'),
      //   block:["demoItem1","demoItem2","demoItem3","demoItem4","demoItem5","demoItem6","demoItem7"]
      // },
      // {
      //   title:"翻斗车",
      //   p:"翻斗车通过电机传动实现前后运动，通过蜗轮蜗杆实现翻斗功能，此外可以实现声音、灯光、显示图片的功能",
      //   url:require('../../static/imgs/demo/demo3.gif'),
      //   block:["demoItem1","demoItem2","demoItem3","demoItem4","demoItem5","demoItem6","demoItem7"]
      // }]

      info:["",
      {
        title:"赛车挑战赛",
        p:"通过竞速、精准停靠、搬运货物等方式，让学员将所学编程知识应用于实践项目，既能考查学员的编程技能，又能实现寓教于乐的教育目标。",
        url:require('../../static/imgs/demo/demo1.jpg'),
        block:["demoBtn1","demoBtn2","demoBtn3"]
      },
      {
        title:"携手大作战",
        p:"本竞赛需两人协作完成任务，通过亲自体验搭建与编程实践，让学员学会合理分配任务，建立起良好的合作关系。",
        url:require('../../static/imgs/demo/demo2.jpg'),
        block:["demoBtn1","demoBtn2","demoBtn3","demoBtn6","demoBtn7"]
      },
      {
        title:"任务与闯关",
        p:"此地布由35个方格组成,学生可以在上面进行不同的指令游戏。借助代码条、图形卡片等辅助教具，让编程课堂更具趣味性。",
        url:require('../../static/imgs/demo/demo3.jpg'),
        block:["demoBtn1","demoBtn2","demoBtn3","demoBtn4","demoBtn5","demoBtn6","demoBtn7"]
      }]

    }
  },
  computed: {
    
  },
  created(){
    //this.changeActive(this.$route.name) ;
  },
  components: {
   back
    // jheader
  },
  beforeDestroy(){
    resetMachine();
  },
  methods:{
    go(url,id){
      playMusic() ;
      setTimeout(()=>{
        this.$router.push({path:url,query:{id:id}}) ;
      },0) ;
      
    }
  }
}

</script>
<style lang="less">
  .iPhoneX .myswiper{
     padding:0px 90px !important;
  }
  
</style>
<style lang="less" scoped>
.bg{
  background-image: url('../../static/imgs/control/bg.jpg') ;
  padding: 0 20px;
}
.title{
  width: 50%;
  margin: auto;
  padding-top: 60px;
  margin-bottom: 70px;
  font-size: 32px;
  color: #fff;
}
.myswiper{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding:0px 60px;
  left: 0;
  top:174px ;
  overflow-x: scroll;
  .wrap{
    height: 100%;
    width: auto;
    white-space:nowrap; 
    div{
      position: relative;
      display: inline-block;
      margin-right: 88px;
      padding-top: 90px;
      padding-left: 168px;
      width: 717px;
      height: 493px;
      ul{
        position: absolute;
        width: 112px;
        top: 55px;
        bottom: 20px;
        left: 18px;
        overflow-y: auto;
        padding: 20px 0;
      }
      h3{
        position: absolute;
        padding-top: 10px;
        padding-left: 20px;
        left: 0;
        color: #fff;
        text-align: left;
        top: 0;
        font-size:30px;
      }
      p{
        position: absolute;
        text-align: justify;
        width: 210px;
        right: 30px;
        top: 80px;
        color: #6D592F ;
        font-size: 18px;
        letter-spacing: 2px;
        line-height: 24px;
        white-space: normal;
      }
      background-image: url('../../static/imgs/demo/item.png');
      background-size: 100% 100%;
      span{
        display: inline-block;
        position: absolute;
        width: 174px;
        height: 56px;
        background-image: url('../../static/imgs/demo/btn1.png');
        background-size: 100% 100%;
        right: 56px;
        bottom: 45px;
        transition: all .3s;
        &.other{
          background-image: url('../../static/imgs/demo/btn2.png');
        }
        &.step{
          background-image: url('../../static/imgs/demo/stepbtn.png');
          right: 56px;
          bottom: 130px;
        }
        &:active{
          transform: scale(1.1, 1.1)
        }
      }
      img{
        float: left;
        object-fit: contain;
        width: 260px;
        height: 330px;
      }
    }
  }
  
  
}
</style>