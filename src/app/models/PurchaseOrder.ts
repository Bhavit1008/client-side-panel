export class PurchaseOrder {
    vehicleNumber: string;
    transporterName: string;
    timeEntered: string;
    timeLeft: string
    partyName: string;
    items: string;
    manager: string;
    billNumber?: string
    poId?: string

    constructor(
        vehicleNumber: string,
        transporterName: string,
        timeEntered: string,
        timeLeft: string,
        partyName: string,
        items: string,
        manager: string,
        billNumber?: string,
        poId?: string
    ) {
      this.vehicleNumber = vehicleNumber;
      this.transporterName = transporterName;
      this.timeEntered = timeEntered;
      this.timeLeft = timeLeft;
      this.partyName = partyName;
      this.items = items;
      this.manager = manager;
      this.billNumber = billNumber ;
      this.poId = poId   
    }
  }
  