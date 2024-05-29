import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../../../utils/supabase.service';
import { GlobalStateService } from '../../../utils/global-state.service';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'image-upload',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.css'
})
export class PruebaComponent {
  selectedFile: File | null = null;
  word: string;


  constructor(private fb: FormBuilder, private supabaseService: SupabaseService, private globalStateService: GlobalStateService) {
    this.word = '';

  }


  ngOnInit(): void {
    this.globalStateService.state$.subscribe(state => {
      this.word = state;
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
    const folderName = this.uploadForm.controls.description.value;
  }

}
