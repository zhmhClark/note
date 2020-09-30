1. 杂项
    - 引用`res`中的资源
        代码中：`R.string.app_name`
        XML中：`@string/app_name`
    - `app/build.gradle`下的`defaultConfig`闭包里的`applicationId`为应用的唯一标识符
    - 在XML中定义元素 用`@+sth/sth_name`
    - 销毁活动：`finish()`
2. toast&button
    - eg
        ```java
        Button button1 = (Button) findViewById(R.id.button1);
        button1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(FirstActivity.this, "button 1 clicked",
                        Toast.LENGTH_SHORT).show();
            }
        });
        ```
3. menu
    1. `res`下创建`menu`文件夹，在其下新建`menu resource file`类型的文件`menu_name.xml`
    2. menu_file.xml eg.
        ```xml
        <menu xmlns:android="http://schemas.android.com/apk/res/android">
            <item
                android:id="@+id/add_item"
                android:title="Add"/>
            <item
                android:id="@+id/remove_item"
                android:title="Remove"/>
        </menu>        
        ```
    3. 重写`onCreateOptionsMenu()`
        eg
        ```java
        public boolean onCreateOptionsMenu(Menu menu) {
            getMenuInflater().inflate(R.menu.main, menu);//第一个为资源引用，第二个是传入的参数
            return true;
        }
        ```
    4. 重写`onOptionsItemSelected()`
        eg
        ```java
        public boolean onOptionsItemSelected(@NonNull MenuItem item) {
            switch (item.getItemId()) {
                case R.id.add_item:
                    Toast.makeText(this, "Add clicked", Toast.LENGTH_SHORT).show();
                    break;
                case R.id.remove_item:
                    Toast.makeText(this, "Remove clicked", Toast.LENGTH_SHORT).show();
                    break;
                default:
            }
            return true;
        }        
        ```
4. intent
    1. 显式
        eg
        ```java
        Intent intent = new Intent(FirstActivity.this, SecondActivity.class);
        startActivity(intent);
        ```
    2. 隐式
        1. 在`AndroidManifest.xml`中加入`<intent-filter>`
            `action`唯一，`category`除了默认的不能少之外，还可自定义
            eg
            ```xml
            <activity android:name=".SecondActivity">
                <intent-filter>
                    <action android:name="com.example.activitytest.ACTION_START" />
                    <category android:name="android.intent.category.DEFAULT" />
                </intent-filter>
            </activity>
            
            ```
        2. 添加隐式intent
            ```java
            Intent intent = new Intent("com.example.activitytest.ACTION_START");
            startActivity();
            //intent.addcategory("...")自己添的category
            ```
    3. 活动间传递数据
        1. 向下一个
            eg
            ```java
            //上一个活动中
            intent.putExtra(str_key, str_val);//再调用 startActivity(intent)
            
            //下一个活动中
            Intent intent = getIntent();
            String data = intent.getStringExtra(str_key);
            ```
        2. 返回给上一个
            eg
            ```java
            //下一个活动中
            //可以放在重写的onBackPressed()或返回的按钮中
            Intent intent = new Intent();
            intent.putExtra(str_key, str_val);
            setResult(RESULT_OK, intent);
            finish();

            //上一个活动中
            Intent intent = ...
            startActivityForResult(intent, 1);//第二参数是请求码，只要是唯一值即可
            ...
            @Override
            protected void onActivityResult(int reqCode, int resCode, Intent Data) {
                switch(reqCode) {
                    case 1:
                        if(resCode == RESULT_OK) {
                            String retData = data.getStringExtra(str_key);
                        }
                    break;
                    default:
                }
            }
            ```
         