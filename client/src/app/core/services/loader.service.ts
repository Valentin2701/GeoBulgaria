import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading = signal(false);

  // Methods to control the loader state
  showLoader() {
    this.isLoading.set(true);
  }

  hideLoader() {
    this.isLoading.set(false);
  }
}
