import { Component, OnInit, inject } from '@angular/core';
import { ModalComponent } from '../../../components/modal/modal.component';
import { TableComponent } from '../../../components/table/table.component';
import { DatePipe } from '@angular/common';
import { SaleService } from '../../../services/sale.service';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [ModalComponent, TableComponent, DatePipe, HeaderComponent],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.scss'
})
export class SaleComponent implements OnInit {
  columnNames = ['idd','helados','total','cliente','ESTADO','Referencia','Fecha del pedido']
  columns = ['idd','items','price','client','status','pay_code', 'date'];
  op = {delete:false,edit:false, show:true}
  saleList: any[] = [];
  saleService = inject(SaleService); 
  datepipe = new DatePipe('en-US');
  constructor() { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.saleList= [];
    this.saleService.getAll().subscribe(res => {
      let total: number = 0;
      res.forEach(e => {
        let items: string = '';
        e.sale_items.forEach((r: { item: { name: string; price: string; id: any; quantity: any; }; quantity: string; }) => {
          items+=r.item.name+" x "+ r.quantity+", ";
          total+=parseFloat(r.item.price)*parseInt(r.quantity);
        });
        this.saleList.push({
          client: e?.user?.firstname ? `${e?.user?.firstname} ${e?.user?.lastname}`: null,
          salesman: e?.delivery_man?.firstname ? `${e?.delivery_man?.firstname} ${e?.delivery_man?.lastname}` : '',
          delivery_man_id: e?.delivery_man?.id,
          phone:e?.user?.phone,
          email:e?.user?.email,
          date: this.datepipe.transform(e.createdAt, 'dd-MM-yyyy, h:mm a'),
          id: e.id,
          idd: e.id < 10 ? `#0${e.id}` : `#${e.id}`,
          pay_code: e.pay_code,
          items: items,
          price: e.total,
          status: e.status,
          address: e.address,
          paymentMethod: e.paymentMethod,
          ite: e.sale_items.map((ee: { item: { id: any; name: any; price: string; }; quantity: string; }) => {
            return {id: ee.item.id, name:ee.item.name, qty:parseInt(ee.quantity), price: parseFloat(ee.item.price)};
          }),
        });
        total = 0;
      });
    });
  }
  edit(data: any){
    this.loadData();
  }
  delete(data: any){
    console.log(data);
  }
  newValue(data: any){
    this.loadData();
  }
  cancel(id: number){
    this.saleService.cancel(id).subscribe((res) => {
      this.loadData();
    });
    
  }
  confirm({id,delivery_man_id}:{id:number,delivery_man_id:number}){
    this.saleService.completeSale(id,delivery_man_id).subscribe((res) => {
      this.loadData();
    });
  }

  reload(){
    this.loadData();
  }
}
