export class GatePass {
    vehicleNumber: string;
    transporterName: string;
    timeEntered: string;
    timeLeft: string
    partyName: string;
    items: string;
    manager: string;
    billNumber?: string
    po?: string

    constructor(
        vehicleNumber: string,
        transporterName: string,
        timeEntered: string,
        timeLeft: string,
        partyName: string,
        items: string,
        manager: string,
        billNumber?: string,
        po?: string
    ) {
      this.vehicleNumber = vehicleNumber;
      this.transporterName = transporterName;
      this.timeEntered = timeEntered;
      this.timeLeft = timeLeft;
      this.partyName = partyName;
      this.items = items;
      this.manager = manager;
      this.billNumber = billNumber ;
      this.po = po   
    }
  }
  