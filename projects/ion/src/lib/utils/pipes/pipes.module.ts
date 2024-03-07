import { NgModule } from '@angular/core';
import { ReplaceEmptyPipe } from './replace-empty';
import { EllipsisPipe } from './ellipsis/ellipsis.pipe';

@NgModule({
  declarations: [ReplaceEmptyPipe, EllipsisPipe],
  exports: [ReplaceEmptyPipe, EllipsisPipe],
  providers: [ReplaceEmptyPipe, EllipsisPipe],
})
export class PipesModule {}
