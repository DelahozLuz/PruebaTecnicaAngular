import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';


interface AuthSession {
  usuario: string;
  contraseña: string;
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})

export class LoginComponent {
  formGroup!: FormGroup;
  isValid: boolean = false;
 private static readonly VALID_PASSWORD = '1001853248';
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.formGroup= this.formBuilder.group({
    usuario: new FormControl('', [Validators.required]),
    contraseña: new FormControl('', [
      Validators.required,
      this.passwordValidator
    ]),

  });

  }

   passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = String(control.value ?? '');
    return value === LoginComponent.VALID_PASSWORD ? null : { invalidPassword: true };
    
  }

  ngOnInit() {
   this.getFormChanges('contraseña', this.formGroup, () => {});
  }

 
  goToHome() {
        if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    const payload: AuthSession = {
      usuario: this.formGroup.value.usuario,
      contraseña: this.formGroup.value.contraseña,
    };
    localStorage.setItem('authSession', JSON.stringify(payload));
    this.router.navigate(['/home']);
  }

  getFormChanges(control: string, formGroup: FormGroup, fn: any) {
    const observable = formGroup.get(control);
    if (observable != null) {
      observable.valueChanges.subscribe({
        next: fn,
      });
    }
  }

  get usuarioCtrl() { return this.formGroup.get('usuario'); }
  get contrasenaCtrl() { return this.formGroup.get('contraseña'); }
}
