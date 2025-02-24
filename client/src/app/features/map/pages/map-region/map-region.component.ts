import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-map-region',
  imports: [RouterModule, ],
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
    // Set a delay before showing the popover
    this.hoverTimeout = setTimeout(() => {
      this.showPopover = true;
    }, 500); // Delay in milliseconds
  }

  onMouseLeave() {
    // Cancel the delay and hide the popover
    clearTimeout(this.hoverTimeout);
    this.showPopover = false;
  }

  constructor(private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer, private http: HttpClient) { }

  ngOnInit(): void {
    // Retrieve the region from the route parameters
    this.route.paramMap.subscribe((params) => {
      const region = params.get('region');
      this.region = region;

      // Check if the region is valid
      if (region && this.regions.includes(region)) {
        // Load region info (text file)
        this.http.get(`/texts/${region}_info.txt`, { responseType: 'text' }).subscribe(
          (data) => {
            this.text = data.split('\n').join('\n\n');
          },
          (error) => {
            // If an error occurs (e.g., file not found), redirect to the map page
            console.error('Error loading region info:', error);
            this.router.navigate(['/map']);
          }
        );

        this.imageSrc = `/${region}-photo.png`;
        // Set up the iframe URL safely
        const unsafeInfoUrl = `/info-panels/${region}-info.html`
        const unsafeUrl = `/${region}-map.html`;
        this.safeRegionMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
        this.safeRegionInfoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeInfoUrl);
      } else {
        // If region is invalid, redirect to the map page
        this.router.navigate(['/map']);
      }
    });
  }

}
