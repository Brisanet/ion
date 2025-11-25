import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { BadgeType } from '../core/types/badge';

@Component({
    selector: 'ion-badge',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './badge.component.html',
    styleUrls: ['./badge.component.scss'],
})
export class IonBadgeComponent {
    label = input<string>();
    value = input<number>();
    type = input.required<BadgeType>();

    public valueInBadge = computed(() => {
        const currentValue = this.value();
        return this.exists(currentValue) ? this.limitValue(currentValue!) : this.label() || '';
    });

    private exists(value: number | undefined): boolean {
        return value !== null && value !== undefined && !isNaN(value);
    }

    private limitValue(value: number): string {
        const maxValue = 99;
        if (value > maxValue) {
            return `${maxValue}+`;
        }
        return value.toString();
    }
}
