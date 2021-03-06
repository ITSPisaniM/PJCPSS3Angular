import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class OrdiniService {
  path: string = 'ordini';

  constructor(private api: ApiService) {}

  public getOrdini(): Observable<any> {
    return this.api.get(this.path + '/list', '');
  }

  public getOrdiniPagination(page: number, elements?: number): Observable<any> {
    var params = new HttpParams()
      .set('page', page.toString())
      .set('size', elements?.toString() || '')
      .set('sort', 'amazonOrderId,DESC');
    return this.api.get(this.path + '/page', params);
  }

  public getByFilters(
    amazonOrderId: string,
    buyerEmail: string,
    purchaseDate: string
  ): Observable<any> {
    var params = new HttpParams()
      .set('amazonOrderId', amazonOrderId)
      .set('buyerEmail', buyerEmail)
      .set('purchaseDate', purchaseDate)
      .set('sort', 'amazonOrderId,DESC');
    return this.api.get(this.path, params);
  }
}
