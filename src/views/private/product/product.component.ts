import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { TableComponent } from '../../../components/table/table.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { ProductService } from '../../../services/product.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [HeaderComponent, TableComponent, ModalComponent,DatePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  columnNames = ['nombre','precio','stock','precio al mayor','fecha de creación']
  columns = ['name','price','stock','wholesale_price','createdAt']
  op = {delete:true,edit:true}
  itemList: any[] = [];
  productService = inject(ProductService);
  datepipe = new DatePipe('en-US');
  constructor() { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.productService.getAll().subscribe(res => {
      this.itemList = res.map(e => {
        e.createdAt = this.datepipe.transform(e.createdAt, 'dd-MM-yyyy, h:mm a'); 
        e.stock = e?.inventory?.stock || 0;
        return e;
       
    });
    });
  }
  edit(item: any){
    this.productService.getAll().subscribe((res) => {
      this.itemList = res;
    });
  }
  delete(item: any){
    this.productService.delete(item.id).subscribe(() => {
      this.loadData();
    });
  }
  newValue(data: any){
    this.loadData();
  }
}
