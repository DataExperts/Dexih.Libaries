import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DMarkdownModule } from 'ngx-d-markdown';

import { DTableCellComponent } from './d-table-cell.component';
import { DTableComponent } from './d-table.component';
import { TableFilterPipe } from './table-filter.pipe';
import { DTagDropDownComponent} from './d-tag-dropdown.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    DragDropModule,
    DMarkdownModule
  ],
  declarations: [
    DTableComponent,
    DTableCellComponent,
    TableFilterPipe,
    DTagDropDownComponent
  ],
  exports: [
    DTableComponent
  ],
  providers: []
})
export class DTableModule {

}
