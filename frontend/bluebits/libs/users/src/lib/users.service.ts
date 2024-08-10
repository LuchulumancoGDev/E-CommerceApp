import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

import { Observable } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl = environment.apiUrl + 'users';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl)
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${userId}`)
  }

  createUser(userData: FormData):Observable<User>{
    return this.http.post<User>(this.baseUrl+'/register', userData);
  }

  updateUser(user: FormData, userId: string):Observable<User>{
    return this.http.put<User>(this.baseUrl+'/'+userId, user)
  }

  deleteUser(userId: string): Observable<object>{
    return this.http.delete<object>(`${this.baseUrl}/${userId}`)
  }
}
