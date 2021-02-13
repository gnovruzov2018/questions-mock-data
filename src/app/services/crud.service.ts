import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Question } from '../models/Question';
import { MockData, ModelToPost } from './../models/Question';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  baseUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}questions`);
  }

  getQuestion(id): Observable<Question> {
    return this.http.get<Question>(`${this.baseUrl}questions/${id}`);
  }

  addQuestion(question: Question) {
    return this.http.post(`${this.baseUrl}questions`, question);
  }

  updateQuestion(question: Question) {
    return this.http.put(`${this.baseUrl}questions/${question.id}`, question);
  }

  deleteQuestion(id) {
    return this.http.delete(`${this.baseUrl}questions/${id}`);
  }

  getMockData(): Observable<MockData> {
    return this.http.get<MockData>(`${this.baseUrl}data`);
  }

  postToDummyServer(modelData: ModelToPost) {
    return of(modelData);
  }
}
