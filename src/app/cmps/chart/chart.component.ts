import { Component, inject, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { BaseChartDirective } from 'ng2-charts';
import { Observable } from 'rxjs';
import { BitcoinService } from '../../services/bitcoin.service';
import { Point } from '../../models/point.model';


@Component({
  selector: 'chart',
  standalone: false,
  
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})

export class ChartComponent implements OnInit {

    title = 'ng2-charts-demo';

    bitcoinService = inject(BitcoinService)

    prices$: Observable<Point[]> = this.bitcoinService.getMarketPrice()
    prices: Point[] = []

    ngOnInit(): void {
      this.prices$.subscribe((prices) => {
        this.prices=prices
        console.log("prices", prices)
      })
    }
  
  
    public lineChartData: ChartConfiguration<'line'>['data'] = {
      datasets: [{
        data: this.prices
      }] 

    };
  public lineChartOptions: ChartOptions<'line'> = {
      aspectRatio: 3, 
      responsive: false,
      scales: {
            x: {
                type: 'linear',
                min: 1720000000,
                max: 1740000800
            },
            y: {
                type: 'category',
                min: 50000,
                max: 70000
            },
            pointlabel:{beginAtZero: false, suggestedMin:50000,suggestedMax:1740000800}
        }
    };
    public lineChartLegend = true;
  
    constructor() {
    }
  
  }
  