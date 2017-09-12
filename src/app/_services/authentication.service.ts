/**
 * Created by calderon on 5/17/17.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { AppConfig } from '../app.config';

@Injectable()
export class AuthenticationService {

    headers: any;

    constructor(private http: Http, private config: AppConfig) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'q=0.8;application/json;q=0.9');

    }

    login(rfc: string, password: string) {
        return this.http.post(this.config.apiUrl + '/authenticate', { rfc: rfc, password: password },this.headers)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let authToken = response.json();
                if (authToken && authToken.auth_token) {

                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentProveedor', JSON.stringify(authToken));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentProveedor');
    }
}

