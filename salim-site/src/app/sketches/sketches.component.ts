import { Component, OnInit } from '@angular/core';
import { PictureService } from '../services/picture.service';
import { AdminService } from '../services/admin.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sketches',
  templateUrl: './sketches.component.html',
  styles: ['.img-hov:hover{transform: scale(1.01); box-shadow: 0 0 1px rgba(0, 0, 0, 0);transition-duration: 0.3s; transition-property: transform;} img{cursor:pointer}']
})
export class SketchesComponent implements OnInit {

  imageList:any[];
  selectedIndex? :number = 0;
  type:string="sketch";

  constructor(private service: PictureService, private adm: AdminService, private storage: AngularFireStorage) { }

  ngOnInit() {
    this.service.getSketchDetailList();
    this.service.sketchDetailList.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(
      list=>{
        this.imageList = list;
      }
    );
  }

  delete(num: number){
    const file = this.imageList[num];
    this.service.deleteFileUpload(file);
  }

}
