import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';

import { AlunoListComponent } from './components/aluno/aluno-list/aluno-list.component';
import { AlunoCreateComponent } from './components/aluno/aluno-create/aluno-create.component';
import { AlunoUpdateComponent } from './components/aluno/aluno-update/aluno-update.component';

import { MateriaListComponent } from './components/materia/materia-list/materia-list.component';
import { MateriaCreateComponent } from './components/materia/materia-create/materia-create.component';
import { MateriaUpdateComponent } from './components/materia/materia-update/materia-update.component';
import { AtividadeCreateComponent } from './components/materia/atividade-create/atividade-create.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,

    AlunoCreateComponent,
    AlunoListComponent,
    AlunoUpdateComponent,

    MateriaCreateComponent,
    MateriaListComponent,
    MateriaUpdateComponent,

    AtividadeCreateComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
