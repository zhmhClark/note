# 面试题

## Java 相关

### ArrayList 扩容

* ArrayList 无参构造 容量为0
* 添加一个元素扩容到10，之后每次扩容为1.5倍（右移一位再相加），或实际大小

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

#### Java 线程状态

* Java 内部将线程状态分为6种，与操作系统的5种略有差异。

* NEW 作为对象被创建，只是对象，尚未关联到具体线程 （`start()` 之前）
* RUNNABLE 
* BLOCKED 阻塞 获得锁失败会阻塞，获得锁会就绪
* WAITING `wait()` 与 `notify()`
* TIMED WAITING `wait(long) sleep()` 时间到或`notify()`
* TERMINATED 代码执行完毕

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





