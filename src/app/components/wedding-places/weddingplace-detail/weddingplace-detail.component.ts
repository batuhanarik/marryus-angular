import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeddingPlaceDetailDto } from 'src/app/models/weddingPlaceDetailDto';
import { WeddingplaceService } from 'src/app/services/weddingplace.service';

@Component({
  selector: 'app-weddingplace-detail',
  templateUrl: './weddingplace-detail.component.html',
})
export class WeddingplaceDetailComponent {
  currentWeddingPlace: any;
  wpLoaded: boolean = false;

  rentDate: string = '';
  returnDate: string = '';

  responsiveOptions: any[];

  minDate: Date;

  constructor(
    public activatedRoute: ActivatedRoute,
    private weddingPlaceService: WeddingplaceService
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
}
