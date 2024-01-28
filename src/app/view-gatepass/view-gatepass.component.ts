import { Component } from '@angular/core';
import { GatePass } from '../models/GatePass';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-view-gatepass',
  templateUrl: './view-gatepass.component.html',
  styleUrls: ['./view-gatepass.component.css']
})
export class ViewGatepassComponent {

  entries : GatePass[] = [ {vehicleNumber: "vdhckj", transporterName: "Sakshi", timeEntered: "vcdcj456",
   timeLeft:  "csjcg", partyName:  "vdjghc", items: "cchj",manager: "dk", billNumber: "46553", po: "yugs46546"}, 
                          { vehicleNumber: "vdhckj", transporterName: "Bhavit", timeEntered: "vcdcj456",
                          timeLeft:  "csjcg", partyName:  "vdjghc", items: "cchj",
                          manager: "dk", billNumber: "46553", po: "bkdhci5654+"}
                        ];

  currentElementToView: any;
  displayStyle = 'none'

  constructor(private route:ActivatedRoute,  private router: Router) { }

  ngOnInit() {
    console.log(this.entries);
  }

  viewGatePass(gatepass: any){
    this.currentElementToView = gatepass;
    this.displayStyle = "block"
  }

  closeGatePass(){
    this.displayStyle = 'none'
  }
}
