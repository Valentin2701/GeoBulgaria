import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./shared/components/nav/nav.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { AuthService } from './core/services/auth.service';
import { LoaderComponent } from "./shared/components/loader/loader.component";
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, FooterComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit {
  
  constructor(private authService: AuthService, private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.authService.fetchUserSession();
  }
}
