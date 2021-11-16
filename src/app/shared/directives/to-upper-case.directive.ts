import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appToUpperCase]',
})
export class ToUpperCaseDirective {

  constructor(private host: NgControl) {
  }

  @HostListener('input', ['$event']) onInput(event: any) {
    this.host.control?.setValue(this.host.value.toUpperCase());
  }
}
