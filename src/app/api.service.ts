import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface OrderUpdateInterface {
  id: number,
  executorId: number,
  statusId: number
}

export interface TasksListResponse {
  value: any[]
}

@Injectable()
export class APIService {
  readonly TENANT_ID: string = '1370340b-b986-4cbe-8a4a-8ad180dfaab8'
  readonly BASE_URL: string = 'http://intravision-task.test01.intravision.ru'

  constructor(private httpClient: HttpClient) {}

  public listOrders() {
    const params = new HttpParams()
      .set('tenantguid', this.TENANT_ID)
      .set('$expand', 'lifetimeItems')

    return this.httpClient.get<TasksListResponse>(this.urlFor('/odata/tasks'), { params })
  }

  public listPriorities() { 
    return this.httpClient.get<any[]>(this.urlForTenant('/Priorities'))
  }

  public listServices() {
    return this.httpClient.get<any[]>(this.urlForTenant('/Services'))
  }

  public listStatuses() {
    return this.httpClient.get<any[]>(this.urlForTenant('/Statuses'))
  }

  public listTags() {
    return this.httpClient.get<any[]>(this.urlForTenant('/Tags'))
  }

  public listTasksTypes() {
    return this.httpClient.get<any[]>(this.urlForTenant('/TaskTypes'))
  }

  public listUserGroups() {
    return this.httpClient.get<any[]>(this.urlForTenant('/UserGroups'))
  }

  public listUsers() {
    return this.httpClient.get<any[]>(this.urlForTenant('/Users'))
  }

  public createOrder(name, description) {
    return this.httpClient.post(this.urlForTenant('/Tasks'), {name, description})
  }

  public updateOrder(update) {
    return this.httpClient.put(this.urlForTenant('/Tasks'), update)
  }

  private urlForTenant(path) {
    return this.BASE_URL + `/api/${this.TENANT_ID}` + path
  }

  private urlFor(path) {
    return this.BASE_URL + path 
  }
}
