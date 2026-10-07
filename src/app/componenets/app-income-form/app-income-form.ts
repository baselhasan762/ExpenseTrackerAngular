import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IncomeService } from '../../services/income.service';

@Component({
  standalone: true,
  selector: 'app-income-form',
  imports: [ReactiveFormsModule],
  templateUrl: './app-income-form.html',
  styleUrl: './app-income-form.css',
})
export class AppIncomeForm {
  private fb = inject(FormBuilder);
  private incomeService = inject(IncomeService);
  submitted = false;
  saved = output<void>();
  closed = output<void>();

  form = this.fb.group({
    amount: [null as number | null, [Validators.required, Validators.min(0.01)]],
    source: ['', Validators.required],
    date: [this.today(), Validators.required],
    description: ['', Validators.maxLength(30)],
  });

  private today(): string {
    return new Date().toISOString().split('T')[0];
  }

  onSubmitIncome(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitted = true;

    console.log('hi my name is popo pepa');
    const { amount, source, date, description } = this.form.getRawValue();

    this.incomeService.addIncome({
      amount: amount!,
      source: source!,
      date: date!,
      description: description ?? '',
    });

    this.form.reset({
      amount: null,
      source: '',
      date: this.today(),
      description: '',
    });
    this.saved.emit();
  }
}
