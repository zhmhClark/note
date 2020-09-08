1. 基本语法
    1. JS作为动态语言，变量可以随时改变类型
    2. 重新声明已存在的变量，第二次声明无效。但如果第二次声明赋值了，会覆盖原先的值
        ```js
        var x = 1;
        var x = 2;
        ```
    3. JavaScript 引擎的工作方式是，先解析代码，获取所有被声明的变量，然后再一行一行地运行。这造成的结果，就是所有的变量的声明语句，都会被提升到代码的头部，这就叫做变量提升（hoisting）
    4. JavaScript 可以兼容 HTML 代码的注释，所以`<!--`和`-->`也被视为合法的单行注释
    5. `switch`采用严格相等运算符，判断条件时不发生类型转换
    6. JavaScript 允许使用标签跳转
        ```js
        top:
            for (var i = 0; i < 3; i++){
              for (var j = 0; j < 3; j++){
                if (i === 1 && j === 1) break top;
                console.log('i=' + i + ', j=' + j);
              }
            }
        // i=0, j=0
        // i=0, j=1
        // i=0, j=2
        // i=1, j=0

        //标签跳出代码块
        foo: {
          console.log(1);
          break foo;
          console.log('本行不会输出');
        }
        console.log(2);
        // 1
        // 2

        //continue使用label 可以跳到外层循环
        top:
        for (var i = 0; i < 3; i++){
          for (var j = 0; j < 3; j++){
            if (i === 1 && j === 1) continue top;
            console.log('i=' + i + ', j=' + j);
          }
        }
        // i=0, j=0
        // i=0, j=1
        // i=0, j=2
        // i=1, j=0
        // i=2, j=0
        // i=2, j=1
        // i=2, j=2
        ```
2. 数据类型
    1. 空数组（[]）和空对象（{}）对应的布尔值，都是true
    2. 与数值相关的函数
         - `parseInt()`
            接收字符串，如果不是则会先转为字符串
            转为十进制整数，一个个字符依次转换，直至不可继续，返回已转好部分
            如果首字符不可转，则返回`NaN`
            `0x`开头的按16进制数转换回10进制
            有些数字会先转为科学计数法，则无法正确转换
            ```js
            parseInt('8a') // 8
            parseInt('12**') // 12
            parseInt('12.34') // 12
            parseInt('15e2') // 15
            parseInt('15px') // 15
            ```
            可接收第二个参数作为进制
    3. 对象相关 
        - 对象的所有键名都是字符串，如果键名是数值，会被自动转为字符串。
        - 属性可以动态创建，不必在对象声明时就指定。
        - 数值键名不能使用点运算符（因为会被当成小数点），只能使用方括号运算符。
        - 查看一个对象本身的所有属性，可以使用Object.keys方法。
          ```js
          var obj = {
            key1: 1,
            key2: 2
          };
          
          Object.keys(obj);
          // ['key1', 'key2']
          ```
    4. 函数
        - `var` 声明的变量，将提升至函数头部
        - 函数执行时所在的作用域，是定义时的作用域，而不是调用时所在的作用域
          ```js
          var a = 1;
          var x = function () {
            console.log(a);
          };
          
          function f() {
            var a = 2;
            x();
          }
          
          f() // 1
          ```
        - 闭包使得内部变量记住上一次调用时的运算结果
          ```js
          function createIncrementor(start) {
            return function () {
              return start++;
            };
          }

          var inc = createIncrementor(5);

          inc() // 5
          inc() // 6
          inc() // 7
          ```
    5. console API
      - `inspect(obj)`
      - `keys(obj)`
      - `values(obj)`