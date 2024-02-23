import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { IUser } from '../../interfaces';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  @Output() onToggleSidenav: EventEmitter<{ screenWidth: number, collapsed: boolean }> = new EventEmitter();
  authService = inject(AuthService);
  router = inject(Router);
  rol = '';
  public userData!: IUser;

  public getUserInfo(): string {
    return `${this.authService.currentUser()?.firstname?.at(0)} ${this.authService.currentUser()?.lastname?.at(0)}`
  }

  public getUserFullaname(): string {
    return `${this.authService.currentUser()?.firstname} ${this.authService.currentUser()?.lastname}`
  }

  ngOnInit(): void {
    if (this.authService.currentUser()?.roles?.includes('vendedor')) {
      this.navData = [
        {
          number: '1',
          routeLink: 'dashboard',
          icon: 'fa-solid fa-chart-line',
          label: 'Panel de Inicio',
          roles: ['admin', 'gerente', 'vendedor', 'cliente']
        },
        
        {
          number: '2',
          routeLink: 'sales',
          icon: 'fa-solid fa-money-check-dollar',
          label: 'Pedidos',
          roles: ['admin', 'gerente', 'vendedor', 'cliente']
        },
        {
          number: '3',
          routeLink: 'products',
          icon: 'fa-solid fa-list',
          label: 'Productos',
          roles: ['admin', 'gerente', 'vendedor']
        },
      ];
      this.userData = {
        firstname: this.authService.currentUser()?.firstname,
        lastname: this.authService.currentUser()?.lastname,
        birthdate: this.authService.currentUser()?.birthdate,
        email: this.authService.currentUser()?.email,
        roles: this.authService.currentUser()?.roles,
        phone: this.authService.currentUser()?.phone,
        cedula: this.authService.currentUser()?.cedula
      }
    }
    this.authService?.getInfo().subscribe(info => {
      this.rol = info.roles[0];
    });
  }

  collapsed = false;
  navData = [
        // {
    //   number: '0',
    //   routeLink: 'stock',
    //   icon: 'fa-solid fa-list',
    //   label: 'Inventario',
    //   roles: ['admin', 'gerente', 'vendedor']
    // },
    {
      number: '1',
      routeLink: 'orders',
      icon: 'fa-solid fa-basket-shopping',
      label: 'Compras',
      roles: ['admin', 'gerente']
    },
    
    {
      number: '2',
      routeLink: 'sales',
      icon: 'fa-solid fa-money-check-dollar',
      label: 'Pedidos',
      roles: ['admin', 'gerente', 'vendedor']
    },
    {
      number: '3',
      routeLink: 'products',
      icon: 'fa-solid fa-ice-cream',
      label: 'Productos',
      roles: ['admin', 'gerente']
    },
    // {
    //   number: '3',
    //   routeLink: 'providers',
    //   icon: 'fa-solid fa-person-walking-luggage',
    //   label: 'Proveedores',
    //   roles: ['admin', 'gerente']
    // },
    {
      number: '4',
      routeLink: 'reports',
      icon: 'fa-solid fa-file-invoice',
      label: 'Reportes',
      roles: ['admin', 'gerente']
    },
    
    {
      number: '5',
      routeLink: 'users',
      icon: 'fa-solid fa-users',
      label: 'Usuarios',
      roles: ['admin', 'gerente']
    },
    
    {
      number: '6',
      routeLink: 'dashboard',
      icon: 'fa-solid fa-chart-line',
      label: 'Visión General',
      roles: ['admin', 'gerente', 'vendedor']
    },
  ];

  navData2 = [
    {
      number: '1',
      routeLink: 'dashboard',
      icon: 'fa-solid fa-chart-line',
      label: 'Panel de Inicio',
      roles: ['admin', 'gerente', 'vendedor', 'cliente']
    },
    
    {
      number: '2',
      routeLink: 'sales',
      icon: 'fa-solid fa-money-check-dollar',
      label: 'Pedidos',
      roles: ['admin', 'gerente', 'vendedor', 'cliente']
    },
    {
      number: '3',
      routeLink: 'products',
      icon: 'fa-solid fa-list',
      label: 'Productos',
      roles: ['admin', 'gerente', 'vendedor']
    },
  ];

  public getRol() {
    
  }

  status: boolean = true;
  screenWidth: number = 0;
  toggle() {
    this.status = !this.status;
    this.onToggleSidenav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }
  closeSidenav() {
    this.status = false;
    this.onToggleSidenav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });

  }

  logout() {
    if (confirm('¿Deseas cerrar sesión?')) {
      this.authService.logout();
      this.router.navigateByUrl('/');
    }
  }
}
