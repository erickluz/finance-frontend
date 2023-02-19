import { NgbDateStruct, NgbDateParserFormatter, NgbDateAdapter  } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
	readonly DELIMITER = '/';

	parse(value: string): NgbDateStruct | null {
		if (value) {
			const date = value.split(this.DELIMITER);
			return {
				day: parseInt(date[0], 10),
				month: parseInt(date[1], 10),
				year: parseInt(date[2], 10),
			};
		}
		return null;
	}

  handleDayMonth(number: number) : string  {
    return (number < 10) ? '0' + number : number.toString();
  }

	format(date: NgbDateStruct | null): string {
		return date ? this.handleDayMonth(date.day) + this.DELIMITER + this.handleDayMonth(date.month) + this.DELIMITER + date.year : '';
	}
}
