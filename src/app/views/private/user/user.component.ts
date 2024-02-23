import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { HeaderComponent } from "../../../components/header/header.component";
import { FormsModule } from '@angular/forms';
import { TableComponent } from '../../../components/table/table.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  imports: [HeaderComponent, FormsModule, TableComponent, ModalComponent,DatePipe]
})
export class UserComponent implements OnInit {
  constructor() { }
  
  userService = inject(UserService);
  router = inject(Router);
  userData: any[] = [];
  datepipe = new DatePipe('en-US');
  ngOnInit() {
    this.loadData();
  }

  calculateAge(dateString) { // birthday is a date
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

  loadData() {
    this.userService.getAll().subscribe((res) => {
      
      res.forEach((u) => {
        u.idd = u.id < 10 ? `#0${u.id}` : `#${u.id}`;
        u.birthdate = `${u.birthdate} (${this.calculateAge(u.birthdate)} años)`
      });
      this.userData = res;
      console.log(this.userData);
    });

  }

  public search: string = '';
  columnNames = ['nombre', 'apellido', 'correo', 'cédula', 'fecha de nacimieto', 'roles', 'teléfono']
  columns = ['firstname', 'lastname', 'email', 'cedula', 'birthdate', 'roles', 'phone']
  op = { delete: true, edit: true }

  editUser(user: any) {
    console.log("edit ",user);
    user.birthdate = `${user.birthdate} (${this.calculateAge(user.birthdate)} años)`
    this.loadData();
  }

  deleteUser(user: any) {
    this.userService.delete(user.id).subscribe(() => {
      this.userData = [];
      this.loadData();
    });
  }

  newValue(user: any) {
    user.birthdate = `${user.birthdate} (${this.calculateAge(user.birthdate)} años)`
    this.userData.push(user);
  }

}
