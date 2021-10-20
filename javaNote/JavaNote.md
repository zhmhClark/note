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
        3. 转化为String: `String.valueOf(...)` `Character/Integer.toString(...)`
        4. `getBytes()`可以指定字符串编码格式 ，返回相应编码的字节数组，如s.getBytes("UTF-8")
        5. `String(byte[] bytes, String charsetName)`可以指定解码形式，用相应字节数组构造字符串
    6. Character
        1. `Character.isAlphabetic(c)` `Character.isDgit(c)`用于判断字符是否为字母、数字
    7. 格式化输出
        1. 输出保留两位的小数 `Sysout.printf("%.2f", data)` (data double)
    
3. class / interface
    1. `main()`函数中的未定义变量可以是类的static变量
    
    2. 成员内部类可以访问外部类的所有属性与方法，访问时若有内外同名变量，需用`OuterClass.this.var`
    
    3. 静态内部类 外类.内类 ~ = new 外类.内类();
       成员内部类 外类.内类 ~ = new 外类.new 内类();
       
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
    
    15. 函数可变参数(本质是一个数组，默认要放到最后一个参数)
    
        ``````java
        int sum(int... a) {
            int sum = 0;
            for(int i : a) sum += i;
        	return sum;
        }
        ``````
    
        
    
4. 泛型

    - 泛型方法

      ``````java
      public <T> void show(T t) {}
      ``````

    - 泛型类、泛型接口

      ``````java
      public interface Generic<T> {}
      ``````

      

5. API
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
        - shuffle()可以打乱顺序
        
    6. System

        - exit(int status) 终止程序，status非零表示异常
        - currentTimeMillis() 放回当前时间(毫秒)

6. Exception
    1. 若`try/catch`中有`return`，在`return`前先执行`finally`
    2. 多个`catch`时，依次匹配，执行第一个可以匹配的
    3. `RuntimeException`不要求程序一定做出处理

7. File
    1. 文件指针为`File`, `FileOutputStream`用于写,`FileInputStream`用于读
    
    2. `File`常见API(见图`FileAPI.png`)
    
    3. Windows环境下目录为`\\`
    
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
    
8. JDBC & DAO
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
        例如将上方示例中第二个`try`块中的`while`上方三句换为
        ```java
            pstmt = conn.prepareStatement("select * from test2 where tname like ?;");
    		pstmt.setString(1, "tbbt");
    		rt = pstmt.executeQuery();
        ```
    3. `statement`常用方法见图`statement.png`0



9. Serializable

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
   
   - 不参与序列化的变量用`transient`修饰
   
10. Properties

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

11. 线程与进程
    - 线程或继承Thread，或实现Runnable，实现Runnable后可以通过`Thread t = new Thread(/*Runnable*/ r)`的方式执行
    
    - `start()`启动线程，使线程并发执行
    
    - `getName()`获取线程名称
    
    - `getPriority()`获取线程优先级，`setPriority()`设置线程优先级
    
    - `currentThread()`获取当前执行的线程
    
    - `join()`其余线程必须等该线程结束才能执行
    
    - `setDaemon(true)`当线程作为守护线程时，若所有线程都为守护线程，退出程序
    
    - synchronized
    
      用于给代码语句上锁，被锁住的语句在执行时不会被其他进程占用
    
      锁要求必须是所有线程共用的数据
      
      可以修饰函数，此时默认锁住的对象是所在对象本身
      
      如有静态函数、锁住的是类(getClass())
    
    - `yield()`释放当前线程
    
    - 创建多线程的方式
    
      - 继承Thread
      - 使用Runnable
      - 匿名内部类
      - lambda
      - Callable Feature
      - 线程池
    
12. 四种引用

    1. 强引用，正常的引用
    2. 软引用
       1. 在内存足够的情况下，不受gc影响
    3. 弱引用
       1. gc到来时回收
    4. 虚引用
    
13. 反射

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

    