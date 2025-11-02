import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
 selector: 'app-user-profile',
 standalone: true,
 imports: [CommonModule],
 template: `
    <div class="user-card">
      <h2>Perfil de Usuario</h2>

      <!-- Leer signals con () -->
      <p><strong>Nombre:</strong> {{ userName() }}</p>
      <p><strong>Edad:</strong> {{ age() }}</p>
      <p><strong>Email:</strong> {{ email() }}</p>
      <p><strong>Estado:</strong> {{ isActive() ? 'Activo' : 'Inactivo' }}</p>

      <!-- Computed signal -->
      <p><strong>Info Completa:</strong> {{ fullInfo() }}</p>

      <button (click)="updateProfile()">Actualizar Perfil</button>
      <button (click)="sendEmail()">Enviar Email</button>
      <button (click)="incrementAge()">Aumentar Edad</button>
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
  // Signals básicos
  userName = signal('Juan Pérez');
  age = signal(28);
  email = signal('juan.perez@example.com');
  isActive = signal(true);

  // Computed signal - se calcula automáticamente
  fullInfo = computed(() => {
    return `${this.userName()} - ${this.age()} años`;
  });

  updateProfile(): void {
    // Usar .set() para cambiar el valor
    this.userName.set('Juan Carlos Pérez');
    console.log('Perfil actualizado');
  }

  sendEmail(): void {
    console.log(`Enviando email a: ${this.email()}`);
  }

  incrementAge(): void {
    // Usar .update() para modificar basándose en el valor actual
    this.age.update(currentAge => currentAge + 1);
  }
}
