- ANR
    ANR就是Application Not Responding ，即应用程序未响应，之所以会造成这种异常是因为Android是在主线程即UI线程中更新界面的，但是如果在UI线程中进行过多的耗时操作就会堵塞主线程从而造成ANR，具体造成ANR的原因有三个：Activity耗时操作超过5s，Broadcast Receiver 超过10s，Service超过15s。

