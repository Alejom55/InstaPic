import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../../../utils/supabase.service';
import { AuthUserService } from '../../../utils/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'image-upload',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.css'
})
export class PruebaComponent {
  selectedFile: File | null = null;
  userData: any;

  constructor(private fb: FormBuilder, private supabaseService: SupabaseService, private authUserService: AuthUserService) {

  }

  ngOnInit(): void {
    this.authUserService.userData$.subscribe(userData => {
      this.userData = userData;
    });
  }

  uploadForm = this.fb.group({
    description: ['', [Validators.required]],
    file: ['']
  });
  onFileSelected(event: any) {
    if (this.uploadForm.invalid) {
      alert('Debe llenar todos los campos')
      this.uploadForm.reset()
      return;
    }
    const folderName = this.userData.nickname.toLowerCase().replace(' ', '_');
    const file:File = event.target.files[0];
    this.supabaseService.upload(file, folderName).then(data =>{
      console.log(data);
      this.uploadForm.reset();
    })

  }

}
