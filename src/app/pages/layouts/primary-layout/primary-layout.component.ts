import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-primary-layout',
  templateUrl: './primary-layout.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [AuthService],
})
export class PrimaryLayoutComponent {
  fullName: string = '';
  isSidebarVisible = false;
  constructor(
    private _iconService: NzIconService,
    private authService: AuthService
  ) {
    this._iconService.useJsonpLoading();
  }
  ngOnInit() {
    window.scrollTo(0, 0);
    this.getFullName();
  }
  getFullName() {
    this.fullName = this.authService.claims.fullName;
  }
  logout() {
    this.authService.logout();
  }
}
