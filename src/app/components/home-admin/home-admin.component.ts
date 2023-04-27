import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { WeddingPlaceDetailDto } from 'src/app/models/weddingPlaceDetailDto';
import { ApiImagePipe } from 'src/app/pipes/api-image.pipe';
import { WeddingplaceService } from 'src/app/services/weddingplace.service';

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
        console.log(
          this.apiimagePipe.transform(
            this.weddingPlaces[31].weddingPlaceImages[0].imagePath
          )
        );
      }
    });
  }
}
