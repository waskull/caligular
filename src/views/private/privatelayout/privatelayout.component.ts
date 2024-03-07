import { Component } from '@angular/core';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-privatelayout',
  standalone: true,
  imports: [SidebarComponent,RouterOutlet],
  templateUrl: './privatelayout.component.html',
  styleUrl: './privatelayout.component.scss'
})
export class PrivatelayoutComponent {

}
