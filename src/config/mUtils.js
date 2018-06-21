/**
 * cookies
 */
export const getCookie = (key) => {  //存储cookies
	try {
		let arr = document.cookie.match(new RegExp("(^| )" + key + "=([^;]*)(;|$)"))
		if (arr != null) {
			return decodeURIComponent(arr[2])
		}
	} catch (e) {}
	return false
}
export const setCookie = (key, value, date, domain) => {  //获取cookies
	try {
		domain = domain ? (';domain=' + domain) : ''
		let sec = date ? date * 1000 : 3600 * 1000  //默认一个小时失效
		let exp = new Date()
		exp.setTime(exp.getTime() + sec)
		document.cookie = key + "=" + encodeURIComponent(value) + domain + ";expires=" + exp.toGMTString() + ";path=/"
	} catch (e) {}
}
export const removeCookie = (key, domain) => {  //删除cookies
	setCookie(key, "", -24 * 60 * 60, domain)
}

/**
 * localStorage
 */
export const setStore = (name, content) => {  //存储localStorage
	if (!name) return
	if (typeof content !== 'string') {
		content = JSON.stringify(content)
	}
	window.localStorage.setItem(name, content)
}
export const getStore = name => {  //获取localStorage
	if (!name) return
	return window.localStorage.getItem(name)
}
export const removeStore = name => {  //删除localStorage
	if (!name) return
	window.localStorage.removeItem(name)
}

/**
 * 检测是否微信端
 */
export const isWeiXin = () => {
	let ua = window.navigator.userAgent.toLowerCase()
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		//微信
		return true
	} else {
		//非微信
		return false
	}
}

/**
 * 获取地址栏参数
 */
export const getQueryString = name => {
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)")
    let r = window.location.search.substr(1).match(reg)
    if(r!=null) return unescape(r[2])
    return null
}

/**
 * 检测字符串是否带有http(s)
 */
export const checkURL = URL => {
	let str = URL
	let Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/
	let objExp = new RegExp(Expression)
	if(objExp.test(str) == true){
		return true
	}else{
		return false
	}
} 

/**
 * 验证国内手机格式
 */
export const isPhone = str => {
	if(typeof str === 'number'){
		str = str.toString()
	}
	return /^0?1[3|4|5|7|8][0-9]\d{8}$/.test(str)
}

/**
 * 根据传入的时间戳返回 YYYY-MM-DD 格式的日期字符串
 */
export const formatDate = (timestamp) => {
	let myDate = new Date(timestamp)
	let args = {
		"Y": myDate.getFullYear(),
		"M": myDate.getMonth()+1,
		"D": myDate.getDate()
	}
	return args.Y + '-' + args.M + '-' + args.D
}

/**
 * 兼容微信设置页面的title
 */
export const setDocumentTitle = (title) => {
    document.title = title;
    let ua = navigator.userAgent;
    if (/\bMicroMessenger\/([\d\.]+)/.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
        var i = document.createElement('iframe');
        i.src = '/favicon.ico';
        i.style.display = 'none';
        i.onload = function () {
            setTimeout(function () {
                i.remove();
            }, 9);
        };
        document.body.appendChild(i);
    }
}