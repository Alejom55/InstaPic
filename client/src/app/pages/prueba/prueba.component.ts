import { Component } from '@angular/core';
import axios from 'axios';
@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.css'
})
export class PruebaComponent {
  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async onUpload() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile, this.selectedFile.name);

      try {
        const response = await axios.post<{ imageUrl: string }>('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log('Image URL:', response.data.imageUrl);
        // Aquí puedes manejar la URL recibida, como almacenarla en la base de datos.
      } catch (error) {
        console.error('Error uploading the image', error);
      }
    }
  }

}
