import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User, UserType } from '../../models/models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = 'https://localhost:7293/api/Library/';
  userStatus: Subject<string> = new Subject();

  constructor(private http: HttpClient, private jwt: JwtHelperService) {}

  register(user: any) {
    return this.http.post(this.baseUrl + 'Register', user, {
      responseType: 'text',
    });
  }

  login(info: any) {
    let params = new HttpParams()
      .append('email', info.email)
      .append('password', info.password);

    return this.http.get(this.baseUrl + 'Login', {
      params: params,
      responseType: 'text',
    });
  }

  isLoggedIn(): boolean {
    if (
      localStorage.getItem('access_token') != null &&
      !this.jwt.isTokenExpired()
    )
      return true;
    return false;
  }

  getUserInfo(): User | null {
    if (!this.isLoggedIn()) return null;
    var decodedToken = this.jwt.decodeToken();
    var user: User = {
      id: decodedToken.id,
      firstName: decodedToken.firstName,
      lastName: decodedToken.lastName,
      email: decodedToken.email,
      mobileNumber: decodedToken.mobileNumber,
      userType: UserType[decodedToken.userType as keyof typeof UserType],
      accountStatus: decodedToken.accountStatus,
      createdOn: decodedToken.createdOn,
      password: '',
    };
    return user;
  }

  logout() {
    localStorage.removeItem('access_token');
    this.userStatus.next('loggedOff');
  }
}
