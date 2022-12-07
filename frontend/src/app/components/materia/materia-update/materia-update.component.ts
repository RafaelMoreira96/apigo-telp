import { Course } from './../../../models/course';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MateriaService } from 'src/app/services/materia.service';

@Component({
  selector: 'app-materia-update',
  templateUrl: './materia-update.component.html',
  styleUrls: ['./materia-update.component.css'],
})
export class MateriaUpdateComponent implements OnInit {
  course: Course = {
    description: '',
    activities: []
  }

  description: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: MateriaService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.course.ID = this.route.snapshot.paramMap.get('id');
    this.findById()
  }

  findById(): void {
    this.service.findById(this.course.ID).subscribe((resposta) => {
      this.course = resposta;
      console.log(resposta)
      this.description.setValue(this.course.description);
    });
  }

  update(): void {
    this.course.description = this.description.value;
    console.log(this.course);
    this.service.update(this.course).subscribe(
      () => {
        this.toast.success('Modificação concluída', 'Modificação de materia');
        this.router.navigate(['materias/list'])
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
