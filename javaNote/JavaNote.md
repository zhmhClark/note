# java note
1. 其他
    1. jdk目录：`bin`可执行；`lib`Java类库文件；`include`本地方法
2. basic grammer
    1. `int a[][] = new int[3][]`二维数组必须声明行数<br>`int a[][]  = new int[][]{{1,2,3},{4},{5,6}}`
    2. mod 取模正负问题：结果数值同双正 符号取决于被取模数（%前数字）
    3. 同数比较问题
        ```java
        int a = 7;
        Integer b = 7;
        Integer c = new Integer(7);
        ```
        |==|a|b|c|
        |-|-|-|-|
        |a|Y|||
        |b|Y|[-128,127]Y||
        |c|Y|N|N|
        **java会缓存-128~127入池**
    4. java默认整数为int，小数为double，
        1. 故`long d = ...` 若结尾不加l,会先识别为int，再转换为long
        2. 故超出int范围会出错，初始化小数的float，若不加f会出错
        3. 故`bite b3 = b1 + b2;`会出错
3. class / interface
    1. 