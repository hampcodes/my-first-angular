import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
 selector: 'app-user-profile',
 standalone: true,
 imports: [CommonModule],
 template: `
    <div class="user-card">
      <h2>Perfil de Usuario</h2>

      <p><strong>Nombre:</strong> {{ userName }}</p>
      <p><strong>Edad:</strong> {{ age }}</p>
      <p><strong>Email:</strong> {{ email }}</p>
      <p><strong>Estado:</strong> {{ isActive ? 'Activo' : 'Inactivo' }}</p>

      <button (click)="updateProfile()">Actualizar Perfil</button>
      <button (click)="sendEmail()">Enviar Email</button>
    </div>
 `,
 styles: [
  `
    .user-card {
      border: 2px solid #3f51b5;
      border-radius: 8px;
      padding: 20px;
      max-width: 400px;
      margin: 20px auto;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    h2 {
      color: #3f51b5;
      margin-top: 0;
    }

    button {
      background-color: #3f51b5;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      margin-right: 10px;
      cursor: pointer;
    }

    button:hover {
      background-color: #303f9f;
    }
  `
 ]
})
export class UserProfileComponent {
  userName: string = 'Juan Pérez';
  age: number = 28;
  email: string = 'juan.perez@example.com';
  isActive: boolean = true;

  updateProfile(): void {
    this.userName = 'Juan Carlos Pérez';
    console.log('Perfil actualizado');
  }

  sendEmail(): void {
    console.log(`Enviando email a: ${this.email}`);
  }
}
