import { Course } from './../../../models/course';
import { Activity } from '../../../models/activity';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AtividadeService } from 'src/app/services/atividade.service';
import { MateriaService } from 'src/app/services/materia.service';

@Component({
  selector: 'app-listagem-atividade',
  templateUrl: './listagem-atividade.component.html',
  styleUrls: ['./listagem-atividade.component.css'],
})
export class ListagemAtividadeComponent implements OnInit {
  ELEMENT_DATA: Activity[] = [];
  COURSES: Course[] = [];

  description: string | undefined;
  constructor(
    private service: AtividadeService,
    private courseService: MateriaService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.courseService.findAll().subscribe((resposta) => {
      this.COURSES = resposta;
    });

    this.service.findAll().subscribe((resposta) => {
      this.ELEMENT_DATA = resposta;
      console.log(this.ELEMENT_DATA);
    });
  }

  retornaNome(CourseID: any) {
    for (let i = 0; i < this.COURSES.length; i++) {
      if (CourseID == this.COURSES[i].ID) {
        this.description = this.COURSES[i].description;
        console.log(this.description);
        return this.description;
      }
    }
    return null
  }

  delete(id: any) {
    this.service.delete(id).subscribe((resposta) => {
      this.toast.success('Atividade removida', 'Deletar');
      window.location.reload();
    });
  }
}
