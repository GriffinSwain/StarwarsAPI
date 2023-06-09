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
  bodyClass: string;
  searchType: string;

  constructor(private datafetchService: DatafetchService) {
    this.music1 = new Audio('../assets/CantinaBand.mp3');
    this.music2 = new Audio('../assets/CantinaBand2.mp3');
    this.bodyClass = 'backgroundBg';
    this.searchType = "index";
  }

  ngOnInit(): void {}

  searchByIndex(field: string, index: number) {
    this.stopAllAudio();
    this.bodyClass = 'backgroundBg';
    this.music1.play();
    console.log('Pressed');
    this.datafetchService.getDataByIndex(field, index).subscribe((data) => {
      console.log(data);
    });
  }

  searchByName(field: string, name: string) {
    this.stopAllAudio();
    this.music2.play();
    this.bodyClass = 'backgroundBg2';
    console.log('Pressed');
    this.datafetchService.getDataByName(field, name).subscribe((data) => {
      console.log(data);
    });
  }

  stopAllAudio() {
    this.music1.pause();
    this.music2.pause();
  }

  onDropdownChange(query: any){
    this.searchType = query.target.value;
    console.log(this.searchType);
  }
}
