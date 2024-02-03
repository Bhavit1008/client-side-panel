import { PurchaseOrder } from "./PurchaseOrder";

export class GatePass {

    id: string;
    purchaseOrders ?: PurchaseOrder[];

    constructor(id: string, purchaseOrders: PurchaseOrder[]){
        this.id = id;
        this.purchaseOrders = purchaseOrders
    }

}