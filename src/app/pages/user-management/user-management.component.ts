import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html'
})
export class UserManagementComponent implements OnInit {
  private userService = inject(UserService);
  private profileService = inject(ProfileService);
  private cdr = inject(ChangeDetectorRef);

  users: any[] = [];
  availableProfiles: any[] = [];
  isLoading = true;
  
  showForm = false;
  editingId: string | null = null;
  
  formData: any = {
    firstName: '',
    lastName: '',
    email: '',
    taxId: '',
    active: true,
    profiles: []
  };

  ngOnInit() {
    this.loadUsers();
    this.loadProfiles();
  }

  loadProfiles() {
    this.profileService.getProfiles().subscribe(data => {
      this.availableProfiles = data;
      this.cdr.detectChanges();
    });
  }

  loadUsers() {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
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
    this.formData = { firstName: '', lastName: '', email: '', taxId: '', active: true, profiles: [] };
    this.showForm = true;
  }

  editUser(user: any) {
    this.editingId = user.id;
    this.formData = { ...user };
    this.showForm = true;
  }

  viewDetails(user: any) {
    alert(`Detalhes do Utilizador:\nNome: ${user.firstName} ${user.lastName}\nEmail: ${user.email}\nNUIT: ${user.taxId}\nEstado: ${user.active ? 'Activo' : 'Inactivo'}`);
  }

  toggleStatus(user: any) {
    const action = user.active ? 'inactivar' : 'restaurar';
    if(confirm(`Tem a certeza que deseja ${action} este utilizador?`)) {
      const updatedUser = { ...user, active: !user.active };
      this.userService.updateUser(user.id, updatedUser).subscribe(() => this.loadUsers());
    }
  }

  deleteUser(id: string) {
    if(confirm('Tem a certeza que deseja eliminar este utilizador?')) {
      this.userService.deleteUser(id).subscribe(() => this.loadUsers());
    }
  }

  cancelForm() {
    this.showForm = false;
  }

  saveUser() {
    if (this.editingId) {
      this.userService.updateUser(this.editingId, this.formData).subscribe({
        next: () => {
          this.showForm = false;
          this.loadUsers();
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao guardar utilizador: ' + (err.error?.message || err.message));
        }
      });
    } else {
      this.userService.createUser(this.formData).subscribe({
        next: () => {
          this.showForm = false;
          this.loadUsers();
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao guardar utilizador: ' + (err.error?.message || err.message));
        }
      });
    }
  }

  toggleProfile(profile: any) {
    const exists = this.formData.profiles.findIndex((p: any) => p.id === profile.id);
    if (exists !== -1) {
      this.formData.profiles.splice(exists, 1);
    } else {
      this.formData.profiles.push(profile);
    }
  }

  hasProfile(profileId: string): boolean {
    return this.formData.profiles?.some((p: any) => p.id === profileId);
  }
}
