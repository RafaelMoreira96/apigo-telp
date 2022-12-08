import { GradeStudent } from 'src/app/models/gradestudent';
import { Activity } from './../../../models/activity';
import { CourseStudent } from './../../../models/coursestudent';
import { Student } from '../../../models/student';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AlunoService } from 'src/app/services/aluno.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Course } from 'src/app/models/course';
import { MateriaAlunoService } from 'src/app/services/materiaaluno.service';
import { MateriaService } from 'src/app/services/materia.service';
import { NotaService } from 'src/app/services/nota.service';
import { AtividadeService } from 'src/app/services/atividade.service';

@Component({
  selector: 'app-atribuir-materia',
  templateUrl: './atribuir-materia.component.html',
  styleUrls: ['./atribuir-materia.component.css'],
})
export class AtribuirMateriaComponent implements OnInit {
  student: Student = {
    name: '',
    semester: 0,
  };

  courses: Course[] = [];

  courseStudent: CourseStudent = {
    StudentID: 0,
    CourseID: 0,
  };

  activities: Activity[] = [];
  gradeStudents: GradeStudent[] = [];
  gS: GradeStudent = {
    StudentID: 0,
    ActivityID: 0,
    CourseID: 0,
    grade: 0,
  };
  name: FormControl = new FormControl(null, Validators.minLength(3));
  course: FormControl = new FormControl(Validators.required);

  constructor(
    private service: MateriaAlunoService,
    private alunoService: AlunoService,
    private materiaService: MateriaService,
    private gradeService: NotaService,
    private atividadeService: AtividadeService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.student.ID = this.route.snapshot.paramMap.get('id');
    this.findAluno();
    this.findCourses();
  }

  findAluno(): void {
    this.alunoService.findById(this.student.ID).subscribe((resposta) => {
      this.student = resposta;
      this.name.setValue(resposta.name);
    });
  }

  findCourses(): void {
    this.materiaService.findAll().subscribe((resposta) => {
      this.courses = resposta;
    });
  }

  create(): void {
    this.courseStudent.StudentID = parseInt(this.student.ID);
    this.courseStudent.CourseID = parseInt(this.course.value);
    this.service.create(this.courseStudent).subscribe(
      () => {
        this.toast.success('Cadastro concluído', 'Adição de aluno');
        this.router.navigate(['alunos/list']);
      },
      (ex) => {
        if (ex.error.errors) {
          ex.error.errors.forEach(
            (element: { message: string | undefined }) => {
              this.toast.error(element.message);
            }
          );
        }
      }
    );
    this.geraAtividade();
  }

  geraAtividade() {
    this.atividadeService.findAll().subscribe((resp) => {
      resp.forEach((element) => {
        if (element.CourseID == this.course.value) {
          this.gS.ActivityID = element.ID;
          this.gS.CourseID = element.CourseID;
          this.gS.StudentID = this.student.ID;
          this.gS.grade = 0;
          this.gradeStudents.push({...this.gS});
          this.gS.ActivityID = 0;
          this.gS.CourseID = 0;
          this.gS.StudentID = 0;
        }
      });
    });

    this.gradeStudents.forEach(element => {
      this.gradeService.create(element).subscribe(resp =>{
        console.log(element)
        console.log("Salvo")
      })
    });
  }
}
