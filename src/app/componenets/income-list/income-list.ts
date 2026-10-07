import { Component, inject, signal } from '@angular/core';
import { IncomeService } from '../../services/income.service';
import { DatePipe, DecimalPipe } from '@angular/common';
@Component({
  selector: 'app-income-list',
  imports: [DatePipe, DecimalPipe],
  templateUrl: './income-list.html',
  styleUrl: './income-list.css',
})
export class IncomeList {
  incomeService = inject(IncomeService);
  showIncome = signal(false);
  toggleIncome() {
    this.showIncome.update((v) => !v);
  }
}
