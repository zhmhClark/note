# Python 网络爬虫

## Requests

七个方法的本质都是调用`request()`

HTTP协议对URL资源的操作

| 方法   | 说明                           |
| ------ | ------------------------------ |
| GET    | 请求URL位置的资源              |
| HEAD   | 请求资源的头部                 |
| POST   | 请求向资源后附加新数据         |
| PUT    | 请求存储资源覆盖原资源         |
| PATCH  | 请求局部更新资源，改动部分内容 |
| DELETE | 请求删除对应位置资源           |



### get()

```python
r = requests.get(url)
```
- 构造向服务器请求资源的Request对象，并返回一个包含服务器资源的Response

- Response对象的属性

  | 属性                | 说明                              |
  | :------------------ | --------------------------------- |
  | r.status_code       | HTTP请求的返回状态                |
  | r.text              | HTTP响应内容，即url对应的页面内容 |
  | r.encoding          | 从HTTP header中猜测的编码方式     |
  | r.apparent_encoding | 从内容分析出的编码方式            |
  | r.content           | HTTP响应内容的二进制格式          |

  `r.encoding`在header中没有charset时默认为ISO-8859-1

###  requests异常

| 异常                      | 说明                                        |
| :------------------------ | ------------------------------------------- |
| requests.ConnectionError  | 网络连接错误异常，如DNS查询失败、拒绝连接等 |
| requests.HTTPError        | HTTP错误                                    |
| requests.URLRequired      | URL缺失异常                                 |
| requests.TooManyRedirects | 重定向次数太多                              |
| requests.ConnectTimeout   | 连接服务器超时                              |
| requests.Timeout          | 请求URL超时                                 |

- 通用代码框架

  ``````python
  import requests
  
  def getHTMLText(url):
      try:
          r = requests.get(url, timeout=30)
          r.raise_for_status()
          r.encoding =r.apparent_encoding
          return r.text
      except:
          return "exception exsist"
  
  if __name__ == "__main__":
      url = "http://www.baidu.com"
      print(getHTMLText(url))
  ``````

### post()

- 向URL POST字典会自动转化进"form"，字符串自动转化为"data"

### request()

`requests.request(method, url, **kwargs)` method为七种方法，**kwargs包括

- params: 字典，将作为参数添加到url中

  ``````python
  kv = {'key1': 'value1', 'key2': 'value2'}
  r = requests.request('GET', 'http://www.python123.com/ws', params=kv)
  print(r.url)
  # http://www.python123.com/ws?key1=value1&key2=value2
  ``````
  
- data: 字典、字符串、文件对象，作为Request的内容
  ``````python
  kv = {'key1': 'value1', 'key2': 'value2'}
  # kv = 'body'
  r = requests.request('POST', 'http://www.python123.com/ws', data=kv)
  ``````
  
- json: JSON格式的数据，作为Request的内容

- headers: 字典，HTTP定制头部

  ``````python
  hd = {'user-agent': 'Chrome/10'}
  r = requests.request('POST', 'http://python123.io/ws', headers=hd)
  ``````

- cookies: 字典或CookieJar, Request中的cookie

- auth: 元组，支持HTTP认证功能

- files: 字典类型，传输文件

  ``````python
  fs = {'files': open('data.xls', 'rb')}
  r = requests.request('POST', 'http://python123.io/ws', files=fs)
  ``````

- timeout: 超时时间，秒为单位

- proxies: 字典类型，设置代理服务器，可增加登录认证

  ``````python
  pxs = {'http': 'http://user:pass@10.10.10.1:1234',
        'https': 'http://10.10.10.1:4321'}
  r = requests.request('GET', 'http://www.baidu.com', proxies=pxs)
  ``````

- allow_redirects: 布尔类型，默认为True，允许重定向

- stream: 布尔类型，默认为True, 获取内容立即下载开关

- verify: 布尔类型，默认为True, 认证SSL证书开关

- cert: 本地SSL证书路径

  