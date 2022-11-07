# Java note

## 其他

1. jdk目录：`bin`可执行；`lib`Java类库文件；`include`本地方法
2. Java编译流程(见图 `javaCompile.png`)
3. javadoc 命令可以用来生成真的 java doc

## basic grammer

1. `int a[][] = new int[3][]`二维数组必须声明行数 `<br>int a[][]  = new int[][]{{1,2,3},{4},{5,6}}`
2. mod 取模正负问题：结果数值同双正 符号取决于被取模数（%前数字）
3. char 占两个字节
4. 同数比较问题
   ```java
   int a = 7;
   Integer b = 7;
   Integer c = new Integer(7);
   ```
   | ==                               | a | b           | c |
   | -------------------------------- | - | ----------- | - |
   | a                                | Y |             |   |
   | b                                | Y | [-128,127]Y |   |
   | c                                | Y | N           | N |
   | **java会缓存-128~127入池** |   |             |   |
5. java默认整数为int，小数为double，
   1. 故 `long d = ...` 若结尾不加l,会先识别为int，再转换为long
   2. 故超出int范围会出错，初始化小数的float，若不加f会出错
   3. 故 `bite b3 = b1 + b2;`会出错
6. String
   1. `intern()` 返回字符串在池中的常量，如果没有就在常量池中创建
   2. 赋初值为常量的字符串以及由此拼接的字符串也入常量池，一旦含有变量就不入
   3. 转化为String: `String.valueOf(...)` `Character/Integer.toString(...)`
   4. `getBytes()`可以指定字符串编码格式 ，返回相应编码的字节数组，如s.getBytes("UTF-8")
   5. `String(byte[] bytes, String charsetName)`可以指定解码形式，用相应字节数组构造字符串
7. Character
   1. `Character.isAlphabetic(c)` `Character.isDgit(c)`用于判断字符是否为字母、数字
8. 格式化输出
   1. 输出保留两位的小数 `Sysout.printf("%.2f", data)` (data double)

9. final

   1. 存在blank final 属性，即声明变量时不赋初值，在使用前赋值

## class / interface

1. `main()`函数中的未定义变量可以是类的static变量

2. 非public类在包外不可见

3. 私有方法无法重写

4. 方法存在多态，成员访问不多态

5. 成员内部类可以访问外部类的所有属性与方法，访问时若有内外同名变量，需用 `OuterClass.this.var`

6. 静态内部类 外类.内类 ~ = new 外类.内类();
   成员内部类 外类.内类 ~ = new 外类.new 内类();

7. 构造函数中，`this(...)`或 `super(...)`写在第一句

8. 类中成员的初始化早于构造函数

   ```java
   class A {
       B b1 = new B(1);
       A() {
           b2 = new B(2);
   	}
       B b3 = new B(3); 
   }
   //1,3先执行，2后执行
   ```

   

9. 当基类没有默认的无参构造函数时，派生类构造函数第一句 `super()`会出错

10. `finalize()`用于gc前的核验,

11. `A instanceof B`判断A是否为B的派生类

12. 多接口写法:`class A implements I1, I2, I3`

13. 未实现全部接口写法的为抽象类，需声明为抽象类

14. 接口中的函数会隐式声明为 `public abstract`，变量会隐式声明为 `public static final`

15. 接口可以多继承接口

16. 抽象类可以无抽象函数，有抽象函数必声明为抽象类

17. 静态函数不会被重写，会被覆盖

18. 函数不可能同为 `static`与 `abstract`

19. 重写与重载（见图 `overwrite&overload.png`）

20. 函数可变参数(本质是一个数组，默认要放到最后一个参数)

    ``````java
    int sum(int... a) {
        int sum = 0;
        for(int i : a) sum += i;
    	return sum;
    }
    ``````

## 泛型

- 泛型方法

  ``````java
  public <T> void show(T t) {}
  ``````
- 泛型类、泛型接口

  ``````java
  public interface Generic<T> {}
  ``````

## API

1. Date

   - Java封装有 `Date`与 `SimpleDateFormat`接口
     ```java
     Date dNow = new Date( );
     SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
     ```
2. Random

   - Java.util.Random 在种子一样时生成的数一样
3. Arrays

   - Java.util.Arrays 的各种函数（见图 `Arrays.png`）
4. Object

   - Object常被重写的函数（见图 `ObjectOverwrite.png`）
5. Collection and Map

   - 常见的集合容器类（见图 `Collection&Map.png`, `Collection&Map.png`, `ListAPI.png`, `Linkedlinst.png`, `MapAPI.png`）
   - shuffle()可以打乱顺序
6. System

   - exit(int status) 终止程序，status非零表示异常
   - currentTimeMillis() 放回当前时间(毫秒)

## Exception

1. 若 `try/catch`中有 `return`，在 `return`前先执行 `finally`
2. 多个 `catch`时，依次匹配，执行第一个可以匹配的
3. `RuntimeException`不要求程序一定做出处理

## File

1. 文件指针为 `File`, `FileOutputStream`用于写,`FileInputStream`用于读
2. `File`常见API(见图 `FileAPI.png`)
3. Windows环境下目录为 `\\`
4. 字节缓冲流可以提升读写速度
5. 示例

   ```java
   try {
       File fileTest = new File("e:\\test.txt");
       if (!fileTest.exists()) fileTest.createNewFile();
       else System.out.println("existed");
   
       FileOutputStream fosTest = new FileOutputStream(fileTest);
       String str = "This is a test.";
       fosTest.write(str.getBytes());
       fosTest.close();
   
       FileInputStream fisTest = new FileInputStream(fileTest);
       byte[] b = new byte[(int)(fileTest.length())];
       fisTest.read(b);
       System.out.println(new String(b));
       fisTest.close();
   } catch (Exception e) {
       e.printStackTrace();
   }
   
   FileInputStream fis = new FileInputStream("path0");
   FileOutputStream fos = new FileOutputStream("path1");
   
   byte[] bys = new byte[1024];
   int len;
   while ((len = fis.read(bys)) != -1) {
       fos.write(bys, 0, len);
   }
   ```

## JDBC & DAO

1. 示例(windows环境 java与mysql)

   ```java
   package defaul;
   
   import java.sql.*;
   
   public class App {
   
   	public static void main(String[] args) {
   		Connection conn = null;
   		Statement stmt = null;
   		ResultSet rt = null;
   
   		try {
   			Class.forName("com.mysql.cj.jdbc.Driver");
   		} catch (Exception e) {
   			e.printStackTrace();
   		}
   
   		try {
   			String url = "jdbc:mysql://localhost:3306/mytest?serverTimezone=UTC&useUnicode=true&characterEncoding=utf-8";
   			String username = "root";
   			String password = "ch3ch2oh";
   			conn = DriverManager.getConnection(url, username, password);
   			stmt = conn.createStatement();
   			//stmt.execute("insert into test2 values('tbbt', 67, 1134);");
   			rt = stmt.executeQuery("select * from test2;");
   			while (rt.next()) {
   				System.out.println(rt.getString(1)+"\t"+rt.getInt(2)+"\t"+rt.getInt(3));
   			}
   		} catch (Exception e) {
   			e.printStackTrace();
   		} finally {
   			try {
   				if(conn != null) conn.close();
   				if(stmt != null) stmt.close();
   				if(rt != null) rt.close();
   			} catch (Exception e) {
   				e.printStackTrace();
   			}
   		}
   	}
   }
   
   ```
   关键部分

   ```java
   Class.forName("com.mysql.cj.jdbc.Driver");
   String url = "jdbc:mysql://localhost:3306/mytest?serverTimezone=UTC&useUnicode=true&characterEncoding=utf-8";
   conn = DriverManager.getConnection(url, username, password);
   stmt = conn.createStatement();
   //stmt.execute("insert into test2 values('tbbt', 67, 1134);");
   rt = stmt.executeQuery("select * from test2;");
   while (rt.next()) {
   	System.out.println(rt.getString(1)+"\t"+rt.getInt(2)+"\t"+rt.getInt(3));
   }
   ```
2. PreparedStatement解决注入攻击
   例如将上方示例中第二个 `try`块中的 `while`上方三句换为

   ```java
       pstmt = conn.prepareStatement("select * from test2 where tname like ?;");
   	pstmt.setString(1, "tbbt");
   	rt = pstmt.executeQuery();
   ```
3. `statement`常用方法见图 `statement.png`0

## Serializable

- 空接口，实现该接口的类的对象可以序列化，写入文件持久保存

  eg

  ``````java
  ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("path"));
  Student s = new Student("Tom", 30);
  oos.writeObject(s);
  ObjectInputStream ois = new ObjectInputStream(new FileInputStream("path"));
  Object obj = ois.readObject();
  Student s = (Student) obj;
  System.out.println(s.getName());
  ``````
- 如果序列化之后，类文件修改，反序列化可能会异常。类的SerialVersionID在实现Serializable接口时生成，序列化时会在文件中保存。修改类文件会改变ID，反序列化时ID不同会异常
- 一般情况下，应在类中自定义serialVersionID，`private static final long serialVersionUID = 314159L`
- 不参与序列化的变量用 `transient`修饰

## Properties

- 本质上是一个HashTable，可以用来将数据存入文件持久化保存

  ``````java
  Properties prop = new Properties();
  prop.setProperty("username", "Tom");
  prop.setProperty("password", "123456");
  prop.store(new FileOutputStream("file.properties"), "comment");
  prop.storeToXML(new FileOutputStream("file.xml"), "comment");
  Properties p2 = new Properties();
  p2.load(new FileInputStream("file.properties"));
  System.out.println(p2.get("username"));
  Properties p3 = new Properties();
  p3.loadFromXML(new FileInputStream("file.xml"));
  System.out.println(p3.get("password"));
  ``````

## 线程与进程

- 线程或继承Thread，或实现Runnable，实现Runnable后可以通过 `Thread t = new Thread(/*Runnable*/ r)`的方式执行

- `start()`启动线程，使线程并发执行

- `getName()`获取线程名称

- `getPriority()`获取线程优先级，`setPriority()`设置线程优先级

- `currentThread()`获取当前执行的线程

- `join()`其余线程必须等该线程结束才能执行

  - `t1.run()` 中有 `t2.join()`，t1 要等 t2 执行完成才能继续执行。

- `setDaemon(true)`当线程作为后台线程时，若所有线程都为后台线程，退出程序

  - 需要在start前设置

- `synchronized`

  用于给代码语句上锁，被锁住的语句在执行时不会被其他线程占用

  锁要求必须是所有线程共用的数据

  可以修饰函数，此时默认锁住的对象是所在对象本身

  如有静态函数、锁住的是类(getClass())


* `lock()` 显式调用锁，`tryLock()`允许尝试获得锁而未获得

- `yield()`当前线程让出占用

- 创建多线程的方式

  - 继承Thread
  - 使用Runnable
  - 匿名内部类
  - lambda
  - Callable Future
  - 线程池

### 死锁示例

```java
public class App {

    static class DeadLockTask implements Runnable {

        private boolean flag;
        private Object lock1;
        private Object lock2;

        public DeadLockTask(boolean flag, Object lock1, Object lock2) {
            this.flag = flag;
            this.lock1 = lock1;
            this.lock2 = lock2;
        }

        @Override
        public void run() {
            if (flag) {
                synchronized (lock1) {
                    System.out.println(Thread.currentThread().getName() + " got lock1");
                    try {
                        Thread.sleep(1000);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }

                    System.out.println(Thread.currentThread().getName() + " is waiting for lock2");
                    synchronized (lock2) {
                        System.out.println(Thread.currentThread().getName() + "got lock2");
                    }
                }
            } else {
                synchronized (lock2) {
                    System.out.println(Thread.currentThread().getName() + " got lock2");
                    try {
                        Thread.sleep(1000);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }

                    System.out.println(Thread.currentThread().getName() + " is waiting for lock1");
                    synchronized (lock1) {
                        System.out.println(Thread.currentThread().getName() + "got lock1");
                    }
                }
            }  
        }
        
    public static void main(String[] args) throws Exception {
        Object lock1 = new Object();
        Object lock2 = new Object();
        new Thread(new DeadLockTask(true, lock1, lock2), "Thread 01").start();
        new Thread(new DeadLockTask(false, lock1, lock2), "Thread 02").start();
    }
}
```

### 生产者消费者示例

```java
public class Box {
    int num;
    boolean full = false;

    public synchronized void put(int num) {

        if (full) {
            try {
                wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        this.num= num;
        System.out.println("put" + " : " + num);

        full = true;
        notifyAll();
    }

    public synchronized void get() {
        if (!full) {
            try {
                wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        System.out.println("get" + " : " + num);

        full = false;
        notifyAll();
    }

}



public class Producer implements Runnable {

    private Box box;

    public Producer(Box box) {
        this.box = box;
    }



    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            box.put(i);
        }        
    }
    
}



public class Consumer implements Runnable {

    private Box box;

    public Consumer(Box box) {
        this.box = box;
    }

    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            box.get();
        }       
    }
    
}



public class Demo {


    public static void main(String[] args) {
        Box box = new Box();
        Producer producer = new Producer(box);
        Consumer consumer = new Consumer(box);

        new Thread(producer).start();
        new Thread(consumer).start();
    }
}
```

### LeetCode 1116

* synchronized 解法

```java
class ZeroEvenOdd {
    private int n;
    private int count = 0;
    private static Object lock = new Object();
    
    public ZeroEvenOdd(int n) {
        this.n = n;
    }

    // printNumber.accept(x) outputs "x", where x is an integer.
    public void zero(IntConsumer printNumber) throws InterruptedException {
        while (count < 2*n) {
            synchronized (lock) {
                while ((count%4)%2 != 0) lock.wait();
                if (count < 2*n) {
                    printNumber.accept(0);
                }
                count++;
                lock.notifyAll();
            }
        }
    }

    public void even(IntConsumer printNumber) throws InterruptedException {
        while (count < 2*n) {
            synchronized (lock) {
                while (count%4 != 3) lock.wait();
                if (count < 2*n) {
                    printNumber.accept(count/2 + 1);
                }
                count++;
                lock.notifyAll();
            }
        }
    }

    public void odd(IntConsumer printNumber) throws InterruptedException {
        while (count < 2*n) {
            synchronized (lock) {
                while (count%4 != 1) lock.wait();
                if (count < 2*n) {
                    printNumber.accept(count/2 + 1);
                }
                count++;
                lock.notifyAll();
            }
        }
    }
}
```

* volatile 解法

```java
class ZeroEvenOdd {
    private int n;
    private volatile int count = 0;
    
    public ZeroEvenOdd(int n) {
        this.n = n;
    }

    // printNumber.accept(x) outputs "x", where x is an integer.
    public void zero(IntConsumer printNumber) throws InterruptedException {
        while (count < 2*n) {
            if ((count%4)%2 == 0) {
                printNumber.accept(0);
                count++;
            }
            Thread.yield();                       
        }

    }

    public void even(IntConsumer printNumber) throws InterruptedException {
        while (count < 2*n) {
            if ((count%4) == 3) {
                printNumber.accept(count/2 + 1);
                count++;
            }
            Thread.yield();           
        }
    }

    public void odd(IntConsumer printNumber) throws InterruptedException {
        while (count < 2*n) {
            if ((count%4) == 1) {
                printNumber.accept(count/2 + 1);
                count++;
            }
            Thread.yield(); 
        }
    }
}
```

* 一些经验
  * `volatile` + `Thread.yield()` 
  * `Synchronized` + `wait()` + `notifyAll()` : 用 `while()` 来作为`wait()`的判定条件

## 四种引用

1. 强引用，正常的引用
2. 软引用
   1. 在内存足够的情况下，不受gc影响
3. 弱引用
   1. gc到来时回收
4. 虚引用

## 反射

``````java
package pkg;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;

public class App {

    public int param0;
    String param1;

    public App() {

    }

    public App(int p0, String p1) {
        this.param0 = p0;
        this.param1 = p1;
    }

    private App(int p0) {
        this.param0 = p0;
        this.param1 = "this is a private constructor.";
    }

    @Override
    public String toString() {
        return param0 + " " + param1;
    }

    public String appPrint(int a, int b) {
        System.out.println(a+b);
        return a + " " + b;
    }

    public static void main(String[] args) throws Exception {

        //SomeClass.class
        Class<App> cls = App.class;
        System.out.println(cls);

        //Class.forName("path")
        Class<?> cls2 = Class.forName("pkg.App");
        System.out.println(cls2);

        //Object.getClass()
        Class<? extends App> cls3 = new App().getClass();
        System.out.println(cls3);

        //getConstructors()获取公共的构造方法，getDeclaredConstructors()获取所有的构造方法
        Constructor<?>[] cons = cls.getConstructors();

        //获取单个构造方法
        Constructor<?> con = cls.getConstructor();
        Object obj1 = con.newInstance();
        System.out.println(obj1);

        //基础类型也有.class
        Constructor<?> con1 = cls.getConstructor(int.class, String.class);
        Object obj2 = con1.newInstance(1, "this is a string");
        System.out.println(obj2);

        //暴力反射，可以获取私有构造方法
        Constructor<?> con2 = cls.getDeclaredConstructor(int.class);
        con2.setAccessible(true);
        Object obj3 = con2.newInstance(10);
        System.out.println(obj3);

        //获取public字段
        Field[] fields = cls.getFields();

        //获取所有字段
        fields = cls.getDeclaredFields();
        for (Field field : fields) {
            System.out.println(field);
        }
        //根据名称获取字段
        Field iField = cls.getField("param0");
        //用字段类给对象的字段赋值
        iField.set(obj3, 50);
        System.out.println(obj3);
        System.out.println(iField.get(obj3));

        //获取方法并调用
        Method method = cls.getMethod("appPrint", int.class, int.class);
        String res = (String) method.invoke(obj3, 15, 20);
        System.out.println(res);

        /**
         * 反射典型使用场景：
         * 将要实例化的类名和方法放在配置文件中，需要时读取，通过反射实现调用
         * 当程序执行需要变动时，仅需修改配置文件
         */

    }
}
``````

## lambda表达式使用前提：

- 接口中有且仅有一个方法

``````java
printData((String s) -> {
  System.out.println(s);
});
``````
- 参数类型可以省略（全部省略）

``````java
printData((s) -> {
  System.out.println(s);
});
``````
- 如果参数有仅有一个，小括号可以省略

``````java
printData(s -> {
  System.out.println(s);
});
``````
- 如果只有一行语句，可省略大括号和分号(以及return)

``````java
printData(s -> System.out.println(s)); 
``````
- Lambda表达式可以用于匿名接口变量初始化

``````java
Runnable r = () -> System.out.println("lambda");
``````
- 方法引用符

  lambda表达式的进一步简化

``````java
usePrintable(s -> System.out.println(s));
usePrintable(System.out::println);

Integer::ParseInt; //参数是String

//方法为实例方法时，需要调用者。
//第一个参数作为方法引用中的方法的调用者，后面的是方法的参数
//构造方法除外
useMySubString((s, x, y) -> s.subString(x, y));
useMySubString(String::subString);

``````

## Callable, Future

```java
public class TaskWithResult implements Callable<String> {
    private int id;

    public TaskWithResult(int id) {
        this.id = id;
    }
    
    @Override
    public String call() {
        return "result of Task " + id;
    }
}


public class App {
    public static void main(String[] args) {
        ExecutorService exec = Executors.newCachedThreadPool();
        List<Future<String>> results = new ArrayList<>();

        for (int i = 0; i < 10; i++) {
            results.add(exec.submit(new TaskWithResult(i)));	//exeService.submit(callable)
        }

        for (Future<String> f : results) {
            try {
                if (f.isDone()) {
                    System.out.println(f.get()); //f.get() 会阻塞至 callable 执行完成
                }
                
            } catch (Exception e) {
                e.printStackTrace();
                return;
            } finally {
                exec.shutdown();
            }
            
        }
    }

}
```

 ## IDEA

* 断点可以右键加条件
* 调试过程中可以用Evaluate 插入语句

## 注解

* 本质是一个接口，所以可以定义和接口一样的属性

* 成员方法要求返回值为基本类型/枚举/注解/字符串/相应数组。不可为 void

* 使用的时候需要赋值，可以有 default。 

* 如果只有一个属性，且名称是`value`，可以省略，直接定义值

* 如果数组中只有一个值，大括号可以省略

  ```java
  public @interface HelperAnno {
      int value();
  }
  
  public enum Condition {
      BEFORE, AFTER
  }
  
  public @interface MyAnnotation {
      int id();
      Condition condition();
      HelperAnno helper();
      String[] strs1();
      String[] strs2();
  }
  
  @MyAnnotation(id = 114, condition = Condition.BEFORE, helper = @HelperAnno(514), strs1 = "a", strs2 = {"a", "b"})
  public class AnnoDemo {
  }
  ```

* 常见元注解

  * `@Target` ：描述注解能够作用的位置
    * ElementType
      * TYPE 可以作用于类上
      * METHOD, FIELD
  * `@Retention`: 描述注解保留的阶段
    * SOURCE，CLASS，RUNTIME
  * `@Documented` 是否加入文档
  * `@Inherited` 是否被子类继承

* 可以通过反射(`getAnnotation()`)，获取类的注解对象，这是注解在 JVM 的具体原理
