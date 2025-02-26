import { Component, computed, inject, OnChanges, OnDestroy, OnInit, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatDialog } from "@angular/material/dialog"
import { TestService } from '../../services/test.service';
import { LoaderService } from '../../../../core/services/loader.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { Test } from '../../models/Test';
import { QuestionService } from '../../services/question.service';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from "@angular/material/radio"
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Answer } from '../../models/Answer';
import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-question',
  imports: [RouterModule, FormsModule, MatRadioModule, MatProgressBarModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent implements OnInit, OnDestroy {

  testService = inject(TestService);
  test: WritableSignal<Test | null> = signal(null);

  currentQuestionIndex = signal<number>(1);

  answer: String = '';
  explanation: String = '';
  correct: boolean | null = null;
  answered: boolean = false;
  answeredCount = 0;
  progressValue = 0;
  submited = false;

  constructor(private route: ActivatedRoute, private router: Router, private loaderService: LoaderService, private snackbarService: SnackbarService, private questionService: QuestionService, private dialog: MatDialog) {
  }

  get currentQuestion() {
    return computed(() => this.test()?.questions?.[this.currentQuestionIndex()] ?? null);
  }

  submitTest() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: { message: 'Сигурни ли сте че искате да предадете теста?' }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.loaderService.showLoader();
        this.testService.submitTest().subscribe((score) => {
          this.submited = true;
          this.loaderService.hideLoader();
          this.snackbarService.showSuccess(`Тестът беше предаден! Резултат: ${score}/100`);
          this.router.navigate(['/tests']);
        }, (error) => {
          this.loaderService.hideLoader();
          this.snackbarService.showError("Неуспешно предаване!");
          this.router.navigate(["/tests"]);
        });
      }
    })
  }

  submitQuestion() {
    if (!this.answer) this.snackbarService.showError("Моля изберете отговор");
    else {
      this.questionService.submitQuestion(this.answer).subscribe((answer: Answer) => {
        this.testService.answers.update((v) => {
          v[this.currentQuestionIndex()] = this.answer;
          return v;
        });
        this.explanation = answer.explanation
        this.correct = answer.correct;
        this.answered = true;
        this.answeredCount++;
        this.progressValue = Math.round(this.answeredCount / (this.test()?.questions?.length ?? this.answeredCount) * 100);
      });
    }
  }

  resetFields() {
    this.answer = '';
    this.explanation = '';
    this.correct = null;
    this.answered = false;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.testService.testId.set(params["testId"]);
      this.currentQuestionIndex.set(params["question"] - 1);
      this.questionService.question.set(params["question"] - 1);
      this.testService.getTest().subscribe((test) => {
        this.test.set(test);
        if (this.testService.answers()[params["question"] - 1]) {
          this.answer = this.testService.answers()[params["question"] - 1];
          this.correct = test?.questions?.[params["question"] - 1].correctAnswer == this.answer;
          this.explanation = test?.questions?.[params["question"] - 1]?.explanation as String;
          this.answered = true;
        }
      })

    });
  }

  ngOnDestroy(): void {
    if (!this.submited) {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '400px',
        data: { message: 'Сигурни ли сте че искате да излезете от теста?' }
      });

      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.testService.testId.set("");
          this.testService.answers.set([]);
        }
        else {
          this.router.navigate([`/tests/${this.testService.testId()}/${this.currentQuestionIndex() + 1}`]);
        }
      });
    }
  }
}

