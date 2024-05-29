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

  uploadForm = this.fb.group({
    description: ['', [Validators.required]],
    fileTo: ['']
  });

  userData: any;
  constructor(private fb: FormBuilder, private supabaseService: SupabaseService, private authUserService: AuthUserService) {

  }

  ngOnInit(): void {
    this.authUserService.userData$.subscribe(userData => {
      this.userData = userData;
    });
  }


  onFileSelected(event: any) {
    if (this.uploadForm.invalid) {
      alert('Debe llenar todos los campos')
      this.uploadForm.reset()
      return;
    }
    const description = this.uploadForm.get('description')?.value;
    console.log('Descripción:', description);
    const folderName = this.userData?.nickname?.toLowerCase().replace(' ', '_');
    const file: File = event.target.files[0];
    this.supabaseService.upload(file, folderName).then(data => {
      console.log(data);
      this.uploadForm.reset();
    })
  }

}
