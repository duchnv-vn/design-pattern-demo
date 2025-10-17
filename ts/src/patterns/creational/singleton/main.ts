export class SingletonClass {
  private static instance: SingletonClass;

  private _properties: Record<string, any>;

  protected constructor() {
    this._properties = {};
  }

  static getInstance() {
    if (!this.instance) this.instance = new SingletonClass();
    return this.instance;
  }

  get properties() {
    return this._properties;
  }

  set properties(props: Record<string, any>) {
    this._properties = props;
  }
}

const instance = SingletonClass.getInstance();
instance.properties = { id: 1, name: "Duc Huynh" };
console.log(instance.properties);
