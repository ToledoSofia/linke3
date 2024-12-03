import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Cropper from 'cropperjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-image-cropper-dialog',
  templateUrl: './image-cropper-dialog.component.html',
  styleUrls: ['./image-cropper-dialog.component.css']
})
export class ImageCropperDialogComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  private cropper: Cropper | undefined;
  aspectRatio: number = 1;  // Default to square aspect ratio

  private readonly cloudName = 'djsvjbkpn';
  private readonly uploadPreset = 'linkepum';

  constructor(
    private dialogRef: MatDialogRef<ImageCropperDialogComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: { photoType: string }  
  ) {}

  ngOnInit(): void {
    this.aspectRatio = this.data.photoType === 'profile' ? 1 : 7;  
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.initializeCropper(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  initializeCropper(imageUrl: string): void {
    const image = document.getElementById('image') as HTMLImageElement;
    if (image) {
      image.src = imageUrl;
      this.cropper = new Cropper(image, {
        aspectRatio: this.aspectRatio,
        viewMode: 1,
        autoCropArea: 1
      });
    }
  }

  cropImage(): void {
    if (this.cropper) {
      const canvas = this.cropper.getCroppedCanvas();
      this.croppedImage = canvas.toDataURL();
      this.uploadImage();
    }
  }

  uploadImage(): void {
    if (this.croppedImage) {
      const formData = new FormData();
      formData.append('file', this.croppedImage);
      formData.append('upload_preset', this.uploadPreset);
  
      this.http.post<any>(`https://api.cloudinary.com/v1_1/${this.cloudName}/upload`, formData)
        .subscribe(
          response => {
            this.dialogRef.close(response.secure_url);
          },
          error => {
            console.error('Error al subir la imagen', error);
          }
        );
    }
  }
}
