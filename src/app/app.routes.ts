import { Routes } from '@angular/router';
import { LoginComponent } from './views/public/login/login.component';
import { PrivatelayoutComponent } from './views/private/privatelayout/privatelayout.component';
import { DashboardComponent } from './views/private/dashboard/dashboard.component';
import { InventoryComponent } from './views/private/inventory/inventory.component';
import { ProductComponent } from './views/private/product/product.component';
import { OrderComponent } from './views/private/order/order.component';
import { SaleComponent } from './views/private/sale/sale.component';
import { UserComponent } from './views/private/user/user.component';
import { ProviderComponent } from './views/private/provider/provider.component';
import { NotfoundComponent } from './views/public/notfound/notfound.component';
import { ReportComponent } from './views/private/report/report.component';
import { EdituserComponent } from './views/private/edituser/edituser.component';
import { PasswordComponent } from './views/public/password/password.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'password', component: PasswordComponent},
    {
        path: '',
        component: PrivatelayoutComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'users', component: UserComponent },
            { path: 'sales', component: SaleComponent },
            { path: 'providers', component: ProviderComponent },
            { path: 'orders', component: OrderComponent},
            { path: 'products', component: ProductComponent},
            { path: 'stock', component: InventoryComponent},
            { path: 'reports', component: ReportComponent},
            { path: 'edituser', component: EdituserComponent},
        ]
    },
    { path: '**', pathMatch: 'full', component: NotfoundComponent}
];
