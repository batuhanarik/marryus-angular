import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-primary-layout',
  templateUrl: './primary-layout.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PrimaryLayoutComponent {
  isSidebarVisible = true;
  constructor(private _iconService: NzIconService) {
    this._iconService.useJsonpLoading();
  }
}
