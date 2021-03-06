0. mass
    1. oracle string 大小写敏感 sql server大小写不敏感
    2. oracle 查询结果空值在前 sql server空值在后
    3. '1'+'2' 在oracle中是3
    4. 给列取别名若有空格，需加**双引号**
1. function
    1. `round(float, int)` 保留 int(可为负数) 位float，四舍五入
    2. `length(string)` 按字符取/ `lengthb(string)` 按字节取
    3. `trim(string)` 去首尾空格/ `trim(str from string)` 去首尾的str/ `ltrim(...)`去左侧/`rtrim(...)`去右侧
    4. `substr(string, int1, int2)`从 int1 开始，取 int2 位 (首位为1),若int2空则取到结尾
    5. `instr(string, str2, int1, int2)`返回从int1位开始，第int2次出现的位置在原字符串中的位置值
    6. `nvl(var, 'rep')` 若var为空，则用rep代替/ `nvl2(var, rep1, rep2)` 非空rep1, 空rep2
    7. `to_number(string)`
    8. `concat(str1, str2)` 连接两个字符串
    9. `||` 用来拼接字符串，可多个
    10. `upper()`大写
    11. `LPAD(string, int, str2)`将string在前方填充str2至有int位字符
2. date
    1. 默认日期写法"dd-mon-rr" eg:"01-1月-82"
    2. 日期可以相减，不能相加
    3. to_date
        - `to_date('01-1月-00')` 将字符串转为日期
        - rr返回距现在较近的世纪年份 yy返回本世纪年份
    4. `add_months(date, int)` 将date加1个月
    5. `next_day(date, day)` day用汉字`星期一` 返回最近的下一个星期几
    6. `to_char(date , format)`按指定方式输出日期
    7. TO_DATE格式 
        Day: 
        dd number 12 
        dy abbreviated fri 
        day spelled out friday 
        ddspth spelled out, ordinal twelfth 
        Month: 
        mm number 03 
        mon abbreviated mar 
        month spelled out march 
        Year: 
        yy two digits 98
        yyyy four digits 1998 
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
    9. `create user username identified by password`创建新用户
    10. 执行sql脚本 `@file_name.sql`
    11. 4. `grant connect, resource to test`授予用户权限
    12. sqlplus黑窗运行输入输出
        ```sql
        SET serveroutput ON;
        SET verify off;
        accept input_no prompt 'Enter empno:'
        ```
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

        ```pl
        BEGIN
	    for term in (SELECT deptno FROM dept) loop
	    dbms_output.put_line(term.deptno);
	    END LOOP;
        END;
        ```
    5. while loop
        ```pl
        while condition loop
            statements;
        end loop;
        ```
    6. record
        - 相当于结构体，需要先声明类型与此类型的变量再使用
        - 可以`into`多行
        - eg
            ```sql
            DECLARE
            	TYPE emp_record_type IS record
            	(ename emp.ename%TYPE,
            	 sal emp.sal%TYPE,
            	 job varchar2(9));
            	emp_record emp_record_type;
            BEGIN
            	SELECT ename, sal, job
            	INTO emp_record
            	FROM EMP
            	WHERE EMPNO = 7788;

            	dbms_output.put_line('name: '||emp_record.ename||'sal: '||          emp_record.sal);
            END;

            ```
        - 可以用%rowtype生成与某个表的列相同的record,提高效率
            eg
            ```sql
            declare
                emp_rec emp%rowtype;
            begin
                select * into emp_rec
                from emp
                where ...

                insert into test values emp_rec;
            ```
    8. cursor
        - 游标相当于指针，指向某个表的首行
        - 定义游标；打开游标；提取数据
        - 显示游标的属性
        - 游标可带参数
            |属性|类型|
            |-|-|
            |%isopen|boolean|
            |%notfound|boolean|
            |%found|boolean|
            |%rowcount|number|
            eg
            ```sql
            declare
                cursor cur is select ...;

            ...

            if not cur_emp%isopen then
                open cur_emp;
            end if;
            loop
                fetch cur_emp into v_ename, v_sal;
                exit when cur_emp%notfound;
                dbms_output.put_line(v_name||','||v_sal);
            end loop;
            close cur_emp;
            ```
        - 游标，复合与for循环
            省略复合类型的声明，省去开启关闭游标
            ```sql
            for record in cursor loop
                ...
                record.a...
                ...
            end loop;
            ```
        - 游标可以含参，在其名称后加括号。声明参数，使用时传具体值
        - where currrent of 用于用游标更新表
            ```sql
            DECLARE
            	CURSOR cur_copy_emp IS
            		SELECT sal, stars FROM COPY_EMP
            		FOR UPDATE OF stars NOWAIT;
            BEGIN
            	FOR copy_emp_record IN cur_copy_emp LOOP
            		UPDATE copy_emp SET stars = lpad('*', round(sal/1000), '*')
            		WHERE CURRENT OF cur_copy_emp;
            	END LOOP;
            END; 
            ```
    9. 异常
        - 分为预定义异常（见附图）、非预定义异常、自定义异常
        - `sqlcode` `sqlerrm` 为异常值和异常信息，不能直接放在sql语句中
        ```sql
        begin
        ...
        exception
        when exp1 then
        statements;
        ...
        when others then
        statements;
        ...
        end;
        ```
        
        ```sql
        declare
            e_emp_cons EXCEPTION;
            progma exception_init(e_emp_cons, -00001);
        ``` 

        ```sql
        if SQL%ROWOUNT > 2 then
            raise e_too_many;

        when e_too_many then
        ...
        ```
    10. 过程 procedure
        ```pl
        create procedure pcd_name(para1 in/out data_type1, para2 data_type2...)
        is
        ...
        ```

        eg
        ```sql
        CREATE OR REPLACE PROCEDURE GET_ANNUAL_INCOME
        (p_empno IN emp.EMPNO%TYPE [default 7369],
         p_ann_sal OUT number)
        authid current_user
        IS
        	v_sal emp.sal%TYPE;
        	v_comm emp.comm%TYPE;
        BEGIN
        	SELECT sal, nvl(COMM, 0)
        	INTO v_sal, v_comm
        	FROM EMP
        	WHERE EMPNO = p_empno;
        	p_ann_sal := v_sal*12 + v_comm*10 + 20000;
        EXCEPTION
        	WHEN no_data_found THEN
        		p_ann_sal := 0;
        END GET_ANNUAL_INCOME;

        DECLARE
        	v_ann_sal number(9, 2);
        BEGIN
        	get_annual_income(736, v_ann_sal);
            --get_annual_income(p_empno=>v_ann_sal, p_ann_sal=>736);
        	dbms_output.put_line(v_ann_sal);
        END;
        ``` 
        `scott.procedure(p1, p2);`
    11. 函数
        - 其调用可以写入sql（只接受in参数，sql的数据类型）
    12. 本地动态sql
        `execute immediate sql`
    13. 触发器
        ```sql
        create [or replace] trigger sal_emp
        before|after insert [or ...] on emp
        `

6. string
    1. `%` 任意长度，任意字符
    2. `_` 任意单个字符

7. basic grammer
    1. `count(col_name)`忽略空值 `count(*)`不忽略
    2. 非空 `sth is not null` 
    3. `update table_name set col = ... where ...`