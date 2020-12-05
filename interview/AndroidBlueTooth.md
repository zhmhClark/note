1. 申请蓝牙权限
    ```xml
    <uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
    <uses-permission android:name="android.permission.BLUETOOTH" />
    ```
2. BlueToothAdapter
    ```java
    BluetoothAdapter mBluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
    if(mBluetoothAdapter == null){
        // 说明此设备不支持蓝牙操作
    }
    ```
3. 启动蓝牙
    ```java
    if(!mBluetoothAdapter.isEnabled()){
        Intent enableBtIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
        startActivityForResult(enableBtIntent,REQUEST_ENBLE_BT);
    }
    ```
4. 发现连接设备
    ```java
     private final BroadcastReceiver mReceiver = new BroadcastReceiver(){
   
        public void onReceive(Context context,Intent intent){
            String action = intent.getAction();
            // 当 Discovery 发现了一个设备  
            if(BluetoothDevice.ACTION_FOUND.equals(action)){
                // 从 Intent 中获取发现的 BluetoothDevice 
                BluetoothDevice device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
                // 将名字和地址放入要显示的适配器中
                mArrayAdapter.add(device.getName + "\n" + device.getAddress());
                
            }
        }
    };
    // 注册这个 BroadcastReceiver
    IntentFilter filter = new IntentFilter(BluetoothDevice.ACTION_FOUND);
    registerReceiver(mReiver,filter);
    ```