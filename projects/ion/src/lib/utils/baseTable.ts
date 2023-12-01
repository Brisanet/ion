import { EventEmitter } from '@angular/core';

import { CurrencyPipeStrategy } from '../../core/pipes/currency.pipe';
import { DatePipeStrategy } from '../../core/pipes/date.pipe';
import { PipeStrategy, PipeApplicator } from '../../core/pipes/pipe-strategy';
import { ReplaceEmptyPipeStrategy } from '../../core/pipes/replace-empty.pipe';
import { CheckBoxStates, PageEvent } from '../core/types';
import { BaseRow, ConfigTable, Column, ActionTable } from '../table/utilsTable';

const stateChange = {
  checked: 'enabled',
  enabled: 'checked',
};

export abstract class BaseTable<
  RowType extends BaseRow,
  ConfigType extends ConfigTable<RowType>,
  EventType
> {
  public config: ConfigType;
  public events: EventEmitter<EventType>;
  public mainCheckBoxState: CheckBoxStates = 'enabled';

  private disabledArrowColor = '#CED2DB';
  private enabledArrowColor = '#0858CE';

  public abstract sort(column: Column): void;

  public abstract paginationEvents(event: PageEvent): void;

  public abstract emitRowsSelected(): void;

  public checkState(): void {
    if (this.mainCheckBoxState === 'indeterminate') {
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

    if (this.isAllRowsSelected()) {
      this.setMainCheckboxState('checked');
    } else if (this.hasRowSelected()) {
      this.setMainCheckboxState('indeterminate');
    } else {
      this.setMainCheckboxState('enabled');
    }

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
    if (column.desc === null || column.desc === undefined) {
      return this.disabledArrowColor;
    }

    return upArrow
      ? this.fillColorArrowUp(column)
      : this.fillColorArrowDown(column);
  }

  public fillColorArrowUp(column: Column): string {
    return column.desc ? this.disabledArrowColor : this.enabledArrowColor;
  }

  public fillColorArrowDown(column: Column): string {
    return column.desc ? this.enabledArrowColor : this.disabledArrowColor;
  }

  public handleEvent(row: RowType, action: ActionTable<RowType>): void {
    if (action.call) {
      action.call(row);
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

    this.setMainCheckboxState(stateChange[this.mainCheckBoxState]);
  }
}
