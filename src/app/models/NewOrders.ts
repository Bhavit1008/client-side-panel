export class NewOrders {
  id: string;
  productCategory: string;
  partyName: string;
  deliveryCity: string;
  productCode: string;
  productDescription: string;
  size: string;
  quantity: string;
  quality: string;
  polish: string;
  shape: string;
  deliveryDate: string;
  color: string;
  creationDate: string;
  primaryManager: string;
  secondaryManager: string;

  constructor(
    id: string,
    productCategory: string,
    partyName: string,
    deliveryCity: string,
    productCode: string,
    productDescription: string,
    size: string,
    quantity: string,
    quality: string,
    polish: string,
    shape: string,
    deliveryDate: string,
    color: string,
    creationDate: string,
    primaryManager: string,
    secondaryManager: string
  ) {
    this.id = id;
    this.productCategory = productCategory;
    this.partyName = partyName;
    this.deliveryCity = deliveryCity;
    this.productCode = productCode;
    this.productDescription = productDescription;
    this.size = size;
    this.quantity = quantity;
    this.quality = quality;
    this.polish = polish;
    this.shape = shape;
    this.deliveryDate = deliveryDate;
    this.color = color;
    this.creationDate = creationDate;
    this.primaryManager = primaryManager;
    this.secondaryManager = secondaryManager;
  }
}
