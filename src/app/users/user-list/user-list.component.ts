import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { MatDialog } from '@angular/material';
import { UserDeleteComponent } from '../user-delete/user-delete.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  private userList;

  displayedColumns: string[] = ['email', 'id', 'role', 'actions'];


  constructor(private authService:AuthService, private matDialog:MatDialog) { }

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData(){
    this.authService.getAllUsers().subscribe(userlist => {
      this.userList = userlist;
      console.log(this.userList);
    })
  }

  addRole(id){
    console.log("add role to" , id);
  }

  deleteUser(id){
    console.log('user to delete' , id);
    this.matDialog.open(UserDeleteComponent,{data:id})
      .afterClosed()
      .subscribe( shouldReloaddata => {
        if(shouldReloaddata){
          this.loadUserData();
        }
      })
  }
}
