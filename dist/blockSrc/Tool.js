window.Tool = {
  selectColor: function(cb) {
    window.Tool.select(cb, "selectColor");
  },
  selectImg: function(cb) {
    window.Tool.select(cb, "selectImg");
  },
  selectMusic: function(cb) {
    window.Tool.select(cb, "selectMusic");
  },
  selectCount: function(cb,obj,position) {
    window.Tool.select(cb, "selectCount",obj,position);
  },
  select: function(cb, action,obj,position) {
    var callbackname = 'iframcallback_' + new Date().getTime();
    
    if(action == "selectCount"){
      countSelectInit({
        init:obj.getValue(),
        cb:cb,
        x:position.x,
        y:position.y,
        value:obj.getOptions()
      }) ;
      return ;
    }
    window[callbackname] = function(data) {
      cb(data);
      window[callbackname] = undefined;
    }
    window[action].visible = true;
    window[action].callback = window[callbackname] ;
  },
  play:function(code){
    sendNative({
        "action":code,
        "params":"{}",
        "callback":function(){}
    }) ;
  }
} ;

window.action = function(code){
  sendNative({
      "action":"send",
      "params":JSON.stringify({
        "code":code
      }),
      "callback":"openBlue"
  }) ;
}
// var audio = document.getElementById("audio") ;
window.playMusic = function(){
  sendNative({
      "action":"active",
      "params":"{}",
      "callback":function(){}
  }) ;
}

window.openBlue = function(){
  resetInterpreter(1) ;
  window.blueTooth.visible = true;
} ;

window.stopAction = function(){
  resetInterpreter(1) ;
}
window.screenRotate = function(obj){
  window.deviceInfo = obj ;
  setLeftRight() ;
} ;
window.setLeftRight = function(){
  if("deviceInfo" in window){
    if(window.deviceInfo.name == "iPhoneX"){
      if(window.deviceInfo.direction == "left"){
        $(".blocklyToolboxDiv").addClass("leftlh") ;
      }else{
        $(".blocklyToolboxDiv").removeClass("leftlh") ;
      }
    }
  }
}
var  a = "pc" ;
if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    a = "ios";
} else if (/(Android)/i.test(navigator.userAgent)) {
    a = "android";
}
function mockHybrid(opts) {
  console.info('hybrid 调用: ', opts);
  if(opts.action=="bluetooth"){
    setTimeout(function(){
      opts.callback && opts.callback([])
    },5000) ;
    
  }else if(opts.action=="link"){
    opts.callback && opts.callback(1)
  }
  //opts.callback && opts.callback([{"name":"xxx1","peripheralID":1,"status":"0"},{"peripheralID":2,"name":"xxx2","status":"0"},{"peripheralID":3,"name":"xxx3","status":"0"}]);
}

function paddingZW(jsonStr) {
  var json = JSON.parse(jsonStr) ;
  json.code = "Z"+json.code+"W" ;
  return JSON.stringify(json) ;
} ;

function sendNative(opts) {
  // if (a == "pc") {
  //   console.log('mock data');
  //   return mockHybrid(opts);
  // }
  //console.log(opts) ;
  var callback = opts.callback,
  callbackname = 'hybrid_callback_' + new Date().getTime();

  if(opts.action=="send"){
    opts.callback = "openBlue" ;
    opts.params = paddingZW(opts.params) ;
  }else if(opts.action=="bluetooth"){
    opts.callback = "hybrid_callback_bluetooth";
    window["hybrid_callback_bluetooth"] = function (data) {
      var payload = data;
      //console.log("创作模式蓝牙列表回调："+data) ;
      callback(payload);
    }
  }else{
    window[callbackname] = function (data) {
      var payload = data;
      callback(payload);
      window[callbackname] = undefined;
    }
    opts.callback = callbackname;
  }

  if(a == "ios"){
    window.webkit.messageHandlers.nativeBridge.postMessage(JSON.stringify(opts));
  }else if(a == "android"){
    window.nativeBridge.request(JSON.stringify(opts)) ;
  }
  
}