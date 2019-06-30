import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  // I commented this cause i'm not sure it is useful
  // @HostBinding('class.show')
  isOpen = false;

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {
  }

  @HostListener('click') toogleOpen(eventData: Event) {
    if (!this.isOpen) {
      this.renderer.addClass(this.elementRef.nativeElement.nextElementSibling, 'show');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement.nextElementSibling, 'show');
    }
    this.isOpen = !this.isOpen;
  }
}
