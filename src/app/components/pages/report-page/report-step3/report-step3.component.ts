import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-report-step3',
  templateUrl: './report-step3.component.html',
  styleUrls: ['./report-step3.component.scss'],
})
export class ReportStep3Component implements OnInit {
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
      text: 'Applications in interview',
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
    this.commonService.getInStep3().subscribe((response: any) => {
   
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
