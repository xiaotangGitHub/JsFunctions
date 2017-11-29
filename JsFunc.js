/**
 * Created by Administrator on 2017/11/27.
 * Author   汤鹏
 * Email    1257390133@qq.com
 * example  需引用jquery,layer,layui,layermobile   http://layer.layui.com/mobile/
 */


/**
 * @function ajax调用
 * @param url   请求链接
 * @param func  回调函数
 * @param param 请求参数
 * @param async true:异步 false：同步
 */
var postAjax = function(url,func,param, async = true ) {
    $.ajax({
        url: url,
        type: 'post',
        data: param,
        dataType: 'json',
        timeout: 10000,
        async:async,
        success: function(data) {
            func && func(data);
        },
        error: function(e) {
            func && func(e);
        }
    });
};

/**
 * @function layer询问框
 * @param msg
 * @param func
 */
function lay_inquiry( msg,func ){
    layer.open({
        content: msg
        ,btn: ['确定', '取消']
        ,shadeClose: false
        ,yes: function(index){
            func && func();
        }
    });
}
/**
 * @function layer 信息框
 * @param msg
 */
function lay_msg( msg ){
    layer.open({
        content: msg
        ,btn: '我知道了'
        ,shadeClose: false
    });
}
/**
 * @function layer 提示框
 * @param msg
 */
function lay_prompt( msg ) {
    layer.open({
        content: msg
        ,skin: 'msg'
        ,time: 1.5
    });
}
/**
 * @function layer底部提示框
 * @param msg
 */
function lay_footer( msg ){
    layer.open({
        content: msg
        ,skin: 'footer'
        ,time:1.5
    });
}
/**
 * @function layer底部对话框
 * @param msg
 * @param func
 */
function lay_footer_btn( msg,func ) {
    layer.open({
        content: msg
        ,btn: ['确定', '取消']
        ,skin: 'footer'
        ,yes: function(index){
           func && func();
        }
    });
}
/**
 * @function layer loadding加载
 * @param msg
 */
function lay_loading( msg = '' ) {
    if( msg ){
        layer.open({
            type: 2
            ,shadeClose: false
            ,content: msg
        });
    }else{
        layer.open({type: 2,shadeClose: false});
    }
}

/**
 * @function 提示
 * @param msg
 */
function tp_msg( msg ){
    layer.msg( msg,{time:1000} );
}
/**
 * @function 加载
 */
function tp_load() {
    layer.load(1,{shade:0.5})
}
/**
 * @function 关闭
 * @param index
 */
function tp_close( index = '' ) {
    if( index ){
        layer.close(index);
    }else{
        layer.closeAll();
    }
}
/**
 * @function tips提示
 * @param msg
 * @param dom
 */
function tp_tips( msg,dom ){
    layer.tips(tips, dom,{time:1000});
}
/**
 * @function 图片上传
 * @param dom
 * @param url
 * @param func
 */
function tp_upload( dom,url,func ){
    try{
        layui.use('upload', function(){
            var upload = layui.upload;
            //执行实例
            var uploadInst = upload.render({
                elem: dom
                ,url: url
                ,done: function(file){
                    func && func( file );
                }
                ,error: function( msg ){
                    try{
                        tp_msg('图片上传出错,原因为：'+msg.msg);
                    }catch{
                        alert('图片上传出错,原因为：'+msg.msg);
                    }
                }
            });
        });
    }catch {
        try{
            tp_msg('layui未引入');
        }catch{
            alert('layui未引入');
        }
    }
}

/**************************************************************
 /**********************  JS函数库  ******************************/

/**
 * @function 多维JS数组转换
 * @param array
 * @returns {{}}
 */
function getList( array ) {
    var data = {};
    for (var i in array ) {
        if( Object.prototype.toString.call(array[i]) == '[object Array]') {
            data[i] = getList(array[i]);
        }else {
            data[i] = array[i];
        }
    }
    return data;
}
/**
 * @function 返回上一页面
 */
function history(){
    window.history.go(-1);
}
/**
 * @function 页面跳转
 * @param url
 * @param time
 */
function reload( url = '', time = 0 ){
    setTimeout(function () {
        location.href = url;
    },time);
}
/**
 * @function 阻止默认事件，如a标签
 * @param e
 */
function stopDefaultEvent( e ){
    if ( e && e.preventDefault )
        e.preventDefault();
    else
        window.event.returnValue = false;
}
/**
 * @function 阻止冒泡事件
 * @param e
 */
function stopBubbling( e ) {
    e.stopPropagation();
}
/**
 * @function 页面回退监测
 * @param msg
 */
function winReload( msg = '' ){
    if (window.history && window.history.pushState) {
        $(window).on('popstate', function () {
            window.history.pushState('forward', null, '#');
            window.history.forward(1);
            if( msg ){
                try{
                    tp_msg( msg );
                }catch {
                    alert(msg);
                }
            }else{
                location.replace(document.referrer);//刷新
            }
        });
    }
    window.history.pushState('forward', null, '#'); //在IE中必须得有这两行
    window.history.forward(1);
}
/**
 * @function 字符串长度截取
 * @param str
 * @param len
 * @returns {string}
 */
function cutstr(str, len) {
    var temp,
        icount = 0,
        patrn = /[^\x00-\xff]/，
        strre = "";
    for (var i = 0; i < str.length; i++) {
        if (icount < len - 1) {
            temp = str.substr(i, 1);
            if (patrn.exec(temp) == null) {
                icount = icount + 1
            } else {
                icount = icount + 2
            }
            strre += temp
        } else {
            break;
        }
    }
    return strre + "..."
}
/**
 * @function 字符串全部替换
 * @param s1
 * @param s2
 * @returns {string}
 */
String.prototype.replaceAll = function(s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2)
}
/**
 * @function 过滤特殊字符串(包括空格)
 * @param str
 * @returns {string}
 */
function filter_str(str) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]");
    var specialStr = "";
    for(var i=0;i<str.length;i++)
    {
        specialStr += str.substr(i, 1).replace(pattern, '');
    }

    return specialStr.replace(/\s/ig,'');
}
/**
 * @function  获取字符串字节长度，中文默认为三个字节
 * @param str
 * @returns {number}
 */
function get_bytes( str,num = 3 ) {
    var length = 0;
    for(var i=0;i<str.length;i++){
        if( is_Chinese(str[i]) ){
            length += num;
        }else{
            length += 1;
        }
    }
    return parseInt(length);
}
/**
 * @function 加载css样式文件
 * @param url
 * @constructor
 */
function LoadStyle(url) {
    try {
        document.createStyleSheet(url)
    } catch(e) {
        var cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.type = 'text/css';
        cssLink.href = url;
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(cssLink)
    }
}
/**
 * @function 去除URL前缀
 * @param a
 * @returns {*}
 */
function removeUrlPrefix(a){
    a=a.replace(/：/g,":").replace(/．/g,".").replace(/／/g,"/");
    while(trim(a).toLowerCase().indexOf("http://")==0){
        a=trim(a.replace(/http:\/\//i,""));
    }
    return a;
}
/**
 * @function 随机数时间戳
 * @returns {string}
 */
function uniqueId(){
    var a=Math.random,b=parseInt;
    return Number(new Date()).toString()+b(10*a())+b(10*a())+b(10*a());
}
/**
 * @function 返回顶部
 * @param btnId ID元素
 */
function backTop(btnId) {
    var btn = document.getElementById(btnId);
    var d = document.documentElement;
    var b = document.body;
    window.onscroll = set;
    btn.style.display = "none";
    btn.onclick = function() {
        btn.style.display = "none";
        window.onscroll = null;
        this.timer = setInterval(function() {
            d.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
            b.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
            if ((d.scrollTop + b.scrollTop) == 0) clearInterval(btn.timer, window.onscroll = set);
        }, 10);
    };
    function set() {
        btn.style.display = (d.scrollTop + b.scrollTop > 100) ? 'block': "none"
    }
};
/**
 * @function 获取GET参数值
 * @param field
 * @returns {*}
 */
function get_param( field = '*' ){
    var param = '';
    var querystr = window.location.href.split("?")
    if(querystr[1]){
        GETs = querystr[1].split("&");
        GET = [];
        for(i=0;i<GETs.length;i++){
            tmp_arr = GETs[i].split("=");
            key=tmp_arr[0];
            GET[key] = tmp_arr[1];
        }
        if( field == '*' ){
            param = GET;
        }else{
            param = GET[field];
        }
    }
    return param;
}
/**
 * @function 字符串反序
 * @param text
 * @returns {string}
 * @constructor
 */
function IsReverse(text){
    return text.split('').reverse().join('');
}
/**
 * @function base64解码
 * @param data
 * @returns {string}
 */
function base64_decode(data){
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,ac = 0,dec = "",tmp_arr = [];
    if (!data) { return data; }
    data += '';
    do {
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));
        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;
        if (h3 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1);
        } else if (h4 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1, o2);
        } else {
            tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
        }
    } while (i < data.length);
    dec = tmp_arr.join('');
    dec = utf8_decode(dec);
    return dec;
}

/**************************************************************
/**********************  JS验证数据  ******************************/

/**
 * @example 以下为控制input框输入数据类型：直接放入input框
 * 控制文本框只能输入正数
 onkeypress="var key=window.event?event.keyCode:event.which;return (key>=48&&key<=57)||(key==8)" onpaste="return clipboardData.getData('text').match(/^\d+$/)!=null;"
 * 控制文本框只能输入数字
 onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu = "value=value.replace(/[^0-9]/g,'')"
 * 控制文本框不能输入特殊字符
 onkeyup="this.value=this.value.replace(/[^u4e00-u9fa5w]/g,'')";this.value=this.value.replace(/[^u4e00-u9fa5w]/g,'')
 * 控制文本框只能输入数字、小数点
 onkeyup="value=value.replace(/[^\0-9\.]/g,'')" onpaste="value=value.replace(/[^\0-9\.]/g,'')" oncontextmenu = "value=value.replace(/[^\0-9\.]/g,'')"
 * 控制文本框只能输入英文
 onkeyup="value=value.replace(/[^\a-\z\A-\Z]/g,'')" onpaste="value=value.replace(/[^\a-\z\A-\Z]/g,'')" oncontextmenu = "value=value.replace(/[^\a-\z\A-\Z]/g,'')"
 * 控制文本框只能输入英文、数字
 onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" onpaste="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')" oncontextmenu = "value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')"
 * 控制文本框只能输入中文
 onkeyup="value=value.replace(/[^\u4E00-\u9FA5]/g,'')" onpaste="value=value.replace(/[^\u4E00-\u9FA5]/g,'')" oncontextmenu = "value=value.replace(/[^\u4E00-\u9FA5]/g,'')"
 * 控制文本框只能输入中文、英文、数字
 onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')" onpaste="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')" oncontextmenu = "value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')"
 * 控制文本框只能输入中文、英文、数字、空格
 onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\ ]/g,'')" onpaste="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\ ]/g,'')" oncontextmenu = "value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\ ]/g,'')"
 * 控制文本框只能输入中文、英文、数字、小数点
 onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\.]/g,'')" onpaste="value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\.]/g,'')" oncontextmenu = "value=value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\.]/g,'')"
 */

/**
 * @function 验证字符串中是否存在某字符
 * @param str
 * @param check
 * @returns {*}
 */
function check_str( str,check = false ) {
    if( !check ){
        var regex = " [`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]".split("");
        for(var i=0;i<regex.length;i++ ){
            if( str.indexOf(regex[i]) > -1 ){
                if( regex[i] == ' '){
                    return "空格";
                }else{
                    return regex[i];
                }
            }
        }
        return false;
    }else{
        if( str.indexOf(check) > -1 ){
            return true;
        }else{
            return false;
        }
    }
}
/**
 * @function 验证邮箱格式
 * @param email
 * @returns {boolean}
 */
function reg_email( email ) {
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    if(!reg.test(email)){
        return false;
    }else{
        return true;
    }
}
/**
 * @function 字符串长度过滤验证,默认6-12长度区间，过滤空格
 * @param str
 * @param min
 * @param max
 * @returns {boolean}
 */
function reg_length( str,min = 6,max = 12 ) {
    var reg_str = get_bytes( filter_str( str.replace(/ /g,'') ) );
    if( reg_str > min || reg_str < max ){
        return true;
    }else{
        return false;
    }
}
/**
 * @function 验证手机号
 * @param mobile
 * @returns {boolean}
 */
function is_Mobile( mobile ) {
    if( !(/^1[34578]{1}\d{9}$/).test(mobile) ){
        return false;
    }else{
        return true;
    }
}
/**
 * @function 验证身份证
 * @param id_card
 * @returns {boolean}
 */
function reg_shenfenzheng( id_card ) {
    if( (/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(id_card)) ){
        return true;
    }else{
        return false;
    }
}
/**
 * @function 验证银行卡
 * @param card_number
 * @returns {boolean}
 */
function reg_yinhangka( card_number ) {
    if( (/^\d{16}|\d{19}$/.test(card_number)) ){
        return true;
    }else{
        return false;
    }
}
/**
 * @function 验证QQ格式
 * @param QQ    6-10
 * @returns {boolean}   true：YES false：NO
 */
function isQQ(QQ) {
    var bValidate = RegExp(/^[1-9][0-9]{5,9}$/).test(QQ);
    if(bValidate) {
        return true;
    }else{
        return false;
    }
}
/**
 * @function 验证纯数字
 * @param number
 * @returns {boolean}
 */
function is_Number( number){
    if( !isNaN(number) ){
        return true;
    }else{
        return false;
    }
}
/**
 * @function 判断是否为纯英文
 * @param name
 * @returns {boolean}
 */
function is_English(name) {
    if(name.length == 0)
        return false;
    for(i = 0; i < name.length; i++) {
        if(name.charCodeAt(i) > 128)
            return false;
    }
    return true;
}
/**
 * @function 判断是否为纯中文
 * @param name
 * @returns {boolean}
 */
function is_Chinese(name) {
    if(name.length == 0)
        return false;
    for(i = 0; i < name.length; i++) {
        if(name.charCodeAt(i) > 128)
            return true;
    }
    return false;
}
/**
 * @function 验证ip地址
 * @param strIp
 * @returns {boolean}
 */
function is_Ip(strIp) {
    var ipDomainPat=/^((2[0-4]d|25[0-5]|[01]?dd?).){3}(2[0-4]d|25[0-5]|[01]?dd?)$/;
    var matchArray=strIp.match(ipDomainPat);
    if(matchArray!=null){
        return true;
    }else{
        return false;
    }
}
/**
 * @function 判断是否为某个字符开头
 * @param s
 * @returns {boolean}
 */
String.prototype.startStr = function (s) {
    return this.indexOf(s) == 0
}
/**
 * @function 判断是否为某个字符结尾
 * @param s
 * @returns {boolean}
 */
String.prototype.endStr = function (s) {
    var d = this.length - s.length;
    return (d >= 0 && this.lastIndexOf(s) == d)
}
/**
 * @function 判断是否为URL网址
 * @param strUrl
 * @returns {boolean}
 * @constructor
 */
function IsURL(strUrl) {
    var regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i
    if (regular.test(strUrl)) {
        return true;
    }else {
        return false;
    }
}
/**
 * @function 检测URL链接是否有效
 * @param URL
 * @returns {boolean}
 */
function getUrlState(URL){
    var xmlhttp = new ActiveXObject("microsoft.xmlhttp");
    xmlhttp.Open("GET",URL, false);
    try{
        xmlhttp.Send();
    }catch(e){
    }finally{
        var result = xmlhttp.responseText;
        if(result){
            if(xmlhttp.Status==200){
                return(true);
            }else{
                return(false);
            }
        }else{
            return(false);
        }
    }
}
/**
 * @function 判断是否键盘有效输入值
 * @param iKey
 * @returns {boolean}
 */
function checkKey(iKey){
    if(iKey == 32 || iKey == 229){return true;}/*空格和异常*/
    if(iKey>47 && iKey < 58){return true;}/*数字*/
    if(iKey>64 && iKey < 91){return true;}/*字母*/
    if(iKey>95 && iKey < 108){return true;}/*数字键盘1*/
    if(iKey>108 && iKey < 112){return true;}/*数字键盘2*/
    if(iKey>185 && iKey < 193){return true;}/*符号1*/
    if(iKey>218 && iKey < 223){return true;}/*符号2*/
    return false;
}
/**
 * @function 获取正则表达式
 * @param regex
 * @returns {string}
 */
function regex( regex ){
    var preg = ''
    switch( regex ){
        case '正整数': preg = '/^[0-9]*[1-9][0-9]*$/';
            break;
        case '负整数': preg = '/^-[0-9]*[1-9][0-9]*$/';
            break;
        case '正浮点数': preg = '/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/';
            break;
        case '负浮点数': preg = '/^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/';
            break;
        case '浮点数': preg = '/^(-?\d+)(\.\d+)?$/';
            break;
        case 'email': preg = '/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/';
            break;
        case 'url': preg = '^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$';
            break;
        case '中文': preg = '/[\u4e00-\u9fa5]/';
            break;
        case '帐号': preg = '/^[a-zA-Z][a-zA-Z0-9_]{4,9}$/';  // 字母开头，允许5-10字节，允许字母数字下划线
            break;
        case '空白行': preg = '/\n\s*\r/';
            break;
        case '邮政编码': preg = '/[1-9]\d{5}(?!\d)/';
            break;
        case '身份证': preg = '/\d{15}|\d{18}/';
            break;
        case '国内电话号码': preg = '/(\d{3}-|\d{4}-)?(\d{8}|\d{7})?/';
            break;
        case 'IP': preg = '/((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/';
            break;
        case 'HTML': preg = '< (\S*?)[^>]*>.*?|< .*? />';
            break;
        case 'SQL': preg = '^(select|drop|delete|create|update|insert).*$';
            break;
    }
    return preg;
}

/**************************************************************
 /**********************  设备及页面函数  ******************************/

/**
 * @function 设置Cookie值
 * @param name
 * @param value
 * @param Hours
 */
function setCookie(name, value, Hours) {
    var d = new Date();
    var offset = 8;
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = utc + (3600000 * offset);
    var exp = new Date(nd);
    exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString() + ";domain=360doc.com;"
}
/**
 * @function 获取Cookie值
 * @param name
 * @returns {null}
 */
function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null
}
/**
 * @function 删除Cookie
 * @param name
 */
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
/**
 * @function 获取移动设备屏幕宽度
 * @returns {number}
 */
function getScreenWidth(){
    var smallerSide = Math.min(screen.width, screen.height);
    var fixViewPortsExperiment = rendererModel.runningExperiments.FixViewport || rendererModel.runningExperiments.fixviewport;
    var fixViewPortsExperimentRunning = fixViewPortsExperiment && (fixViewPortsExperiment.toLowerCase() === "new");
    if(fixViewPortsExperiment){
        if(this.isAndroidMobileDevice() && !this.isNewChromeOnAndroid()){
            smallerSide = smallerSide/window.devicePixelRatio;
        }
    }
    return smallerSide;
}
/**
 * @function 获取页面高度
 * @returns {number}
 */
function getPageHeight(){
    var g = document, a = g.body, f = g.documentElement, d = g.compatMode == "BackCompat"
        ? a
        : g.documentElement;
    return Math.max(f.scrollHeight, a.scrollHeight, d.clientHeight);
}
/**
 * @function 获取页面宽度
 * @returns {number}
 */
function getPageWidth(){
    var g = document, a = g.body, f = g.documentElement, d = g.compatMode == "BackCompat"
        ? a
        : g.documentElement;
    return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth);
}
/**
 * @function 获取页面可视宽度
 * @returns {number}
 */
function getPageViewWidth(){
    var d = document, a = d.compatMode == "BackCompat"
        ? d.body
        : d.documentElement;
    return a.clientWidth;
}
/**
 * @function 获取页面可视高度
 * @returns {number}
 */
function getPageViewHeight() {
    var d = document, a = d.compatMode == "BackCompat"
        ? d.body
        : d.documentElement;
    return a.clientHeight;
}
/**
 * @function 获取页面scrollLeft
 * @returns {number}
 */
function getPageScrollLeft(){
    var a = document;
    return a.documentElement.scrollLeft || a.body.scrollLeft;
}
/**
 * @function 获取页面scrollTop
 * @returns {number}
 */
function getPageScrollTop(){
    var a = document;
    return a.documentElement.scrollTop || a.body.scrollTop;
}
/**
 * @function 加入收藏夹
 * @param sURL
 * @param sTitle
 * @constructor
 */
function AddFavorite(sURL, sTitle) {
    try {
        window.external.addFavorite(sURL, sTitle)
    } catch(e) {
        try {
            window.sidebar.addPanel(sTitle, sURL, "")
        } catch(e) {
            alert("加入收藏失败，请使用Ctrl+D进行添加")
        }
    }
}
/**
 * @function 将浏览器设置为首页
 */
function setHomepage() {
    if (document.all) {
        document.body.style.behavior = 'url(#default#homepage)';
        document.body.setHomePage('http://w3cboy.com')
    } else if (window.sidebar) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
            } catch(e) {
                alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true")
            }
        }
        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
        prefs.setCharPref('browser.startup.homepage', 'http://w3cboy.com')
    }
}
/**
 * @function 判断是否为移动设备
 * @returns {*}
 */
function isMobile(){
    if (typeof this._isMobile === 'boolean'){
        return this._isMobile;
    }
    var screenWidth = this.getScreenWidth();
    var fixViewPortsExperiment = rendererModel.runningExperiments.FixViewport ||rendererModel.runningExperiments.fixviewport;
    var fixViewPortsExperimentRunning = fixViewPortsExperiment && (fixViewPortsExperiment.toLowerCase() === "new");
    if(!fixViewPortsExperiment){
        if(!this.isAppleMobileDevice()){
            screenWidth = screenWidth/window.devicePixelRatio;
        }
    }
    var isMobileScreenSize = screenWidth < 600;
    var isMobileUserAgent = false;
    this._isMobile = isMobileScreenSize && this.isTouchScreen();
    return this._isMobile;
}
/**
 * @function 判断是否移动设备访问
 * @returns {boolean}
 */
function isMobileUserAgent(){
    return (/iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(window.navigator.userAgent.toLowerCase()));
}
/**
 * @function 判断是否苹果移动设备访问
 * @returns {boolean}
 */
function isAppleMobileDevice(){
    return (/iphone|ipod|ipad|Macintosh/i.test(navigator.userAgent.toLowerCase()));
}
/**
 * @function 判断是否安卓移动设备访问
 * @returns {boolean}
 */
function isAndroidMobileDevice(){
    return (/android/i.test(navigator.userAgent.toLowerCase()));
}
/**
 * @function 获取移动设备初始化大小
 * @returns {*}
 */
function getInitZoom(){
    if(!this._initZoom){
        var screenWidth = Math.min(screen.height, screen.width);
        if(this.isAndroidMobileDevice() && !this.isNewChromeOnAndroid()){
            screenWidth = screenWidth/window.devicePixelRatio;
        }
        this._initZoom = screenWidth /document.body.offsetWidth;
    }
    return this._initZoom;
}
