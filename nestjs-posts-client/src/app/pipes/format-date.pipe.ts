import { Pipe, PipeTransform } from '@angular/core';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

@Pipe({name: 'formatDate'})
export class FormatDate implements PipeTransform {

    transform(isoString: string): string {
        let now = new Date();
        let nowUTC = new Date(now.getUTCFullYear(),
                                now.getUTCMonth(),
                                now.getUTCDate(),
                                now.getUTCHours(),
                                now.getUTCMinutes(),
                                now.getUTCSeconds()
                                );
        let value = new Date(isoString);
        let valueUTC = new Date(value.getUTCFullYear(),
                                value.getUTCMonth(),
                                value.getUTCDate(),
                                value.getUTCHours(),
                                value.getUTCMinutes(),
                                value.getUTCSeconds()
                                );
        if (nowUTC.getDate() == valueUTC.getDate()) {
            let hour = valueUTC.getHours() < 12 ? valueUTC.getHours() : valueUTC.getHours() - 12;
            let meridian = valueUTC.getHours() < 12 ? 'AM' : 'PM';
            return `${("0" + hour).slice(-2)}:${("0" + valueUTC.getMinutes()).slice(-2)} ${meridian}`;
        } else if (nowUTC.getDate() == valueUTC.getDate() + 1) {
            return 'Yesterday';
        } else {
            return `${monthNames[valueUTC.getMonth()]} ${("0" + valueUTC.getDate()).slice(-2)}`;
        }  
    }
}