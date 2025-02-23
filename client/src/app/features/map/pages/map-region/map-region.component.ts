import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  text!: string;

  constructor(private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer, private http: HttpClient) { }

  ngOnInit(): void {
    // Retrieve the region from the route parameters
    this.route.paramMap.subscribe((params) => {
      const region = params.get('region');

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

        // Set up the iframe URL safely
        const unsafeUrl = `/${region}-map.html`;
        this.safeRegionMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
      } else {
        // If region is invalid, redirect to the map page
        this.router.navigate(['/map']);
      }
    });
  }

}
