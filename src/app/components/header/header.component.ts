import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() title: string = '';
  @Input() template!: TemplateRef<any>;

  constructor() { }
  

}
