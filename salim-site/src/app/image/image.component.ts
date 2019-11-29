import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { PictureService } from '../services/picture.service';
import { AdminService } from '../services/admin.service';
import { Picture } from '../models/Picture';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styles: []
})
export class ImageComponent implements OnInit {

  @Input() type:string;
  imgSrc : string;
  imageUrl:string;
  selectedImage: any;
  isSubmited : boolean;

  constructor(private adm: AdminService,private storage: AngularFireStorage, private service: PictureService) { }

  ngOnInit() {
    this.reset();
  }

  showPreview(event: any){
    if(event.target.files && event.target.files[0]){
      const reader= new FileReader();
      reader.onload = (e:any)=>this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else{
      this.imgSrc = null;
      this.selectedImage = null;
    }
  }

  onSubmit(){
    this.isSubmited = true;
    if(this.selectedImage!==null){
      const fileName = `${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      let filePath = `${this.type}/${fileName}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges()
      .pipe(
        finalize(()=>{
            fileRef.getDownloadURL().subscribe((url)=>{
              const data = {
                url,
                type: this.type,
                name: fileName
              };
              this.service.insertImageDetails(data);
              this.reset();
            })
        })
      )
      .subscribe();
    }
  }

  reset(){
    this.imgSrc = null;
    this.imageUrl = "";
    this.isSubmited = false;
    this.selectedImage = null;
  }

}
