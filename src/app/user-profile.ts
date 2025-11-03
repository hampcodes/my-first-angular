import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from './user';

@Component({
 selector: 'app-user-profile',
 standalone: true,
 imports: [CommonModule],
 template: `
   <div class="user-card">
      <h2>Perfil de Usuario</h2>

      <!-- Acceder a propiedades del signal de objeto -->
      <p><strong>ID:</strong> {{ user().id }}</p>
      <p><strong>Nombre:</strong> {{ user().userName }}</p>
      <p><strong>Edad:</strong> {{ user().age }}</p>
      <p><strong>Email:</strong> {{ user().email }}</p>
      <p><strong>Estado:</strong> {{ user().isActive ? 'Activo' : 'Inactivo' }}</p>
      <p><strong>Rol:</strong> {{ user().role || 'No asignado' }}</p>

      <!-- Computed signals -->
      <p><strong>Info Completa:</strong> {{ fullInfo() }}</p>
      <p><strong>Categoría de Edad:</strong> {{ ageCategory() }}</p>

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
   // Signal con objeto tipado (modelo User)
  user = signal<User>({
    id: 1,
    userName: 'Juan Pérez',
    age: 28,
    email: 'juan.perez@example.com',
    isActive: true,
    role: 'Usuario'
  });

  // Computed signals que usan el modelo
  fullInfo = computed(() => {
    const currentUser = this.user();
    return `${currentUser.userName} - ${currentUser.age} años - ${currentUser.email}`;
  });

  ageCategory = computed(() => {
    const age = this.user().age;
    if (age < 18) return 'Menor';
    if (age < 65) return 'Adulto';
    return 'Senior';
  });

  // Métodos para modificar el signal con modelo

  updateProfile(): void {
    // Actualizar propiedades específicas
    this.user.set({
      ...this.user(),// Copia TODAS las propiedades del objeto actual. operador de propagación (...) spread
      userName: 'Juan Carlos Pérez', // Sobrescribe solo userName
      email: 'juancarlos.perez@example.com'// Sobrescribe solo email
    });
    console.log('Perfil actualizado');
  }

  sendEmail(): void {
    console.log(`Enviando email a: ${this.user().email}`);
  }

  incrementAge(): void {
    // Usar update para modificar una propiedad
    this.user.update(currentUser => ({
      ...currentUser,
      age: currentUser.age + 1
    }));
  }
}
