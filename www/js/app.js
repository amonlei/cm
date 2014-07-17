$en2zh = {
  nameorpwd: '帐号或密码错误',
  nameerr: '帐号不存在',
  pawerr: '密码错误',
  regflunk1: '资料填写不完整',
  regflunk2: '帐号已经被注册',
  regflunk3: '服务器忙，请稍后再试！',
  editflunk1: '资料填写不完整',
  editflunk2: '帐号不存在',
  editflunk3: '原密码不正确',
  editflunk4: '新密码与确认密码不一致',
  exitloginerr: '退出登录失败'
}

$errors = function(errs) {
  if(!$.isArray(errs)) {
    errs = [errs]
  }
  if(errs.length > 0 ){
    $("#errors ul").loadTemplate($("#error_template"), errs);
    $('#errors').slideDown();  
  } else {
    $('#errors').hide();  
  }
  
}

$.fn.extend({
  errors:function(errs){
    if(!$.isArray(errs)) {
        errs = [errs]
    }
    if(errs.length > 0 ){
      $(this).find("ul").loadTemplate($("#" + $(this).attr('id') + "_template"), errs);
      $(this).slideDown();  
    } else {
      $(this).hide();  
    } 
  },append_to_errors: function(errs) {
    if(!$.isArray(errs)) {
      errs = [errs]
    }
    if(errs.length > 0 ){
      $(this).find("ul").loadTemplate($("#" + $(this).attr('id') + "_template"), errs);
      $(this).slideDown();  
    }
  },serializeToDB: function(name_space) {
    $db.set(name_space,$(this).serializeJson())
  },serializeJson: function(){
    var serializeObj={};
    var array=this.serializeArray();
    var str=this.serialize();
    $(array).each(function(){
      if(serializeObj[this.name]){
        if($.isArray(serializeObj[this.name])){
          serializeObj[this.name].push(this.value);
        }else{
          serializeObj[this.name]=[serializeObj[this.name],this.value];
        }
      }else{
        serializeObj[this.name]=this.value;
      }
    });
    return serializeObj;
  }
});


// $.extend({
//   errors = function(errs){
      // if(!$.isArray(errs)) {
      //   errs = [errs]
      // }
      // if(errs.length > 0 ){
      //   $(this).find("ul").loadTemplate($("#" + $(this).attr('id') + "_template"), errs);
      //   $(this).slideDown();  
      // } else {
      //   $(this).hide();  
      // }
//    }

// });

$append_to_errors = function(errs) {
    if(!$.isArray(errs)) {
        errs = [errs]
    }
    if(errs.length > 0 ){
        $("#errors ul").loadTemplate($("#error_template"), errs);
        $('#errors').slideDown();  
    }
}

function log(message,callback) {
  console.log(message)
  if(callback != undefined) {
      console.log('callback')
      callback(message)
  }
}

// var is_pc = true;
// var is_mobile = false;

$( document ).bind( "mobileinit", function() { 
    log('mobile init')
    $.support.cors = true;    
    $.mobile.allowCrossDomainPages = true; 
    // log(navigator.userAgent.toLowerCase());
    // if(navigator.userAgent.toLowerCase().indexOf("android") || navigator.userAgent.toLowerCase().indexOf("ios")) {
    //     is_pc = false;
    //     is_mobile = true;
    // }    
}); 

$db = $.initNamespaceStorage('battery').localStorage;
if($db.isEmpty('sessions.new')) {
  $db.set('sessions.new',{})  
}
if($db.isEmpty('sessions.current.truck')) {
  $db.set('sessions.current.truck',{})
}  

if($db.isEmpty('gps')) {
  $db.set('gps',{
    latitude_offset: 0,
    longitude_offset: 0
  })
}

// 记录历史轨迹
$histories = function() {
  $db.set('sessions.pre_view',$db.get('sessions.current_view'));
  $db.set('sessions.current_view',window.location.href);
  log('先前页面：' + $db.get('sessions.pre_view'));
  log('当前页面：' + $db.get('sessions.current_view'));
}

$histories();

$is_current_view = function(view) {
  return (new RegExp(view)).test($db.get('sessions.current_view'))
}

$is_pre_view = function(view) {
  return (new RegExp(view)).test($db.get('sessions.pre_view'))
}

$baidu_key = "aULurtcMHRtHxI70hQV7N9SP";

$current_address = function(position,call_back) {
  
  // "http://api.map.baidu.com/geocoder?location=" 
  // + position.coords.latitude+","+position.coords.longitude +  "&output=json&key=" + $baidu_key
    $.get("http://api.map.baidu.com/geocoder/v2/?ak=aULurtcMHRtHxI70hQV7N9SP&callback=renderReverse&location=" + position.coords.latitude+","+position.coords.longitude +  "&output=xml&pois=1",function(xml) {
        var json =  $.xml2json(xml)
        log("address's json => ");
        log(json);
        call_back(json.result.formatted_address);
    })
}

function reset_md5uname() {
  $('#md5uname').val(hex_md5($('#username').val()))
}

// $(function() {
//     log('current_user ' + $current_user.user_name)
//     log($current_user)
// })

function reset_current_user_from_local() {
  $current_user = $db.get('sessions.current');
}

function reset_current_user_info(call_back) {
    $.get("http://mytusi.com/proxys/userinfo/lorrynet",
        {
          username: $db.get('sessions.current.username'),
          md5uname: $db.get('sessions.current.md5uname'),
        },
        function(xml) {
            log('获取user info');
            log(xml);
            var user = $.xml2json(xml);
            log(user)
            if(user.userinfo == 'infosucceed' ) {                              
                $db.set('sessions.current',{
                      username: $db.get('sessions.current.username'),
                      md5uname: $db.get('sessions.current.md5uname'),
                      tel: user.tel,
                      zpnum: user.zpnum,
                      cltype: user.cltype,
                      clLength: user.clLength,
                      clLoad: user.clLoad,
                      clLoH: user.clLoH,
                      clserver: user.clserver,
                      otherword: user.otherword,
                      province: user.province,
                      city: user.city,
                      county: user.county,
                      cltype: user.cltype,
                      logined_at: Date.now()
                 });
                if( call_back != undefined) {
                  call_back() 
                }
            } else {
              alert($en2zh[user.userinfo] + ',请重新登录!');
              window.location.href = 'sessions.html';
            }
        }               
    )
}

$loading = function() {
    var $this = $( this ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
        html = $this.jqmData( "html" ) || "";
    $.mobile.loading( "show", {
            text: msgText,
            textVisible: textVisible,
            theme: theme,
            textonly: textonly,
            html: html
    });  
}

$hide_loading = function() {
  $.mobile.loading( "hide" );
}

// 监控位置
$gps = function(on_success,on_error) {
  var watchId = navigator.geolocation.watchPosition(function(position) {
    // position
    log('原position.coords.latitude： ' + position.coords.latitude);    
    // position.coords.latitude = position.coords.latitude + 0.010123352616673742;
    // position.coords.longitude = position.coords.longitude + 0.005250178587665744;
    // p = {
    //   coords: {
    //     latitude: (position.coords.latitude - $db.get('gps.latitude_offset')),
    //     longitude: (position.coords.longitude - $db.get('gps.longitude_offset')),
    //     accuracy: position.coords.accuracy
    //   }
    // }
    p = {
      coords: {
        latitude: (position.coords.latitude + 0.004936511921002307),
        longitude: (position.coords.longitude + 0.010149685949997433),
        accuracy: position.coords.accuracy
      }
    }
    log('后position.coords.latitude: ' + p.coords.latitude);    
    log('后position.coords.latitude: ' + p.coords.latitude);    
    on_success(p)
  }, on_error,{ timeout: 10000, enableHighAccuracy: true, maximumAge:5000,frequency:5000 }); 
}

function utf8_to_gbk(utf8) {
  var r = '';
  for (var i=0; i < utf8.length; i++) {
    if (utf8.charCodeAt(i) > 127) {
      r += unescape('%u'
      + unescape(utf8.charCodeAt(i).toString(16))
      + unescape(utf8.charCodeAt(i+1).toString(16))
      );
      i++;
    }
    else {
      r += utf8.charAt(i);
    }
  }
  return r;
}

function conv(utf8) {

}


$serial_init = function(callback) {
  log('开始准备设备')
  document.addEventListener('deviceready', function() {
    // serial.requestPermission(function success(message) {
    //     log('取得权限')
    // }, function error(message) {
    //     log('获取权限失败！！！' + message)
    // });
    callback();
  }, false);
}

$show_clock = function() {
  log('show clock')
  var now = new Date()
  if(now.getHours() >= 0 && now.getHours() < 4) {
    $('#clock small').html('深夜 ' + now.getHours() + ':' + now.getMinutes());
  } else if(now.getHours() >= 4 && now.getHours() < 7) {
    $('#clock small').html('早晨 ' + now.getHours() + ':' + now.getMinutes());
  } else if(now.getHours() >= 7 && now.getHours() < 12) {
    $('#clock small').html('上午 ' + now.getHours() + ':' + now.getMinutes());
  } else if(now.getHours() == 12) {
    $('#clock small').html('中午 ' + 12 + ':' + now.getMinutes())
  } else if(now.getHours() > 12 && now.getHours() < 15) {
    $('#clock small').html('中午 ' + (now.getHours() - 12) + ':' + now.getMinutes())
  } else if(now.getHours() >= 15 && now.getHours() < 19) {
    $('#clock small').html('下午 ' + (now.getHours() - 12) + ':' + now.getMinutes())
  } else {
    $('#clock small').html('晚上 ' + (now.getHours() - 12) + ':' + now.getMinutes())
  }
}

$buffers = function(buffer,show_log,show_error,show_buffer) {
    var uv8 = new Uint8Array(buffer);
    if(($tmp_buffer96_items_count + uv8.length) > 96) {
        show_error('超载...直接放弃')
        $tmp_buffer96 = new Array(96);
        $tmp_buffer96_items_count = 0;    
    } else if(uv8.length > 2 && uv8[0].toString(16) == '3c' && uv8[1].toString(16) == '3c') {
        show_log('开始....(' + uv8.length + ')')
        $tmp_buffer96 = new Array(96);
        $tmp_buffer96_items_count = 0;
        $.each(uv8,function(i,b) {
            // show_buffer(b + ' ~ ' + b.toString(16) + ' | ');    
            $tmp_buffer96[i] = b.toString(16);
        })      
        $tmp_buffer96_items_count = uv8.length;
    } else if($tmp_buffer96_items_count > 0 && uv8.length > 2 && uv8[uv8.length - 1].toString(16) == '3e' && uv8[uv8.length - 2].toString(16) == '3e' ) {
        $.each(uv8,function(i,b) {
            // show_buffer(b + ' ~ ' + b.toString(16) + ' | ');    
            $tmp_buffer96[$tmp_buffer96_items_count + i] = b.toString(16);
        })
        $tmp_buffer96_items_count += uv8.length;
        show_log('收尾....(' + uv8.length + ')')
        show_log('')
        $tmp_buffer96_items_count = 0;
        $buffer96 = $tmp_buffer96;
        // show_buffer($buffer96)
        // show_log('>>>>>>>>>>>>>>>>>>>>>>>>>>');
        // show_log('')
        // $tmp_buffer96 = new Array(96);        
        // $.each($buffer96,function(i,b) {
        //     $show_buffer(b + '|');
        //     if(i % 36 == 0) {
        //         $show_log('')
        //     }
        // })
        show_buffer($buffer96)
    } else {
        if($tmp_buffer96_items_count == 0 ) {
            show_error('劫道...放弃')
        } else {
            show_log('填充....(' + uv8.length + ')')
            $.each(uv8,function(i,b) {
                // $show_buffer(b + ' ~ ' + b.toString(16) + ' | ');    
                $tmp_buffer96[$tmp_buffer96_items_count + i] = b.toString(16);
            })  
            $tmp_buffer96_items_count += uv8.length;
        }

    }
}

$buffer96 = []

$listen_to_serial_and_deal_with_buffers = function() {
    log('设备准备好，可以读写.',$show_last_log)
    log('1. 准备读取串口',$show_last_log)
    try {
        log('2. 注册串口 ',$show_last_log)
        serial.requestPermission(
            function(successMessage) {
                log('2.1 获得权限，准备打开: ' +  successMessage,$show_last_log)
                serial.open({
                        baudRate: 38400,
                        dataBits: 8,
                        stopBits: 1,
                        parity: 0
                    },
                    function(successMessage) {
                        log('2.2 端口打开，注册读取: ' + successMessage,$show_last_log)
                        $buffer96 = [];
                        $tmp_buffer96 = [];
                        $tmp_buffer96_items_count = 0;
                        $buffers_count = 0;
                        $read_buffers_count = 0;
                        serial.registerReadCallback(
                            function(buffer) {
                                try {
                                    $buffers(buffer,log,log,function(buffer) {
                                        if($buffers_count > 5) {
                                            $('#console').html('');
                                            log('清屏，再来！',$show_last_log)
                                            $buffers_count = 0;
                                        }
                                        $.each(buffer,function(i,b) {
                                            // $show_buffer(b + ' ');
                                            if(i % 36 == 0) {
                                                log('')
                                            }
                                        })
                                        // log('');
                                        $buffers_count += 1;
                                        $read_buffers_count += 1;
                                        log('成功读取到 ' + $read_buffers_count + ' 条',$show_last_log)
                                        // if(success_callback != undefined) {
                                        //   success_callback();  
                                        // } 
                                        // $('#read_buffers_count').html('成功读取到 ' + $read_buffers_count + ' 条')
                                    });
                                } catch(e) {
                                    log('处理buffer错误：' + e,$show_last_log)
                                }
                            },
                            function(e) {
                              $alert_and_retry_listen_to_serial_and_deal_with_buffers('读取失败：' + e)
                            }
                        );
                    },
                    function(e) {
                        $alert_and_retry_listen_to_serial_and_deal_with_buffers('打开串口失败：' + e)
                    }
                );
            },
            function(e) {
                $alert_and_retry_listen_to_serial_and_deal_with_buffers('请求权限失败：' + e);
            }
        );
    } catch(e) {
        $alert_and_retry_listen_to_serial_and_deal_with_buffers('执行错误：' + e)
    }
}

$alert_and_retry_listen_to_serial_and_deal_with_buffers = function(error) {
  log(error,$show_last_log)
  $.mobile.loading('show','a',error);
  setTimeout(function() {
    $.mobile.loading('hide');
    $listen_to_serial_and_deal_with_buffers()
  },3000)
}


// 非battery.html不显示
$show_last_log = function(message) {
  // $('#the_last_log').html(message)
}

$about_batterys = function(callback) {
  if($buffer96.length !=96 ) {
      log('暂未获取电量信息')
      $('#battery_power b').html('??%')
  } else {
      try{
          var bcs = $bcs($buffer96);          
          callback(bcs);
          $.mobile.loading('hide');
      } catch(e) {
          $.mobile.loading('show','a','获取电量信息失败：' + e + '. 重试中...');
      }                    
  }

}

$try = function(callback) {
  try{
    callback()
  } catch(e) {
    alert(e)    
  }
}