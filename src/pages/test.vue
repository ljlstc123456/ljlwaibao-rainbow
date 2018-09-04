<template>
<div class='drag-content'>
  <div class='project-content'>
    <div class='select-item' draggable='true' @dragstart='drag($event,2)' v-for='pjdt in projectdatas'>{{pjdt.name}}</div>
  </div>
  <div class='people-content'>
    <div class='drag-div' v-for='(ppindex,ppdt) in peopledata' @drop='drop($event)' @dragover='allowDrop($event)'>
      <div class='select-project-item'>
        <label class='drag-people-label'>{{ppdt.name}}:</label>
      </div>
    </div>
  </div>

  <div class="courseLogo">
    <div class="courseBefore" style="background-image: url(img/bks.png);"></div>
    <div class="courseAfter">{{data}}</div>
  </div>  
</div>
</template>

<script>
let dom = null
export default {
  components: {
  },
  ready: function() {
  },
  methods: {
    drag:function(event){

       dom = event.currentTarget ;

    },
    drop:function(event){
      event.preventDefault();
      this.data = 2 ;
     // event.target.appendChild(dom);
    },
    allowDrop:function(event){
      event.preventDefault();
    },
  },
  data() {
    return {
      data:1,
      projectdatas:[{
        id:1,
        name:'葡萄',
      },{
        id:2,
        name:'芒果',
      },{
        id:3,
        name:'木瓜',
      },{
        id:4,
        name:'榴莲',
      }],
      peopledata:[{
        id:1,
        name:'小颖',
      },{
        id:2,
        name:'hover',
      },{
        id:3,
        name:'空巢青年三 ',
      },{
        id:3,
        name:'一丢丢',
      }]
    }
  }
}
</script>
<style scoped>
.courseLogo{
    width: 120px;
    height: 132px;

    float: left;
    margin-top: 1px;
    position: relative;
    box-sizing: border-box;
    perspective: 1000px;
}

.courseBefore{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left: 0;
    background-repeat: no-repeat;
    background-position: center center;
    backface-visibility: hidden;
    transition: 1s;
    background-color: pink;

}
.courseAfter{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left: 0;
    color: #fff;
    background-color: dodgerblue;
    text-indent: 2em;
    transform: rotateY(-180deg);
    backface-visibility: hidden;
    transition: 1s;

}
 .courseLogo:hover .courseBefore{
    transform: rotateY(180deg);
}
.courseLogo:hover .courseAfter{
    transform: rotateY(0deg);
}
.select-item {
  background-color: #5bc0de;
  display: inline-block;
  text-align: center;
  border-radius: 3px;
  margin-right: 10px;
  cursor:pointer;
  padding: 6px 20px;
  color: #fff;
}
 .cursored{
  cursor: default;
}
.project-content,.people-content {
    margin: 30px 50px;
}
.people-content {
    margin-top: 30px;
}
.drag-div {
    border: 1px solid #5bc0de;
    padding:10px;
    margin-bottom: 10px;
    width: 800px;
    cursor: pointer;
}
.select-project-item {
    display: inline-block;
    text-align: center;
    border-radius: 3px;
}
.drag-people-label{
  margin-bottom:0;
  padding-right:10px;
}
</style>