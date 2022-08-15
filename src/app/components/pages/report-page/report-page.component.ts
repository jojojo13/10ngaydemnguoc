import { CommonService } from './../../../services/common.service';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss'],
})
export class ReportPageComponent implements OnInit {
  route = { name: 'View report', link: 'ungvien' };
  updateFlag = false;
  highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
    },

    title: {
      text: 'Number of candidates',
      style: {
        fontFamily: 'Poppins',
        fontWeight: '600',
      },
    },
    subtitle: {
      text: '2021-2022',
      style: {
        fontWeight: '600',
      },
    },
    xAxis: {
      title: {
        text: 'Month',
        style: {
          fontFamily: 'Poppins',
          fontWeight: '600',
        },
      },
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      labels: {
        style: {
          fontFamily: 'Poppins',
          fontWeight: '600',
        },
      },
    },
    yAxis: {
      title: {
        text: 'Candidate',
        style: {
          fontFamily: 'Poppins',
          fontWeight: '600',
        },
      },

      labels: {
        style: {
          fontFamily: 'Poppins',
          fontWeight: '600',
        },
      },
    },
    series: [],
  };

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    let seriData1: any;
    let seriData2: any;
    this.commonService.getReportByYear(2022).subscribe((responese: any) => {
      seriData1 = responese.data.map((item: any) => {
        return item.quantity;
      });
      this.commonService.getReportByYear(2021).subscribe((responese: any) => {
        seriData2 = responese.data.map((item: any) => {
          return item.quantity;
        });
        this.chartOptions.series = [
          {
            name: '2022',
            type: 'column',
            data: seriData1,
          },
          {
            name: '2021',
            type: 'column',
            data: seriData2,
          },
        ];
        this.updateFlag = true;
      });
    });
  }
}
