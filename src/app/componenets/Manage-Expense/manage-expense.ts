import { Component, inject, computed, signal, effect, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { FormBuilder } from '@angular/forms';
import { IncomeService } from '../../services/income.service';
import { AppIncomeForm } from '../app-income-form/app-income-form';
import { AppExpenseForm } from '../app-expense-form/app-expense-form';
@Component({
  selector: 'manage-expense',
  standalone: true,
  imports: [ReactiveFormsModule, AppIncomeForm, AppExpenseForm],
  templateUrl: './manage-expense.html',
  styleUrl: './manage-expense.css',
})
export class ManageExpense {
  openModal = signal<'income' | 'expense' | null>(null);
  saved = output<void>();

  constructor() {
    effect(() => {
      document.body.style.overflow = this.openModal() ? 'hidden' : '';
    });
  }
}
