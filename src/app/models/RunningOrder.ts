export class RunningOrder {
  id: string;
  productCategory: string;
  partyName: string;
  productCode: string;
  productDescription: string;
  size: string;
  quantity: string;
  dispatchedQuantity: string;
  leftQuantity: string;
  status: string;

  constructor(
    id: string,
    productCategory: string,
    partyName: string,
    productCode: string,
    productDescription: string,
    size: string,
    quantity: string,
    dispatchedQuantity: string,
    leftQuantity: string,
    status: string
  ) {
    this.id = id;
    this.productCategory = productCategory;
    this.partyName = partyName;
    this.productCode = productCode;
    this.productDescription = productDescription;
    this.size = size;
    this.quantity = quantity;
    this.dispatchedQuantity = dispatchedQuantity;
    this.leftQuantity = leftQuantity;
    this.status = status;
  }
}
