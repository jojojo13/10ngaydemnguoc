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
  chartOptions: Highcharts.Options = {
    chart: {
      plotShadow: false,
      type: 'pie',
    },

    title: {
      text: 'Number of applications joined interview meeting',
      style: {
        fontFamily: 'Poppins',
        fontWeight: '600',
      },
    },

    tooltip: {
      pointFormat: '{series.name}: <b>{point.y:.1f}</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.y:.1f} ',
          connectorColor: 'silver',
        },
      },
    },
    series: [],
  };

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.commonService.getInStep3().subscribe((response: any) => {
      console.log();
      this.chartOptions.series = [
        {
          name: 'Applications joined interview meeting',
          type: 'pie',
          data: [
            { name: 'Cv pased', y: response.data.resultPass, color: '#36CA68' },
            {
              name: 'Total applications scheduled for interviews ',
              y: response.data.total,
            },
          ],
        },
      ];
      this.updateFlag = true;
    });
  }
}
