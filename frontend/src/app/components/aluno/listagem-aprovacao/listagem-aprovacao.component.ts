import { Course } from 'src/app/models/course';
import { getTestBed } from '@angular/core/testing';
import { CourseStudent } from './../../../models/coursestudent';
import { Component, OnInit } from '@angular/core';
import { MateriaAlunoService } from 'src/app/services/materiaaluno.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunoService } from 'src/app/services/aluno.service';
import { MateriaService } from 'src/app/services/materia.service';

@Component({
  selector: 'app-listagem-aprovacao',
  templateUrl: './listagem-aprovacao.component.html',
  styleUrls: ['./listagem-aprovacao.component.css'],
})
export class ListagemAprovacaoComponent implements OnInit {
  ELEMENT_DATA: CourseStudent[] = [];
  COURSES: Course[] = [];

  description: any | undefined;

   constructor(
    private service: MateriaAlunoService,
    private materiaService: MateriaService,
    private route: ActivatedRoute

  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    var id = this.route.snapshot.paramMap.get('id');
    this.service.isApproved(id).subscribe((resposta) => {
      this.ELEMENT_DATA = resposta;
    });

    this.materiaService.findAll().subscribe(resposta =>{
      this.COURSES = resposta;
    })
  }

  retornaNome(CourseID: any) {
    for (let i = 0; i < this.COURSES.length; i++) {
      if (CourseID == this.COURSES[i].ID) {
        this.description = this.COURSES[i].description;
        console.log(this.description);
        return this.description;
      }
    }
    return null;
  }

  retornaStatus(isApproved: boolean): string | undefined{
    if(isApproved == true){
      return "Aprovado"
    } else {
      return "Reprovado"
    }
  }
}
