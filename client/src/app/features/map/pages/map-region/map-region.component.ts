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
  regions = ["blagoevgrad", "burgas", "dobrich", "gabrovo", "haskovo", "kardzhali", "kyustendil", "lovech", "montana", "pazardzhik", "pernik", "pleven", "plovdiv", "yambol", "razgrad", "ruse", "shumen", "silistra", "sliven", "smolyan", "sofia-region", "sofia-grad", "stara-zagora", "targovishte", "varna", "veliko-tarnovo", "vidin", "vraca"]

  safeRegionMapUrl!: SafeResourceUrl;
  safeRegionInfoUrl!: SafeResourceUrl;
  text!: string;
  region: string | null = null;

  showPopover = false;
  imageSrc = '';
  imageCaption = 'This is an image in the popover.';
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
      this.region = region;

      if (region && this.regions.includes(region)) {
        this.http.get(`/texts/${region}_info.txt`, { responseType: 'text' }).subscribe(
          (data) => {
            this.text = data.split('\n').join('\n\n');
          },
          (error) => {
            console.error('Error loading region info:', error);
            this.router.navigate(['/map']);
          }
        );

        this.imageSrc = `/${region}-photo.png`;
        const unsafeInfoUrl = `/info-panels/${region}-info.html`
        const unsafeUrl = `/${region}-map.html`;
        this.safeRegionMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
        this.safeRegionInfoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeInfoUrl);
      } else {
        this.router.navigate(['/map']);
      }
    });
  }

}
