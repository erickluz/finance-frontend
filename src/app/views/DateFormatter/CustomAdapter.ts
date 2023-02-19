import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { NgbDateStruct, NgbDateParserFormatter, NgbDateAdapter  } from '@ng-bootstrap/ng-bootstrap';
/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
	readonly DELIMITER = '/';

	fromModel(value: string | null): NgbDateStruct | null {
		if (value) {
			const date = value.toString().split(this.DELIMITER);
			return {
				day: parseInt(date[0], 10),
				month: parseInt(date[1], 10),
				year: parseInt(date[2], 10),
			};
		}
		return null;
	}

  handleDayMomth(number: number) : string  {
    return (number < 10) ? '0' + number : number.toString();
  }

	toModel(date: NgbDateStruct | null): string | null {
		return date ? this.handleDayMomth(date.day) + this.DELIMITER + this.handleDayMomth(date.month) + this.DELIMITER + date.year : null;
	}

}
