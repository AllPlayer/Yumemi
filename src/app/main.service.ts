import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  prefecturePath = "https://opendata.resas-portal.go.jp/api/v1/prefectures";
  populationByPrefecturePath = "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear";
  constructor(private http: HttpClient) { }

  async prefectureApi() {
    const headers = { 'X-API-KEY':'g2bRHUL3xlMetlbfpZGr0bA0s2MvDWomHz3zSjlA' }
     return this.http.get<any>(this.prefecturePath, { headers })
    .pipe(
      map((res) => {
        for (var i = 0; i < res.result.length; i++){
          res.result[i].name = res.result[i].prefName;
        }
        return res;
      }),
      catchError((err) => {
        return err;
      })
    ).toPromise()
  }

  populationByPrefectureApi( prefCode:any ){
    const headers = { 'X-API-KEY':'g2bRHUL3xlMetlbfpZGr0bA0s2MvDWomHz3zSjlA' }
     return this.http.get<any>(this.populationByPrefecturePath+'?prefCode='+prefCode+'&cityCode=-', { headers })
    .pipe(
      map((res) => {
        var out = res.result.data.find( (record:any) => record.label == "総人口")||{data:null}
        var result={
          year:[],
          data:[]
        } as any;
        if(out.data!=null){
          for (var i = 0; i < out.data.length; i++) {
            result.year.push(out.data[i].year)
            result.data.push(out.data[i].value)
          }
        }
        return result;
      }),
      catchError((err) => {
        return err;
      })
    )
  }
}
