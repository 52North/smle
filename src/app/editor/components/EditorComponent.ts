export abstract class EditorComponent {

  public model;

  public editing: boolean = true;

  protected extendModel(): void {
    jQuery.extend(this.model, this.createModel());
  }

  protected abstract createModel(): any;
}
