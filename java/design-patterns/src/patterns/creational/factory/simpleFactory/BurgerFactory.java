package patterns.creational.factory.simpleFactory;

public class BurgerFactory {
    public Burger prepare(String name) {
        Burger burger = switch (name) {
            case "BEEF" -> new BeefBurger();
            case "CHICKEN" -> new ChickenBurger();
            default -> null;
        };

        return burger;
    }
}
