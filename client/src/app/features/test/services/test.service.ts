import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { Test } from '../models/Test';
import { Answer } from '../models/Answer';
import { Question } from '../models/Question';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  testId: WritableSignal<String> = signal('');
  answers: String[] = []; 

  constructor(private http: HttpClient) { }

  getTests(){
    return this.http.get<Test[]>("/api/tests");
  }

  getTest(){
    return this.http.get<Test>(`/api/tests/${this.testId()}`);
  }

  getQuestion(question: Number){
    return this.http.get<Question>(`/api/tests/${this.testId()}/${question}`);
  }

  submitQuestion(question: Number, answer: String){
    return this.http.post<Answer>(`/api/tests/${this.testId()}/${question}`, {answer});
  }

  submitTest(){
    return this.http.post<Number>(`/api/tests/${this.testId()}`, this.answers);
  }
}
