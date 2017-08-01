import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Config } from '../../data/config/config';

@Injectable()
export class AuthService {
    cfg: Config = new Config();

    constructor(private http: Http) {
    }

    isLoggedIn() { return tokenNotExpired('authToken'); }

    postAuthentication( username: string, password: string) {
        const serviceUrl = 'http://' + this.cfg.getHost() + ':' + this.cfg.getPort() + '/login';
        return this.http.post(serviceUrl, { name: username, password: password } )
            .map((responseData) => {
                localStorage.setItem('authToken', responseData.json().token);
                return responseData.json();
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

}
