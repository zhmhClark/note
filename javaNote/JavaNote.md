# java note
1. 其他
    1. jdk目录：`bin`可执行；`lib`Java类库文件；`include`本地方法
    2. Java编译流程(见图`javaCompile.png`)
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
    5. String
        1. `intern()` 返回字符串在池中的常量，如果没有就在常量池中创建
        2. 赋初值为常量的字符串以及由此拼接的字符串也入常量池，一旦含有变量就不入
3. class / interface
    1. `main()`函数中的未定义变量可以是类的static变量
    2. 成员内部类可以访问外部类的所有属性与方法，访问时若有内外同名变量，需用`OuterClass.this.var`
    3. 静态内部类 外类.内类 ~ = new 外类.内类();
       成员内部类 外类.内类 ~ = 外类.new 内类();
    4. 构造函数中，`this(...)`或`super(...)`写在第一句
    5. 当基类没有默认的无参构造函数时，派生类构造函数第一句`super()`会出错
    6. `A instanceof B`判断A是否为B的派生类
    7. 多接口写法:`class A implements I1, I2, I3`
    8. 未实现全部接口写法的为抽象类，需声明为抽象类
    9. 接口中的函数会隐式声明为`public abstract`，变量会隐式声明为`public static final`
    10. 接口可以多继承接口
    11. 抽象类可以无抽象函数，有抽象函数必声明为抽象类
    12. 静态函数不会被重写，会被覆盖
    13. 函数不可能同为`static`与`abstract`
    14. 重写与重载（见图`overwrite&overload.png`）
4. API
    1. Date
        - Java封装有`Date`与`SimpleDateFormat`接口
            ```java
            Date dNow = new Date( );
            SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
            ```
    2. Random
        - Java.util.Random 在种子一样时生成的数一样
    3. Arrays
        - Java.util.Arrays 的各种函数（见图`Arrays.png`）
    4. Object
        - Object常被重写的函数（见图`ObjectOverwrite.png`）
    5. Collection and Map
        - 常见的集合容器类（见图`Collection&Map.png`, `Collection&Map.png`, `ListAPI.png`, `Linkedlinst.png`, `MapAPI.png`）
5. Exception
    1. 若`try/catch`中有`return`，在`return`前先执行`finally`
    2. 多个`catch`时，依次匹配，执行第一个可以匹配的
    3. `RuntimeException`不要求程序一定做出处理
    