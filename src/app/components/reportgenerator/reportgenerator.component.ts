import { Component, Input, inject } from '@angular/core';
import { saveAs } from 'file-saver';
import { SaleService } from '../../services/sale.service';
import { OrderService } from '../../services/order.service';
@Component({
  selector: 'reportgenerator',
  standalone: true,
  imports: [],
  templateUrl: './reportgenerator.component.html',
  styleUrl: './reportgenerator.component.scss'
})
export class ReportgeneratorComponent {
  @Input() isSale: boolean = false;
  @Input() isPurchase: boolean = false;
  @Input() isBill: boolean = false;
  @Input() id: number = 0;
  saleService = inject(SaleService);
  orderService = inject(OrderService);
  

  generate() {
    console.log(this.id);
    if (this.isBill) {
      this.generateBillReport();
    }
    else if (this.isPurchase) {
      this.generatePurchaseReport()
    }
    else {
      this.generateReport();
    }
  }
  generateBillReport() { }
  generatePurchaseReport() {
    this.orderService.getOrderReport(this.id).subscribe((e:Blob) => {
      console.log(e);
      saveAs(e, `reporteCompra${this.id}.pdf`);
    });
   }
  generateReport() {
    this.saleService.getSaleReportById(this.id).subscribe((e:Blob) => {
      console.log(e);
      saveAs(e, `reportePedido${this.id}.pdf`);
    });
   }
}
