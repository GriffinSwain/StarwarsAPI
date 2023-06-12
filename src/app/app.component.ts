import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { DatafetchService } from './services/datafetch.service';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatafetchService],
})
export class AppComponent implements OnInit {
  title = 'StarwarsAPI';
  music1: HTMLAudioElement;
  music2: HTMLAudioElement;
  music3: HTMLAudioElement;
  bodyClass: string;
  searchType: string;

  constructor(private datafetchService: DatafetchService) {
    this.music1 = new Audio('../assets/CantinaBand.mp3');
    this.music2 = new Audio('../assets/CantinaBand2.mp3');
    this.music3 = new Audio('../assets/BinarySunset.mp3');
    this.bodyClass = 'backgroundBg3';
    this.searchType = "index";
  }

  ngOnInit(): void {}

  public backgroundMusic(searchBy:string): void{
    this.stopAllAudio();
    switch(searchBy){
      case "people":
        this.bodyClass="backgroundBg3"
        this.music1.play()
        break;
      case "planets":
        this.bodyClass="backgroundBg"
        this.music3.play()
        break;
      case "starships":
        this.bodyClass="backgroundBg2"
        this.music2.play()
        break;
        default:
        break;
    }
  }

  stopAllAudio() {
    this.music1.pause();
    this.music2.pause();
    this.music3.pause();
  }

}
