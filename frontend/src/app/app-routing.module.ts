import { MateriaCreateComponent } from './components/materia/materia-create/materia-create.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunoCreateComponent } from './components/aluno/aluno-create/aluno-create.component';
import { AlunoListComponent } from './components/aluno/aluno-list/aluno-list.component';
import { AlunoUpdateComponent } from './components/aluno/aluno-update/aluno-update.component';
import { NavComponent } from './components/nav/nav.component';
import { MateriaListComponent } from './components/materia/materia-list/materia-list.component';
import { MateriaUpdateComponent } from './components/materia/materia-update/materia-update.component';
import { AtividadeCreateComponent } from './components/materia/atividade-create/atividade-create.component';
import { AtribuirMateriaComponent } from './components/aluno/atribuir-materia/atribuir-materia.component';
import { ListagemAtividadeComponent } from './components/materia/listagem-atividade/listagem-atividade.component';
import { ListagemNotasComponent } from './components/aluno/listagem-notas/listagem-notas.component';
import { NotaUpdateComponent } from './components/aluno/nota-update/nota-update.component';
import { ListagemAprovacaoComponent } from './components/aluno/listagem-aprovacao/listagem-aprovacao.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      // Components do ALUNO
      { path: 'alunos/create', component: AlunoCreateComponent },
      { path: 'alunos/list', component: AlunoListComponent },
      { path: 'alunos/list/update/:id', component: AlunoUpdateComponent },
      { path: 'alunos/list/atribuirMateria/:id', component: AtribuirMateriaComponent },
      { path: 'alunos/list/listagemNotas/:id', component: ListagemNotasComponent },
      { path: 'alunos/list/listagemNotas/:id/:idNota', component: NotaUpdateComponent},
      { path: 'alunos/list/listagemAprovacao/:id', component: ListagemAprovacaoComponent},

      // Componentes de MATERIA
      { path: 'materias/create', component: MateriaCreateComponent },
      { path: 'materias/list', component: MateriaListComponent },
      { path: 'materias/list/update/:id', component: MateriaUpdateComponent },
      { path: 'materias/list/listagemAtividades', component: ListagemAtividadeComponent },

      // Compnentes de ATIVIDADE (dentro da pasta MATERIA)
      { path: 'materias/list/atribuirAtividade/:id', component: AtividadeCreateComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
