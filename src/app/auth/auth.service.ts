import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private isAuthenticated = false;
    private token:string;
    private authStatusListener = new Subject<boolean>();
    private loggedInUser;
    constructor (private http: HttpClient,private router:Router){}

    getToken(){
        return this.token;
    }

    getIsAuth(){
        return !!this.token;
    }

    getAuthStatusListener(){
        return this.authStatusListener.asObservable();
    }

    createUser(email: string, password: string){
        const authData: AuthData = {email: email, password: password};
        this.http.post('http://localhost:3000/api/user/signup', authData)
            .subscribe(response => {
                console.log(response);
            });
    }

    login(email: string, password: string){
        const authData: AuthData = {email: email, password: password};
        this.http.post<{token:string, user:any}>('http://localhost:3000/api/user/login', authData)
            .subscribe(response =>{
                const token = response.token;
                this.token = token;
                if(token) {
                    this.isAuthenticated = true;
                }
                this.authStatusListener.next(true);
                sessionStorage.setItem('currentUser', JSON.stringify(response.user))
            });
        this.router.navigate(['/']);
    }

    getCurrentUser(){
        return sessionStorage.getItem('currentUser');
    }


    logout(){
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        sessionStorage.clear();
    }

    getAllUsers(){
       return this.http.get('http://localhost:3000/api/user/all');

    }
}