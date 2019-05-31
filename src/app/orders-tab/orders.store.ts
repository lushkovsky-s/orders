import { Injectable } from '@angular/core'
import { observable, action, computed } from 'mobx-angular'

import { APIService, OrderUpdateInterface } from '../api.service';

export class Order {
  @observable id: number;
  @observable name: string;
  @observable description: string;
  @observable createdAt: string;
  @observable updatedAt: string;
  @observable price: number;
  @observable taskTypeId: number;
  @observable taskTypeName: string;
  @observable statusId: number;
  @observable statusName: string;
  @observable statusRgb: string;
  @observable priorityId: number;
  @observable priorityName: string;
  @observable serviceId: number;
  @observable serviceName: string; 
  @observable resolutionDatePlan: string; 
  @observable initiatorId: number;
  @observable initiatorName: string;
  @observable executorId: number;
  @observable executorName: string;
  @observable executorGroupId: number;
  @observable executorGroupName: string;
  @observable tags: object[];
  @observable comments: object[] = [];

  constructor(args) { 
    Object.entries(args).forEach(([name, value]) => this[name] = value)
  }

  @action updName(value) {
    this.name = value
  }

  @action updDescription(value) {
    this.description = value
  }

  @action updStatus(id, name, rgb) {
    this.statusId = id
    this.statusName = name
    this.statusRgb = rgb
  }

  @action updInitiator(id, name) {
    this.initiatorId = id
    this.initiatorName = name
  }

  @action updExecutor(user_id, user_name, group_id, group_name) {
    this.executorId = user_id
    this.executorName = user_name
    this.executorGroupId = group_id
    this.executorGroupName = group_name
  }

  @action updPriority(id, name) {
    this.priorityId = id
    this.priorityName = name
  }

  @action addComment(text) {
    this.comments = [
      ...this.comments,
      text
    ]
  }
}

export interface OrderInterface {
  id: number,
  name: string,
  description: string,
  createdAt: string,
  updatedAt: string,
  price: number,
  taskTypeId: number,
  taskTypeName: string,
  statusId: number,
  statusName: string,
  statusRgb: string,
  priorityId: number,
  priorityName: string,
  serviceId: number,
  serviceName: string, 
  resolutionDatePlan: string, 
  initiatorId: number,
  initiatorName: string,
  executorId: number,
  executorName: string,
  executorGroupId: number,
  executorGroupName: string,
  tags: object[],
  comments: object[]
}

export class Priority {
  @observable rgb: string
  @observable id: number
  @observable name: string

  constructor(args) { 
    Object.entries(args).forEach(([name, value]) => this[name] = value)
  }  
}

export class Service {
  @observable id: number
  @observable name: string

  constructor(args) { 
    Object.entries(args).forEach(([name, value]) => this[name] = value)
  }  
}

export class Status { 
  @observable id: number;
  @observable name: string;
  @observable rgb: string;

  constructor(args) { 
    Object.entries(args).forEach(([name, value]) => this[name] = value)
  }  
}

export class Tag {
  @observable id: number;
  @observable name: string;

  constructor(args) { 
    Object.entries(args).forEach(([name, value]) => this[name] = value)
  }  
}

export class TaskType {
  @observable id: number
  @observable name: string

  constructor(args) { 
    Object.entries(args).forEach(([name, value]) => this[name] = value)
  } 
}

export class UserGroup {
  @observable id: number
  @observable name: string

  constructor(args) { 
    Object.entries(args).forEach(([name, value]) => this[name] = value)
  } 
}

export class User {
  @observable id: number
  @observable name: string

  constructor(args) { 
    Object.entries(args).forEach(([name, value]) => this[name] = value)
  }   
}

@Injectable()
export class Store {
    @observable loaded: boolean = false;
    @observable _orders: Order[] = [];
    @observable priorities: Priority[] = [];
    @observable services: Service[] = [];
    @observable statuses: Status[] = [];
    @observable tags: Tag[] = [];
    @observable tasksTypes: TaskType[] = [];
    @observable userGroups: UserGroup[] = [];
    @observable users: User[] = [];

    constructor(private _apiService: APIService) {
      _apiService.listOrders().subscribe(
        data  => { data.value.forEach(item => 
          {
            item.comments = (item.lifetimeItems || [])
              .filter(it => it.lifetimeType === 'AddComment')
              .map(it => ({ text: it.comment, date: it.createdAt })) 
            this._orders = [...this._orders, new Order(item)]
          }) 
        }
      )

      _apiService.listPriorities().subscribe(
        data => { data.forEach(item => this.priorities = [...this.priorities, new Priority(item)]) }
      )

      _apiService.listServices().subscribe(
        data => { data.forEach(item => this.services = [...this.services, new Service(item)]) }
      )

      _apiService.listStatuses().subscribe(
        data => { data.forEach(item => this.statuses = [...this.statuses, new Status(item)])}
      )

      _apiService.listTags().subscribe(
        data => { data.forEach(item => this.tags = [...this.tags, new Tag(item)]) }
      )

      _apiService.listTasksTypes().subscribe(
        data => { data.forEach(item => this.tasksTypes = [...this.tasksTypes, new TaskType(item)]) }
      )
        
      _apiService.listUserGroups().subscribe(
        data => { data.forEach(item => this.userGroups = [...this.userGroups, new UserGroup(item)]) }
      )

      _apiService.listUsers().subscribe(
        data => { data.forEach(item => this.users = [...this.users, new User(item)]) }
      )
    }

    @action addOrder({name, description}) {
      this._apiService.createOrder(name, description).subscribe(
        data => {
          const id = data

          this._orders = [...this._orders, new Order({id, name, description})]
        }
      )
    }

    @action addComment(orderId, commentText) {
      const order = this._orders.find(o => o.id === orderId)
      order.addComment(commentText)

      this._apiService.updateOrder({
        id: order.id, 
        statusId: order.statusId,
        executorId: order.executorId,
        comment: commentText
      }).subscribe()
    }

    @action updOrder(id, updatedOrder) {
      let {
        statusId, executorId
      } = updatedOrder

      statusId = parseInt(statusId)
      executorId = parseInt(executorId)
      
      const order = this._orders.find((order) => order.id === id)
      
      let updates: OrderUpdateInterface = {id: null, executorId: null, statusId: null}

      if (order.statusId != statusId) {
        const status = this.statuses.find(s => s.id == statusId)
        order.updStatus(statusId, status.name, status.rgb)
        updates.statusId = statusId
      }

      if (order.executorId != executorId) {
        const user = this.users.find((u) => u.id === executorId)
        const userGroup = this.userGroups.find((g) => g.id === executorId)

        order.updExecutor(user.id, user.name, userGroup.id, userGroup.name)
        
        updates.executorId = executorId
      }
      
      if (Object.keys(updates).length > 0) {
        updates.id = order.id
        updates.executorId = updates.executorId || order.executorId
        updates.statusId = updates.statusId || order.statusId

        this._apiService.updateOrder(updates).subscribe()
      }
    }

    @computed get orders() {
      return this._orders.map(order => ({
        ...order,
        priorityRgb: (this.priorities.find(p => p.id  === order.priorityId) || {rgb: 'white'}).rgb
      }))
    }

    @computed get usersOptions() {
      return this.users.map(u => ({name: u.name, value: u.id}))
    }

    @computed get statusesOptions() {
      return this.statuses.map(s => ({name: s.name, value: s.id}))
    }
}