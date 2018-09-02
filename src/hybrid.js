/**
 * 非hybrid模式下mock数据
 * @param {*} opts 
 */
function mockHybrid(opts) {
  //console.info('hybrid 调用: ', opts);
  if(opts.action=="bluetooth"){
    opts.callback && opts.callback([{"name":"xxx1","peripheralID":1,"status":"0"},{"peripheralID":2,"name":"xxx2","status":"0"},{"peripheralID":3,"name":"xxx3","status":"0"}])
  }else if(opts.action=="link"){
    opts.callback && opts.callback(1)
  }
  
}

/**
 * 判断当前环境是否支持hybrid
 */
function paddingZW(jsonStr) {
  var json = JSON.parse(jsonStr) ;
  json.code = "Z"+json.code+"W" ;
  return JSON.stringify(json) ;
} ;
let  a = "pc" ;
if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    a = "ios";
} else if (/(Android)/i.test(navigator.userAgent)) {
    a = "android";
}
export default function(opts) {
  if (a == "pc") {
    //console.log('mock data');
    return mockHybrid(opts);
  }
  const callback = opts.callback,
  callbackname = 'hybrid_callback_' + new Date().getTime();




  if(opts.action=="send"){
    opts.callback = "openBlue" ;
    opts.params = paddingZW(opts.params) ;
    //console.log(opts) ;
  }else if(opts.action=="bluetooth"){
    opts.callback = "hybrid_callback_bluetooth";
    window["hybrid_callback_bluetooth"] = function (data) {
      var payload = data;
      callback(payload);
    }
  }else{
    window[callbackname] = function (data) {
      let payload = data;
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
