import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {
  userId

  constructor(private dialogRef: MatDialogRef<UserDeleteComponent>
  ,@Inject(MAT_DIALOG_DATA) id, private usersService:UsersService) { 
    this.userId = id 
  }

  ngOnInit() {
  }

  onYesClick(){
    console.log(this.userId);
    this.usersService.deleteUser(this.userId)
      .subscribe(response => {
        this.dialogRef.close(true);
      })
  }

  onNoClick(){
    this.dialogRef.close(false);
  }

}
