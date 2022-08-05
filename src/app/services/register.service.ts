
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { 

  }

  register(data:User){
    return this.http.post('http://localhost:8080/api/registration',data)
  }
}
