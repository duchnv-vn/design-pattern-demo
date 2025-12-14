package patterns.creational.singleton;

public class Singleton {
    private static volatile Singleton instance;
    private String prop1;

    private Singleton(String prop1) {
        this.prop1 = prop1;
    }

    public static Singleton getInstance(String prop1) {
        Singleton res = instance;
        if (res == null) {
            synchronized (Singleton.class) {
                res = instance;
                if (res == null) {
                    instance = res = new Singleton(prop1);
                }
            }
        }

        return res;
    }
}
