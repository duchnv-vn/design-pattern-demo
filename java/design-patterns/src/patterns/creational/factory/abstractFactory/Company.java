package patterns.creational.factory.abstractFactory;

public abstract class Company {
    public abstract Gpu createGpu();

    public abstract Monitor createMonitor();
}