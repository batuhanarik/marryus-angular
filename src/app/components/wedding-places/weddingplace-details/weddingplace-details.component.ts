import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeddingplaceService } from '../../../services/weddingplace.service';
import { WeddingPlaceDetailDto } from '../../../models/weddingPlaceDetailDto';
import { Dialog } from 'primeng/dialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { WeddingplaceRentComponent } from '../weddingplace-rent/weddingplace-rent.component';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
@Component({
  selector: 'app-weddingplace-details',
  templateUrl: './weddingplace-details.component.html',
  providers: [DialogService],
})
export class WeddingplaceDetailsComponent {
  currentWeddingPlace: WeddingPlaceDetailDto;
  wpLoaded: boolean = false;
  isMobileDevice: boolean = false;

  rentDate: string = '';
  returnDate: string = '';

  responsiveOptions: any[];

  minDate: Date;
  ref: DynamicDialogRef;

  constructor(
    public activatedRoute: ActivatedRoute,
    private weddingPlaceService: WeddingplaceService,
    private dialog: DialogService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Tarayıcı ortamında çalışıyoruz
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      // Yukarıdaki ifade ile cihazın telefon olup olmadığını kontrol edebilirsiniz
      if (isMobile) {
        console.log('Mobil Cihaz');
        this.isMobileDevice = true;
      } else {
        // Masaüstü içeriği
        console.log('değil');
        this.isMobileDevice = false;
      }
    }
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
    console.log(this.isMobileDevice);
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
