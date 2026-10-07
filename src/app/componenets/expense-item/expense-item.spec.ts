import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseItem } from './expense-item';

describe('ExpenseItem', () => {
  let component: ExpenseItem;
  let fixture: ComponentFixture<ExpenseItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseItem);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('expense', {
      id: 'test-expense',
      amount: 10,
      category: 'Food',
      date: '2026-01-01',
      description: 'Test expense',
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
