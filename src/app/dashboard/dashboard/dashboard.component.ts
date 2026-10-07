import { Component, inject, computed } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { DecimalPipe } from '@angular/common';
import { IncomeService } from '../../services/income.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  expensesService = inject(ExpenseService);
  incomeService = inject(IncomeService);

  balance = computed(() => this.incomeService.totalIncome() - this.expensesService.totalSpent());
  categoryBreakdown = computed(() => {
    const total = this.expensesService.totalSpent();
    const totals = this.expensesService.totalsByCategory();
    return Object.entries(totals)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: total ? Math.round((amount / total) * 100) : 0,
      }))
      .sort((a, b) => b.amount - a.amount);
  });
}
