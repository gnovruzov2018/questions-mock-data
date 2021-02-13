import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CrudService } from './../services/crud.service';
import { MockData, ModelToPost } from './../models/Question';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-test-data',
  templateUrl: './test-data.component.html',
  styleUrls: ['./test-data.component.css']
})
export class TestDataComponent implements OnInit {

  mockData: MockData = new MockData();
  html: any;
  modalRef: BsModalRef;
  modelToPost: ModelToPost = new ModelToPost();
  @ViewChild('htmlContent') htmlContent: ElementRef;

  constructor(
    private crudService: CrudService,
    private sanitizer: DomSanitizer,
    private modalService: BsModalService,
    private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.loadMockData();
  }

  loadMockData() {
    this.crudService.getMockData().subscribe(
      data => {
        this.mockData = data;
        this.html = this.sanitizer.bypassSecurityTrustHtml(this.mockData.htmlContent);
      }
    );
  }

  openModal(template: TemplateRef<any>, id) {
    this.modelToPost.questionId = id;
    this.modelToPost.htmlContent = this.htmlContent.nativeElement.innerText;
    this.modalRef = this.modalService.show(template);
  }

  postToDummyServer() {
    this.crudService.postToDummyServer(this.modelToPost).subscribe(
      data => {
        this.alertify.success('Mock data successfully posted to the dummy server');
      }
    );
    this.modalRef.hide();
  }

}
