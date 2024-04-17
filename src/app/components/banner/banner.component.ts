import { AfterViewInit, Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit, AfterViewInit {

  @Input() title: string;
  @Input() Subtitle: string;
  @ViewChild('videoBanner') videoBanner: ElementRef<HTMLVideoElement>
  constructor() { }

  ngOnInit() {
   
  }
  ngAfterViewInit(): void {
    const wasPlaying = !this.videoBanner.nativeElement.paused;
    if (wasPlaying) {
      this.videoBanner.nativeElement.play();
    }
  }

  
}
