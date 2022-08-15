import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-report-step1',
  templateUrl: './report-step1.component.html',
  styleUrls: ['./report-step1.component.scss'],
})
export class ReportStep1Component implements OnInit {
  updateFlag = false;
  highcharts = Highcharts;
  isLoaded=false
  chartOptions: Highcharts.Options = {
    chart: {
      plotShadow: false,
      type: 'pie',
      width: 450,
      height: 350,
    },

    title: {
      text: 'Applications in CV review',
      style: {
        fontFamily: 'Poppins',
        fontWeight: '600',
      },
    },

    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          connectorColor: 'silver',
        },
      },
    },
    series: [],
  };

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.isLoaded=false
    this.commonService.getSucessStep1().subscribe((response: any) => {
 
      this.chartOptions.series = [
        {
          name: 'Applications',
          type: 'pie',
          data: [
            { name: 'Application pased', y: response.data.resultPass },
            { name: 'Application failed', y: response.data.resultNotPass },
            { name: 'Others', y: response.data.chuaTH },
          ],
        },
      ];
      this.updateFlag = true;
      this.isLoaded=true
    });
  }
}
