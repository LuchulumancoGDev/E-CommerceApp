import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, concatMap, map } from 'rxjs';
import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';
import { LocalstorageService } from '../services/localstorage.service';
import { UsersService } from '../users.service';

@Injectable()
export class UsersEffects {
  private actions$ = inject(Actions);
  private localStorageService$ = inject(LocalstorageService);
  private usersService$ = inject(UsersService);

  buildUserSession$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.buildUserSession),
    concatMap(() => {
      if(this.localStorageService$.isValidToken())
      {
        const userId = this.localStorageService$.getUserIdFromToken();
        if (userId) {
      
          
          return this.usersService$.getUser(userId).pipe(
            map((user) => {
             
              
              return UsersActions.buildUserSessionSuccess({ user: user })
            }),
            catchError(()=> of(UsersActions.buildUserSessionFailure()))
          );
        }
        else {
          return of(UsersActions.buildUserSessionFailure());
        }
        
      }
      else {
        return of(UsersActions.buildUserSessionFailure());
      }
    })
  ))
}
