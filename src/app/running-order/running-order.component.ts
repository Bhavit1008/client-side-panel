import { Component, Input } from '@angular/core';
import { RunningOrder } from '../models/RunningOrder';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common'
import { map } from 'rxjs';

@Component({
  selector: 'app-running-order',
  templateUrl: './running-order.component.html',
  styleUrls: ['./running-order.component.css']
})
export class RunningOrderComponent {
  @Input() confirmedOrderDetails: any;
  model = new RunningOrder('','','','','','','','','','');
  status = [
    { id: 1, label: "Recieved" },
    { id: 2, label: "Processing" },
    { id: 3, label: "Completed"}
]
  data: any;
  constructor(private route: ActivatedRoute){}
  ngOnInit() {
    this.route.paramMap
      .pipe(map(() => window.history.state))
      .subscribe(data => {
        console.log('data', data);
        this.data = data;
    });

    console.log('data from previous page:: ',this.data)
  }
 
  onSubmit(data: any){

  }
}
