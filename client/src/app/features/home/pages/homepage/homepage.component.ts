import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-homepage',
  imports: [RouterModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{

  images: string[] = ["шипка.jpg", "александър невски.jpg", "рилски езера.png", "белоградчик.jpg"];
  index: number = 1;
  imageUrl: WritableSignal<string> = signal("/homepage-photos/шипка.jpg");

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.imageUrl.set("/homepage-photos/" + this.images[this.index]);
      this.index = (this.index + 1) % this.images.length;
    }, 2000);
  }
}
