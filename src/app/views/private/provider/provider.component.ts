import { Component, OnInit, inject } from '@angular/core';
import { ModalComponent } from '../../../components/modal/modal.component';
import { TableComponent } from '../../../components/table/table.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { ProviderService } from '../../../services/provider.service';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-provider',
  standalone: true,
  imports: [ModalComponent, TableComponent, HeaderComponent, FormsModule, DatePipe],
  templateUrl: './provider.component.html',
  styleUrl: './provider.component.scss'
})
export class ProviderComponent implements OnInit {
  search: string = '';
  columnNames = ['nombre', 'direccion', 'telefono', 'telefono #2','correo', 'registrado desde']
  columns = ['name', 'address', 'phone', 'phone2','email', 'createdAt']
  op = { delete: true, edit: true }
  providerList: any[] = [];
  providerService = inject(ProviderService);
  datepipe = new DatePipe('en-US');
  constructor() { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.providerService.getAll().subscribe(res => this.providerList = res.map(e => { e.createdAt = this.datepipe.transform(e.createdAt, 'dd-MM-yyyy, h:mm a'); return e; }));
  }
  edit(provider: any) {
    this.loadData();
  }
  delete(provider: any) {
    this.providerService.delete(provider.id).subscribe(res => {
      this.providerList = this.providerList.filter(res => provider.id !== res.id);
    });
  }
  create() {

  }
  newValue(data: any) {
    this.loadData();
  }
}
