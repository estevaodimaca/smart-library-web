import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-management.component.html'
})
export class TransactionManagementComponent implements OnInit {
  private transactionService = inject(TransactionService);
  private cdr = inject(ChangeDetectorRef);

  transactions: any[] = [];
  isLoading = true;
  
  showForm = false;
  editingId: string | null = null;
  
  formData: any = {
    name: '',
    route: '',
    icon: ''
  };

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.isLoading = true;
    this.transactionService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  openNewForm() {
    this.editingId = null;
    this.formData = { name: '', route: '', icon: '' };
    this.showForm = true;
  }

  editTransaction(transaction: any) {
    this.editingId = transaction.id;
    this.formData = { ...transaction };
    this.showForm = true;
  }

  viewDetails(transaction: any) {
    alert(`Detalhes da Transacção:\nNome: ${transaction.name}\nRota: ${transaction.route}\nÍcone: ${transaction.icon}`);
  }

  deleteTransaction(id: string) {
    if(confirm('Tem a certeza que deseja eliminar esta transacção?')) {
      this.transactionService.deleteTransaction(id).subscribe(() => this.loadTransactions());
    }
  }

  cancelForm() {
    this.showForm = false;
  }

  saveTransaction() {
    if (this.editingId) {
      this.transactionService.updateTransaction(this.editingId, this.formData).subscribe({
        next: () => {
          this.showForm = false;
          this.loadTransactions();
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao guardar transacção: ' + (err.error?.message || err.message));
        }
      });
    } else {
      this.transactionService.createTransaction(this.formData).subscribe({
        next: () => {
          this.showForm = false;
          this.loadTransactions();
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao guardar transacção: ' + (err.error?.message || err.message));
        }
      });
    }
  }
}
