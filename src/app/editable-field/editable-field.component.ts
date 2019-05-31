import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { observable } from 'mobx-angular';

interface SelectOptions {
  name: string,
  value: string
}

@Component({
  selector: 'editable-field',
  templateUrl: './editable-field.component.html',
  styleUrls: ['./editable-field.component.sass']
})
export class EditableFieldComponent implements OnInit {
  @Input('input-type') inputType$: string;
  @Input('value') value$: string; 
  @Input('select-options') selectOptions$: SelectOptions[];
  @Input('textarea-rows') textareaRows$: number = 3;
  
  @observable isEditMode$: boolean = false;
  @observable displayedValue$: string;
  
  @ViewChild('input') inputRef: ElementRef;

  constructor() { }

  onClick() { 
    this.isEditMode$ = true
  }

  ngOnChanges() {
    if (this.value$) {
      if (this.inputType$ === 'select') {
        this.displayedValue$ = this.selectOptions$.find(o => o.value == this.value$).name
      } else {
        this.displayedValue$ = this.value$
      }
    }
  }

  ngOnInit() {
  }
  
  getValue() {
    console.log('Field value:', this.inputRef.nativeElement.value)
    return this.inputRef.nativeElement.value
  }

}
