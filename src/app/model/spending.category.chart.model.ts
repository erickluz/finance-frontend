import { ItemCategory } from "./item.category.chart.model";

export class SpendingCategory {
  itens: ItemCategory[]
  constructor(itens: ItemCategory[]) {
    this.itens = itens
  }
}
