import { Component } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent {
  isSidebarVisible = true;
  constructor(private _iconService: NzIconService) {
    this._iconService.useJsonpLoading();
  }
}
