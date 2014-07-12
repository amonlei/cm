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

function log(message) {
  console.log(message)
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
  if(now.getHours() < 12) {
    $('#clock small').html('上午 ' + now.getHours() + ':' + now.getMinutes());
  } else if(now.getHours() > 12 && now.getHours() < 15) {
    $('#clock small').html('中午 ' + (now.getHours() - 12) + ':' + now.getMinutes())
  } else {
    $('#clock small').html('下午 ' + (now.getHours() - 12) + ':' + now.getMinutes())
  }
}