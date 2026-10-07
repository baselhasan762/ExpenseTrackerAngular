import { Component, computed, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { IncomeService } from '../../services/income.service';

@Component({
  standalone: true,
  selector: 'app-expense-form',
  imports: [ReactiveFormsModule],
  templateUrl: './app-expense-form.html',
  styleUrl: './app-expense-form.css',
})
export class AppExpenseForm {
  private fb = inject(FormBuilder);
  saved = output<void>();
  closed = output<void>();
  private expenseService = inject(ExpenseService);
  private incomeService = inject(IncomeService);
  balance = computed(() => this.incomeService.totalIncome() - this.expenseService.totalSpent());

  categories = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Other'];
  submitted = false;

  form = this.fb.group({
    amount: [null as number | null, [Validators.required, Validators.min(0.01)]],
    category: ['', Validators.required],
    date: [this.today(), Validators.required],
    description: ['', Validators.maxLength(30)],
  });

  private today(): string {
    return new Date().toISOString().split('T')[0];
  }

  onSubmitExpense(): void {
    const { amount, category, date, description } = this.form.getRawValue();
    this.submitted = true;
    if (this.form.invalid || amount! > this.balance()) {
      this.form.markAllAsTouched();
      return;
    }

    this.expenseService.addExpense({
      amount: amount!,
      category: category!,
      date: date!,
      description: description!,
    });

    this.form.reset({
      amount: null,
      category: '',
      date: this.today(),
      description: '',
    });
    this.saved.emit();
  }
}
