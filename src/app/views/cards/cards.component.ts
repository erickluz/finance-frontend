import { Component, OnInit } from '@angular/core';
import { Card } from '../../model/card.modal'
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { CardService } from '../card.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  visible = false;
  errorMessage: string = '';
  idCardDelete : number = 0;
  cards : Card [] = [];
  card : Card = new Card("", "", "", "", "", "", false, true);
  public formCard : FormGroup = this.formBuilder.group({
    id: [this.card.id],
    brand: [this.card.brand],
    finalNumber: [this.card.finalNumber],
    issuer: [this.card.issuer],
    color: [this.card.color],
    type: [this.card.type],
    isChkByFile: [this.card.isChkByFile],
    isBudget: [this.card.isBudget]
  });
  public colors = [
    { color: 'primary', textColor: 'primary' },
    { color: 'secondary', textColor: 'secondary' },
    { color: 'success', textColor: 'success' },
    { color: 'danger', textColor: 'danger' },
    { color: 'warning', textColor: 'warning' },
    { color: 'info', textColor: 'info' },
    { color: 'light' },
    { color: 'dark' }
  ];
  public typeCards = [
    { id : '1', name : "VR"},
    { id : '2', name : "Débito"},
    { id : '3', name : "Cŕedito"}
  ]
  public visibleModalForm = false;
  public visibleModalDelete = false;

  constructor(private formBuilder: FormBuilder, private cardService: CardService) {}

  ngOnInit() {
    this.getCards();
  }

  getCards() {
    this.cardService.get()
    .subscribe({
      next: this.handleCardResponse.bind(this),
      error: this.handleError.bind(this)
    });
  }

  handleError(error: HttpErrorResponse) {
    console.log('erro')
    this.errorMessage = error.statusText;
    console.log(error.statusText)
    this.visible = !this.visible;
    console.log(this.visible)
  }

  handleCardResponse(cards: Card[]) {
    this.cards = cards;
    console.log(cards)
  }

  public toggleModalDelete(id: string) {
    if (id) {
      this.idCardDelete = +id;
    }
    this.visibleModalDelete = !this.visibleModalDelete;
  }

  toggleModal() {
    this.visibleModalForm = !this.visibleModalForm;
  }

  handleModalDelete(event: any) {
    this.visibleModalDelete = event;
  }

  public newCard() {
    this.card = new Card("", "", "", "", "", "", false, true);
  }

  public onSubmit() {
    console.log(this.formCard.value)
    this.cardService.post(this.formCard.value)
    .subscribe(() => {
      this.getCards();
    })
    this.formCard.reset();
  }

  handleLiveDemoChange(event: any) {
    this.visibleModalForm = event;
  }

  public getTypeCardName(id: string) : string {
    var name : string = "";
    this.typeCards.forEach(
      (typeCard) => {
        if (typeCard.id == id) {
          name = typeCard.name;
        }
      }
      );
    return name;
  }

  public deleteCard() {
    this.cardService.delete(this.idCardDelete).subscribe(
      () => {
        this.getCards();
      }
    );
  }

  public editCard(id: string) {
    this.cardService.findById(+id).subscribe(
      (card) => {
        this.card = card;
        this.createForm(card);
        this.visibleModalForm = true;
      }
    )
  }

  createForm(card: Card) {
    this.formCard = this.formBuilder.group({
      id: [card.id],
      brand: [card.brand],
      finalNumber: [card.finalNumber],
      issuer: [card.issuer],
      color: [card.color],
      type: [card.type],
      isChkByFile: [card.isChkByFile],
      isBudget: [card.isBudget]
    });
  }

}
