// src/app/services/income.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { Income } from '../models/income.model';

const STORAGE_KEY = 'incomes';

@Injectable({ providedIn: 'root' })
export class IncomeService {
  private incomesSignal = signal<Income[]>(this.loadFromStorage());
  incomes = this.incomesSignal.asReadonly();

  totalIncome = computed(() => this.incomesSignal().reduce((sum, i) => sum + i.amount, 0));

  addIncome(income: Omit<Income, 'id'>): void {
    const newIncome: Income = { ...income, id: crypto.randomUUID() };
    this.incomesSignal.update((list) => [...list, newIncome]);
    this.saveToStorage();
  }

  deleteIncome(id: string): void {
    this.incomesSignal.update((list) => list.filter((i) => i.id !== id));
    this.saveToStorage();
  }

  private saveToStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.incomesSignal()));
  }

  private loadFromStorage(): Income[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }
}
