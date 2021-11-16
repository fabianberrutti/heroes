import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Hero } from '../models/hero.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {

  private _heroes$ = new BehaviorSubject<Hero[]>([]);
  heroes$: Observable<Hero[]> = this._heroes$.asObservable();

  private _fileredHeroes$ = new BehaviorSubject<Hero[]>([]);
  fileredHeroes$: Observable<Hero[]> = this._fileredHeroes$.asObservable();

  constructor(private http: HttpClient) {
    this.refresheData();

  }

  resetWithData(heros: Hero[]) {
    this._heroes$.next(heros);
    this.refresheData();
  }

  refresheData() {
    const heroes = this._heroes$.getValue();
    this._fileredHeroes$.next(heroes);
  }

  addHero(addHero: Hero) {
    const heroes = this._heroes$.getValue();
    const lastHero = heroes
      .sort((a, b) => b.id - a.id);

    const heroId = lastHero.length > 0 ? lastHero[0].id + 1 : 0;
    heroes.push({
      id: heroId,
      name: addHero.name,
    });
    this._heroes$.next(heroes);
    this.refresheData();
  }

  editHero(editHero: Hero) {
    const heroes = this._heroes$.getValue();
    const heroIndex = heroes.findIndex(((hero) => hero.id === editHero.id));
    heroes[heroIndex] = editHero;
    this._heroes$.next(heroes);
    this.refresheData();
  }

  deleteHero(deleteHero: Hero) {
    const heroes = this._heroes$.getValue();
    const newHeroes = heroes.filter(((hero) => hero.id !== deleteHero.id));
    this._heroes$.next(newHeroes);
    this.refresheData();
  }

  searchHero(wordSearch: string) {
    const heroes = this._heroes$.getValue();
    const newHeroes = heroes.filter(((hero) => hero.name.includes(wordSearch.toUpperCase())));
    this._fileredHeroes$.next(newHeroes);
  }

  getHeroes() {
    return this.fileredHeroes$;
  }

  getHeroById(id: number) {
    return this.fileredHeroes$.pipe(
      map((heros: Hero[]) => heros.filter((hero: Hero) => hero.id === id)),
    );
  }

  getHttpHeroes(): Observable<any> {
    return this.http.get(environment.api.url);
  }
}
