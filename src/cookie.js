// 쿠키 키값 가져오기
export function getCookie(key) {
    return document.cookie.substring(0, document.cookie.indexOf("="));
}

// 쿠키 데이터 값 가져오기
export function getCookieValue(key) {
    let cookieKey = key + "="; 
    let value = "";
    const cookieArr = document.cookie.split(";");

    for(let i = 0; i < cookieArr.length; i++) {
        if(cookieArr[i][0] === " ") {
            cookieArr[i] = cookieArr[i].substring(1);
        }
        if(cookieArr[i].indexOf(cookieKey) === 0) {
            value = cookieArr[i].slice(cookieKey.length, cookieArr[i].length);
            return value
        }
    }
    return value
}

// 쿠키 설정하기
export function setCookie(key, value, exp = 1, options = { path: '/' }) {
    var date = new Date();
    let valueArr = value + ","
    if (document.cookie.substring(0, document.cookie.indexOf("=")) === 'view') {
        valueArr = document.cookie.substring(document.cookie.indexOf("=") + 1) + value + ","
    }
    date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);

    options = {...options, expires: date.toUTCString()};

    let updatedCookie = key + "=" + valueArr;
    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }
    document.cookie = updatedCookie;
    return updatedCookie;
}