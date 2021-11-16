import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, switchMap, tap } from 'rxjs/operators';
import { Hero } from 'src/app/pages/heroes/models/hero.model';
import { HeroesService } from 'src/app/pages/heroes/services/heroes.service';
import { environment } from 'src/environments/environment';
import { LoaderService } from './loading.service';

const DELAY = 500;

@Injectable()
export class HttpInterceptorHandler implements HttpInterceptor {

  constructor(private loaderService: LoaderService, private heroesService: HeroesService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (request.url === environment.api.url) {
      return this.heroesService.getHeroes()
        .pipe(
          tap(() => this.loaderService.show()),
          delay(DELAY),
          switchMap((heroes: Hero[]) => {
            this.loaderService.hide();
            heroes.sort((a, b) => b.id - a.id);
            return of(new HttpResponse({ status: 200, body: heroes }));
          }),
        );
    }
    return next.handle(request);
  }
}
