import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MainService } from './main.service';
import * as Highcharts from 'highcharts';
import { Chart } from 'angular-highcharts';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { Selected } from './selectedPrefectures';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit {
  title = 'yumemi-task';
  form: FormGroup;
  prefectures: any = [];
  selected: Selected[] = [];
  public chart: Chart = new Chart();
  public highChartsOptions: Highcharts.Options = {};

  constructor( private mainService: MainService, private formBuilder: FormBuilder ) {
    this.form = this.formBuilder.group({
      checked: this.formBuilder.array([], [Validators.required])
    });
  }

  ngOnInit(): void {
    this.mainService
        .prefectureApi()
        .then(
          data => {
              this.prefectures = data.result;
          },
          err => console.log(err));
  }

  ngAfterViewInit(): void {
    this.loadChart(this.selected);
    this.chart = new Chart(this.highChartsOptions);
  }

  loadChart(data: any): any{
    this.highChartsOptions = {
      chart: { type: 'line' },
      title: { text: '' },
      plotOptions: { series: { dataLabels: { enabled: true } } },
      xAxis: {
        categories: [ '1960', '1965', '1970', '1975', '1980', '1985', '1990', '1995', '2000', '2005',
              '2010', '2015', '2020', '2025', '2030', '2035', '2040', '2045', '2050'],
        title: {
          text: '<b>Years</b>',
          align: 'high'
        }
      },
      yAxis: {
        title: {
          text: '<b>Population Count</b>',
          align: 'middle'
        }
      },
      series: data
    };
  }

  onCheckboxChange(e: any): any {
    const checked: FormArray = this.form.get('checked') as FormArray;
    if (e.target.checked) {
      checked.push(new FormControl(e.target.value));
      this.mainService
        .populationByPrefectureApi(e.target.value)
        .then(
          (data: any) => {
            this.selected.push(Object.assign(this.prefectures.find( (record: any) => record.prefCode === Number(e.target.value)), data));
            this.chart = new Chart(this.highChartsOptions);
          },
          (err: any) => console.log(err));
    } else {
       const index = checked.controls.findIndex(x => x.value === e.target.value);
       checked.removeAt(index);
       this.selected = this.remove(this.selected, this.selected.find( (record: any) => record.prefCode === Number(e.target.value)));
       this.chart = new Chart(this.highChartsOptions);
    }
  }

  remove(array: any, n: any): any
  {
    const index = array.indexOf(n);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  }
}
