let cookieUtil = {
    // 设置cookie
    setItem: function(name, value, days) {
        let date=new Date();
        date.setDate(date.getDate()+days);
        document.cookie=name+'='+value+';expires='+date;
    },

    // 获取cookie
    getItem: function(name) {
         let arr=document.cookie.replace(/\s/g, "").split(';');
         for(let i=0;i<arr.length;i++) {
             let tempArr=arr[i].split('=');
             if(tempArr[0]==name) {
                return decodeURIComponent(tempArr[1]);
             }
         }
         return '';
    },

    // 删除cookie
    removeItem: function(name) {
        this.setItem(name,'1', -1);
    },

    // 检查是否含有某cookie
    hasItem: function(name) {
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(name).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },

    // 获取全部的cookie列表
    getAllItems: function() {
        let cookieArr = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (let nIdx = 0; nIdx < cookieArr.length; nIdx++) { cookieArr[nIdx] = decodeURIComponent(cookieArr[nIdx]); }
        return cookieArr;
    }
};