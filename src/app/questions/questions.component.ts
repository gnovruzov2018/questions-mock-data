import { Component, OnInit, TemplateRef } from '@angular/core';
import { Question } from '../models/Question';
import { CrudService } from './../services/crud.service';
import { AlertifyService } from './../services/alertify.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  questions: Question[];
  updateModalRef: BsModalRef;
  createModalRef: BsModalRef;
  confirmModalRef: BsModalRef;
  questionToEditOrAdd = new Question();
  questionIdToDelete: number;
  isUpdate: boolean | undefined;

  constructor(
    private crudService: CrudService,
    private alertify: AlertifyService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions() {
    this.crudService.getQuestions().subscribe(
      data => {
        this.questions = data;
      },
      error => {
        this.alertify.error('Something went wrong while fetching questions');
      }
    );
  }

  deleteQuestion() {
    this.crudService.deleteQuestion(this.questionIdToDelete).subscribe(
      data => {
        this.loadQuestions();
        this.alertify.success(`Question #${this.questionIdToDelete} deleted successfully!`);
        this.confirmModalRef.hide();
      },
      error => {
        this.alertify.error(`Something went wrong while deleting question #${this.questionIdToDelete}`);
      }
    );
  }

  addQuestion() {
    this.crudService.addQuestion(this.questionToEditOrAdd).subscribe(
      data => {
        this.alertify.success('Question created successfully');
        this.createModalRef.hide();
        this.loadQuestions();
      },
      error => {
        this.alertify.error('Something went wrong while creating');
      }
    );
  }

  updateQuestion() {
    this.crudService.updateQuestion(this.questionToEditOrAdd).subscribe(
      data => {
        this.alertify.success(`Question #${this.questionToEditOrAdd.id} updated successfully!`);
        this.updateModalRef.hide();
        this.loadQuestions();
      },
      error => {
        this.alertify.error('Something went wrong while updating');
      }
    );
  }

  openUpdateModal(updateTemplate: TemplateRef<any>, id: number) {
    this.crudService.getQuestion(id).subscribe(
      data => {
        this.questionToEditOrAdd = data;
      }
    );
    this.updateModalRef = this.modalService.show(updateTemplate);
  }

  openCreateModal(createTemplate: TemplateRef<any>) {
    this.questionToEditOrAdd = new Question();
    this.questionToEditOrAdd.text = '';
    this.createModalRef = this.modalService.show(createTemplate);
  }

  openConfirmModal(confirmTemplate: TemplateRef<any>, id: number) {
    this.questionIdToDelete = id;
    this.confirmModalRef = this.modalService.show(confirmTemplate, {class: 'modal-sm'});
  }

  decline(): void {
    this.confirmModalRef.hide();
  }
}
