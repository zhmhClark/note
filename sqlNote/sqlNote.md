0. mass
    1. oracle string 大小写敏感 sql server大小写不敏感
    2. oracle 查询结果空值在前 sql server空值在后
    3. '1'+'2' 在oracle中是3
1. function
    1. `round(float, int)` 保留 int(可为负数) 位float，四舍五入
    2. `length(string)` 按字符取/ `lengthb(string)` 按字节取
    3. `trim(string)` 去首尾空格/ `trim(str from string)` 去首尾的str/ `ltrim(...)`去左侧/`rtrim(...)`去右侧
    4. `substr(string, int1, int2)`从 int1 开始，取 int2 位 (首位为1)
    5. `instr(string, str2, int1, int2)`返回从int1位开始，第int2次出现的位置在原字符串中的位置值
    6. `nvl(var, 'rep')` 若var为空，则用rep代替/ `nvl2(var, rep1, rep2)` 非空rep1, 空rep2
    7. `to_number(string)`
2. date
    1. 默认日期写法"dd-mon-rr" eg:"01-1月-82"
    2. 日期可以相减，不能相加
    3. to_date
        - `to_date('01-1月-00')` 将字符串转为日期
        - rr返回距现在较近的世纪年份 yy返回本世纪年份
    4. `add_months(date, int)` 将date加1个月
    5. `next_day(date, day)` day用汉字`星期一` 返回最近的下一个星期几
3. sqlplus
    1. `sqlplus /nolog` 以不登录方式在命令行打开sqlplus
    2. `conn`
       ` - conn / as sysdba` 以sys登录sql
       ` - conn scott/tiger` 以用户名/密码登录sql
    3. `show user` 显示当前用户
    4. `alter user scott account unlock;` 
    5. `alter user scott identified by tiger;` 更改用户密码
    6. `select * from tab;` 查看当前用户的表
    7. `desc emp;` 查看表格emp的格式
    8. (限sys) `shutdown immediate` , `startup force`
4. pl/sql
    1. if
        ```pl
        if condition then
            statements;
        elsif condition then
            statements;
        else
            statements;
        end if;
        ```
    2. case
        ```pl
        v_temp :=
            case v_deptno
                when 10 then 'no.1'
                when 10 then 'no.2'
                else 'no.3'
            end;
        ```
    3. basic loop
        ```pl
        loop
            statements;
            exit when condition;
        end loop;
        ```
    4. for loop
        ```pl
        for var in low..high
            statements;
        end loop;
        ```
    5. while loop
        ```pl
        while condition loop
            statements;
        end loop;
        ```