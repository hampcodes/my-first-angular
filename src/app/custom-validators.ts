import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {

  // Validador para nombres (solo letras y espacios)
  static nameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
      const valid = nameRegex.test(control.value);

      return valid ? null : { invalidName: { value: control.value } };
    };
  }

  // Validador para edad adulta (mayor de edad)
  static adultAgeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const age = parseInt(control.value, 10);

      if (age < 18) {
        return { notAdult: { minAge: 18, actualAge: age } };
      }

      if (age > 120) {
        return { unrealisticAge: { maxAge: 120, actualAge: age } };
      }

      return null;
    };
  }

  // Validador para email corporativo
  static corporateEmailValidator(domains: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const email = control.value.toLowerCase();
      const emailDomain = email.split('@')[1];

      if (!emailDomain) {
        return { invalidEmail: true };
      }

      const isValidDomain = domains.some(domain => emailDomain === domain);

      return isValidDomain ? null : {
        corporateEmail: {
          allowedDomains: domains,
          providedDomain: emailDomain
        }
      };
    };
  }

  // Validador para teléfono peruano
  static peruvianPhoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const phoneRegex = /^9\d{8}$/;
      const valid = phoneRegex.test(control.value);

      return valid ? null : {
        invalidPeruvianPhone: {
          message: 'Debe ser un número válido (9 dígitos, comenzando con 9)'
        }
      };
    };
  }

  // Validador para no permitir espacios en blanco
  static noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const isWhitespace = (control.value || '').trim().length === 0;
      return isWhitespace ? { whitespace: true } : null;
    };
  }

  // Validador para contraseña fuerte
  static strongPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const password = control.value;
      const errors: any = {};

      // Verificar longitud mínima
      if (password.length < 8) {
        errors.minLength = true;
      }

      // Verificar mayúscula
      if (!/[A-Z]/.test(password)) {
        errors.requiresUppercase = true;
      }

      // Verificar minúscula
      if (!/[a-z]/.test(password)) {
        errors.requiresLowercase = true;
      }

      // Verificar número
      if (!/[0-9]/.test(password)) {
        errors.requiresNumber = true;
      }

      // Verificar carácter especial
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.requiresSpecialChar = true;
      }

      return Object.keys(errors).length > 0 ? { weakPassword: errors } : null;
    };
  }

  // Validador para comparar dos campos (ej: confirmar contraseña)
  static matchFields(fieldName: string, matchingFieldName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const field = formGroup.get(fieldName);
      const matchingField = formGroup.get(matchingFieldName);

      if (!field || !matchingField) {
        return null;
      }

      if (matchingField.errors && !matchingField.errors['fieldsMismatch']) {
        return null;
      }

      if (field.value !== matchingField.value) {
        matchingField.setErrors({ fieldsMismatch: true });
        return { fieldsMismatch: true };
      } else {
        matchingField.setErrors(null);
        return null;
      }
    };
  }
}
