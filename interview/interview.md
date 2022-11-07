# 面试题

## Java 相关

### ArrayList 扩容

* ArrayList 无参构造 容量为0
* 添加一个元素扩容到10，之后每次扩容为1.5倍（右移一位再相加），或实际大小
* 1.5 倍的原因在于可以利用之前的连续内存，减少碎片

### ArrayList FailFast FailSafe

* ArrayList 是 FailFast 的。在遍历过程中如果改动列表会抛出 ConCurrentmodifyException， CoW 不会。
* CoW 读写分离，FailSafe，但是牺牲了一致性。

### HashMap

* 扩容规则：超过3/4 
  * 扩容有利于减少哈希冲突
* 链表树化：
  * 阈值为8
  * 树化本身是非正常情况，因此在冲突较少时使用链表
* 存在二次哈希，让哈希分布更均匀
* 默认容量取2的幂，扩容方便
* HashMap key 可以为null
  * key 必须重写 `hashCode()`和 `equals()`， 且 不可改变

### 设计模式

#### 单例模式

* 饿汉式：静态成员变量
  * 可能被反射破坏，可以在私有构造方法中判空预防；可能被反序列化破坏，重写`readResolve()` 预防
* 饿汉式：枚举
* 懒汉式：DCL + Volatile
* 懒汉式：静态内部类

### 并发

#### 其他

* 调用 `run()` 而非 `start()` 会导致 `run()`在当前线程执行，不会异步
* 打断 `wait()` `sleep()` 的线程 `interrupted` 为 false

#### Java 线程状态

* Java 内部将线程状态分为6种，与操作系统的5种略有差异。

* NEW 作为对象被创建，只是对象，尚未关联到具体线程 （`start()` 之前）
* RUNNABLE 
* BLOCKED 阻塞 获得锁失败会阻塞，获得锁会就绪
* WAITING `wait()` 与 `notify()`
* TIMED WAITING `wait(long) sleep()` 时间到或`notify()`
* TERMINATED 代码执行完毕

#### 优雅地结束线程



#### 线程池参数

* 核心线程数：指保留在线程池的线程 的数量
* 最大线程数目：总线程数目
* 任务队列
  * submit 后，分配给核心线程， 如果都忙，就加入队列，如果队列已满，就分配给救急线程
* 生存时间与时间单位
  * 非核心线程在无任务后的生存时间
* 拒绝策略：在所有容器都满后做什么
  * AbortPolicy() 抛异常
  * CallerRunsPolicy() 调用者线程执行
  * DiscardPolicy() 丢弃，不抛异常
  * DiscardEldestPolicy() 加入队列，把队首任务移出

#### 线程运行诊断

* cpu 占用过多 top + ps + jstack 命令
* 长时间运行 jstack 查死锁

#### Synchronized

* 轻量级锁
  * 00
  * 可重入，CAS，在线程内部创建 Lock Record (Obj Ref, record 地址/ 换出来的Markword)
* 偏向锁
  * 会被 HashCode 重置
* 重量级锁
  * wait() notify () 直升

#### 生产者消费者

```java
final public class Message {
    private int id;
    private Object message;

    public Message(int id, Object message) {
        this.id = id;
        this.message = message;
    }

    public int getId() {
        return id;
    }
    
    public Object getMessage() {
        return message;
    }
}


public class MessageQueue {
    private LinkedList<Message> list = new LinkedList<>();
    private int capcity = 5;

    public MessageQueue(int capcity) {
        this.capcity = capcity;
    }

    public Message take() {
        synchronized (list) {
            while (list.isEmpty()) {
                try {
                    System.out.println(Thread.currentThread().getName() + ": " + "empty, can't take");
                    list.wait(); 
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            Message message = list.removeFirst();
            System.out.println(Thread.currentThread().getName() + ": " + "taken" + message.getId());
            list.notifyAll();
            return message;
        }    
    }

    public void put(Message message) {
        synchronized (list) {
            while (list.size() == capcity) {
                try {
                    System.out.println(Thread.currentThread().getName() + ": " + "full, can't produce");
                    list.wait(); 
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            list.addLast(message);
            System.out.println(Thread.currentThread().getName() + ": " + "produced " + message.getId());
            list.notifyAll();
        }
    }
}



public static void main() {
		MessageQueue queue = new MessageQueue(3);
        for (int i = 0; i < 20; i++) {
            int id = i;
            new Thread(() -> {
                queue.put(new Message(id+1, new Object()));
            }, "product " + id).start();
        }

        for (int i = 0; i < 20; i++) {
            int id = i;
            new Thread(() -> {
                queue.take();
            }, "consumer " + id).start();
        }
}
```

#### park() unpark()

* 可以先 unpark 再 park
* 多次 unpark 只能生效一次

#### ReentrantLock

* 可打断

  `lock.lockInterruptibly()` 打断线程获得锁的过程，防止线程长期等待。

* trylock

  * 返回布尔变量

    `if (! lock.trylock()) ...`

  * 可以带时间参数
  * 可用于解决死锁问题

* 可设置为公平锁，公平锁会降低并发度

* 条件变量

#### 交替打印

```java
		//volatile yield版本
		public static volatile int flag = 0;
		for (int i = 0; i < num; i++) {
            final int id = i;
            new Thread(() -> {
                while (flag < 1000) {
                    while (flag % num != id) {
                        Thread.yield();
                    }
                    System.out.println(Thread.currentThread().getName() + ": " + flag);
                    flag = flag + 1; //如果用++ 会因为不原子出问题
                }
            }, "t" + i).start();
        }


		//synchronized while wait notify 版本
		int num = 10;

        Object lock = new Object();

        for (int i = 0; i < num; i++) {
            final int id = i;
            new Thread(() -> {
                synchronized (lock) {
                    while (flag < 1000) {
                        while (flag % num != id) {
                            try {
                                lock.wait();
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                        }
                        System.out.println(Thread.currentThread().getName() + ": " + flag++);
                        
                        lock.notifyAll();
                    }
                }
            }, "t" + i).start();
        }

//todo: ReentrantLock 条件变量 park
```

#### Atomic



### JVM

* 包括 程序计数器、虚拟机栈（前两者线程私有）、堆、方法区、本地方法栈 

#### 程序计数器：

* 利用寄存器实现，记住下一条 JVM 指令的执行地址
* 线程私有

#### 虚拟机栈

* 线程私有，线程运行所需要的内存
* 一个栈有多个栈帧组成，对应方法调用
* 顶层为活动栈帧，对应正在运行的方法
* 栈内存溢出：栈帧过多或栈帧过大

#### 本地方法栈

* 例子： Object `clone()` `wait()`

#### 堆

* 堆内存诊断
  * jps jmap jconsole

#### 方法区

* 线程共享
* 保留和类相关的信息
* 可能因为类加载过多内存溢出 （cglib）

##### 常量池

* 运行时常量池存在于字节码文件中

* 关于 String

  * 常量池中的字符串仅是符号，第一次用到时才变为对象 
  * 利用串池的机制，来避免重复创建字符串对象 
  * 字符串变量拼接的原理是 StringBuilder （1.8） 
  * 字符串常量拼接的原理是编译期优化 
  * 可以使用 intern 方法，主动将串池中还没有的字符串对象放入串池

  ```java
  String s1 = "a";
  String s2 = "b";
  String s3 = "a" + "b";
  String s4 = s1 + s2;
  String s5 = "ab";
  String s6 = s4.intern();
  // 问
  System.out.println(s3 == s4);
  System.out.println(s3 == s5);
  System.out.println(s3 == s6);
  String x2 = new String("c") + new String("d");
  String x1 = "cd";
  x2.intern();
  // 问，如果调换了【最后两行代码】的位置呢，如果是jdk1.6呢
  System.out.println(x1 == x2);
  
  /*
  s3 == s4:
  s4 创建是通过 StringBuilder 返回新字符串对象实现的，所以为 false
  s3 == s5:
  s5 经过编译器优化，因为拼接的是常量，串池已经有了，所以会直接用串池的
  s3 == s6
  s6 intern()主动将字符串放入串池（如果有的话就不再放入并返回本身），并返回串池中的对应对象
  
  */
  ```

  * 存在垃圾回收
  * StringTable 类似于 HashTable

#### 直接内存

* BIO 会读两次 （磁盘 -> 系统内存 -> Java 内存）
* 直接内存可以直接读入，读写性能高
* 不受 JVM 内存管理

#### 垃圾回收

* 标记清除

  * 速度快，产生内存碎片

* 标记整理

  * 速度慢，无内存碎片

* 复制

  * 把内存分为两部分，将 From 区的存活对象移动到 To 区
  * 闲置一半的内存空间

* 分代回收机制

  * 多种算法的结合

  * 机制

    * 对象首先分配在 Eden 区
    * Eden 满了，触发 minor GC , 和 from 区存活的对象一起进入to 区，from to 交换，幸存区对象寿命+1
    * 新生代对象寿命超过阈值进入老年代

  * 为什么新生代用复制算法？

    * 新生代对象普遍生命期短，仅需复制少量对象，剩余空间一次性删除；标记整理需要大量标记删除。

    

#### 类文件结构

* 包括类基本信息，常量池，类方法定义

#### 类的构造

* <cinit>

  ```java
  public class Demo3_8_1 {
  	static int i = 10;
  	static {
  		i = 20;
  	}
  	static {
  		i = 30;
  	}
  }
  ```

  编译器会按从上至下的顺序，收集所有 static 静态代码块和静态成员赋值的代码，合并为一个特殊的方 法

* <init>

  ```java\
  public class Demo3_8_2 {
  	private String a = "s1";
  	{
  		b = 20;
  	}
  	private int b = 10;
  	{
  		a = "s2";
  	}
  
  	public Demo3_8_2(String a, int b) {
  		this.a = a;
  		this.b = b;
  	}
  	public static void main(String[] args) {
  		Demo3_8_2 d = new Demo3_8_2("s3", 30);
  		System.out.println(d.a);
  		System.out.println(d.b);
  	}
  }
  
  ```

  

  编译器会按从上至下的顺序，收集所有 {} 代码块和成员变量赋值的代码，形成新的构造方法，但原始构 造方法内的代码总是在最后

#### 字节码指令

* `*store x` 把栈顶元素存入局部变量表的特定位置，用来赋值

* `*load x` 把局部变量表中的指定变量入栈

* `ifne x` 如果成立执行下一句，不成立跳转到 x 行

* 关于 `finally`

  * `finally` 可以视为将本身代码块中的代码插入try catch 的末尾，但如果原有 try catch 有 `return` 就在return前，由于return 变量会被先行存储，所以不会影响返回值本身（基础类型）。

    ```java
    public static void main() {
    	int i = test();
        //i = 10
    }
    
    public static int test() {
        int i = 0;
        try {
            i = 10;
            return i;
        }
        finally {
            i = 20;
        }
    }
    ```

    

  * `finally` 当中不应该写 return，否则会短路 try catch 中的return

    ```java
    public static void main() {
    	int i = test();
        //i = 20
    }
    
    public static int test() {
    	try {
    		return 10;
    	} finally {
    		return 20;
    	}
    }
    ```

#### 类加载

加载 - 链接 - 初始化

#### JMM 内存模型



