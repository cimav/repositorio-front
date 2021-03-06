/**
 * Created by calderon on 5/17/17.
 */
import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response, ResponseContentType} from '@angular/http';

import { AppConfig } from '../app.config';
import {Proveedor, Documento, Categoria, Orden} from '../_models/proveedor';
import {Observable} from "rxjs";

@Injectable()
export class ProveedorService {
    constructor(private http: Http, private config: AppConfig) { }

    /*
    public getDocusOf(idProveedor: number) {
        return this.http.get(this.config.apiUrl + '/documentos/by_proveedor_id/' + idProveedor, this.jwt()).map((response: Response) => response.json());
    }
    */

    public getDocusOf = (idProveedor: number): Observable<Documento[]> => {
        return this.http.get(this.config.apiUrl + '/documentos/by_proveedor_id/' + idProveedor,  this.jwt())
            .map((response: Response) => {
                return <Documento[]>response.json();
            });
        //.catch(this.handleError);
    }

    public getCategos =(): Observable<Categoria[]> => {
        return this.http.get(this.config.apiUrl + '/categorias',  this.jwt())
            .map((response: Response) => {
                return <Categoria[]>response.json();
            });
        //.catch(this.handleError);
    }

    public getOrdenesOf =(id:number): Observable<Orden[]> => {
        return this.http.get(this.config.apiUrl + '/proveedores/ordenes/' + id,  this.jwt())
            .map((response: Response) => {
                return <Orden[]>response.json();
            });
        //.catch(this.handleError);
    }

    getAll() {
        return this.http.get(this.config.apiUrl + '/proveedores', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get(this.config.apiUrl + '/proveedores/' + id, this.jwt()).map((response: Response) => response.json());
    }

    public getByRfc = (rfc: string): Observable<Proveedor>  =>{
        return this.http.get(this.config.apiUrl + '/proveedores/by_rfc/' + rfc, this.jwt())
            .map((response: Response) => {
                return <Proveedor>response.json();
            });
    }

    existRfc = (rfc:string): Observable<Boolean> => {
        return this.http.get(this.config.apiUrl + '/proveedores/exist_rfc/' + rfc, this.jwt())
            .map((response: Response) => {
                return <Boolean>response.json();
            });
    }

    /*
    create(proveedor: Proveedor) {
        return this.http.post(this.config.apiUrl + '/proveedores/register', proveedor, this.jwt());
    }
    */
    public create = (proveedor: Proveedor): Observable<Proveedor> => {
        let toAdd = JSON.stringify(proveedor, this.replacer);
        return this.http.post(this.config.apiUrl + '/proveedores/', toAdd,  this.jwt())
            .map((response: Response) => {
                return <Proveedor>response.json();
            });
        //.catch(this.handleError);
    }

    /*
    public Add = (justificacion: Justificacion): Observable<Justificacion> => {
        let toAdd = JSON.stringify(justificacion, this.replacer);
        return this._http.post(this.constants.JUSTIFICACION_ADD_URL, toAdd, { headers: this.headers })
            .map((response: Response) => <Justificacion>response.json());
    }
    */
    replacer(key,value) {
        if (key=="type") {
            return undefined;
        }
        return value;
    }
    public update(proveedor: Proveedor) {
        let toUpdate = JSON.stringify(proveedor, this.replacer);
        return this.http.put(this.config.apiUrl + '/proveedores/', toUpdate,  this.jwt())
            .map((response: Response) => {
                return <Proveedor>response.json();
            });
    }

    delete(id: string) {
        return this.http.delete(this.config.apiUrl + '/proveedores/' + id, this.jwt());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentProveedor = JSON.parse(localStorage.getItem('currentProveedor'));
        if (currentProveedor && currentProveedor.auth_token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentProveedor.auth_token });
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'q=0.8;application/json;q=0.9');
            return new RequestOptions({ headers: headers });
        }
    }

    downloadFile =(id: number): Observable<Blob> => {
        let options = new RequestOptions({responseType: ResponseContentType.Blob });
        return this.http.get(this.config.apiUrl + '/documentos/download/' + id, options)
            .map(res => res.blob());
            //.catch(this.handleError)
    }

    deleteDocumento(id: number) {
        return this.http.delete(this.config.apiUrl + '/documentos/' + id, this.jwt());
    }

    moveDocumento(id: number, new_cat_id:number) {
        const url = this.config.apiUrl + '/documentos/move/' + id + '/' + new_cat_id;
        return this.http.put(url, this.jwt());
    }

}
