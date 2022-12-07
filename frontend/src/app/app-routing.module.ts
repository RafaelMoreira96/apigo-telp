import { MateriaCreateComponent } from './components/materia/materia-create/materia-create.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunoCreateComponent } from './components/aluno/aluno-create/aluno-create.component';
import { AlunoListComponent } from './components/aluno/aluno-list/aluno-list.component';
import { AlunoUpdateComponent } from './components/aluno/aluno-update/aluno-update.component';
import { NavComponent } from './components/nav/nav.component';
import { MateriaListComponent } from './components/materia/materia-list/materia-list.component';
import { MateriaUpdateComponent } from './components/materia/materia-update/materia-update.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      // Components do ALUNO
      { path: 'alunos/create', component: AlunoCreateComponent },
      { path: 'alunos/list', component: AlunoListComponent },
      { path: 'alunos/list/update/:id', component: AlunoUpdateComponent },

      // Componentes de MATERIA
      { path: 'materias/create', component: MateriaCreateComponent },
      { path: 'materias/list', component: MateriaListComponent },
      { path: 'materias/list/update/:id', component: MateriaUpdateComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
