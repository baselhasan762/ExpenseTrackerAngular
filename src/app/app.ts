import { Component, signal } from '@angular/core';
import { ExpenseList } from './componenets/expense-list/expense-list';
import { IncomeList } from './componenets/income-list/income-list';

import { Dashboard } from './dashboard/dashboard/dashboard.component';
import { ManageExpense } from './componenets/Manage-Expense/manage-expense';
@Component({
  selector: 'app-root',
  imports: [ExpenseList, Dashboard, ManageExpense, IncomeList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular-ngrx-expense-tracker');
}
