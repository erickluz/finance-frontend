import { SpendingCheckAssociation } from './spending.check.association.model'

export class SpendingCheckAssociations {
  spendingCheckAssociation: SpendingCheckAssociation[]

  constructor(spendingCheckAssociation: SpendingCheckAssociation[]) {
    this.spendingCheckAssociation = spendingCheckAssociation;
  }

}
