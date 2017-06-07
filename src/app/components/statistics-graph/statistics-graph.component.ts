import {Component, Input, OnInit} from "@angular/core";
import {DatePipe} from "@angular/common";
import {LogCount} from "../../model/logCount";
/**
 * Created by nadya on 8/05/2017.
 */

@Component({
  selector: 'statistics-graph',
  templateUrl: 'statistics-graph.component.html',
  styleUrls: ['statistics-graph.component.css']
})
export class StatisticsGraphComponent implements OnInit {
  @Input() userLogs:LogCount;
  data: any;
  lables: string [] = [];

  constructor(public datepipe: DatePipe) {
  }
  ngOnInit() {
  }

  ngOnChanges()
  {
    this.getData();
    this.data = {
      labels: this.lables,
      datasets: [
        {
          label: 'Times detected',
          backgroundColor: '#00897b',
          borderColor: '#39796b',
          data: this.userLogs.statistics
        }
      ]
    }
  }

  private getData()
  {
    if(this.userLogs != null)
    {
      for (let i = 0; i < this.userLogs.statistics.length; i++)
      {
        this.lables.push(this.datepipe.transform(this.userLogs.timespan[i], 'dd/MM/yyyy'));
      }
    }
  }
}
