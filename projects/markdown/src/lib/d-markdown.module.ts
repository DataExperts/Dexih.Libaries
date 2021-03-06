import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DMarkdownComponent } from './d-markdown.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
      ],
    exports: [
      DMarkdownComponent,
    ],
    declarations: [
      DMarkdownComponent    
    ],
    // entryComponents: [
    //   DMarkdownComponent    
    // ]
})
export class DMarkdownModule { }
