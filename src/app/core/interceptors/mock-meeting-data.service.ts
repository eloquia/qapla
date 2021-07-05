import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { map, tap } from 'rxjs/operators';

/**
 * Intercepts any 500-type requests and returns mock data instead
 */
@Injectable()
export class MockMeetingDataService implements HttpInterceptor {
  constructor(
    private toasterService: ToastrService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      // intercept response
      map(resp => {
        if (environment.mode === 'MOCK') {
          console.log('[MOCK] response', resp)

          if (!resp.type) {
            // maybe this is ERR_CONNECTION_REFUSED
          }
          if (resp instanceof HttpResponse) {
            console.log('resp', resp)
            if (!resp.status) {
              console.warn('Status code DNE!');
            }
          }
          return resp;

        } else {
          return resp;
        }
      })
    );

  }
}
