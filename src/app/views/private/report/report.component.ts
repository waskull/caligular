import { Component, inject } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { SaleService } from '../../../services/sale.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DpDatePickerModule, IDatePickerConfig } from 'ng2-date-picker';
import { default as dayjs } from 'dayjs';
import 'dayjs/locale/es-mx';
import { saveAs } from 'file-saver';
import { DEF_CONF } from '../../../constants/DatePicker';
dayjs.locale('es-mx');
export enum ECalendarValue {
  Dayjs = 1,
  DayjsArr,
  String,
  StringArr,
}

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [DatePipe, FormsModule, DpDatePickerModule ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {
  config: any = {
    ...DEF_CONF,
    format: 'YYYY-MM-DD'
  };
  option: string = 'orders';
  buttonText: string = 'Pedidos';
  saleService = inject(SaleService);
  orderService = inject(OrderService);
  datepipe = new DatePipe('en-US');
  start:any = dayjs('2023-11-02');
  end: any = dayjs().add(1,'day');
  getRows() {
    console.log(this.start, this.end);
    if (this.option === 'orders') {
      this.buttonText = 'Pedidos';
      this.orderService.getReport(this.start, this.end).subscribe((e:Blob) => {
        console.log(e);
        saveAs(e, 'reporteCompras.pdf');
      });
    }
    else if (this.option === 'sales') {
      console.log("venta :D", new Date().toLocaleDateString());
      this.saleService.getSalesByDate(this.start, this.end).subscribe((e:Blob) => {
        console.log(e);
        saveAs(e, 'reportePedidos.pdf');
      });
    }
    else {

    }
  }
  updateButton(event: any) {
    this.buttonText = event.target.options[event.target.options.selectedIndex].text + 's';
    this.option = event.target.options[event.target.options.selectedIndex].value;
  }
}
