import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../../../utils/supabase.service';
import { AuthUserService } from '../../../utils/auth.service';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../../utils/posts.service';
import { UploadImage } from '../../interface/posts';


@Component({
  selector: 'image-upload',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {

  uploadForm = this.fb.group({
    description: ['', [Validators.required]],
    fileTo: ['', [Validators.required]]
  });

  userData: any;
  selectedImageSrc: string | ArrayBuffer | null = null;
  file: File = new File([], '');


  constructor(private fb: FormBuilder, private supabaseService: SupabaseService, private authUserService: AuthUserService, private postsService: PostsService) { }

  ngOnInit(): void {
    this.authUserService.userData$.subscribe(userData => {
      this.userData = userData;
    });
  }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.selectedImageSrc = e.target.result;
          this.file = file;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  uploadImage() {
    if (this.uploadForm.invalid) {
      alert('Debe llenar todos los campos');
      this.selectedImageSrc = null
      this.uploadForm.reset();
      return;
    }
    const description = this.uploadForm.get('description')?.value;
    const folderName = this.userData?.nickname?.toLowerCase().replace(' ', '_');
    const timestamp = Date.now();
    const originalFileName = this.file.name;
    const newFileName = `${timestamp}_${originalFileName}`;
    this.file = new File([this.file], newFileName, { type: this.file.type });
    this.supabaseService.upload(this.file, folderName).then(URL => {
      if (description) {
        const data: UploadImage = {
          uri_resource: URL,
          description: description,
          nickname: this.userData.nickname
        }
        this.postsService.createPost(data).then(() => {
          alert('Imagen subida correctamente');
        }).catch(e => {
          console.log(e);
          alert('Error al subir la imagen');
        }).finally(() => {
          this.uploadForm.reset();
          this.selectedImageSrc = null
        });
      }
    })

  }



}
