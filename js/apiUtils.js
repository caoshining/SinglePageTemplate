import axios from 'axios';
const getOrigin = ''||location.origin
const APIUtils = {
  base: getOrigin,
  XML2jsobj: function (node) {
    var data = {};

    // append a value
    function Add(name, value) {
      if (data[name]) {
        if (data[name].constructor != Array) {
          data[name] = [data[name]];
        }
        data[name][data[name].length] = value;
      }
      else {
        data[name] = value;
      }
    }

    // element attributes
    var c, cn;
    if (node.attributes) {
      for (c = 0; cn = node.attributes[c]; c++) {
        Add(cn.name, cn.value);
      }
    }

    // child elements
    for (c = 0; cn = node.childNodes[c]; c++) {
      if (cn.nodeType == 1) {
        if (cn.childNodes.length == 1 && cn.firstChild.nodeType == 3) {
          // text value
          Add(cn.nodeName, cn.firstChild.nodeValue);
        }
        else {
          // sub-object
          Add(cn.nodeName, this.XML2jsobj(cn));
        }
      }
    }
    return data;
  },
  code: function (d) {
    return d.match(/code="(\d+?)"/g)[0].split('=')[1].replace(/"/g, "")
  },
  /**
   * 公用post请求
   * @param url
   * @param params
   * @returns {Promise.<TResult>}
   */
  commonPost: (url, params, type) => {
    if (type !== 'noLoad') {
    }
    if(Object.prototype.toString.call(params) !== '[object Object]'){
      params = {}
    }
    console.log(params)
    return axios({
      url: APIUtils.base + url,
      method: 'post',
      data: params,
      timeout: 8000,
      responseType: 'json',
      // transformRequest: [function (data) {
      //   将POST 的数据以Formdata提交
      //   let ret = ''
      //   for (let it in data) {
      //     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      //   }
      //   return ret
      // }]
    }).then(res => {
      // console.log(url + '接口返回数据：', APIUtils.XML2jsobj(res.data.documentElement))
      if (type !== 'noLoad') {
      }
      return res.data
    }).catch(error => {
      console.log(error);
      return null
    })
  },
  /**
   * 公用get请求
   * @param url
   * @returns {Promise.<TResult>}
   */
  commonGet: (url, type) => {
    let time = new Date().getTime();
    if (type !== 'noLoad') {
    }
    return axios({
      url: APIUtils.base + url,
      responseType: 'json',
      timeout: 8000,
    }).then(res => {
      console.log(res)
      let time1 = new Date().getTime();
      console.log(url + '耗时：' + (time1 - time) / 1000)
      // console.log(url + '接口返回数据：', APIUtils.XML2jsobj(res.data.documentElement))
      let serverTime = res.headers['date']
      let obj = res.data.
      obj.serverTime = serverTime
      if (type !== 'noLoad') {
      }
      return obj
    }).catch(error => {
      console.log(error);
      console.log('url:', url);
      return null
    })
  },
  jsonGet: (url, type) => {
    if (type !== 'noLoad') {
    }
    return axios({
      url: APIUtils.base + url,
      responseType: 'json',
      timeout: 8000,
    }).then(res => {
      console.log(url + '接口返回数据========', res.data);
      return res.data;
    }).catch(error => {
      console.log(error);
      if (type !== 'noLoad') {
      }
      return null;
    })
  }
}
export default APIUtils
