import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { DefaultUrlSerializer, UrlTree } from '@angular/router';
import { Project } from '../../project/models';
import { Personnel } from 'src/app/personnel/models';
import { MOCK_MEETING_1, MOCK_PERSONNEL_1, MOCK_PROJECT_1 } from 'src/app/meet/models/common';

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
          // console.log('[MOCK] response', resp)

          if (!resp.type) {
            // maybe this is ERR_CONNECTION_REFUSED
            // console.warn('type = 0')

            console.log('req', req)
            const deserializer = new DefaultUrlSerializer();
            const withoutHttp: string = req.urlWithParams.slice(7);
            // console.log('withoutHttp', withoutHttp)
            const urlTree: UrlTree = deserializer.parse(withoutHttp);
            // console.log('urlTree', urlTree)

            const segments = urlTree.root.children.primary.segments;
            // console.log('segments', segments)
            
            const firstPath = urlTree.root.children.primary.segments[1].path;
            console.log('firstPath', firstPath)

            if (firstPath === 'project' && req.method === 'GET') {
              console.log('getAllProjects')
              return this.getAllProjects();
            } else if (firstPath === 'personnel' && req.method === 'GET') {
              console.log('getAllPersonnel')
              return this.getAllPersonnel();
            } else if (firstPath === 'meeting' && req.method === 'GET') {
              console.log('getAllMeetings')
              return this.getAllMeetings();
            }
          }
          if (resp instanceof HttpResponse) {
            console.log('resp', resp)
            if (!resp.status) {
              console.warn('Status code DNE!');
            }
          }
          return resp;

        } else {
          console.log('not mock', resp)
          return resp;
        }
      })
    );

  } // end intercept

  private getAllProjects() {
    return new HttpResponse<any>({ status: 200, body: [MOCK_PROJECT_1] });
  }

  private getAllPersonnel() {
    return new HttpResponse<any>({ status: 200, body: [MOCK_PERSONNEL_1] });
  }

  private getAllMeetings() {
    return new HttpResponse<any>({ status: 200, body: [MOCK_MEETING_1] });
  }

}
