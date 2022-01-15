# command line note

1. others
   1. `pwd` present workingspace directory
   2. `clear` clear the terminal
   3. `man` look up the manual
   4. `touch` create a new file
   5. `dpkg -s`list all softares installed
   6. `tab` to complete
   7. `# root user  $common user`
2. cd
   1. `cd /` change to the bottom directory
   2. `cd -` change to the dir before
3. ls
   1. `ls -l` list the details
   2. `ls ../..` to the upper of the uppper
   3. `ls ./*.html` list all the html docs of the presentdir
   4. colors represents : green exe; blue contents;red zip;
4. cat
   1. `cat list.txt` print the list.txt
   2. `cat > list.txt` type sth into list.txt(`ctrl`+`D` to quit `cat`)
      `<br>`when typing next time, the last would be overwrited.( `>>` doesn't overwrited)
5. mkdir
   1. `mkdir dir1` make a new dir dir1 in the present dir
   2. `mkedir -p cmd/exercise`make new and nested dirs
   3. `mkedir -p cmd/{dir1,dir2,dir3}`make new and nested dirs
6. rm, rmdir
   1. `rmdir` used to remove empty dir
   2. `rm` used to remove files
7. cp
   1. `cp file1.txt file2.txt` copy f1 as f2 (if f2 DNE, created)
8. mv
   1. `mv a.b c.d` change name from a.b to c.d
   2. `mv file.txt dir/` move file to dir dir/
9. nano
   1. 'nano file.txt' use editor to edit file.txt
   2. `ctrl`+`OEnter` to save, `ctrl`+`X` to exit
10. top, kill, pidof
    1. `top` to list th processes
    2. `pidof [processes' names]` get id of the process
    3. `kill [id]` kill the process
    4. `ps` list processes
11. echo
    1. `var=10` to get a variable
    2. `echo $var` or `echo "the value of $var"`to print the var
    3. `echo -e` to accept `\`
12. C compile
    1. `gcc -o hello hello.c` to make a `hello`
    2. `./hello` to exe
    3. `gcc -lm main.c ` when using  functions in `math.h`, add `-lm`
    4. `indent -kr -i8 main.c` unify the indent of the code
    5. gdb

       1. show the next sentence to be exe
       2. `gdb main` start to debug out file
       3. `list ` or `l` show the source code.

          `list 10` show the source code from 10th line

          `list func_name`show the src of the function
       4. `start` and `quit`
       5. `next` exe next sentence
       6. `step` step in to the function
       7. `backtrace`or `bt` show the frames
       8. `info`or `i`: `i locals` show the local vars
       9. `frame`or `f`: choose the frame
       10. `finish` exe till the func end
13. script
    1. use `which bash` to find the path of bash
    2. nano a `xxxx.sh`, first line `#!path of bash`
    3. `chmod +x xxxx.sh`
14. watch
    1. `watch <command>` the command would be exe every 2 sec
15. multicommand and pipe
    1. `;;` or `&& &&` to exe more command once , `command 1;;command 2`, `command 2` would exe no matter `command 1` succeed or not, `&&` as contrast.
    2. `command 1|command 2` used as pipe. command 1 output as command 2 input
16. Java compile
    1. `javac Hello.java` to make a `Hello.class`
    2. `java Hello` to exe
    3. `java -jar xxx.jar` to run jar
17. wsl
    1. setting:
       1. `sudo apt install xfce4`
       2. `sudo apt install xrdp`
       3. `sudo sed -i ‘s/port=3389/port=3390/g’ /etc/xrdp/xrdp.ini`
       4. `sudo echo xfce4-session >~/.xsession`
       5. `sudo service xrdp restart` everytime open the computer, exe this
       6. `win`+`R` input:`mstsclocalhost:3390`
18. win
    `netstat -ano` show all ports and pid
    `tasklist | findstr "[pid]"` check pid
    `taskkill /f /t /im java.exe`
19. du, df
    `du` size of dir or file
    `df` using stage of disk
