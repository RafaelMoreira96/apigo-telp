import { Student } from './../../../models/student';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AlunoService } from 'src/app/services/aluno.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-aluno-create',
  templateUrl: './aluno-create.component.html',
  styleUrls: ['./aluno-create.component.css'],
})
export class AlunoCreateComponent implements OnInit {
  student: Student = {
    name: '',
    semester: 0,
  };

  name: FormControl = new FormControl(null, Validators.minLength(3));
  semester: FormControl = new FormControl(Validators.required);

  constructor(
    private service: AlunoService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  create(): void {
    this.student.name = this.name.value
    this.student.semester = this.semester.value
    console.log(this.student)
    this.service.create(this.student).subscribe(
      () => {
        this.toast.success('Cadastro concluído', 'Adição de aluno');
        window.location.reload();
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
