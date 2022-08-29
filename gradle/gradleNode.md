# Gradle Note

## Plugin

* 插件可以分为脚本插件和二进制插件（对象插件），二进制插件包括内部插件，三方插件，自定义插件

### 脚本插件

* 将对应的脚本文件通过 `apply from` 将对应的脚本直接复制替换进所在文件
* 常见案例：用一个脚本文件统一记录构建所用的版本信息

```groovy
//version.gradle
ext {
  company = "shopee"
  cfgs = [
    compileSdkVersion: JavaVersion.VERSION_1_s
  ]
  spring = [
    version : '5.0.0'
  ]
}


//build.gradle
apply from 'version.gradle'
task taskVersion {
  doLast {
    println "company is ${company}, JDK version is ${cfgs.compileSdkVersion}, Spring versionn is ${spring.version}"
  }
}
```

### 内部插件

* 包括常见的核心插件

```groovy
//DSL
plugins {
  id 'java'
}

//apply 方式，在包已经引入，可以省略包名
apply plugin:'java'

apply {
  plugin 'java'
}
```

### 第三方插件

* 传统的写法需要在build.gradle 最开始使用 `buildScript` 闭包

  ```groovy
  buildscript {
      repositories {
          google()
          mavenCentral()
          maven { url 'https://plugins.gradle.org/m2/' }
      }
  
      dependencies {
          classpath 'com.jfrog.bintray.gradle:gradle-bintray-plugin:1.8.4'
          classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:1.4.32"
      }
  }
  ```

  

### 自定义插件

* 手动继承、实现 Plugin 类/接口

#### buildSrc

1. mkdir buildSrc

2. 填充 build.gradle 大致模版为

   ```groovy
   apply plugin: 'java-gradle-plugin' // Allows us to create and configure custom plugins
   apply plugin: 'kotlin' //Needed as we'll write our plugin in Kotlin
   
   buildscript {
     ext.kotlin_version = '1.3.71'
     ext.gradle_version = '3.5.3'
     repositories {
        google()
        jcenter()
     }
     dependencies {
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
        classpath "com.android.tools.build:gradle:$gradle_version"
     }
   }
   
   repositories {
     google()
     jcenter()
   }
   
   dependencies {
     implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
   
     // Android gradle plugin will allow us to access Android specific features
     implementation "com.android.tools.build:gradle:$gradle_version"
   }

3. sync

4. 生成文件后，按照提示生成源码文件

5. 注册插件

   ```groovy
   gradlePlugin {
     plugins {
        create("MyFirstPlugin") {
           id = "MyFirstPlugin"
           implementationClass = "MyFirstPlugin"
        }
     }
   }
   ```

6. 在 app/build.gradle 下 `apply plugin: "DemoPlugin"`

## classpath

* java 源码的 classpath 声明于dependencies 闭包 (implementation)，build.gradle 的源码声明于 buildScript 闭包（dependencies classpath）
* 先引入，后引用 (apply)
