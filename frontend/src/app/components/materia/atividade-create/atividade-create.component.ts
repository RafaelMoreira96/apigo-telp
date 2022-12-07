import { Activity } from '../../../models/activity';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AtividadeService } from 'src/app/services/atividade.service';
import { Course } from 'src/app/models/course';
import { MateriaService } from 'src/app/services/materia.service';

@Component({
  selector: 'app-atividade-create',
  templateUrl: './atividade-create.component.html',
  styleUrls: ['./atividade-create.component.css'],
})
export class AtividadeCreateComponent implements OnInit {
  course: Course = {
    description: '',
    activities: []
  }
  activity: Activity = {
    description: '',
    CourseID: 0
  };

  description: FormControl = new FormControl(null, Validators.minLength(3));
  course_name: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private toast: ToastrService,
    private service: AtividadeService,
    private courseService: MateriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.course.ID = this.route.snapshot.paramMap.get('id')
    this.findCourse();
  }

  findCourse(): void{
    this.courseService.findById(this.course.ID).subscribe(resposta =>{
      this.course_name.setValue(resposta.description)
    })
  }

  create(): void {
    this.activity.description = this.description.value;
    this.activity.CourseID = parseInt(this.course.ID);
    console.log(this.activity)
    this.service.create(this.activity).subscribe(
      () => {
        this.toast.success('Cadastro concluído', 'Adição de atividade');
        this.router.navigate(['materias/list'])
      },
      (ex) => {
        if (ex.error.errors) {
          ex.error.errors.forEach(
            (element: { message: string | undefined }) => {
              console.log(element)
              this.toast.error(element.message);
            }
          );
        }
      }
    );
  }
}
