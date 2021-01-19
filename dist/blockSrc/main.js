//进入创作模式
  // try {
  //   action("A1FFFFFF");
  // } catch (e) {

  // }
  window.exitDialog = new Vue({
    el:'#isExit',
    data:{
      visible: false
    },
    methods: {
      ok:function() {
        window.goback() ;
        this.visible = false;
      },
      show:function() {
        this.visible = true;
      }
    }
  })

  window.selectProject = new Vue({
    el: '#projectSelect',
    data: {
      visible: false,
      ready: false,
      visibleDelete:false,
      projectlist: [],
      willDeleteName:""
    },
    computed: {

    },
    watch: {
      visible:function(curVal, oldVal) {
        if (curVal) {
          var that = this;
          setTimeout(function() {
            that.ready = true;
          }, 500);
        } else {
          this.ready = false;
        }
      }
    },
    mounted:function() {
      this.init()
    },
    created:function() {

    },
    components: {
      // BottomBar,
      // jheader
    },

    methods: {
      init:function(){
        this.projectList = JSON.parse(localStorage.getItem("projectList")||'[]')
        console.log(this.projectList)
      },
      close:function() {
        if (this.ready) {
          this.visible = false;
        }
      },
      show:function() {
        this.init() ;
        this.visible = true;
      },
      select:function(name) {
        var txt = this.projectList.filter(function(i){
          return i.name == name
        })[0].txt ;
        var xml = Blockly.Xml.textToDom(txt);
        demoWorkspace.clear();
        Blockly.Xml.domToWorkspace(xml, demoWorkspace);
        this.close();
        playMusic() ;
      },
      showDelete:function(name){
        this.willDeleteName = name
        this.visibleDelete = true
      },
      deleteProject:function() {
        var name = this.willDeleteName
        var txt = this.projectList.filter(function(i){
          return i.name != name
        });
        this.visibleDelete = false
        window.localStorage.setItem('projectList', JSON.stringify(txt));
        saveProject.init()
        this.init() ;
      }
    }
  });



  window.selectColor = new Vue({
    el: '#colorSelect',
    data: {
      visible: false,
      callback: "",
      ready: false,
      list: [
        "E1FFFFFF", 
        "E1FF0000", 
        "E1FFFF00", 
        "E100FF00", 
        "E10000FF", 
        "E1A51DC0", 
        "E1FF491C", 
        "E1FF99AC", 
        "E158C0FF", 
        "E184FF84", 
        "E19292FF", 
        "E139A0FF", 
        "E1A4FF23", 
        "E1B04B2D", 
        "E1B844D2", 
        "E1EB2269", 
        "E1FF9282", 
        "E1FFFF82", 
        "E126C4B8", 
        "E1FF9E2D"
      ]
    },
    computed: {

    },
    watch: {
      select:function(curVal, oldVal) {
        var that = this;　　　　　　　　　　
        this.$nextTick(function(){
          that.$refs.right.scrollTop = 0;
        });
      },
      visible:function(curVal, oldVal) {
        if (curVal) {
          var that = this;
          setTimeout(function() {
            that.ready = true;
          }, 500);
        } else {
          this.ready = false;
        }
      }
    },
    mounted:function() {

    },
    created:function() {

    },
    components: {
      // BottomBar,
      // jheader
    },

    methods: {
      close:function() {
        if (this.ready) {
          this.visible = false;
        }
      },
      selectColor:function(code) {
        playMusic() ;
        this.callback("#" + code.replace("E1", ""));
        this.close();
      }
    }
  });

  window.selectImg = new Vue({
    el: '#imgSelect',
    data: {
      callback: "",
      list: [
      { type: "ssg", num: 10 },
      { type: "sjt", num: 14 }, 
      { type: "sbq", num: 26 }, 
      { type: "sfz", num: 12 }, 
      { type: "ssw", num: 8 }, 
      { type: "snum", num: 26 },
      {type:"words",num:imgCode["words"].map(function(res){return res[0]})},
      {type:"sdigit",num:21},
      {type:"hans",num:imgCode["hans"].map(function(res){return res[0]})}
      ],
      select: 0,
      active: 0,
      classIcon: ["smenu7", "smenu5", "smenu3", "smenu8", "smenu1", "smenu2","smenu13","smenu11","smenu12"],
      visible: false,
      ready: false,
      codeList: Object.assign({}, imgCode)
    },
    computed: {

    },
    watch: {
      select:function(curVal, oldVal) {　
        var that = this;　　　　　　　　　
        this.$nextTick(function() {
          that.$refs.right.scrollTop = 0;
        });
      },
      visible:function(curVal, oldVal) {
        if (curVal) {
          var that = this;
          setTimeout(function() {
            that.ready = true;
          }, 500);
        } else {
          this.ready = false;
        }
      }
    },
    mounted:function() {

    },
    created:function() {

    },
    components: {
      // BottomBar,
      // jheader
    },

    methods: {
      selectImg:function(code) {
        //console.log(code) ;
        playMusic() ;
        this.callback(code);
        this.close();
      },
      selectItem:function(index) {
        playMusic() ;
        this.select = index;
        this.active = 0;
      },
      close:function() {
        if (this.ready) {
          this.visible = false;
        }
      }
    }
  });


  window.selectMusic = new Vue({
    el: '#musicSelect',
    data: {
      list: [{ type: "sdw", num: 23 }, { type: "syin", num: 21 }, { type: "sdh", num: 29 }, { type: "syx", num: 7 },{ type: "sjtt", num: 11 },{type:"ssh",num:6}],
      select: 0,
      active: 0,
      classIcon: ["smenu4", "smenu9", "smenu6","smenu15", "smenu10","smenu14"],
      visible: false,
      callback: "",
      ready: false,
      codeList: Object.assign({}, soundCode)
    },
    computed: {

    },
    watch: {
      select:function(curVal, oldVal) {　
        var that = this;　　　　　　　　　
        this.$nextTick(function() {
          that.$refs.right.scrollTop = 0;
        });
      },
      visible:function(curVal, oldVal) {
        if (curVal) {
          var that = this;
          setTimeout(function() {
            that.ready = true;
          }, 500);
        } else {
          this.ready = false;
        }
      }
    },
    mounted:function() {

    },
    created:function() {

    },
    components: {
      // BottomBar,
      // jheader
    },

    methods: {
      selectMusic:function(code) {
        playMusic() ;
        this.callback(code);
        this.close();
      },
      selectItem:function(index) {
        playMusic() ;
        this.select = index;
        this.active = 0;
      },
      close:function() {
        if (this.ready) {
          this.visible = false;
        }
      }
    }
  });


  window.blueTooth = new Vue({
    el: '#openBlue',
    data: {
      list: [],
      scanError: false,
      ready: false,
      visible: false
    },
    computed: {

    },
    watch: {
      visible:function(newQuestion, oldQuestion) {
        if (newQuestion == true) {
          this.list = [];
          this.scan();
          var that = this;
          setTimeout(function() {
            that.ready = true;
          }, 500);
        } else {
          this.ready = false;
        }
      }
    },
    mounted:function() {

    },
    created:function() {

    },
    beforeDestroy:function() {

    },
    components: {
      // BottomBar,
      // jheader
    },

    methods: {
      scan:function() {
        this.scanError = false;
        var that = this;
        sendNative({
          "action": "bluetooth",
          "params": "{}",
          "callback": function(data) {
            //console.log(data);
            if (data.length <= 0) {
              that.scanError = true;
            } else {
              that.scanError = false;
            }
            that.list = that.list.concat(data);
          }
        });
      },
      unlink:function(){
        this.list.map(function(item) {
            return item.status = 0;
        });
        playMusic();
        sendNative({
          "action": "unlink",
          "params": "{}",
          "callback": ""
        });
      },
      link:function(status,id, index) {
        if(status == 1){
          this.unlink() ;
          return ;
        }
        this.list.map(function(item) {
          return item.status = 0;
        });
        playMusic();
        var that = this;
        sendNative({
          "action": "link",
          "params": JSON.stringify({
            "peripheralID": id + ""
          }),
          "callback": function(status) {
            that.list[index].status = status;
            that.list = that.list.slice(0);
            setTimeout(function() {
              that.close();
            }, 2000);
          }
        });
      },
      close:function() {
        if (this.ready) {
          this.visible = false;
        }
      }
    }
  });

  window.saveProject = new Vue({
    el: '#saveProject',
    data: {
      ready: false,
      visible:false,
      name:"",
      msg:'',
      projectList:[]
    },
    computed: {

    },
    watch: {
      visible:function(newQuestion, oldQuestion) {
        if (newQuestion == true) {
          var that = this;
          setTimeout(function() {
            that.ready = true;
          }, 500);
        } else {
          this.ready = false;
        }
      }
    },
    mounted:function() {
      this.init()
    },
    created:function() {

    },
    beforeDestroy:function() {

    },
    components: {
      // BottomBar,
      // jheader
    },

    methods: {
      init:function(){
        this.projectList = JSON.parse(localStorage.getItem("projectList")||'[]')
      },

      show:function(type){
        this.visible = true ;
      },
      goScroll:function(){
        window.scrollTo(0,0)
      },
      submit:function() {
       if(this.name==""){
        this.msg = '请输入项目名称'
        return false
       }
       var that = this ;
       if(this.projectList.filter(function(i){
        return i.name == that.name
       }).length>0){
        this.msg = '项目名称已存在'
        return false
       }
       var xml = Blockly.Xml.workspaceToDom(demoWorkspace);
       this.projectList.push({name:this.name,txt:Blockly.Xml.domToText(xml)}) ;
       if(this.projectList.length>10){
        this.projectList.shift()
       }
       console.log(this.projectList)
       window.localStorage.setItem('projectList', JSON.stringify(this.projectList));
       //goback();
       this.visible = false;
      },
      close:function() {
        if (this.ready) {
          this.name='';
          this.visible = false;
          // goback();
        }
        
      }
    }
  });

  window.safeTips = new Vue({
    el: '#safeTips',
    data: {
      ready: false,
      visible:false,
      type:0,
      src:["./img/dialogm.png","./img/dialogmax.png","./img/dialogmute.png"]
    },
    computed: {

    },
    watch: {
      visible:function(newQuestion, oldQuestion) {
        if (newQuestion == true) {
          var that = this;
          setTimeout(function() {
            that.ready = true;
          }, 500);
        } else {
          this.ready = false;
        }
      }
    },
    mounted:function() {

    },
    created:function() {

    },
    beforeDestroy:function() {

    },
    components: {
      // BottomBar,
      // jheader
    },

    methods: {
      show:function(type){
        this.type = type ;
        this.visible = true ;
      },
      submit:function() {
       runCode() ;
       this.visible = false;
      },
      close:function() {
        if (this.ready) {
          this.visible = false;
        }
      }
    }
  });

  function goback() {
    playMusic() ;
    resetInterpreter(false,function(){
      sendNative({
        "action": "back",
        "params": "{}",
        "callback": ""
      });
    }) ;
  }

  document.addEventListener("touchstart", function() {}, false);

  var blocklyArea = document.getElementById('blocklyArea');
  var blocklyDiv = document.getElementById('blocklyDiv');

  var demoWorkspace = Blockly.inject(blocklyDiv, {
    media: './media/',
    toolbox: document.getElementById('toolbox'),
    comments: false,
    zoom: {
      controls: false,
      wheel: false,
      startScale: 1,
      maxScale: 3,
      minScale: .5,
      scaleSpeed: 1.1
    },
    trashcan: false
  });
  console.log(demoWorkspace) ;
  console.log(Blockly) ;
  var onresize = function(e) {
    // Compute the absolute coordinates and dimensions of blocklyArea.
    //console.log(11);
    var element = blocklyArea;
    var x = 0;
    var y = 0;
    do {
      x += element.offsetLeft;
      y += element.offsetTop;
      element = element.offsetParent;
    } while (element);
    // Position blocklyDiv over blocklyArea.
    blocklyDiv.style.left = x + 'px';
    blocklyDiv.style.top = y + 'px';
    blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
    blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
    Blockly.svgResize(demoWorkspace);
  };
  window.addEventListener('resize', onresize, false);
  onresize();


  setTimeout(function() {
    $(".blocklyTreeIcon").each(function(i, r) {
      $(r).html("<i class='icon menu" + (i + 1) + "'></i>");
    });
    $(".blocklyToolboxDiv").on("click",".blocklyTreeIcon",function(){
      playMusic() ;
    }) ;
    $(".blocklyToolboxDiv").append("<div class='deleteBar'></div>");
    setLeftRight() ;

    Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'),
      demoWorkspace);
  }, 0);



  Blockly.JavaScript.addReservedWords('exit');

  //var outputArea = document.getElementById('output');
  var runButton = document.getElementById('runButton');
  var myInterpreter = null;
  var runner;

  function initApi(interpreter, scope) {
    // Add an API function for the alert() block, generated for "text_print" blocks.
    var wrapper = function(text) {
      text = text ? text.toString() : '';
      return interpreter.createPrimitive(action(text));
    };
    interpreter.setProperty(scope, 'action',
      interpreter.createNativeFunction(wrapper));

    var wrapper2 = function(text) {
      text = text ? text.toString() : '';
      return interpreter.createPrimitive(setGlobal(text));
    };
    interpreter.setProperty(scope, 'setGlobal',
      interpreter.createNativeFunction(wrapper2));

    var wrapper3 = function(text) {
      text = text ? text.toString() : '';
      return interpreter.createPrimitive(getGlobal(text));
    };
    interpreter.setProperty(scope, 'getGlobal',
      interpreter.createNativeFunction(wrapper3));

    // Add an API for the wait block.  See wait_block.js
    initInterpreterWaitForSeconds(interpreter, scope);

    // Add an API function for highlighting blocks.
    // var wrapper = function(id) {
    //   id = id ? id.toString() : '';
    //   return interpreter.createPrimitive(highlightBlock(id));
    // };
    // interpreter.setProperty(scope, 'highlightBlock',
    //     interpreter.createNativeFunction(wrapper));

  }

  var latestCode = '';

  // function highlightBlock(id) {
  //   //demoWorkspace.highlightBlock(id);
  //   highlightPause = true;
  // }

  function resetStepUi(clearOutput) {
    //demoWorkspace.highlightBlock(null);
    highlightPause = false;
    runButton.disabled = '';

    if (clearOutput) {
      //outputArea.value = 'Program output:\n=================';
    }
  }

  function generateCodeAndLoadIntoInterpreter() {
    // Generate JavaScript code and parse it.
    // Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
    // Blockly.JavaScript.addReservedWords('highlightBlock');
    var codestr = Blockly.JavaScript.workspaceToCode(demoWorkspace);
    //console.log(codestr);
    try {
      latestCode = codestr.split("start()")[1].replace(/\r|\n|\\s/g, "$").replace(/\{\$/g, "{").replace(/\}\$/g, "}").split("$")[0];
      //console.log(latestCode);
      // codestr = codestr.split("start()")[1].split("$$")[0] ;
      // latestCode = codestr.replace(/\$/g,"") ;
      console.log(latestCode) ;
    } catch (e) {

    }
    // try{
    //   latestCode = Blockly.JavaScript.workspaceToCode(demoWorkspace).match(/^(start).*/)[0];
    //   latestCode = latestCode.replace("start()","") ;
    // }catch(e){

    // }

    //latestCode = [0] ;

    //resetStepUi(true);
  }

  function resetInterpreter(fromApp,cb) {
    myInterpreter = null;

    if(!fromApp){
      // //停止所有
      // setTimeout(function(){
        //熄灭图片
       //action("A1FFFFFF");
      // },200) ;
    }
    
    $("#playBtn").addClass("play").removeClass("pause") ;

    if (runner) {
      clearTimeout(runner);
      runner = null;
    }

    cb&&cb.apply() ;
  }

  function runPrev(){
    if (!myInterpreter) {
      generateCodeAndLoadIntoInterpreter() ;
      var safe = true ;//是否安全
      machineAcode.toString().split(",").forEach(function(item){
        if(latestCode.indexOf(item)!=-1){
          safe = false ;
        }
      }) ;
      machineBcode.toString().split(",").forEach(function(item){
        if(latestCode.indexOf(item)!=-1){
          safe = false ;
        }
      }) ;
      if(!safe){//不安全
        safeTips.show(0);
      }else{
        runCode() ;
      }

    }else{
      runCode() ;
    }
  } ;
  function runCode() {
    playMusic() ;

    if (!myInterpreter) {
      //$("#playBtn").addClass("pause").removeClass("play") ;
      generateCodeAndLoadIntoInterpreter();
      // First statement of this code.
      // Clear the program output.
      //resetStepUi(true);
      //runButton.disabled = 'disabled';

      // And then show generated code in an alert.
      // In a timeout to allow the outputArea.value to reset first.
      setTimeout(function() {
        // alert('Ready to execute the following code\n' +
        //   '===================================\n' +
        //   latestCode);
        // return ;
        // Begin execution
        highlightPause = false;
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
              //$("#playBtn").addClass("play").removeClass("pause") ;
              resetInterpreter();
              //window.action("A1FFFFFF") ;
              //resetStepUi(false);
            }
          }
        };
        runner();
      }, 1);
      return;
    }else{
      resetInterpreter() ;
      //window.action("A1FFFFFF") ;
      //$("#playBtn").addClass("play").removeClass("pause") ;
    }
  }

  // Load the interpreter now, and upon future changes.
  generateCodeAndLoadIntoInterpreter();
  // demoWorkspace.addChangeListener(function(event) {
  //   if (!(event instanceof Blockly.Events.Ui)) {
  //     // Something changed. Parser needs to be reloaded.
  //     resetInterpreter();
  //     generateCodeAndLoadIntoInterpreter();
  //   }
  // });
