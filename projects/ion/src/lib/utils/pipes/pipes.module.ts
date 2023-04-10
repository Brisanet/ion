import { NgModule } from '@angular/core';
import { ReplaceEmptyPipe } from './replace-empty';

@NgModule({
  declarations: [ReplaceEmptyPipe],
  exports: [ReplaceEmptyPipe],
  providers: [ReplaceEmptyPipe],
})
export class PipesModule {}
