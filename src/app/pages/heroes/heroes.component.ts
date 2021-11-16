import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs/operators';
import { LoaderService } from 'src/app/core/http/loading.service';
import { HeroFormDialogComponent } from './components/hero-form-dialog/hero-form-dialog.component';
import { Hero } from './models/hero.model';
import { HeroesService } from './services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {

  isLoading$ = this.loaderService.isLoading$;

  heroSearchForm: FormGroup = new FormGroup({
    filterName: new FormControl(''),
  });

  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource<Hero>([]);

  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = value;
    }
  }

  constructor(
    private loaderService: LoaderService,
    public dialog: MatDialog,
    private heroesService: HeroesService,
  ) {}

  ngOnInit() {

    this.dispatchWithData();

    this.heroesService.getHttpHeroes()
      .subscribe((heroes: any) => {
        this.dataSource.data = heroes;
      });

    this.heroSearchForm.controls.filterName.valueChanges
      .subscribe((wordSearch: string) => {
        this.heroesService.searchHero(wordSearch);
      });
  }

  dispatchWithData() {
    const  herosData = [
      { id: 1, name: 'SUPERMAN' },
      { id: 2, name: 'BATMAN' },
      { id: 3, name: 'SPIDERMAN' },
      { id: 4, name: 'SUPERMAN 2' },
      { id: 5, name: 'BATMAN 2' },
      { id: 6, name: 'SPIDERMAN 2' },
      { id: 7, name: 'SUPERMAN 3' },
      { id: 8, name: 'BATMAN 3' },
      { id: 9, name: 'SPIDERMAN 3 ' },
    ];

    this.heroesService.resetWithData(herosData);
  }

  onOpenHeroDialog(hero: Hero | null, action: string) {
    this.dialog.open(HeroFormDialogComponent, {
      width: '250px',
      data: {
        hero,
        action,
      },
    });
  }

}
