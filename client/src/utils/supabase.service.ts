import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient(environment.supabase.url, environment.supabase.secret);
  }

  async upload(file: File, folderName: string = 'base') {
    const { error } = await this.supabase
      .storage
      .from('PostsBucketPublic')
      .upload(`${folderName}/${file.name}`, file);
    if (error) {
      alert(`Error al subir el archivo: ${error.message}`);
      console.error('Error al subir el archivo:', error);
    }
    const { data } = await this.supabase.storage.from('PostsBucketPublic').getPublicUrl(`${folderName}/${file.name}`);
    return data.publicUrl;
  }
}
