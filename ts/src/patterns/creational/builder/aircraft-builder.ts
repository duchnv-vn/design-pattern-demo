/*
    Definition:
        Builder pattern encapsulates or hides the process of building a complex object and separates the representation of the object and its construction.
        The separation allows us to construct different representations using the same construction process.

    Purpose:
        - Simplify object creation when:
            + There are many optional parameters
            + The object requires step-by-step initialization
            + The constructor would otherwise be too long or complicated

    Builder pattern might seem similar to the abstract factory pattern but one difference is that the builder pattern creates an object step by step whereas the abstract factory pattern returns the object in one go.
*/

interface Aircraft {}

interface Boeing747 extends Aircraft {}

interface F16 extends Aircraft {}

abstract class AircraftBuilder {
  buildEngine() {
    return this;
  }

  buildWings() {
    return this;
  }

  builCockpit() {
    return this;
  }

  buldBathroom() {
    return this;
  }

  abstract getResult(): Aircraft;
}

class Boeing747Builder extends AircraftBuilder {
  product: Boeing747;

  override builCockpit() {
    return this;
  }

  override buildEngine() {
    return this;
  }

  override buildWings() {
    return this;
  }

  override buldBathroom() {
    return this;
  }

  getResult(): Aircraft {
    return this.product;
  }
}

class F16Builder extends AircraftBuilder {
  product: F16;

  override builCockpit() {
    return this;
  }

  override buildEngine() {
    return this;
  }

  override buildWings() {
    return this;
  }

  getResult(): Aircraft {
    return this.product;
  }
}

// Separate construction process and object representation
class Director {
  aircraftBuilder: AircraftBuilder;

  constructor(ab: AircraftBuilder) {
    this.aircraftBuilder = ab;
  }

  construct(isPassenger: boolean) {
    this.aircraftBuilder.builCockpit();
    this.aircraftBuilder.buildEngine();
    this.aircraftBuilder.buildWings();
    if (isPassenger) this.aircraftBuilder.buldBathroom();
  }
}

class Client {
  build() {
    const f16Builder = new F16Builder();
    const director = new Director(f16Builder);
    director.construct(false);
    const f16Product: F16 = f16Builder.getResult();
    return f16Product;
  }
}
