$(function() {
  var $point = $(".point"),
      $sliderOver = $(".slider-over"),
      $circle = $(".circle"),
      slider = document.querySelector('#countWrap'),
      hammer = new Hammer(document.querySelector('.point')),
      hammer2 = new Hammer(document.querySelector('#countWrap')),
      center = 0,
      leftInit = parseFloat($point.css("left")),
      value = [1, 2, 3, 4, 5],
      valueString = [1,2,3,4,5],
      index = 1,
      tableType = window.location.search.indexOf("mobile")!=-1?"mobile":"pad",
      valueUnit = (2 * rem / value.length),
      rem = 100;//parseFloat(getComputedStyle(document.getElementsByTagName("html")[0], undefined).fontSize);
  
  var callback = function(){

  };
  $point[0].addEventListener('touchstart', function(ev) {
    center = ev.touches[0].clientX;
  });
  $point[0].addEventListener('mousedown', function(ev) {
    center = ev.clientX;
  });
  // hammer.on('press',function(ev){
  // 	center = ev.center.x ;
  // }) ;
  hammer2.on('pan', function(ev) {
    var x = ev.center.x - center;
    x += leftInit;
    if (center != 0 && x >= 0.2*rem && x <= 2.2* rem) {
      var index1 = parseInt((x-0.2*rem) / valueUnit) + 1 ;
      index1 = index1>value.length?value.length:index1 ;
      $circle.html(value[index1-1]).attr("index",index1);
      //console.log() ;
      $point.css({ "left": x + "px" });
      $sliderOver.css({ "left": (x + 0.3 * rem) + "px" });
    }
    //console.log(ev.srcEvent.pageX - 200) ;
  });

  // hammer2.get('rotate').set({ enable: true });
  // hammer2.on('rotate', function(ev) {
  // 	console.log(ev) ;
  // }) ;
  
  $("#countWrap").on("click",function(e){
  	e.stopPropagation() ;
  }) ;
  slider.addEventListener("touchend", function() {
    leftInit = parseFloat($point.css("left"));
    center = 0;
    callback(valueString[parseInt($circle.attr("index"))-1]) ;
    //$("#countSelect").hide() ;
  });
  slider.addEventListener("mouseup", function() {
    center = 0;
    leftInit = parseFloat($point.css("left"));
    callback(valueString[parseInt($circle.attr("index"))-1]) ;
    //$("#countSelect").hide() ;
  });

  window.countSelectInit = function(para){
  		rem = 100 ;// parseFloat(getComputedStyle(document.getElementsByTagName("html")[0], undefined).fontSize);
  		
  		setTimeout(function(){
  			$("#countSelect").one("click",function(e){
			  $(this).hide() ;
			}) ;
  		},300) ;
  		
  		if(tableType == 'mobile'){
  			$("#countSelect").show() ;
  			$("#countSelect").addClass("onMobile") ;
  		}else{
  			$("#countSelect").css({"display":"block"}).show() ;
  			$("#countWrap").css({left:para.x+"px",top:para.y+"px"}) ;
  		}

  		callback = para.cb;
  		// para.init = para.init == "B121FFFF"?1:para.init;
  		// para.init = para.init == "B122FFFF"?2:para.init;
  		// para.init = para.init == "B123FFFF"?3:para.init;

  		
  		value = para.value.map(function(item){return item[0]});
     
      $circle.html(value[para.init-1]).attr("index",para.init);
      
  		valueString = para.value.map(function(item){return item[1]});
      	valueUnit = (2 * rem / value.length) ;
      	leftInit = (para.init-1)*valueUnit;
      	$point.css({ "left": (leftInit+0.2*rem) + "px" });
        $sliderOver.css({ "left": (leftInit + 0.35 * rem) + "px" });
  } ;
});
