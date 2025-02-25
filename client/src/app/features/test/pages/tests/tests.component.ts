import { Component, OnInit } from '@angular/core';
import { Test } from '../../models/Test';
import { TestService } from '../../services/test.service';
import { LoaderService } from '../../../../core/services/loader.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { RouterModule } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-tests',
  imports: [RouterModule, CommonModule, NgFor],
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.css'
})
export class TestsComponent implements OnInit{
  public tests: Test[] = [];

  constructor(private testService: TestService, private loaderService: LoaderService, private snackbarService: SnackbarService){}

  ngOnInit(): void {
    this.loaderService.showLoader();
    
    this.testService.getTests().subscribe(
      (tests) => {
        this.tests = tests;
        this.loaderService.hideLoader();
      },
      (error) => {
        this.loaderService.hideLoader();
        this.snackbarService.showError("Couldn't fetch tests");
      }
    );
  }
}
