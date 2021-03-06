# ngx-d-table

ngx-d-table is an Angular (8+) component for building data driven tables.

[dex-img]: https://dataexpertsgroup.com/assets/img/dex_web_logo.png
[dex]: https://dataexpertsgroup.com

[![][dex-img]][dex]

[d-table-demo]: ./assets/d-table-demo-1.gif

[![npm version](https://badge.fury.io/js/ngx-d-table.svg)](https://www.npmjs.com/package/ngx-d-table)
[![Build Status](https://travis-ci.org/DataExperts/ngx-d-table.svg?branch=master)](https://travis-ci.org/DataExperts/ngx-d-table)

## Features

* Global Search/Filtering.
* Column sorting (ascending/descending)
* Custom column formatting (such as string, numeric, date, code etc.)
* Row single/multi selection with dynamic/hidden button selection.
* Multiple template sections for customization.
* Drag and drop re-ordering.
* Save to csv file.
* Switch between card view/table view.
* Automatic Paging.

## Demo

A demo site for the table control is available here:

https://dataexperts.github.io/Dexih.Libraries/demo/table

## Releases Summary

version 0.6.27
breaking: component name changed from dexih-table to d-table.

version 0.6.30
- fixed vertical scroll bar on firefox when setting enableResponsive=true

[Older release information](releases.md)

## Installation

To install this library, run:

```bash
$ npm install ngx-d-table ngx-d-markdown --save
```

Ensure that the angular component dev kit (used for drag/drop functions) is installed:
```bash
npm install @angular/cdk --save
```

Ensure the `BrowserAnimationsModule` and `HttpClientModule` have been included in your app.module.ts.  

Here is a sample version:
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DTableModule } from 'ngx-d-table';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    DTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

You will need also need bootstrap styles included (4.x).  For example add this to your index.html header:

```xml
<!-- index.html -->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
```

> Note: jQuery, popper and the bootstrap.js files (which are usually required for Bootstrap 4.x) are not required for these controls to function.

## Example

Create an array of values containing the data:

```typescript
public sampleTable = [
  { cell1: 'r1 cell1', cell2: 'r1 cell2', cell3: 'r1 cell3'},
  { cell1: 'r2 cell1', cell2: 'r2 cell2', cell3: 'r2 cell3'},
  { cell1: 'r3 cell1', cell2: 'r3 cell2', cell3: 'r3 cell3'},
];
```

Populate this data into the table as follows:

```html
<d-table [data]="sampleTable">
</d-table>
```

## Using the Table Component

From your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// ** Import the TableModule **
import { DTableModule } from 'ngx-d-table';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // ** Import the TableModule **
    DTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once the library is imported, you can use it as follows:

```xml
<!-- Use the d-table selector to add the table to a template -->
<d-table [data]="sampleTable">
</d-table>
```

## Populating the Table

Data can be populated on the table through a static array or observable array.

For static array use the `Data` property as follows:

```typescript
public sampleTable = [
  { cell1: 'r1 cell1', cell2: 'r1 cell2', cell3: 'r1 cell3'},
  { cell1: 'r2 cell1', cell2: 'r2 cell2', cell3: 'r2 cell3'},
  { cell1: 'r3 cell1', cell2: 'r3 cell2', cell3: 'r3 cell3'},
];
```

```html
<d-table [data]="sampleTable">
</d-table>
```


For an observable array use the `tableData` property as follows:

```typescript
private _tableData = new BehaviorSubject<Array<DataModel>>(null);
tableData: Observable<Array<DataModel>> = this._tableData.asObservable();

ngOnInit() {
  let date = new Date();

  let data = new Array<DataModel>();
  data.push(new DataModel(1, 'row3', new Date('2001-01-01'), date, true, 'code ...', 'tip 1', 'fa fa-spin fa-cog'));
  data.push(new DataModel(2, 'row2', new Date('2001-01-01'), date, true, 'code ...', 'tip 2', 'fa fa-spin fa-cog'));
  data.push(new DataModel(3, 'row1', new Date('2001-01-01'), date, true, 'code ...', 'tip 3', 'fa fa-spin fa-cog'));

  this._tableData.next(data);
}
```

```html
<d-table [tableData]="tableData">
</d-table>
```

## Formatting columns

Columns can be formatted in the table by passing an array of type `Column` to the table component through the `columns` property.  If the `columns` property is not provided the columns will be the names of each property in in the data row.

The columns array can be constructed in your component as follows:

```typescript
import { DexihTableModule, Column }  from 'ngx-d-table';

...

columns = [
  <Column> { title: 'Icon', iconClass: 'icon', tooltip: 'toolTip', width: '1%', align: 'center' },
  <Column> { name: 'intValue', title: 'Int Value', format: '' },
  <Column> { name: 'stringValue', title: 'String Value', format: '' },
  <Column> { name: 'dateValue', title: 'Date Value', format: 'Date' },
  <Column> { name: 'timeValue', title: 'Time Value', format: 'Time' },
  <Column> { name: 'boolValue', title: 'Bool Value', format: 'Boolean' },
  <Column> { name: 'codeValue', title: 'Code Value', format: 'Code' },
];
```

Then add the columns property to the table definition:
```html
<d-table [data]="sampleTable" [columns]="columns">
</d-table>
```

The following properties can be hard coded in the column settings an apply to all rows:
- `title` - the title to place in the table header.
- `format` - if empty no formatting is done.  Otherwise use:
  - `Date` - formats as local date.
  - `Time` - formats as local time.
  - `DateTime` - formats as local date & time.
  - `Countdown` - runs a countdown timer to a future date/time.
  - `Boolean` - formats as a checkbox.
  - `Code` - formats code.
  - `Json` - formats and color codes json.
  - `Html` - renders a html snippet.
  - `Md` - renders markdown format.
  - 'CharArray' - formats an array of chars as a single string (i.e. ['a', 'b', 'c'] formatted as 'abc')
- `width` - the width to apply to the table column (e.g. 10%, 100px).
- `tags` - a pointer to an array of tags.  Tags are an array containing properties name/color (i.e. [{color: 'blue', name: 'blue'}, {color: 'red', name: 'red'}, ])
- `align` (`left`, `centre`, `right`) - the text alignment for the column.

The following properties reference an property in the data row and are defined on a row by row basis:
- `name` - value to populate the cell (this can be html formatted).
- `header` - value to place in "small" characters above the name.
- `footer` - value to place in "small" characters under the name.
- `toolTip` - value to use as a tooltip for the cell.
- `class` - value to use as a css class for the cell.
- `iconClass` - the data property to use as a icon (note: this will be placed before the `name`)

## Formatting the Table

Sorting properties:
- `enableSort` (`true` default, `false`) - Places a drop down at the top-right position of the table which allows column sorting selection.
- `enableManualSort` (`true`, `false` -  Adds a manual sort option, which when selected adds a dragable cell, which can be used to re-order rows.
- `sortColumn` - Default column name to sort by.

Search/Filter
- `enableFilter` (`true` default, `false`) - Adds a search box at the top-right position of the table.

Enabling item selection properties:
- `enableMultiSelect` (`true`, `false` default) - places a checkbox in the first column which can be used to select one or more rows.
- `selectedItems` - An array of the items to be pre-selected when the table is populated (note, `enableMultiSelect` must be `true`).
- `keyColumn` - The column property in the `Data` which is used to reference a selected item.
- `selectedKeyColumn` - The column property in the `selectedItems` which is used to reference the selected property (this is the `keyColumn` if not specified).

Saving as Csv file properties:
- `enableSaveCsv` (`true`, `false` default) - Adds a button to save the data to a local csv file.
- `csvFileName` (default `data.csv`) - Default name of the csv file.

Table styling:
- `tableClass` (default `table table-striped table-bordered table-hover`) - Css class to apply to the table;
- `enableStickyToolbar` (`true`, `false` default) - Enables the toolbar to stick to the top of the page when scrolling.
- `toolBarZIndex` - Sets the z-Index for the toolbar for when the toolbar gets hidden (or hides) other items on the page.
- `enableResponsive` (`true` default, `false`) - Enable bootstrap responsive table (suitable for mobile devices).

Customizing Cells
- `error` (null default) - If set, displays the specified error message at the top of the table.
- `heading` (null default) - If set, displays the specified heading message at the top of the table.
- `cdkDropList`  - Reference to a cdkDropList for the table.  A drop will trigger the `onDrop` event.  See [material](https://material.angular.io/cdk/drag-drop/examples) for documentation on drag/drop.

Action & Status Headings
- `rowStatusHeading` (Status default) - The heading for the rowStatus column.
- `actionHeading` (Action default) - The heading for the action column.

Pagination
- `enablePages` (true default) - Enables the paginator.
- `rowsPerPage` (100 default) - Sets the number of rows per page.

Tags
- `Tags` - An Array<Tag>.  Contains the possible tags for the table.  Example: [{color: 'blue', name: 'blue'}, {color:'ref', name: 'red'}].

The templates objects can be populated using `ng-template` tags within the `d-table` selection, as in the following sample:

```xml
<d-table 
    [enableMultiSelect]="true" 
    [columns]="columns" 
    [tableData]="tableData"
    rowStatusHeading="Row Status Heading"
    actionHeading="Action Heading"
    >

    <ng-template #actions let-items="items">
        <!-- items contains an array of selected items -->
        <button class="btn btn-primary" (click)="selectedItems(items)">any items</button>
    </ng-template>

    <ng-template #filter let-items="items">
        <!-- items contains an array of selected items -->
        <button class="btn btn-primary" (click)="selectedItems(items)">any items</button>
    </ng-template>

    <ng-template #rowAction select="rowAction" let-item="item">
        <!-- item contains the current row -->
        <button class="btn btn-primary" (click)="selectedItems(items)">selected items</button>
    </ng-template>

    <ng-template #rowStatus select="rowStatus" let-item="item">
        <!-- item contains the current row -->
        row status - {{status[item]}}
    </ng-template>

    <ng-template #selectedItemAction select="selectedItemAction" let-item="item">
        <!-- item contains the selected row -->
        <button class="btn btn-primary" (click)="selectedItem(item)">single item</button>
    </ng-template>

    <ng-template #selectedItemsAction select="selectedItemsAction" let-items="items">
        <!-- items contains an array of the selected items -->
        <button class="btn btn-primary" (click)="selectedItems(items)">selected items</button>
    </ng-template>

    <ng-template #cell select="cell" let-item="item" let-column="column" let-value="value">
        <!-- items contains an array of the selected items, the column references the column & value is the formatted cell value -->
        {{value}}
    </ng-template>

</d-table>
```

## Table Events

The following events can be used to response to table actions:

- `rowClick` (item containing row) - called when a row is clicked (excluding: checkbox, rowAction, rowStatus) column.
- `tagClick` (item containing tag) - called when a tag is clicked.
- `onSelectedChange` (item containing selected items) - called when a row selection changes.
- `onSortChanged` (array of sorted items) - called when a manual drag/drop sort is completed.
- `onDrop` (drop data) - called when data is dropped on the table.  Passes the event data from the cdkDropList event.

Events are used as follows in the `d-table` declaration:

```xml
<d-table 
    (rowClick)="selectedItem($event)"
    (onSelectedChange)="selectedItem($event)"
    (onSortChanged)="selectedItem($event)"
    >
</d-table>
```

Drag and drop can be used as follows:

```xml
<div cdkDropList [cdkDropListConnectedTo]="['tableDrop']" cdkDropListData="drop data">
    <div cdkDrag >
        <button class="btn btn-primary">
            drag this to table.
        </button>
    </div>
</div>

<d-table [dataObservable]="tableData" (onDrop)="dropped($event)" [enableSort]="true" [enableManualSort]="true" dropName="tableDrop" heading="droppable table">
 </d-table>
 ```
## Credits

**ngx-d-table** is open-source and maintained by the [Data Experts Group](https://dataexpertsgroup.com).  We feel that open-sourcing is the best way to engage with the community and provide great products moving forward.  Our company provides data management tools, so if you're looking to better manage your data, give us a look at [Data Experts Group](https://dataexpertsgroup.com).

Thanks to the other following projects:

* [Bootstrap](https://getbootstrap.com/docs/4.5/getting-started/introduction/) - Obviously the Bootstrap team.
* [ngx-md](https://github.com/dimpu/ngx-md) - Used for rendering markdown text.

## License

MIT © [Data Experts Group](mailto:gholland@dataexpertsgroup.com)
