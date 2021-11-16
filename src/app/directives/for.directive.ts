import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from "@angular/core";

@Directive({
  selector: "[myFor]", //renomeado de 'appFor' para 'myFor'
})
export class ForDirective implements OnInit {
  @Input("myForEm")
  numbers!: number[]; //pega o que vem depois da palavra chave 'em' lá em footer

  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<any>
  ) {}
  ngOnInit(): void {
    for(let number of this.numbers){
      this.container.createEmbeddedView(this.template, {$implicit: number});
    }
    console.log(this.numbers); //teste
  }
}
