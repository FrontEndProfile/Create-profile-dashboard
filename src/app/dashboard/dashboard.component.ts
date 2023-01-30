import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData,doc,updateDoc } from '@angular/fire/firestore'
import { Observable } from 'rxjs/internal/Observable';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashBoardData!: Observable<any>;
  constructor(private firestore: Firestore) { }
  getData() {
    const collectionInstance = collection(this.firestore, 'dashboard_profile');
    collectionData(collectionInstance , { idField: 'id' })
    .subscribe(val => {
      // console.log(val);
    })
    this.dashBoardData = collectionData(collectionInstance , { idField: 'id' })
  }

  profileForm = new FormGroup({
    ProfileName: new FormControl(''),
    ProfileHead: new FormControl(''),
    ProfileMessage: new FormControl(''),
    ProfileExperience: new FormControl(''),
    ProfileLocation: new FormControl(''),
    ProfileEduction: new FormControl(''),
    ProfileContact: new FormControl(''),
  });


  // UPDATE DATA FROM DATABASE FIREBASE 
  updateData(id: string) {
    const docInstance = doc(this.firestore, 'dashboard_profile' , id );
    const updateData = {
      // ProfileName: this.profileForm.value.ProfileName,
      
      // ProfileHead: "update",
    }
    
    updateDoc(docInstance , updateData)
    .then(() => {
      console.log('Data Update Success');
    })
    .catch((err) => {
      console.warn(err);
      console.log('wronged');
    })
  }
  // END 

  ngOnInit(): void {
    this.getData()
  }
}
