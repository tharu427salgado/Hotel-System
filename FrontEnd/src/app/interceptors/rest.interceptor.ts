import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable()
export class RestInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const url = `${environment.baseURL}api/${request.url}`
    const urlReq = request.clone({ url })
    return next.handle(urlReq).pipe(
      tap(event => {
        if (event instanceof HttpRequest) {
          // const elapsed = Date.now() - started;
          // console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
        }
      })
    )
  }
}


