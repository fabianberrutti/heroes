import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hero } from '../../models/hero.model';
import { HeroesService } from '../../services/heroes.service';

export interface FormData {
  action: string;
  hero: Hero;
}

@Component({
  selector: 'app-hero-form-dialog',
  templateUrl: './hero-form-dialog.component.html',
  styleUrls: ['./hero-form-dialog.component.scss'],
})
export class HeroFormDialogComponent implements OnInit {

  heroForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<HeroFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormData,
    private heroesService: HeroesService,
  ) { }

  ngOnInit(): void {
    if (this.data.hero) {
      this.initializeHeroFormData(this.data.hero);
    }
  }

  initializeHeroFormData(hero: Hero): void {
    this.heroForm.setValue({
      id: hero.id,
      name: hero.name,
    });
  }

  onSave() {
    if (!this.heroForm.valid) {
      this.heroForm.markAllAsTouched();
      return;
    }

    const hero: Hero = this.heroForm.getRawValue();
    switch (this.data.action) {
      case 'edit':
        this.heroesService.editHero(hero);
        break;
      case 'add':
        this.heroesService.addHero(hero);
        break;
      case 'delete':
        this.heroesService.deleteHero(hero);
        break;
    }
    this.dialogRef.close();
  }

  get heroName() {
    const hero: Hero = this.heroForm.getRawValue();
    return hero.name;
  }

  get btnText() {
    const hero: Hero = this.heroForm.getRawValue();
    return this.data.action === 'delete' ? 'Confirmar' : 'Guardar';
  }
}
