import axios from 'axios'

export function generate({baseUrl, headers}){
  const instance = axios.create({
    baseURL: baseUrl,
    timeout: 20000,
    validateStatus: function (status) {
      return status >= 200 && status <= 300
    },
    withCredentials:false,
    headers: headers || {
      'Content-Type': 'application/json;charset=utf-8',
      'Accept': 'application/json'
    }
  })
  // 请求拦截器
  instance.interceptors.request.use(
    config => {
      let token = sessionStorage.getItem('token')
      if(token){
        config.headers = {
          Authorization: 'bearer ' + token,
          ...config.headers
        }
      }
      return config
    },error => {
      return Promise.reject(error)
    }
  )

  const errorHandle = (status,other) => {
    switch(status){
      case 401:
        console.log('token失效，请重新登陆')
            break
      case 403:
        console.log('服务器拒绝请求')
            break
    }
  }
}
