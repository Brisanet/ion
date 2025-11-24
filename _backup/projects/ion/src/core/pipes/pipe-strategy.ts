export interface PipeStrategy {
  transform(value: string | number, format?: string): string;
}

export class PipeApplicator {
  private strategy: PipeStrategy;

  constructor(strategy: PipeStrategy) {
    this.strategy = strategy;
  }

  apply(value: string | number, format?: string): string {
    return this.strategy.transform(value, format);
  }
}
