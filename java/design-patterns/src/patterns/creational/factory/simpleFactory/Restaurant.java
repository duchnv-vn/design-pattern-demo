package patterns.creational.factory.simpleFactory;

public abstract class Restaurant {
    public Burger orderBurger(String name) {
        BurgerFactory burgerFactory = new BurgerFactory();
        return burgerFactory.prepare(name);
    }

    public abstract Burger createBurger();
}
