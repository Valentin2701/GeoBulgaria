import { Component, OnInit } from '@angular/core';
import { Test } from '../../models/Test';
import { TestService } from '../../services/test.service';
import { LoaderService } from '../../../../core/services/loader.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-test',
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit {
  test: Test | null = null;

  constructor(private testService: TestService, private loaderService: LoaderService, private snackbarService: SnackbarService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      const testId = params.get("testId");
      this.testService.testId.set(testId as String);

      this.loaderService.showLoader();

      this.testService.getTest().subscribe(
        (test) => {
          this.test = test;
          this.loaderService.hideLoader();
        },
        (error) => {
          this.loaderService.hideLoader();
          this.snackbarService.showError("Couldn't fetch test");
        }
      );
    })
  }
}
