- 姓名，院校，专业，年级

- 成绩，三奖

- **线程中wait和sleep的区别？**

  wait方法即释放cpu，又释放锁。

  sleep方法只释放cpu，但是不释放锁。

 两个Activity之间跳转时必然会执行的是哪几个方法。

答: 两个Activity之间跳转必然会执行的是下面几个方法。

onCreate()//在Activity生命周期开始时调用。

onRestoreInstanceState()//用来恢复UI状态。

onRestart()//当Activity重新启动时调用。

onStart()//当Activity对用户即将可见时调用。

onResume()//当Activity与用户交互时，绘制界面。

onSaveInstanceState()//即将移出栈顶保留UI状态时调用。

onPause()//暂停当前活动Activity，提交持久数据的改变，停止动画或其他占用GPU资源的东西，由于下一个Activity在这个方法返回之前不会resume，所以这个方法的代码执行要快。

onStop()//Activity不再可见时调用。

onDestroy()//Activity销毁栈时被调用的最后一个方法。