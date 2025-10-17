export class PropertyClass {
  id: number;
  name: string;
}

export class PrototypeClass {
  prop1: PropertyClass;
  prop2: PropertyClass;

  constructor(data?: { prop1?: PropertyClass; prop2?: PropertyClass }) {
    this.prop1 = data?.prop1 || new PropertyClass();
    this.prop2 = data?.prop2 || new PropertyClass();
  }

  deepClone() {
    return new PrototypeClass();
  }

  shallowClone() {
    return new PrototypeClass({ prop1: this.prop1, prop2: this.prop2 });
  }
}

const instance1 = new PrototypeClass({ prop1: { id: 1, name: "test1" } });
const instance2 = instance1.deepClone();
instance2.prop1.id = 2;
instance2.prop1.name = "test2";
instance2.prop2.id = 3;
instance2.prop2.name = "test3";

const instance3 = instance1.shallowClone();
instance3.prop1.name = "editted test1";
instance3.prop2.id = 4;
instance3.prop2.name = "test4";

console.log("instance1", instance1);
console.log("instance2", instance2);
console.log("instance3", instance3);
