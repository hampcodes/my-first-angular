import { Component, computed, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from './user';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="container">
      <h2>Gestión de Usuarios</h2>

      <!-- Formulario reactivo -->
      <div class="add-user">
        <h3>Agregar Usuario</h3>
        <form [formGroup]="userForm" (ngSubmit)="addUser()">
          <div class="form-group">
            <input
              type="text"
              formControlName="userName"
              placeholder="Nombre completo"
              [class.error]="userName?.invalid && userName?.touched">

            @if (userName?.invalid && userName?.touched) {
              @if (userName?.hasError('required')) {
                <span class="error-message">El nombre es requerido</span>
              }
              @if (userName?.hasError('minlength')) {
                <span class="error-message">Mínimo 3 caracteres</span>
              }
              @if (userName?.hasError('invalidName')) {
                <span class="error-message">Solo se permiten letras y espacios</span>
              }
              @if (userName?.hasError('whitespace')) {
                <span class="error-message">El nombre no puede estar vacío</span>
              }
            }
          </div>

          <div class="form-group">
            <input
              type="number"
              formControlName="age"
              placeholder="Edad"
              [class.error]="age?.invalid && age?.touched">

            @if (age?.invalid && age?.touched) {
              @if (age?.hasError('required')) {
                <span class="error-message">La edad es requerida</span>
              }
              @if (age?.hasError('notAdult')) {
                <span class="error-message">Debes ser mayor de 18 años</span>
              }
              @if (age?.hasError('unrealisticAge')) {
                <span class="error-message">La edad debe ser menor a 120 años</span>
              }
            }
          </div>

          <div class="form-group">
            <input
              type="email"
              formControlName="email"
              placeholder="Email"
              [class.error]="email?.invalid && email?.touched">

            @if (email?.invalid && email?.touched) {
              @if (email?.hasError('required')) {
                <span class="error-message">El email es requerido</span>
              }
              @if (email?.hasError('email')) {
                <span class="error-message">Formato de email inválido</span>
              }
              @if (email?.hasError('corporateEmail')) {
                <span class="error-message">
                  Solo se permiten emails corporativos (@empresa.com, @company.pe)
                </span>
              }
            }
          </div>

          <div class="form-group">
            <input
              type="text"
              formControlName="phone"
              placeholder="Teléfono (ej: 987654321)"
              [class.error]="phone?.invalid && phone?.touched">

            @if (phone?.invalid && phone?.touched) {
              @if (phone?.hasError('required')) {
                <span class="error-message">El teléfono es requerido</span>
              }
              @if (phone?.hasError('invalidPeruvianPhone')) {
                <span class="error-message">{{ phone?.errors?.['invalidPeruvianPhone'].message }}</span>
              }
            }
          </div>

          <!-- Campo Password -->
          <div class="form-group">
            <input
              type="password"
              formControlName="password"
              placeholder="Contraseña"
              [class.error]="password?.invalid && password?.touched">

            @if (password?.invalid && password?.touched) {
              @if (password?.hasError('required')) {
                <span class="error-message">La contraseña es requerida</span>
              }
              @if (password?.hasError('minlength')) {
                <span class="error-message">Mínimo 8 caracteres</span>
              }
              @if (password?.hasError('weakPassword')) {
                <div class="error-message">
                  <p>La contraseña debe contener:</p>
                  <ul>
                    @if (password?.errors?.['weakPassword']?.minLength) {
                      <li>Al menos 8 caracteres</li>
                    }
                    @if (password?.errors?.['weakPassword']?.requiresUppercase) {
                      <li>Al menos una mayúscula</li>
                    }
                    @if (password?.errors?.['weakPassword']?.requiresLowercase) {
                      <li>Al menos una minúscula</li>
                    }
                    @if (password?.errors?.['weakPassword']?.requiresNumber) {
                      <li>Al menos un número</li>
                    }
                    @if (password?.errors?.['weakPassword']?.requiresSpecialChar) {
                      <li>Al menos un carácter especial (!@#$%...)</li>
                    }
                  </ul>
                </div>
              }
            }
          </div>

          <!-- Campo Confirmar Password -->
          <div class="form-group">
            <input
              type="password"
              formControlName="confirmPassword"
              placeholder="Confirmar contraseña"
              [class.error]="confirmPassword?.invalid && confirmPassword?.touched">

            @if (confirmPassword?.invalid && confirmPassword?.touched) {
              @if (confirmPassword?.hasError('required')) {
                <span class="error-message">Debe confirmar la contraseña</span>
              }
              @if (confirmPassword?.hasError('fieldsMismatch')) {
                <span class="error-message">Las contraseñas no coinciden</span>
              }
            }
          </div>

          <div class="form-group">
            <select formControlName="role">
              <option value="">Seleccionar rol</option>
              <option value="Usuario">Usuario</option>
              <option value="Administrador">Administrador</option>
              <option value="Moderador">Moderador</option>
            </select>
          </div>

          <button
            type="submit"
            [disabled]="userForm.invalid">
            Agregar Usuario
          </button>
        </form>
      </div>

      <!-- Mostrar estadísticas -->
      <div class="stats">
        <p><strong>Total de usuarios:</strong> {{ users().length }}</p>
        <p><strong>Usuarios activos:</strong> {{ activeUsersCount() }}</p>
        <p><strong>Edad promedio:</strong> {{ averageAge() }} años</p>
      </div>

      <!-- Lista de usuarios -->
      @for (user of users(); track user.id) {
        <div class="user-card">
          <div class="user-info">
            <p><strong>ID:</strong> {{ user.id }}</p>
            <p><strong>Nombre:</strong> {{ user.userName }}</p>
            <p><strong>Edad:</strong> {{ user.age }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p><strong>Teléfono:</strong> {{ user.phone }}</p>
            <p><strong>Estado:</strong>
              <span [class.active]="user.isActive">
                {{ user.isActive ? 'Activo' : 'Inactivo' }}
              </span>
            </p>
            <p><strong>Rol:</strong> {{ user.role || 'No asignado' }}</p>
          </div>

          <div class="actions">
            <button (click)="incrementAge(user.id)">➕ Edad</button>
            <button (click)="deleteUser(user.id)" class="delete">🗑️ Eliminar</button>
          </div>
        </div>
      } @empty {
        <p class="empty-message">No hay usuarios registrados</p>
      }
    </div>
  `,
  styles: [
    `
    .container {
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
    }

    .add-user {
      background-color: #e8f5e9;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      border: 2px solid #4caf50;
    }

    .add-user h3 {
      margin-top: 0;
      color: #2e7d32;
    }

    .form-group {
      margin-bottom: 15px;
    }

    input, select {
      display: block;
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
      font-size: 14px;
    }

    input.error, select.error {
      border-color: #f44336;
    }

    .error-message {
      color: #f44336;
      font-size: 12px;
      margin-top: 5px;
      display: block;
    }

    .error-message ul {
      margin: 5px 0;
      padding-left: 20px;
    }

    .error-message li {
      margin: 3px 0;
    }

    .stats {
      background-color: #e3f2fd;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .user-card {
      border: 2px solid #3f51b5;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 15px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .user-info p {
      margin: 8px 0;
    }

    .active {
      color: green;
      font-weight: bold;
    }

    .actions {
      display: flex;
      gap: 10px;
      margin-top: 15px;
    }

    button {
      background-color: #3f51b5;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }

    button:hover:not(:disabled) {
      background-color: #303f9f;
    }

    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    button.delete {
      background-color: #f44336;
    }

    button.delete:hover {
      background-color: #d32f2f;
    }

    .empty-message {
      text-align: center;
      color: #999;
      font-style: italic;
      padding: 40px;
    }
  `
  ]
})
export class UserProfileComponent {
  userForm: FormGroup;

  // Signal con ARRAY de usuarios
  users = signal<User[]>([
    {
      id: 1,
      userName: 'Juan Pérez',
      age: 28,
      email: 'juan.perez@empresa.com',
      phone: '987654321',
      password: 'Password123!',
      isActive: true,
      role: 'Administrador'
    },
    {
      id: 2,
      userName: 'María García',
      age: 32,
      email: 'maria.garcia@empresa.com',
      phone: '912345678',
      password: 'SecurePass456!',
      isActive: true,
      role: 'Usuario'
    },
    {
      id: 3,
      userName: 'Pedro López',
      age: 45,
      email: 'pedro.lopez@company.pe',
      phone: '998877665',
      password: 'MyPass789!',
      isActive: false,
      role: 'Usuario'
    }
  ]);

  // Computed signals para estadísticas
  activeUsersCount = computed(() =>
    this.users().filter(user => user.isActive).length
  );

  averageAge = computed(() => {
    const allUsers = this.users();
    if (allUsers.length === 0) return 0;
    const sum = allUsers.reduce((acc, user) => acc + user.age, 0);
    return Math.round(sum / allUsers.length);
  });

  constructor(private fb: FormBuilder) {
    // Inicializar formulario con validaciones personalizadas
    this.userForm = this.fb.group({
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          CustomValidators.nameValidator(),
          CustomValidators.noWhitespaceValidator()
        ]
      ],
      age: [
        '',
        [
          Validators.required,
          CustomValidators.adultAgeValidator()
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          CustomValidators.corporateEmailValidator(['empresa.com', 'company.pe'])
        ]
      ],
      phone: [
        '',
        [
          Validators.required,
          CustomValidators.peruvianPhoneValidator()
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          CustomValidators.strongPasswordValidator()
        ]
      ],
      confirmPassword: [
        '',
        [
          Validators.required
        ]
      ],
      role: ['Usuario', Validators.required]
    }, {
      // Validador a nivel de formulario para comparar passwords
      validators: CustomValidators.matchFields('password', 'confirmPassword')
    });
  }

  // Getters para acceder fácilmente a los controles
  get userName() {
    return this.userForm.get('userName');
  }

  get age() {
    return this.userForm.get('age');
  }

  get email() {
    return this.userForm.get('email');
  }

  get phone() {
    return this.userForm.get('phone');
  }

  get password() {
    return this.userForm.get('password');
  }

  get confirmPassword() {
    return this.userForm.get('confirmPassword');
  }

  // AGREGAR nuevo usuario
  addUser(): void {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;

      const newUser: User = {
        id: Date.now(),
        userName: formValue.userName,
        age: formValue.age,
        email: formValue.email,
        phone: formValue.phone,
        password: formValue.password, // ✅ En producción, esto debe hashearse
        isActive: true,
        role: formValue.role
      };

      this.users.update(current => [...current, newUser]);

      // Resetear el formulario
      this.userForm.reset({
        role: 'Usuario'
      });
    }
  }

  // ELIMINAR usuario por ID
  deleteUser(id: number): void {
    this.users.update(current =>
      current.filter(user => user.id !== id)
    );
  }

  // INCREMENTAR edad de un usuario específico
  incrementAge(id: number): void {
    this.users.update(current =>
      current.map(user =>
        user.id === id
          ? { ...user, age: user.age + 1 }
          : user
      )
    );
  }

  // ACTUALIZAR perfil completo de un usuario
  updateUserProfile(id: number, updates: Partial<User>): void {
    this.users.update(current =>
      current.map(user =>
        user.id === id
          ? { ...user, ...updates }
          : user
      )
    );
  }
}
