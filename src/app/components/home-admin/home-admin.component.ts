import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { WeddingPlaceDetailDto } from 'src/app/models/weddingPlaceDetailDto';
import { ApiImagePipe } from 'src/app/pipes/api-image.pipe';
import { WeddingplaceService } from 'src/app/services/weddingplace.service';
import { UpdateWeddingplaceComponent } from '../admin/update-weddingplace/update-weddingplace.component';
import { WeddingPlace } from 'src/app/models/weddingPlace';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  providers: [DialogService, ConfirmationService, ApiImagePipe],
})
export class HomeAdminComponent {
  weddingPlaces: WeddingPlaceDetailDto[] = [];
  wpLoaded: boolean = false;
  ref: DynamicDialogRef = new DynamicDialogRef();

  constructor(
    private weddingPlaceService: WeddingplaceService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private toastrService: ToastrService,
    private apiimagePipe: ApiImagePipe
  ) {}

  ngOnInit() {
    this.getWeddingPlaces();
  }
  addWeddingPlace() {}

  getWeddingPlaces() {
    this.weddingPlaceService.getWeddingPlaceDetails().subscribe((res: any) => {
      if (res.success) {
        this.weddingPlaces = res.data;
        this.wpLoaded = true;
      }
    });
  }
  deleteWeddingPlace(weddingPlace: WeddingPlaceDetailDto) {
    this.weddingPlaceService
      .deleteWeddingPlace(weddingPlace.weddingPlaceId)
      .subscribe((res: any) => {
        if (res.success) {
          this.toastrService.success(res.message);
          this.getWeddingPlaces();
        }
      });
  }
  editWeddingPlace(weddingPlace: WeddingPlaceDetailDto) {
    this.ref = this.dialogService.open(UpdateWeddingplaceComponent, {
      header: 'Düğün Yeri Güncelle',
      width: '90%',
      contentStyle: { 'min-height': '300px', overflow: 'auto' },
      data: weddingPlace,
    });

    this.ref.onClose.subscribe(() => {
      this.getWeddingPlaces();
    });
  }
}
