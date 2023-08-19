import { Pipe, PipeTransform } from '@angular/core';
import { Card } from 'src/app/model/card.modal';
import { Spending } from 'src/app/model/spending.model';
import { SpendingsComponent } from './spendings/spendings.component';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string | undefined): any[] | undefined {
    if (!items || items == undefined) return [];
    let list : any[] | undefined = items;
    if (searchText) {
      list = this.filterInputSearch(items, searchText);
    }
    if (SpendingsComponent.allCards) {
      list = this.filterSelectBudget(SpendingsComponent.filterBudget, list, SpendingsComponent.allCards);
    }
    return list;
  }

  private filterSelectBudget(filterBudget: string | undefined, list: Spending[] | undefined, cards: Card[]) {
    if (!list || list == null || list.length == 0 || list == undefined)
      return;
    list = list.filter(item => {
      return Object.keys(item).some(key => {
        let cardItem : Card = this.getCardItem(item, cards);
        let isFiltered = false;
        switch (filterBudget) {
          case "Only budget": {
            if (cardItem.isBudget) {
              isFiltered = true;
            }
            break;
          };
          case "No budget": {
            if (!cardItem.isBudget) {
              isFiltered = true;
            }
            break;
          };
          default: isFiltered = true;
        }
        return isFiltered;
      });
    });
    return list;
  }

  private getCardItem(spending : Spending, cards : Card[]) : Card {
    if (!spending.idCard)
      return new Card("", "", "", "", "", "", false, true);
    else
      return this.ensure<Card>(cards.find(elem => elem.id == spending.idCard));
  }

  private ensure<T>(argument: T | undefined | null, message: string = 'This value was promised to be there.'): T {
    if (argument === undefined || argument === null) {
      throw new TypeError(message);
    }

    return argument;
  }

  private filterInputSearch(items: any[], searchText: string): any[] {
    return items.filter(item => {
      return Object.keys(item).some(key => {
        return String(item[key]).toLowerCase().includes(searchText.toLowerCase());
      });
    });
  }
}
