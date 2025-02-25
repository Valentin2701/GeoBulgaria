import { Injectable, signal, WritableSignal } from '@angular/core';
import { Question } from '../models/Question';
import { HttpClient } from '@angular/common/http';
import { TestService } from './test.service';
import { Answer } from '../models/Answer';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  question: WritableSignal<Number> = signal(0);

  constructor(private http: HttpClient, private testService: TestService) { }

  getQuestion(){
    return this.http.get<Question>(`/api/tests/${this.testService.testId()}/${this.question()}`);
  }

  submitQuestion(answer: String){
    return this.http.post<Answer>(`/api/tests/${this.testService.testId()}/${this.question()}`, {answer});
  }
}
