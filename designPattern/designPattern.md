1. 工厂模式 
    1. 简单工厂模式    
        举个例子，直接 new 对象的方式相当于当我们需要一个苹果时，我们需要知道苹果的构造方法，需要一个梨子时，需要知道梨子的构造方法。更好的实现方式是有一个水果工厂，我们告诉工厂需要什么种类的水果，水果工厂将我们需要的水果制造出来给我们就可以了。这样我们就无需知道苹果、梨子是怎么种出来的，只用和水果工厂打交道即可。

        ```java
        public class FruitFactory {
            public Fruit create(String type){
                switch (type){
                    case "苹果": return new Apple();
                    case "梨子": return new Pear();
                    default: throw new  IllegalArgumentException("暂时没有这种水 果");
                }
            }
        }

        public class User {
            private void eat(){
                FruitFactory fruitFactory = new     FruitFactory();
                Fruit apple = fruitFactory.create("苹果");
                Fruit pear = fruitFactory.create("梨子");
                apple.eat();
                pear.eat();
            }
        }
        ```
        事实上，将构建过程封装的好处不仅可以降低耦合，如果某个产品构造方法相当复杂，使用工厂模式可以大大减少代码重复。比如，如果生产一个苹果需要苹果种子、阳光、水分。则只需要修改Factor中苹果的代码即可，调用者不需要知道，改动。

        弊端:
        - 一是如果需要生产的产品过多，此模式会导致工厂类过于庞大，承担过多的职责，变成超级类。当苹果生产过程需要修改时，要此工厂。梨子生产过程需要修改时，也要来修改此工厂。也就是说这个类不止一个引起修改的原因。违背了单一职责原则。
        - 二是当要生产新的产品时，必须在工厂类中添加新的分支。而开闭原则告诉我们：类应该对修改封闭。我们希望在添加新功能时增加新的类，而不是修改既有的类，所以这就违背了开闭原则。
    2. 工厂方法模式        
        - 为了解决简单工厂模式的这两个弊端，工厂方法模式应运而生，它规定每个产品都有一个专属工厂。比如苹果有专属的苹果工厂，梨子有专属的梨子工厂
        ```java
        public class AppleFactory {
            public Fruit create(){
                return new Apple();
            }
        }
        public class PearFactory {
            public Fruit create(){
                return new Pear();
            }
        }
        ```
    3. 抽象工厂模式
        - 将工厂抽象出来，作为接口，每个具体工厂实现。由于客户端只和 IFactory 打交道了，调用的是接口中的方法，使用时根本不需要知道是在哪个具体工厂中实现的这些方法，这就使得替换工厂变得非常容易。
        ```java
        public class User {
            private void eat(){
                IFactory factory = new AppleFactory();//仅改此行，即可吃梨
                Fruit fruit = factory.create();
                fruit.eat();
            }
        }
        ```
2. 单例模式

3. 建造者模式
    适用于创建过程稳定，配置多变的类
    ```java
    public class MilkTea {
        private final String type;
        private final String size;
        private final boolean pearl;
        private final boolean ice;

        private MilkTea(Builder builder) {
            this.type = builder.type;
            this.size = builder.size;
            this.pearl = builder.pearl;
            this.ice = builder.ice;
        }

        public String getType() {
            return type;
        }

        public String getSize() {
            return size;
        }

        public boolean isPearl() {
            return pearl;
        }
        public boolean isIce() {
            return ice;
        }

        public static class Builder {

            private final String type;
            private String size = "中杯";
            private boolean pearl = true;
            private boolean ice = false;

            public Builder(String type) {
                this.type = type;
            }

            public Builder size(String size) {
                this.size = size;
                return this;
            }

            public Builder pearl(boolean pearl) {
                this.pearl = pearl;
                return this;
            }

            public Builder ice(boolean cold) {
                this.ice = cold;
                return this;
            }

            public MilkTea build() {
                return new MilkTea(this);
            }
        }
    }

    public class User {
        private void buyMilkTea() {
            MilkTea milkTea = new MilkTea.Builder("原味").build();
            show(milkTea);

            MilkTea chocolate =new MilkTea.Builder("巧克力味")
                    .ice(false)
                    .build();
            show(chocolate);

            MilkTea strawberry = new MilkTea.Builder("草莓味")
                    .size("大杯")
                    .pearl(false)
                    .ice(true)
                    .build();
            show(strawberry);
        }
    ```