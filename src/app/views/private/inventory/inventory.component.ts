import { Component, inject } from '@angular/core';
import { InventoryService } from '../../../services/inventory.service';
import { ModalComponent } from '../../../components/modal/modal.component';
import { TableComponent } from '../../../components/table/table.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [ModalComponent, TableComponent, HeaderComponent, DatePipe],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent {
  columnNames = ['nombre','inventario','fecha de creación','ultimo pedido']
  columns = ['name','stock','createdAt','updateAt']
  op = {delete:false,edit:false}
  inventoryList: any[] = [];
  inventoryService = inject(InventoryService);
  datepipe = new DatePipe('en-US');
  constructor() { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.inventoryService.getAll().subscribe(res => {
      let tmpList:any[] = [];
      res.forEach(e => {
        e.name = e.item.name;
        e.createdAt = this.datepipe.transform(e.createdAt, 'dd-MM-yyyy, h:mm a');
        e.updateAt = this.datepipe.transform(e.updateAt, 'dd-MM-yyyy, h:mm a');
        tmpList.push(e);
      });
      this.inventoryList = tmpList;
    });
  }
  edit(data: any){
    const tempList = this.inventoryList.filter(res => data.id !== res.id);
    this.inventoryList = [...tempList, data];
  }
  
  newValue(data: any){
    this.loadData();
  }
}
