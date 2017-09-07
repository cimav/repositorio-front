/**
 * Created by calderon on 5/17/17.
 */
export class AppConfig {
    public readonly apiUrl = 'http://10.0.2.131:3000';
//    public readonly apiUrl = 'http://10.0.0.27:3005';
 //   public readonly apiUrl = 'http://proveedores-rest.cimav.edu.mx'
    public readonly  apiUrlDocus = this.apiUrl + '/documentos';

    public asAdmin: boolean;
};
