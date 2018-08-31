import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RequestOptionsArgs} from '@angular/http';


@Injectable()
export class UsersService {

    constructor (private http: HttpClient){}

    deleteUser(id){
        const params = new HttpParams().set('id', id);
        return this.http.delete('http://localhost:3000/api/user/' + id, { params })
            
    }
}