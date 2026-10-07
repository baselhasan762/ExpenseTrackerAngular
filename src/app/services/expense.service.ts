// src/app/services/expense.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { Expense } from '../models/expense.model';

const STORAGE_KEY = 'expenses';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private expensesSignal = signal<Expense[]>(this.loadFromStorage());

  expenses = this.expensesSignal.asReadonly();

  totalSpent = computed(() => this.expensesSignal().reduce((sum, e) => sum + e.amount, 0));
  totalTransactions = computed(() => this.expenses().length);
  averagePerTransaction = computed(() => {
    const count = this.totalTransactions();
    return count === 0 ? 0 : this.totalSpent() / count;
  });
  totalsByCategory = computed(() => {
    const totals: Record<string, number> = {};
    for (const e of this.expensesSignal()) {
      totals[e.category] = (totals[e.category] || 0) + e.amount;
    }
    return totals;
  });

  addExpense(expense: Omit<Expense, 'id'>): void {
    const newExpense: Expense = {
      ...expense,
      id: crypto.randomUUID(),
    };
    this.expensesSignal.update((list) => [...list, newExpense]);
    this.saveToStorage();
  }

  updateExpense(id: string, changes: Partial<Omit<Expense, 'id'>>): void {
    this.expensesSignal.update((list) => list.map((e) => (e.id === id ? { ...e, ...changes } : e)));
    this.saveToStorage();
  }

  deleteExpense(id: string): void {
    this.expensesSignal.update((list) => list.filter((e) => e.id !== id));
    this.saveToStorage();
  }

  private saveToStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.expensesSignal()));
  }

  private loadFromStorage(): Expense[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }
}
