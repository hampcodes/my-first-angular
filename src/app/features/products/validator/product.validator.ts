import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ProductValidator {

  // Validador para precio (debe ser mayor a 0)
  static priceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const price = parseFloat(control.value);

      if (price <= 0) {
        return { invalidPrice: { message: 'El precio debe ser mayor a 0' } };
      }

      if (price > 1000000) {
        return { invalidPrice: { message: 'El precio es demasiado alto' } };
      }

      return null;
    };
  }

  // Validador para título (sin números al inicio)
  static titleValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const startsWithNumber = /^\d/.test(control.value);

      if (startsWithNumber) {
        return { invalidTitle: { message: 'El título no puede empezar con números' } };
      }

      return null;
    };
  }

  // Validador para URL de imagen
  static imageUrlValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      const isValidUrl = urlPattern.test(control.value);

      if (!isValidUrl) {
        return { invalidImageUrl: { message: 'URL de imagen inválida' } };
      }

      return null;
    };
  }

  // Validador para descripción (longitud mínima y máxima)
  static descriptionValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const length = control.value.trim().length;

      if (length < 10) {
        return { shortDescription: { message: 'La descripción debe tener al menos 10 caracteres' } };
      }

      if (length > 500) {
        return { longDescription: { message: 'La descripción no puede exceder 500 caracteres' } };
      }

      return null;
    };
  }
}
