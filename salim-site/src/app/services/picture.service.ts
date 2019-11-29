import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Picture } from '../models/Picture';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  constructor(private firebase: AngularFireDatabase,  private storage: AngularFireStorage) { }

  imageDetailList: AngularFireList<any>;
  sketchDetailList: AngularFireList<any>;


  getImageDetailList(){
    this.imageDetailList = this.firebase.list("tattoo");
  }

  getSketchDetailList(){
    this.sketchDetailList = this.firebase.list("sketch");
  }

  insertImageDetails(lul) {   
    switch(lul.type){
    case "tattoo":  this.imageDetailList.push(lul); break;
    case "sketch":  this.sketchDetailList.push(lul); break;
    default: break;
    }
  }

  deleteFileUpload(fileUpload: Picture) {
    this.deleteFileDatabase(fileUpload.key, fileUpload.type)
      .then(() => {
        this.deleteFileStorage(fileUpload.name, fileUpload.type);
      })
      .catch(error => console.log(error));
  }
  
  private deleteFileDatabase(key: string, type: string) {
    return this.firebase.list(type).remove(key);
  }
  
  private deleteFileStorage(name: string, type: string) {
    this.storage.ref(type).child(name).delete();
  }

}