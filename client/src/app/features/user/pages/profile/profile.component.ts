import { Component, OnInit, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../models/User';
import { TestService } from '../../../test/services/test.service';

@Component({
  selector: 'app-profile',
  imports: [RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user: User | null = null;
  tests: string[] = [];
  scores: { [key: string]: number } = {};
  isLoading: boolean = false;

  constructor(public authService: AuthService, private testService: TestService) { }

  ngOnInit(): void {
    this.isLoading = true;
      this.user = this.authService.user();
      this.testService.getUserTests().subscribe((scores) => {
        this.tests = Object.keys(scores!);
        this.scores = scores!;
        this.isLoading = false;
      });
  }
}
