import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { AlunoService } from 'src/app/services/aluno.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aluno-list',
  templateUrl: './aluno-list.component.html',
  styleUrls: ['./aluno-list.component.css'],
})
export class AlunoListComponent implements OnInit {
  ELEMENT_DATA: Student[] = [];

  student: Student = {
    name: '',
    semester: undefined
  }

  constructor(private service: AlunoService, private toast: ToastrService, private router: Router) {}

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
      this.toast.success('Aluno removido', 'Deletar')
      window.location.reload()
    })
  }
}
