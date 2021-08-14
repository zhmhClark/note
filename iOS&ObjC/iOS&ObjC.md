1. Others

   1. 自动释放池

      ``````objective-c
      @autorealeasepool
      {
          ...
      }
      ``````

   2. NSLog

      [784:2105756],[进程号：线程号]

   3. 编译链接
      1. cc -c xx.m
      2. cc xx.o
         - cc xx.o -framework Foundation

2. 数据类型

   - BOOL 
   
3. 定义类

   ``````objective-c
   @interface 类名: NSObject
   {    
       @public
       ...
   }   
   @end
   
   
   @implementation 类名
   
   @end
   ``````

   `````objective-c
   - (返回值类型)函数名
   `````

4. 类方法

   ​	用空指针调用的方法不报错，不会有任何动作

   ​	成员变量不能在声明的时候初始化

   ``````objective-c
   - (int)sum:(int)num1 :(int)num2;
   int s = [c sum:10 :20];
   - (int)sumWithNum1:(int)num1 andWithNum2:(int)num2;
   ``````

5. 属性修饰

   - 线程安全

     两个属性在ARC和MRC下均可使用

     - atomic

       线程安全，效率低，但并非绝对安全，对getter和setter不安全

     - nonatomic

       线程不安全，效率高，默认使用

   - 内存管理

     - retain

       仅MRC，OC基本类型对象默认使用，会引用+1

     - assign

       MRC和ARC都可使用，一般对象使用，不改变引用计数

     - strong

       仅ARC下使用，引用+1

     - weak

       仅ARC下使用，OC基本类型对象使用，不改变引用计数

     - copy

       仅ARC下使用，深拷贝

   - 读写权限

     - readwrite
     - readonly

   - 属性默认为protected,访问修饰符的作用范围类似于switch里的case，不带break，只修饰属性，不修饰方法fen

6. 分类 Cateogry

   1. 分类只能增加方法，不能增加属性
   2. 分类中写@property不会自动生成getter setter,所以还是不能增加属性
   3. 分类实现当中，无法直接访问本类的私有属性，但可以调用getter和setter使用
   4. 当分类方法和本类方法同名时，优先调用分类方法，即使没有引用分类文件。如果多个分类方法同名，优先调用最后一个编译的
   5. 文件名带加号，文件内：`@interface ClassName (category)`
   6. 非正式协议：系统类的分类

7. 延展 Extension

   1. 延展只有声明(.h)，没有实现(.m)

   2. 文件名带下划线，.h文件在类名后有一对空括号

   3. 可以添加属性和方法声明，都是私有的，即只能在本类的.m文件中调用

   4. 一般会把延展写在.m文件里，用于定义私有属性，即文件开头的

      ``````objective-c
      @interface ClassName ()
      @property (nonatomic, strong) xxx *xx;
      @end
      
      @implementation ClassName
      - (void) functionName {
          ...
      }
      ``````

      

8. 其他

   - `unrecongnized selector sent to instance ...` 对象中没有对应方法的实现 

   - 类方法和对象方法可以同名

   - 类方法中的self指向当前类

   - Class c1 = [Person class]

   - ``````objective-c
     SEL s1 = @selector(method); //有参数要带冒号，写作method:
     [o1 performSelector:s1];
     [o1 performSelector:s1 withObject:param1 withObject:param2];
     ``````

   - @property生成的属性是私有的

   - 调用方法时，会根据指针类型判断方法是否能执行。如果指向子类，需要先对指针进行强制转换。id作为万能指针可以避免。

   - 用instancetype做返回值类型便于继承后调用，同时方法内部用self

   - `responseToSelector:@selector(sel)`判断当前指针能否调用对应函数，返回布尔类型，`instanceResponseTOSelector:@selector(sel)`

   - `isKindOfClass([Clz class])`判断是否为其对象或子类对象。`isMemberOfClass`不包含子类对象，`isSubClassOfClass`判断是否为子类

   - `@class`用于解决循环import，在.h文件中使用，再在.m中import

   - `%C`可以读unicode字符，`unichar`可以存unicode字符

   - ARC与Java GC的区别：GC是在运行时扫描，ARC在编译时让引用计数为0的地方。

9. 规范

   1. 返回BOOL的getter命名用is/can/should开头，但属性名不包含is/can/should

      ``````objective-c
      @property (nonatomic, getter=isGlorious) BOOL glorious;
      - (BOOL)isGlorious;
      
      BOOL isGood = object.glorious;
      BOOL isGood = [object isGlorious];
      ``````

   2. 返回对象的方法可以用名词开头标识返回对象

      ``````objective-c
      - (Sandwich *)sandwich;
      ``````

   3. getter不应加`get`，直接对应同名属性，小写，没下划线
   4. 多参数方法每个参数前都要有函数体

   5. 全局变量前面用`g`

   6. @interface前要加注释

   7. 函数调用时若参数太多需要换行，以冒号对齐。冒号前后不空格。

   8. 使用`nullable`和`nonnull`修饰属性，或者`_Nullable` `_Nonnull`用于其他

      `````objective-c
      @property (readonly, copy, nonnull) NSString *author;
      @property (readonly, copy, nullable) NSString *author;
      `````

   9. 获取属性优先选择点语法，不要调用函数

   10. 初始化常用数据结构时，采用字面量，大括号里不用空格

   11. if-else不超过4层，最快路径在最前面

   12. 用三目运算符将常规整数转化为`Yes` `NO`

       ``````objective-c
       - (Bool)isBold {
           return ([self fontTraits] & NSFontBoldTrait) ? YES : NO;
       }
       ``````

   13. 访问`CGRect`的`x`, `y`, `width`, `height`时，

