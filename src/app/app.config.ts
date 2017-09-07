import construct = Reflect.construct;
import {environment} from "../environments/environment.prod";
/**
 * Created by calderon on 5/17/17.
 */
export class AppConfig {

    public readonly apiUrl = environment.apiUrl;
    public readonly  apiUrlDocus = this.apiUrl + '/documentos';

    public asAdmin: boolean;

};
