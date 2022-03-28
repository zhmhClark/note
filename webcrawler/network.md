# Network

## HTTP

- 网址构成的结尾
  - 完整的网址应当是形如`http://www.example.com/dir/file.html`
  - 以 `/` 结尾说明使用缺省默认的的文件 `http://www.example.com/dir/`
  - 以`file` 结尾无后缀会查找相应名称的目录或文件，目录与文件不可同名，所以不会有同名歧义 `http://www.example.com/dir/file`
  - 域名后面什么都没有，会使用根目录下的默认目录/文件 `http://www.example.com`

- URL 是 URI 的子集
  - URI: 统一资源标识符，用于唯一标识当前网络中的资源
  - URL: 统一资源定位符，当前网络资源的具体位置，由于通过位置可以唯一标识资源，所以可以视为一种URI
  - URI 包括 URL 和 URN

- HTTP请求与响应格式

  - 请求

    ```http
    GET /cgi/sample.cgi?Field=A&SendButton=SEND HTTP/1.1 
    Accept-Language: zh
    User-Agent: Mozilla/4.0
    Connection: Keep-Alive
    
    请求行：<请求头> <URI> <HTTP版本>
    消息头：多种字段的键值对
    消息体
    ```

  * 响应

    ```http
    HTTP/1.1 200 OK
    Date: Wed, 21 Feb 2007 09:19:14 GMT
    Server: Apache
    Content-Length: 632
    
    <html>
    <head>
    <title>News</title>
    
    <body>
    <h1 align="center">News</h1>
    <img border="1" src=pic.jpg align="right" width="200" height="150">
    
    状态行：<HTTP版本> <状态码> <响应短语>
    消息头：多种字段的键值对
    消息体
    ```

- GET 与 POST 的区别

  - GET长度有限，超过几百字节后必须用POST

- HTTP状态码

  - 1xx: 告知进度
  - 2xx:成功
  - 3xx:需要进一步操作
  - 4xx:客户端错误
  - 5xx:服务器错误

## IP

* 主机号全0表示子网本身，全1表示广播