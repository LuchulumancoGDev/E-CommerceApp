import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

import { Observable } from 'rxjs';
import { User } from './models/user';
import { UsersFacade } from './state/users.facade';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl = environment.apiUrl + 'users';
  constructor(private http: HttpClient, private usersFacade: UsersFacade) { }

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

  initAppSession() {
    this.usersFacade.buildUserSession();
  }
  observeCurrentUser() {
    return this.usersFacade.currentUser$;
  }

   isCurrentUserAuth() {
    return this.usersFacade.isAuthenticated$;
  }
}
