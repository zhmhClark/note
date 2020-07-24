# python备忘录

1. 基本信息
    - cmd 输入 `python` 可以当计算器使用
    - 转到源码目录执行 `python name.py`
    - \#单行注释    """多行注释"""
    - 用冒号和缩进代替括号和大括号，没有分号
    - 暂停 `time.sleep(seconds)`
    - 清空输出 `os.system('clear')`

2. 语言元素
    - 整数进制：`0b100`(二进制的4) `0o100`(八进制的64) `0x100`(十六进制的256)
    - 浮点数科学计数法：`1.23456e6`
    - 字符串单双引号皆可，还可以用三引号写成分行格式
    - 复数，例如 3+5j
    - print的使用:`print('%d + %d = %d' % (a, b, a + b))` `print("flag1 = ", flag1)` (多项用逗号连接) `print('*', end='')` (默认结尾换行，end可制定结尾，通常用于循环打表)
    - `/` 为浮点除法，`//` 为整数除法，`**` 为指数运算
    - `type()` 返回变量类型
  
      `int()` 将字符串、数值返回整数
      
      `chr()` 将整数返回字符
      
      `ord()` 将字符返回整数
    
      `float()` 将字符串返回浮点数
      
      `str()` 转换为字符串

3. 分支与循环
    - `if` 不用括号、有冒号
    - `else if` 可简写为 `elif`
    - `for-in`循环，例如`for x in range(x,0,-1)`(起点，终点（不达），步幅)
    - `while`循环与其他语言相同

4. 函数
    - 定义函数
     ```python
      def function(para1,para2)
          """
          函数体
          """
          return
  
      ```  
    - 可以使用默认形参，也可以不安顺序给参数赋值
    - 可以使用可变参数，例如
     ```python
     # 在参数名前面的*表示args是一个可变参数
     # 即在调用add函数时可以传入0个或多个参数
     def add(*args):
     total = 0
     for val in args:
        total += val
     return total 
     ```
     - 函数作返回值或参数的函数为高阶函数。其中有些嵌套定义函数并返回函数的函数为闭包（可理解为生成黑箱的黑箱），例：
     ```python
     def lazy_sum(*args):
        def sum():
        ax = 0
        for n in args:
            ax = ax + n
        return ax
     return sum
     ```
     - 可利用装饰器来修饰函数功能，装饰器的本质是参数和返回值为函数的函数，格式 
     ```python
     @sth
     fun()
     # fun = sth(fun)
     ```

5. 模块
    - 一个py文件即为一个模块，模块可单独执行，也可以在别的模块中引入执行
    - 引入别的模块：

    ```python
    from module import function
    ```
    或者
    ```python
    import module as m
    ```
    - 由于引入别的模块会执行其所有代码，所以**一个模块的可执行代码应加以限定**，例如
    ```python
    def foo():
    pass


    def bar():
    pass

    #pass 是函数空白时的占位符
    # __name__是Python中一个隐含的变量它代表了模块的名字
    # 只有被Python解释器直接执行的模块的名字才是__main__
    if __name__ == '__main__':
    print('call foo()')
    foo()
    print('call bar()')
    bar()
    ```
6. 变量作用域
   - 变量不在任何函数内为全局作用域
   - 变量在函数内为该函数局部作用域
   - 变量在函数外而不为全局作用域即套在另一函数中为嵌套作用域
   - 调用变量时，由内而外层层覆盖
   - 可在函数中声明全局变量，加关键字`global`
  
7. 字符串操作
   - 测长度`len(str)` 取字符`str[index]`
   - 首字母大写`str.capitalize()` 全大写`str.upper()`
   - 查子串位置`str.find(subStr)`（没有会返回-1） `str.index(subStr)`（没有会报错）
   - 布尔类型，是否以某子串开头或结尾`str.startswith(subStr)` `str.endswith(subStr)`
   - 居中或左右对齐，num为该行长度，char为填充字符`str.center(num,char)` `str.rjust(num,char)`
   - 切片
  
        `str[a:b]`从a到b,a<b,若b超过尾字符，则只到尾字符
        
        `str[begin::step]` 从 `begin` 所在位置开始（若空缺，根据`step`正负视为开头（0）或结尾（-1），若为负数，从结尾倒数，尾字符为（-1）），以`step` 步幅取字符，形成新串

8. 列表操作
   - 算元素个数`len(list)`
   - **下标和切片用法与字符串相同**`list[index]` 
   - 添加元素到末尾：`list.append(elem)` `list += [elem1,elem2]`
   - 插入元素：`list.insert(index,elem)`
   - 删除元素：`list.remove(index)` `del list[index]`
   - 清空：`list.clear()`
   - 排序：不改变原序列：`list2 = sorted(list1)` `list3 = sorted(list1,key=len)` `list2 = sorted(list1,reverse=True)` 改变原序列：`list.sort()` `list.sort(reverse=True)` 
  
9. 元组操作
    - 元组与列表相似，将中括号改为小括号即可。**元组元素不可改变**
    - 二者的相互生成：`l = list(t)` `t = tuple(l)`

10. 集合操作
    - 集合用大括号表示，无重复元素
    - 集合运算
        ```python
        # 集合的交集、并集、差集、对称差运算
        print(set1 & set2)
        # print(set1.intersection(set2))
        print(set1 | set2)
        # print(set1.union(set2))
        print(set1 - set2)
        # print(set1.difference(set2))
        print(set1 ^ set2)
        # print(set1.symmetric_difference(set2))
        # 判断子集和超集
        print(set2 <= set1)
        # print(set2.issubset(set1))
        print(set3 <= set1)
        # print(set3.issubset(set1))
        print(set1 >= set2)
        # print(set1.issuperset(set2))
        print(set1 >= set3)
        # print(set1.issuperset(set3))
        ```

11. 字典操作
    - 字典类似于集合，主要特点是键值对应，例：`dic = {'O':16, 'H':1, 'C':12, 'Al':27, 'Fe':56, }`
    - `dic[key]` 可表示对应的value
    - 删除元素：`(scores.pop(key, value)`
  
12. 类与对象
    - `@property` python内置装饰器，加在成员变量的getter类函数前，可使程序读取成员变量时自动运行该函数。同时将`@v.setter` 加到对应成员v的setter类函数前，可使程序改动成员变量时自动运行该函数。若不加 `@v.setter` 则会使该变量成为只读变量，例：
        ```python
        class Student(object):
    
            @property
            def birth(self):
                return self._birth

            @birth.setter
            def birth(self, value):
                self._birth = value

            @property
            def age(self):
                return 2015 - self._birth
        ```
     其中的`age` 就是只读变量，因为它只取决于生日和当前年份
    - python 是一门动态语言，可以在程序运行中绑定新属性。而`__slots__` 可以限制绑定内容。例：
  
        `__slots__ = ('_name', '_age', '_gender')`
    - 在类中添加静态函数需在上方添加`@staticmethod` 装饰器
    - 继承时，定义的括号内写基类。抽象函数需`from abc import ABCMeta, abstractmethod`
13. 文件
    - ```python
        f = open('name.txt', 'r', encoding='utf-8')
        print(f.read())
        f.close()
      ```  
