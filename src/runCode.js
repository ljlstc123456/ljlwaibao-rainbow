
import $hybrid from "./hybrid.js" ;

var myInterpreter = null;
var runner;
//注册延迟对象
function initInterpreterWaitForSeconds(interpreter, scope) {
  // Ensure function name does not conflict with variable names.
  var wrapper = interpreter.createAsyncFunction(
    function(timeInSeconds, callback) {
      // Delay the call to the callback.
      //console.time();
      setTimeout(()=>{
      	callback();
      	//console.timeEnd();
      },timeInSeconds * 1000);
    });
  interpreter.setProperty(scope, 'waitForSeconds', wrapper);
}


//js代码接受函数
window.send = function(code){
	$hybrid({
		"action":"send",
        "params":JSON.stringify({
          "code":code
        })
	})
}

//初始化断点函数
function initApi(interpreter, scope) {
  // Add an API function for the alert() block, generated for "text_print" blocks.
  var wrapper = function(text) {
    text = text ? text.toString() : '';
    return interpreter.createPrimitive(send(text));
  };
  interpreter.setProperty(scope, 'send',
      interpreter.createNativeFunction(wrapper));
  initInterpreterWaitForSeconds(interpreter, scope);
}


function generateCodeAndLoadIntoInterpreter(codestr) {
  // Generate JavaScript code and parse it.
  // Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
  // Blockly.JavaScript.addReservedWords('highlightBlock');
    codestr = codestr.replace(/\r|\n|\\s/g, "$");
    codestr = codestr.split("start()")[1].split("$$")[0] ;
    return codestr.replace(/\$/g,"") ;
}

function resetInterpreter() {
  myInterpreter = null;

  //停止所有
  setTimeout(function(){
    send("A1FFFFFF");
  },200) ;

  if (runner) {
    clearTimeout(runner);
    runner = null;
  }
}

function runCode(latestCode) {
  if (!myInterpreter) {
    //var latestCode = generateCodeAndLoadIntoInterpreter(latestCode) ;
    setTimeout(function() {
      // console.log('Ready to execute the following code\n' +
      //   '===================================\n' +
      //   latestCode);

      // Begin execution
      myInterpreter = new Interpreter(latestCode, initApi);
      runner = function() {
        if (myInterpreter) {
          var hasMore = myInterpreter.run();
          if (hasMore) {
            // Execution is currently blocked by some async call.
            // Try again later.
            setTimeout(runner, 10);
          } else {
            // Program is complete.
            //outputArea.value += '\n\n<< Program complete >>';
            resetInterpreter();
          }
        }
      };
      runner();
    }, 1);
    return;
  }
}

export  {runCode, resetInterpreter} ;