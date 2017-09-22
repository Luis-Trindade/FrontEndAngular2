import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AppConfig } from '../config/app.config';

@Injectable()
export class AuthService {
    constructor(private http: Http, private config: AppConfig) {
    }

    isLoggedIn() {
        return tokenNotExpired('authToken');
    }

    postAuthentication( username: string, password: string) {
        const serviceUrl = 'http://' + this.config.getConfig('hostBridge') + ':' + this.config.getConfig('portBridge') + '/login';
        return this.http.post(serviceUrl, { name: username, password: password } )
            .map((responseData) => {
                localStorage.setItem('authToken', responseData.json().token);
                return responseData.json();
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}
