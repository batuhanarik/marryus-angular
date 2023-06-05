import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeddingplaceService } from '../../../services/weddingplace.service';
import { WeddingPlaceDetailDto } from '../../../models/weddingPlaceDetailDto';
import { Dialog } from 'primeng/dialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { WeddingplaceRentComponent } from '../weddingplace-rent/weddingplace-rent.component';

@Component({
  selector: 'app-weddingplace-details',
  templateUrl: './weddingplace-details.component.html',
  providers: [DialogService],
})
export class WeddingplaceDetailsComponent {
  currentWeddingPlace: WeddingPlaceDetailDto;
  wpLoaded: boolean = false;

  rentDate: string = '';
  returnDate: string = '';

  responsiveOptions: any[];

  minDate: Date;
  ref: DynamicDialogRef;

  constructor(
    public activatedRoute: ActivatedRoute,
    private weddingPlaceService: WeddingplaceService,
    private dialog: DialogService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      let id = +this.activatedRoute.snapshot.paramMap.get('weddingPlaceId');
      this.getCurrentWeddingPlace(id);
    });

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 5,
      },
      {
        breakpoint: '768px',
        numVisible: 3,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
      },
    ];

    window.scrollTo(0, 0);
  }

  getCurrentWeddingPlace(wpId: number) {
    this.weddingPlaceService
      .getWeddingPlaceDetail(wpId)
      .subscribe((res: any) => {
        if (res.success) {
          this.currentWeddingPlace = res.data;
          this.wpLoaded = true;
        }
      });
  }

  rent(weddingPlace: WeddingPlaceDetailDto) {
    this.ref = this.dialog.open(WeddingplaceRentComponent, {
      header: 'Düğün Yerini Kirala',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      data: weddingPlace,
    });
  }
}
