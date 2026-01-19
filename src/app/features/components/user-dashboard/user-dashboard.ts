import { Component } from '@angular/core';
import Highcharts from 'highcharts';
import { HighchartsChartComponent } from 'highcharts-angular';

@Component({
  selector: 'app-user-dashboard',
  imports: [HighchartsChartComponent],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css',
})
export class UserDashboard {
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    chart: { type: 'column' },
    title: { text: '' },
    legend: {
      layout: 'horizontal',
      align: 'left',
      verticalAlign: 'bottom',
    },
    xAxis: { categories: ['View', 'Create', 'Edit', 'Delete'] },
    series: [{ type: 'column', name: 'Admin', data: [10, 8, 6, 4], color: '#08cdbd' }],
  };
  chartOptionsPie: Highcharts.Options = {
    chart: {
      type: 'pie',
      zooming: {
        type: 'xy',
      },
      panning: {
        enabled: true,
        type: 'xy',
      },
      panKey: 'shift',
    },

    title: {
      text: '',
    },

    subtitle: {
      text: '',
      useHTML: true,
    },

    tooltip: {
      valueSuffix: '%',
    },

    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: [
          {
            enabled: true,
            distance: 20,
          },
          {
            enabled: true,
            distance: -40,
            format: '{point.percentage:.1f}%',
            style: {
              fontSize: '1.2em',
              textOutline: 'none',
              opacity: 0.7,
            },
            filter: {
              operator: '>',
              property: 'percentage',
              value: 10,
            },
          },
        ],
      },
    },

    series: [
      {
        type: 'pie',
        name: 'Percentage',
        data: [
          { name: 'Super Admin', y: 55.02, color: '#08cdbd' },
          { name: 'Admin', y: 26.71, color: '#f18e50' },
          { name: 'Staff', y: 1.09, color: '#eb49aa' },
        ],
      },
    ],
  };
}
