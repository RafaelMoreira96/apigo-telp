import { Activity } from './../../../models/activity';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { AlunoService } from 'src/app/services/aluno.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GradeStudent } from 'src/app/models/gradestudent';
import { NotaService } from 'src/app/services/nota.service';
import { MateriaService } from 'src/app/services/materia.service';
import { AtividadeService } from 'src/app/services/atividade.service';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-listagem-notas',
  templateUrl: './listagem-notas.component.html',
  styleUrls: ['./listagem-notas.component.css'],
})
export class ListagemNotasComponent implements OnInit {
  gradeStudent: GradeStudent = {
    StudentID: 0,
    ActivityID: 0,
    CourseID: 0,
    grade: 0,
  };

  ELEMENT_DATA: GradeStudent[] = [];

  activities: Activity[] = [];
  COURSES: Course[] = [];

  student: Student = {
    name: '',
    semester: undefined,
  };
  newid: any;
  constructor(
    private service: NotaService,
    private toast: ToastrService,
    private courseService: MateriaService,
    private activityService: AtividadeService,
    private studentService: AlunoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.newid = this.route.snapshot.paramMap.get('id');
    this.retornaNome();
    this.findAllActCourse();
    this.findAll(parseInt(this.newid));
  }

  findAll(id: any) {
    this.service.findAll(id).subscribe((resp) => {
      this.ELEMENT_DATA = resp;
      console.log(this.ELEMENT_DATA)
    });
  }

  findAllActCourse() {
    this.activityService.findAll().subscribe((resp) => {
      this.activities = resp;
    });
    this.courseService.findAll().subscribe((resp) => {
      this.COURSES = resp;
    });
  }

  delete(id: any) {
    this.service.delete(id).subscribe((resposta) => {
      this.toast.success('Aluno removido', 'Deletar');
      window.location.reload();
    });
  }

  update(id: any){

  }

  retornaUnidade(CourseID: any) {
    for (let i = 0; i < this.COURSES.length; i++) {
      if (CourseID == this.COURSES[i].ID) {
        return this.COURSES[i].description;
      }
    }
    return null;
  }

  retornaAtividade(ActivityID: any) {
    for (let i = 0; i < this.activities.length; i++) {
      if (ActivityID == this.activities[i].ID) {
        return this.activities[i].description;
      }
    }
    return null;
  }

  retornaNome(): void {
    this.studentService.findById(this.newid).subscribe((resp) => {
      this.student = resp;
    });
  }
}
