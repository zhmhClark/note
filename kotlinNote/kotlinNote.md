1. run in cmd
    - `kotlinc name.kt name.jar` + `java -jar name.jar`
    - `kotlinc -script kotlintest.kts`

2. 一行函数

   `fun largerNumber(num1: Int, num2: Int) = max(num1, num2)`

3. if-else有返回值

   ``````kotlin
   if (num1 > num2) {
       num1
   } else {
       num2
   }
   ``````

4. when

   - 有返回值

   ``````kotlin
   //匹配值 -> 执行逻辑
   when (name) {
   	"Tom" -> 86
       "Jim" -> 77
       "Jack" -> 95
       "Lily" -> 100
       else -> 0
   }
   
   when {
   	name.startWith("Tom") -> 86
       name == "Jim" -> 77
       name == "Jack" -> 95
       name == "Lily" -> 100
       else -> 0
   }
   
   fun checkNumber(num: NUmber) {
       when (num) {
           is Float -> println("number is a Float")
           is Double -> println("number is a Double")
           else -> println("number not support")
       }
   }
   ``````

5. ==判断是否相等

6. 区间

   - `0..10` : [0, 10]

   - `0 until 10`:[0, 10)
   - `0 until 10 step 2`:相当于偶数
   - `10 downTo 1`:[10, 1]

7. 类

   - `open`使类可以被继承
   - `data`使类作为数据类，自动生成`equals()` `hashCode() ` `toString()`
   - `object`使类作为单例类，调用类似于静态调用
   - 匿名类需要把`new`改成`object`
   - 构造函数
     - 主构造函数在类名后面写括号，填参数，继承用冒号

8. 集合

   1. `val list = listOf("Apple", "Banana", "Orange")`, `var list = mutableListOf("Apple", "Banana", "Orange")`

      `setOf(), mutableSetOf()`

      `mapOf("Apple" to 1, "Banana" to 2)`
      
   2. `for ((fruit, number) in map)` 循环遍历时同时传入键和值 

9. 类型后面加问号表示相应位置可以为空，否则默认不为空

    1. `?.`表示在不为空的情况下调用：`a.?doSomething()`
    2. `?:`表示在为空的情况下用冒号后面的内容代替

10. `"$message"， “${obj.name}”`表示在字符串里的变量

