import { Student } from 'src/app/models/student';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AlunoService } from 'src/app/services/aluno.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseStudent } from 'src/app/models/coursestudent';
import { GradeStudent } from 'src/app/models/gradestudent';
import { NotaService } from 'src/app/services/nota.service';

@Component({
  selector: 'app-nota-update',
  templateUrl: './nota-update.component.html',
  styleUrls: ['./nota-update.component.css'],
})
export class NotaUpdateComponent implements OnInit {
  gradeStudent: GradeStudent = {
    StudentID: 0,
    ActivityID: 0,
    CourseID: 0,
    grade: 0,
  };
  student: Student = {
    name: '',
    semester: undefined,
  };

  name: FormControl = new FormControl(null, Validators.minLength(3));
  activity: FormControl = new FormControl(Validators.required);
  course: FormControl = new FormControl(Validators.required);
  grade: FormControl = new FormControl(Validators.required);

  constructor(
    private alunoService: AlunoService,
    private service: NotaService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.student.ID = this.route.snapshot.paramMap.get('id');
    this.gradeStudent.ID = this.route.snapshot.paramMap.get('idNota');
    this.findById();
  }

  findById(): void {
    this.alunoService.findById(this.student.ID).subscribe((resposta) => {
      this.student = resposta;
      console.log(resposta);
      this.name.setValue(this.student.name);
    });
    this.service.findById(this.gradeStudent.ID).subscribe((resposta) => {
      this.gradeStudent = resposta;
      console.log(resposta);
    });
  }

  update(): void {
    this.student.name = this.name.value;
    this.gradeStudent.grade = this.grade.value;
    console.log(this.student);
    this.service.update(this.gradeStudent).subscribe(
      () => {
        this.toast.success('Modificação concluída', 'Modificação de aluno');
        this.router.navigate(['alunos/list/listagemNotas/' + this.student.ID]);
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
  }
}
