import { IonThemeService } from './../theme/theme.service';
import { EventEmitter } from '@angular/core';

import { CurrencyPipeStrategy } from '../../core/pipes/currency.pipe';
import { DatePipeStrategy } from '../../core/pipes/date.pipe';
import { PipeApplicator, PipeStrategy } from '../../core/pipes/pipe-strategy';
import { ReplaceEmptyPipeStrategy } from '../../core/pipes/replace-empty.pipe';
import {
  CheckBoxEvent,
  CheckBoxStates,
  PageEvent,
  StateChange,
} from '../core/types';
import { ActionTable, BaseRow, Column, ConfigTable } from '../table/utilsTable';

export const DISABLED_COLOR = 'var(--ion-neutral-4)';
export const ENABLED_COLOR = 'var(--ion-primary-6)';

export const DARK_DISABLED_COLOR = 'var(--ion-neutral-3)';
export const DARK_ENABLED_COLOR = 'var(--ion-primary-3)';

export abstract class BaseTable<
  RowType extends BaseRow,
  ConfigType extends ConfigTable<RowType>,
  EventType
> {
  public config: ConfigType;
  public events: EventEmitter<EventType>;
  public mainCheckBoxState: CheckBoxStates = 'enabled';

  protected abstract ionThemeService: IonThemeService;

  public abstract sort(column: Column): void;

  public abstract paginationEvents(event: PageEvent): void;

  public abstract emitRowsSelected(): void;
  public checkState(): void {
    if (this.mainCheckBoxState === CheckBoxEvent.indeterminate) {
      this.uncheckAllRows();
      return;
    }
    this.toggleAllRows();
  }

  public uncheckAllRows(): void {
    this.config.data.forEach((row) => (row.selected = false));
    this.setMainCheckboxState('enabled');
  }

  public checkRow(row: RowType): void {
    row.selected = !row.selected;

    this.updateMainCheckboxState();

    this.emitRowsSelected();
  }

  public toggleAllRows(): void {
    this.selectAllLike(!this.hasRowSelected());
    this.emitRowsSelected();
  }

  public hasRowSelected(): boolean {
    return this.getRowsSelected().length > 0;
  }

  public isAllRowsSelected(): boolean {
    return this.getRowsSelected().length === this.config.data.length;
  }

  public getRowsSelected(): RowType[] {
    return this.config.data.filter((rowInData: RowType) => rowInData.selected);
  }

  public fillColor(column: Column, upArrow: boolean): string {
    const isDarkTheme = this.ionThemeService.theme.key === 'dark';
    if (column.desc === null || column.desc === undefined) {
      return isDarkTheme ? DARK_DISABLED_COLOR : DISABLED_COLOR;
    }

    return upArrow
      ? this.fillArrow(column, 'up')
      : this.fillArrow(column, 'down');
  }

  public fillArrow(column: Column, direction: string): string {
    const isDarkTheme = this.ionThemeService.theme.key === 'dark';

    const themeMap = {
      up: {
        dark: column.desc ? DARK_DISABLED_COLOR : DARK_ENABLED_COLOR,
        light: column.desc ? DISABLED_COLOR : ENABLED_COLOR,
      },
      down: {
        dark: column.desc ? DARK_ENABLED_COLOR : DARK_DISABLED_COLOR,
        light: column.desc ? ENABLED_COLOR : DISABLED_COLOR,
      },
    };

    return isDarkTheme ? themeMap[direction].dark : themeMap[direction].light;
  }

  public handleEvent(row: RowType, action: (row: RowType) => void): void {
    if (action) {
      action(row);
    }
  }

  public showAction(row: RowType, action: ActionTable<RowType>): boolean {
    return action.show(row);
  }

  public disableAction(row: RowType, action: ActionTable<RowType>): boolean {
    return action.disabled(row);
  }

  public applyPipes(config: ConfigType): void {
    this.config = config;
    this.config.columns.forEach((column) => {
      if (column.pipe) {
        const strategy = this.getPipeStrategy(column.pipe.apply);

        this.config.data.forEach((row) => {
          const rowValue = row[column.key];
          row[column.key] = this.applyPipe(
            rowValue,
            column.pipe.format,
            strategy
          );
        });
      }
    });
  }

  private updateMainCheckboxState(): void {
    if (this.isAllRowsSelected()) {
      this.setMainCheckboxState('checked');
      return;
    }

    if (this.hasRowSelected()) {
      this.setMainCheckboxState('indeterminate');
      return;
    }

    this.setMainCheckboxState('enabled');
  }

  private getPipeStrategy(pipeType: string): PipeStrategy {
    switch (pipeType) {
      case 'date':
        return new DatePipeStrategy();
      case 'currency':
        return new CurrencyPipeStrategy();
      default:
        return new ReplaceEmptyPipeStrategy();
    }
  }

  private applyPipe(
    value: string | number,
    format: string,
    strategy: PipeStrategy
  ): string {
    const applicator = new PipeApplicator(strategy);
    return applicator.apply(value, format);
  }

  private setMainCheckboxState(state: CheckBoxStates): void {
    this.mainCheckBoxState = state;
  }

  private selectAllLike(selected: boolean): void {
    this.config.data.forEach((row) => {
      row.selected = selected;
    });

    this.setMainCheckboxState(
      StateChange[this.mainCheckBoxState] as CheckBoxStates
    );
  }
}
