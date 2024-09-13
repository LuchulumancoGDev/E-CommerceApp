import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
apiUrlUsers = environment.apiUrl + 'users';
  constructor(private http:HttpClient) { }

  login(email: string, password: string): Observable<User>{
    return this.http.post(`${this.apiUrlUsers}/login`)
  }
}
