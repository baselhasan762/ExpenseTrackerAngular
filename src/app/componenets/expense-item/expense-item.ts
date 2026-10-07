import { Component, input } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Expense } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense.service';
import { inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
@Component({
  selector: 'app-expense-item',
  imports: [ReactiveFormsModule,DecimalPipe],
  templateUrl: './expense-item.html',
  styleUrl: './expense-item.css',
})
export class ExpenseItem {

  expense =input.required<Expense>();

  private fb = inject(FormBuilder);
  private expenseService = inject(ExpenseService);

  isEdititng = false;

  categories = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Other'];

  editForm = this.fb.group({
    amount:[0,[Validators.required,Validators.min(0.01)]],
    category:['',Validators.required],
    date:['',Validators.required],
    description:['',Validators.required]
  });

  startEdit():void{
    const e =this.expense();
    this.editForm.setValue({
      amount:e.amount,
      category:e.category,
      date:e.date,
      description:e.description
    });
    this.isEdititng = true;
  };
   cancelEdit():void{
    this.isEdititng = false;
   }

   saveEdit():void{
    if(this.editForm.invalid){
      this.editForm.markAllAsTouched();
      return;
    }
    this.expenseService.updateExpense(this.expense().id,this.editForm.getRawValue() as Partial<Omit<Expense,'id'>>);
    this.isEdititng = false;
   }

   deleteExpense():void{
    this.expenseService.deleteExpense(this.expense().id);
    
   }


  }
