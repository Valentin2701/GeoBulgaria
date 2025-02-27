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
  answers: WritableSignal<String[]> = signal([]); 

  constructor(private http: HttpClient) { }

  getTests(){
    return this.http.get<Test[]>("/api/tests");
  }

  getTest(){
    return this.http.get<Test>(`/api/tests/${this.testId()}`);
  }

  getUserTests(){
    return this.http.get<{ [key: string]: number } | null>(`/api/tests/userTests`);
  }

  submitTest(){
    return this.http.post<Number>(`/api/tests/${this.testId()}`, this.answers());
  }
}
