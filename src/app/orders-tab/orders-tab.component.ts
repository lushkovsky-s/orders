import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Store, OrderInterface } from './orders.store';

@Component({
  selector: 'app-orders',
  templateUrl: './orders-tab.component.html',
  styleUrls: ['./orders-tab.component.sass']
})
export class OrdersTabComponent implements OnInit {
  createPopupVisible$: boolean = false; 
  editPopupVisible$: boolean = false;
  popupOrder$: OrderInterface;

  @ViewChild('comment') commentInput: ElementRef;  

  constructor(public store: Store) { }

  onEditSave(statusId, executorId) {
    this.store.updOrder(this.popupOrder$.id, {statusId, executorId})
    this.editPopupVisible$ = false
  }

  onNewOrder(name, description) {
    this.store.addOrder({name, description})
    this.createPopupVisible$ = false
  }

  onPopupCloseClick() {
    this.createPopupVisible$ = false
    this.editPopupVisible$ = false
  }

  onCreateButtonClick() {
    this.createPopupVisible$ = true
  }

  onOrderClick(order) {
    this.editPopupVisible$ = true
    this.popupOrder$ = order
  }

  onAddComment() {
    const commentText = this.commentInput.nativeElement.value

    if (!commentText) {
      return
    }

    this.store.addComment(this.popupOrder$.id, commentText)
    this.commentInput.nativeElement.value = ''
    this.popupOrder$ = this.store.orders.find(o => o.id === this.popupOrder$.id)
  }

  ngOnInit() {
  }

}
