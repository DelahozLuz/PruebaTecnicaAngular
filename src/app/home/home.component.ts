import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  apiURL: string = 'https://demos.issatec.com/Lobby-API-ACS/api';
  customerResult: any;
  //estado edición
  editOpen = false;
  fieldToEdit: 'FirstName' | 'LastName' | 'EMail' | 'PersonalId' | 'TelNumber1' | null = null;
  fieldLabel = '';                          
  initialValue = ''; 
  
  editForm: FormGroup = this.formBuilder.group({
    value: ['', Validators.required]
  });

  showConfirm = false;
  showSuccess = false;
  constructor(private http: HttpClient, private router: Router,private formBuilder: FormBuilder,) {}



  ngOnInit() {
    const usuario = JSON.parse(
      localStorage.getItem('authSession') || '{}'
    ).usuario;
    const contraseña = JSON.parse(
      localStorage.getItem('authSession') || '{}'
    ).contraseña;
    const sessionStr = localStorage.getItem('authSession');
    if (!sessionStr) {
      this.router.navigate(['/login']);
      return;
    }


    this.getCustomer(contraseña).subscribe((result)=> {
      this.customerResult = result;
    });
  }

  getCustomer(personalId: string) {
    return this.http.get<any>(`${this.apiURL}/Customer/GetCustomerByIdTypeId/${personalId}/17`);
  }

  updateCustomer(
   body:any
  ) {
    

    return this.http.post(
      `${this.apiURL}/Customer/UpdateCustomer`,
      body
    );
  }

    openEdit(field: 'FirstName'|'LastName'|'EMail'|'PersonalId'|'TelNumber1') {
    if (!this.customerResult) return;
    this.fieldToEdit = field;
    this.fieldLabel = this.mapLabel(field);                 
    this.initialValue = String(this.customerResult[field] ?? '');
    this.editForm.reset({ value: this.initialValue });     
    this.editOpen = true;   
    }
    
     closeEdit() {
    this.editOpen = false;
    this.fieldToEdit = null;
    this.fieldLabel = '';
    this.initialValue = '';
    this.editForm.reset({ value: '' });
    this.showConfirm = false;                              
    this.showSuccess = false;
  }
   get canSubmit() {
    const v = (this.editForm.get('value')?.value || '').trim();
    return v && v !== this.initialValue && this.editForm.valid;
  }

  submitEdit() {
    if (!this.canSubmit) return;
    this.showConfirm = true;
  }

  confirmUpdate() {
    if (!this.customerResult || !this.fieldToEdit) return;
    const v = this.editForm.get('value')?.value;

    const body = {
      Id: this.customerResult.Id,
      Sex: 0,
      IdTypeId: 17,
      EMail:   this.fieldToEdit === 'EMail'      ? v : this.customerResult.EMail,
      LastName:this.fieldToEdit === 'LastName'   ? v : this.customerResult.LastName,
      FirstName:this.fieldToEdit === 'FirstName' ? v : this.customerResult.FirstName,
      IdTypeName: 'CC',
      PersonalId:this.fieldToEdit === 'PersonalId' ? v : this.customerResult.PersonalId,
      TelNumber1:this.fieldToEdit === 'TelNumber1' ? v : this.customerResult.TelNumber1,
      TelNumber2: '',
      IsActive: true,
      DOB: '0001-01-01T00:00:00',
      CustomerLevelId: 0,
      CustomerLevelName: '',
      ExtRef: '',
    };

    this.updateCustomer(body).subscribe({
      next: () => {
        this.customerResult[this.fieldToEdit!] = v;
        this.showConfirm = false;
        this.showSuccess = true;
        setTimeout(() => { this.showSuccess = false; this.closeEdit(); }, 2000);
      },
      error: () => {
        this.showConfirm = false;
      }
    });
  }
    
  cancelUpdate() {
    this.editForm.patchValue({ value: this.initialValue });
    this.showConfirm = false;
  }


  mapLabel(f: string) {
    switch (f) {
      case 'FirstName': return 'Nombres';
      case 'LastName': return 'Apellidos';
      case 'EMail': return 'Email';
      case 'PersonalId': return 'Documento';
      case 'TelNumber1': return 'Teléfono';
      default: return '';
    }
  }

}
