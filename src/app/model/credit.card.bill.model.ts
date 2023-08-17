export class CreditCardBill {
  id : string;
  dueDate : string;
  uploadFileDate : string;
  idCard : string

  constructor(id: string, dueDate: string, uploadFileDate: string, idCard: string) {
    this.id = id;
    this.dueDate = dueDate;
    this.uploadFileDate = uploadFileDate;
    this.idCard = idCard;
  }
}
