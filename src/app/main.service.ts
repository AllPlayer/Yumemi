import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  prefecturePath = "https://opendata.resas-portal.go.jp/api/v1/prefectures";
  constructor(private http: HttpClient) { }

  prefectureApi() {
    const headers = { 'X-API-KEY':'g2bRHUL3xlMetlbfpZGr0bA0s2MvDWomHz3zSjlA' }
     return this.http.get<any>(this.prefecturePath, { headers })
    //  .subscribe(data => {
    //     console.log(data);
    //     return data;
    // })
    // return this.http.get<any>(this.prefecturePath, { })
    // .pipe(
    //   map((res) => {
    //     return res;
    //   }),
    //   catchError((err) => {
    //     return err;
    //   })
    // )
  }
}
