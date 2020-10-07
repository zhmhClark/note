1. 杂项
    - 引用`res`中的资源
        代码中：`R.string.app_name`
        XML中：`@string/app_name`
    - `app/build.gradle`下的`defaultConfig`闭包里的`applicationId`为应用的唯一标识符
    - 在XML中定义元素 用`@+sth/sth_name`
    - 销毁活动：`finish()`
    - 跨函数的控件应声明为活动的成员变量
    - `res/drawable`用于存放图片
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

        ```java
        //用实现接口方式注册button
        public class SomeActivity extends AppcomatActivity implements View.onClickListener {
            
            ...
            void fun() {
                Button button1 = (Button) findViewById(R.id.button1);
                button.setOnClickListener(this);
            }
            ...

            @Override
            public void onClick(View v) {
                switch(v.getId()) {
                    case R.id.button1:
                    //...
                        break;
                    case ...
                    ...
                        break;
                    default:
                        break;
                }
            }
        }
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

5. UIWidget
    1. universal
        1. `android:gravity`
        2. `android:text`
        3. `android:textColor`
        4. `android:textSize`
        5. `android:textAllCaps`
        6. `android:visbility` (`visible|invisible|gone`)
    2. TextView
    3. Button
    4. EditText
        1. `android.hint`
        2. `android.maxLines`
    5. ImageView
        1. `android:src`
    6. ProgressBar
        1. `style="?android:attr/progressBarStyleHorizonal"`
    7. 自定义控件
        1. `layout`目录下新建文件（例`title.xml`）
        2. 在需要用的布局中引入
            ```xml
            <include layout="@layout/title"/> 
            ```

6. EditText
    ```java
    //获取输入字符串
    String inputText = editText.getText().toString(); 
    ```

7. ImageView
    ```java
    //显示指定字符串
    imageView.setImageResource(R.drawable.img_2);
    ```
8. ProgressBar
    ```java
    if (progressBar.getVisibility() == View.GONE) {
        progressBar.setVisibility(View.VISIBLE);
    }
    ```

9. AlertDialog
    ```java
    @Override
    public void onClick(View v) {
        switch(v.getId()) {
            case R.id.button1:
                AlertDialog.Builder dialog = new AlertDialog.Builder(MainActivity.this);
                dialog.setTitle("This is a dialog");
                dialog.setMessage("Something important");
                dialog.setCancelable(false);
                dialog.setPositiveButton("OK", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int whitch) {
                    }
                });
                dialog.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int whitch) {
                    }
                });
                dialog.show();
                break;       
       }
    }
    ```

10. layout
    0. uni
        1. `android:layout_gravity` 控件在布局中的对齐方式
    1. LinearLayout
        1. `android:orientation` (`horizontal|vertical`)
        2. `android:layout_weight` 控件在布局中的比重
        3. 可以将某个控件`android:layout_weight="1"` 另外的控件`wrap_content` 则该控件占满剩余空间
    2. RelativeLayout
        1. `android:layout_alignParentRight|Left|Top|Bottom` 在当前布局的某个角落
        2. `android:layout_above|below|toLeftOf|toRightOf="@id/button3"`相对于某个控件


