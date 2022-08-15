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
  chartOptions: Highcharts.Options = {
    chart: {
      plotShadow: false,
      type: 'pie',
    },

    title: {
      text: 'Number of CV pased in review CV',
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
    this.commonService.getSucessStep1().subscribe((response: any) => {
      console.log();
      this.chartOptions.series = [
        {
          name: 'Applications in CV',
          type: 'pie',
          data: [
            { name: 'Cv pased', y: response.data.resultPass, color: '#36CA68' },
            { name: 'Total cv received', y: response.data.total },
          ],
        },
      ];
      this.updateFlag = true;
    });
  }
}
