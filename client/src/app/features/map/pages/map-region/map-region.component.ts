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
    this.route.paramMap.subscribe((params) => {
      const region = params.get('region');
      if (this.regions.includes(region!)) {
        this.http.get(`/texts/${region}_info.txt`, { responseType: 'text' }).subscribe(
          (data) => {
            this.text = data;
          }
        );
        const unsafeUrl = `/${region}-map.html`;
        this.safeRegionMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          unsafeUrl
        );
      }
      else {
        this.router.navigate(['/map']);
      }
    });
  }

}
