import { Component, OnInit } from '@angular/core';
import { MainService } from './main.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'yumemi-task';
  prefectures:any={};

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.mainService
      .prefectureApi()
      .subscribe(
        data => {
            this.prefectures=data;
        },
        err => console.log(err));
  }
}
