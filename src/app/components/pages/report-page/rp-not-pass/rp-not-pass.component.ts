import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-rp-not-pass',
  templateUrl: './rp-not-pass.component.html',
  styleUrls: ['./rp-not-pass.component.scss'],
})
export class RpNotPassComponent implements OnInit {
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
      text: 'Applications failed in recruitment process',
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
    this.commonService.getRpNotPass().subscribe((response: any) => {
      console.log();
      this.chartOptions.series = [
        {
          name: 'Applications failed',
          type: 'pie',
          data: [
            {
              name: 'Applications failed in cv review',
              y: response.data[0].quantity,
            },
            {
              name: 'Applications failed in interview',
              y: response.data[1].quantity,
            },
            {
              name: 'Applications failed in offer',
              y: response.data[2].quantity,
            },
            {
              name: 'Applications failed in onboard',
              y: response.data[3].quantity,
            },
          ],
        },
      ];
      this.updateFlag = true;
      this.isLoaded=true
    });
  }
}
