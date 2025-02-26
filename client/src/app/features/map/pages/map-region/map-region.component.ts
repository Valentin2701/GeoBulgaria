import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-map-region',
  imports: [RouterModule],
  templateUrl: './map-region.component.html',
  styleUrl: './map-region.component.css'
})
export class MapRegionComponent implements OnInit {
    regions = {
    "blagoevgrad": "Благоевград",
    "burgas": "Бургас",
    "dobrich": "Добрич",
    "gabrovo": "Габрово",
    "haskovo": "Хасково",
    "kardzhali": "Кърджали",
    "kyustendil": "Кюстендил",
    "lovech": "Ловеч",
    "montana": "Монтана",
    "pazardzhik": "Пазарджик",
    "pernik": "Перник",
    "pleven": "Плевен",
    "plovdiv": "Пловдив",
    "yambol": "Ямбол",
    "razgrad": "Разград",
    "ruse": "Русе",
    "shumen": "Шумен",
    "silistra": "Силистра",
    "sliven": "Сливен",
    "smolyan": "Смолян",
    "sofia-region": "Софийска област",
    "sofia-grad": "София",
    "stara-zagora": "Стара Загора",
    "targovishte": "Търговище",
    "varna": "Варна",
    "veliko-tarnovo": "Велико Търново",
    "vidin": "Видин",
    "vraca": "Враца"
}

  safeRegionMapUrl!: SafeResourceUrl;
  safeRegionInfoUrl!: SafeResourceUrl;
  text!: string;
  region: keyof typeof this.regions | null = null;

  showPopover = false;
  imageSrc = '';
  imageCaption = '';
  private hoverTimeout: any;

  onMouseEnter() {
    this.hoverTimeout = setTimeout(() => {
      this.showPopover = true;
    }, 500);
  }

  onMouseLeave() {
    clearTimeout(this.hoverTimeout);
    this.showPopover = false;
  }

  constructor(private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const region = params.get('region');
      this.region = region as keyof typeof this.regions;

      if (region && Object.keys(this.regions).includes(region)) {

        this.imageSrc = `/popup-photos/${region}-photo.png`;
        const unsafeInfoUrl = `/info-panels/${region}-info.html`
        const unsafeUrl = `/regions/${region}-map.html`;
        this.safeRegionMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
        this.safeRegionInfoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeInfoUrl);
      } else {
        this.router.navigate(['/map']);
      }
    });
  }

}
