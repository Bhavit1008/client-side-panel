import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent {

  orderDetails: any;

  constructor(private route:ActivatedRoute,  private router: Router) { }

  ngOnInit() {
    var data = this.route.params.subscribe(params => {
      this.orderDetails = params
    });
    console.log(this.orderDetails);
  }

  backToGetOrder(){
    this.router.navigate(['/get-orders']);
  }


 
}
