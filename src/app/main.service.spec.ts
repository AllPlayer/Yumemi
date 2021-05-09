import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MainService } from './main.service';
import {of} from 'rxjs';

describe('MainService', () => {
  let mainService: MainService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    mainService = new MainService(httpClientSpy as any);
  });

  it('should return expected prefectures', () => {
    const data = {message: null, result: [{prefCode: 1, prefName : '北海道'}]};
    httpClientSpy.get.and.returnValue(of(data));
    mainService.prefectureApi().then(
      (res: any) => {
        expect(res.result.length).toBeGreaterThan(0, 'expected prefectures');
        console.log(res);
      },
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return expected prefecture details', () => {
    const data = {
      message: null,
      result: {
        boundaryYear: 2015,
        data:
        [
          {
            label: '総人口',
            data: [
              {
                  year: 1960,
                  value: 5039206
              },
              {
                  year: 1965,
                  value: 5171800
              },
              {
                  year: 1970,
                  value: 5184287
              },
            ]
          }
        ]
      }
    };
    httpClientSpy.get.and.returnValue(of(data));
    mainService.populationByPrefectureApi(1).then(
      (res: any) => {
        expect(res.data.length).toBeGreaterThan(0, 'expected prefectures details');
        console.log(res);
      },
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should be created', () => {
    expect(mainService).toBeTruthy();
  });

});
