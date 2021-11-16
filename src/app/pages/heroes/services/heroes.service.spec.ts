import { TestBed } from '@angular/core/testing';
import { Hero } from '../models/hero.model';
import { switchMap, take } from 'rxjs/operators';
import { HeroesService } from './heroes.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('HeroesService', () => {

  let service: HeroesService;
  const newHero: Hero = {
    id: 0,
    name: 'Superman',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpTestingController,
      ],
      imports: [
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(HeroesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('addHero should add new Hero with index 0', () => {

    // arrange
    let initialHerosLength = 0;
    service.getHeroes()
      .pipe(
        take(1),
        switchMap((heros: Hero[]) => {
          initialHerosLength = heros.length;
          // act
          service.addHero(newHero);
          return service.getHeroes();
        }),
      )
      .subscribe((heros: Hero[]) => {
        // assert
        const expected = initialHerosLength + 1;
        expect(heros.length).toEqual(expected);
      });

  });

  it('addHero should add new Hero and add an index', () => {

    // arrange
    service.resetWithData([newHero]);
    let initialHerosLength = 0;
    service.getHeroes()
      .pipe(
        take(1),
        switchMap((heros: Hero[]) => {
          initialHerosLength = heros.length;
          // act
          service.addHero(newHero);
          return service.getHeroes();
        }),
      )
      .subscribe((heros: Hero[]) => {
        // assert
        const expected = initialHerosLength + 1;
        expect(heros.length).toEqual(expected);
      });

  });

  it('editHero should edit hero', () => {
    // arrange
    const indexEditHero = 0;
    service.resetWithData([newHero]);
    const editHeroName = 'edited Hero';
    service.getHeroes()
      .pipe(
        take(1),
        switchMap((heros: Hero[]) => {
          const editHero: Hero = {
            ...heros[indexEditHero],
            name: editHeroName,
          };
          // act
          service.editHero(editHero);
          return service.getHeroes();
        }),
      )
      .subscribe((heros: Hero[]) => {
        // assert
        expect(heros[indexEditHero].name).toEqual(editHeroName);
      });

  });

  it('deleteHero should remove one hero', () => {
    // arrange
    service.resetWithData([newHero]);
    let herosLength = 0;
    service.getHeroes()
      .pipe(
        take(1),
        switchMap((heros: Hero[]) => {
          herosLength = heros.length;

          service.deleteHero(heros[0]);
          return service.getHeroes();
        }),
      )
      .subscribe((heros: Hero[]) => {
        // assert
        const expected = herosLength - 1;
        expect(heros.length).toEqual(expected);
      });
  });

  it('searchHero should return filter heros', () => {
    // arrange
    const mockHeros: Hero[] = [
      {
        id: 0,
        name: 'SUPERMAN',
      },
      {
        id: 1,
        name: 'FLASH',
      },
    ];

    service.resetWithData(mockHeros);
    // act
    service.searchHero('man');
    service.getHeroes()
      .pipe(take(1))
      .subscribe((heros: Hero[]) => {
        // assert
        const expectedHeros = [{
          id: 0,
          name: 'SUPERMAN',
        }];
        expect(heros).toEqual(expectedHeros);
      });
  });

  it('getHeroById should return filter hero', () => {
    // arrange
    const mockHeros: Hero[] = [
      {
        id: 0,
        name: 'Superman',
      },
      {
        id: 1,
        name: 'Flash',
      },
    ];

    service.resetWithData(mockHeros);
    // act
    service.getHeroById(1)
      .pipe(take(1))
      .subscribe((heros: Hero[]) => {
        // assert
        const expectedHeros = [{
          id: 1,
          name: 'Flash',
        }];
        expect(heros).toEqual(expectedHeros);
      });
  });
});
