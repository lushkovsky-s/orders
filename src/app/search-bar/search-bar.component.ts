import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { observable } from 'mobx-angular';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.sass']
})
export class SearchBarComponent implements OnInit {
  readonly FONT_SIZE: number = 16;
  readonly INITIAL_INPUT_PADDING: number = 15;

  @observable inputTags: string[] = [];
  @observable currentInput: string = '';
  @observable inputPadding: number = this.INITIAL_INPUT_PADDING;

  @Input('placeholder') placeholder: string;

  @ViewChild('input') input: ElementRef;    
  @ViewChild('tags') tagsWrapper: ElementRef;    

  constructor() { }

  ngOnInit() {
  }

  refreshInputPadding() {
    setTimeout(() => {
      this.inputPadding = this.INITIAL_INPUT_PADDING + this.tagsWrapper.nativeElement.clientWidth
    }, 100)
  }

  onTagDeleteClick(idx) {
    this.inputTags.splice(idx, 1)
    this.refreshInputPadding()
  }

  onKey(event) {
    const {
      key,
      code
    } = event

    if (code === 'Enter') {
      this.inputTags.push(this.currentInput)
      this.currentInput = ''
      this.input.nativeElement.value = ''

      this.refreshInputPadding()
    } else if (code === 'Backspace') {
      this.currentInput = this.currentInput.slice(0, this.currentInput.length - 1)
    } else {
      this.currentInput += key
    } 
  }

}
