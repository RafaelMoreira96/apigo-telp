import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { Router } from '@angular/router';
import { MateriaService } from 'src/app/services/materia.service';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-materia-list',
  templateUrl: './materia-list.component.html',
  styleUrls: ['./materia-list.component.css'],
})
export class MateriaListComponent implements OnInit {
  ELEMENT_DATA: Course[] = [];

  constructor(private service: MateriaService, private toast: ToastrService, private router: Router) {}

  ngOnInit(): void {
    this.findAll()
  }

  findAll() {
    this.service.findAll().subscribe((resposta) => {
      this.ELEMENT_DATA = resposta;
      console.log(this.ELEMENT_DATA)
    });
  }

  delete(id: any){
    this.service.delete(id).subscribe(resposta =>{
      this.toast.success('Materia removido', 'Deletar')
      window.location.reload()
    })
  }
}
