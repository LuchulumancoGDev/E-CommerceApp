import { Component } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'users-login',
  standalone: true,
  imports: [InputGroupAddonModule
    ,InputGroupModule,InputTextModule
  ],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {

}
