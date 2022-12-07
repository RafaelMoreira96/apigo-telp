import { Student } from '../../../models/student';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AlunoService } from 'src/app/services/aluno.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-aluno-update',
  templateUrl: './aluno-update.component.html',
  styleUrls: ['./aluno-update.component.css'],
})
export class AlunoUpdateComponent implements OnInit {
  student: Student = {
    name: '',
    semester: 0,
  };

  name: FormControl = new FormControl(null, Validators.minLength(3));
  semester: FormControl = new FormControl(Validators.required);

  constructor(
    private service: AlunoService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.student.ID = this.route.snapshot.paramMap.get('id');
    this.findById()
  }

  findById(): void {
    this.service.findById(this.student.ID).subscribe((resposta) => {
      this.student = resposta;
      console.log(resposta)
      this.name.setValue(this.student.name);
      this.semester.setValue(this.student.semester);
    });
  }

  update(): void {
    this.student.name = this.name.value;
    this.student.semester = this.semester.value;
    console.log(this.student);
    this.service.update(this.student).subscribe(
      () => {
        this.toast.success('Modificação concluída', 'Modificação de aluno');
        this.router.navigate(['alunos/list'])
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
