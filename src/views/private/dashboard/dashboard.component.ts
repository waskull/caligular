import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { DatePipe } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { SaleService } from '../../../services/sale.service';
import { TableComponent } from '../../../components/table/table.component';
import { RouterModule } from '@angular/router';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DatePipe, TableComponent, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  constructor() { }
  datepipe = new DatePipe('en-US');
  authService = inject(AuthService);
  saleService = inject(SaleService);
  public chart: any;
  public stats!:any;
  public bills:any[] = [];

  columnNames = ['artículos','TOTAL A PAGAR','método de pago','estado','cliente','fecha']
  columns = ['items','total','method','status','client','date']
  rows = [{name:'asd',asd:'asdf'},{name:'123',asd:'456'}]
  op = {delete:true,edit:true}
  editItem(item:any){
    console.log(item);
  }
  deleteItem(item:any){
    console.log(item);
  }


  ngOnInit(): void {
    this.saleService.getStats().subscribe(res => {
      this.stats = res;
      this.createChart(this.stats.topsales, this.stats.topclients);
    });
    this.saleService.getLastFourBills().subscribe(res => {
      this.bills = res;
      this.bills.forEach(e => {
        e.status = e.status;
        e.items = e.sale_items.map((r: { item: { name: string; }; quantity: string; }) => {
          return ` ${r.item.name} cantidad: ${r.quantity}`;
        });
        e.method = e.paymentMethod;
        e.client = e?.user?.firstname ? `${e?.user?.firstname} ${e?.user?.lastname}` : null; 
        e.date = this.datepipe.transform(e.createdAt, 'dd-MM-yyyy, h:mm a');
        e.updateAt = this.datepipe.transform(e.updatedAt, 'dd-MM-yyyy, h:mm a')
      });

    });
  }


  public getUserInfo(): string {
    return `${this.authService.currentUser()?.firstname} ${this.authService.currentUser()?.lastname}`
  }

  createChart(data:any[], clients:any){
    var myChart = new Chart("myChart", {
      type: 'bar',
      data: {
          labels: data.map((e: { name: string; }) => {
            return e?.name || undefined
          }),
          datasets: [{
              label: '# de Ventas',
              data: data.map((e: { sales: string; }) => {
                return parseInt(e?.sales || '0')
              }),
              backgroundColor: [
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(1, 200, 100, 0.2)',
              ],
              borderColor: [
                  'rgba(54, 162, 235, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(1, 200, 100, 1)',
              ],
              borderWidth: 2
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          },
          plugins:{
            title: {
              display: true,
              text: 'Helados más vendidos'
          }
          }
      }
  });

  var myChart2 = new Chart("myChart2", {
    type: 'bar',
    data: {
        labels: clients.map((e: { firstname: string; lastname:string }) => {
          return `${e?.firstname} ${e?.lastname}` || undefined
        }),
        datasets: [{
            label: '# de ventas por cliente',
            data: clients.map((e: { sales: string; }) => {
              return parseInt(e?.sales || '0')
            }),
            backgroundColor: [
                'rgba(54, 162, 235, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(1, 200, 100, 0.7)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(1, 200, 100, 1)',
            ],
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins:{
          title: {
            display: true,
            text: 'Top Clientes'
        }
        }
    }
});
  }

}
