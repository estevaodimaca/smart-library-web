import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-profile-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-management.component.html'
})
export class ProfileManagementComponent implements OnInit {
  private profileService = inject(ProfileService);
  private transactionService = inject(TransactionService);
  private cdr = inject(ChangeDetectorRef);

  profiles: any[] = [];
  availableTransactions: any[] = [];
  isLoading = true;
  
  showForm = false;
  editingId: string | null = null;
  
  formData: any = {
    name: '',
    transactions: []
  };

  ngOnInit() {
    this.loadProfiles();
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getTransactions().subscribe(data => {
      this.availableTransactions = data;
      this.cdr.detectChanges();
    });
  }

  loadProfiles() {
    this.isLoading = true;
    this.profileService.getProfiles().subscribe({
      next: (data) => {
        this.profiles = data;
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
    this.formData = { name: '', transactions: [] };
    this.showForm = true;
  }

  editProfile(profile: any) {
    this.editingId = profile.id;
    this.formData = { ...profile };
    this.showForm = true;
  }

  viewDetails(profile: any) {
    const transNames = profile.transactions?.map((t:any) => t.name).join(', ') || 'Nenhuma';
    alert(`Detalhes do Perfil:\nNome: ${profile.name}\nTransacções Associadas: ${transNames}`);
  }

  deleteProfile(id: string) {
    if(confirm('Tem a certeza que deseja eliminar este perfil?')) {
      this.profileService.deleteProfile(id).subscribe(() => this.loadProfiles());
    }
  }

  cancelForm() {
    this.showForm = false;
  }

  saveProfile() {
    if (this.editingId) {
      this.profileService.updateProfile(this.editingId, this.formData).subscribe({
        next: () => {
          this.showForm = false;
          this.loadProfiles();
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao guardar perfil: ' + (err.error?.message || err.message));
        }
      });
    } else {
      this.profileService.createProfile(this.formData).subscribe({
        next: () => {
          this.showForm = false;
          this.loadProfiles();
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao guardar perfil: ' + (err.error?.message || err.message));
        }
      });
    }
  }

  toggleTransaction(transaction: any) {
    const exists = this.formData.transactions.findIndex((t: any) => t.id === transaction.id);
    if (exists !== -1) {
      this.formData.transactions.splice(exists, 1);
    } else {
      this.formData.transactions.push(transaction);
    }
  }

  hasTransaction(transactionId: string): boolean {
    return this.formData.transactions?.some((t: any) => t.id === transactionId);
  }
}
