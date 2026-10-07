import { Component, inject } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { DatePipe, DecimalPipe } from '@angular/common';
@Component({
  selector: 'app-expense-list',
  imports: [DatePipe, DecimalPipe],
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.css',
})
export class ExpenseList {
  expenseService = inject(ExpenseService);
}
