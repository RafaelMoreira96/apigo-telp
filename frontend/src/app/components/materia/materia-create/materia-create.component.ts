import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MateriaService } from 'src/app/services/materia.service';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-materia-create',
  templateUrl: './materia-create.component.html',
  styleUrls: ['./materia-create.component.css'],
})
export class MateriaCreateComponent implements OnInit {
  course: Course = {
    description: '',
    activities: [],
  };

  description: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private toast: ToastrService,
    private service: MateriaService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  create(): void {
    this.course.description = this.description.value;
    console.log(this.course);
    this.service.create(this.course).subscribe(
      () => {
        this.toast.success('Cadastro concluído', 'Adição de materia');
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
