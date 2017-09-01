/**
 * Created by calderon on 5/17/17.
 */
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AppConfig} from "../app.config";
import {CurrentProveedor} from "../_models/proveedor";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private config: AppConfig) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (state.url.indexOf('register') > 0) {
            // si es para el registro; puede pasar
            return true;
        }

        let jsonObj: any = localStorage.getItem('currentProveedor');
        if (jsonObj) {

            let currentProveedorObj :CurrentProveedor = <CurrentProveedor>JSON.parse(jsonObj);
            this.config.asAdmin = currentProveedorObj.as_admin;

            // 2> si hay un currentProveedor en el localStorage, se lo permite
            return true;
        }

        // not logged in so redirect to login page with the return url
        // 3> si no hay currentProveedor, lo envía al Login
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
