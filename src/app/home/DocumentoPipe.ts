/**
 * Created by calderon on 7/18/17.
 */
import {Pipe, PipeTransform} from "@angular/core";
import {Documento} from "../_models/proveedor";

@Pipe({
    name: 'DocumentoPipe'
})
export class DocumentoPipe implements PipeTransform {

    transform(originales: Array<Documento>, cat_id: number): Array<Documento> {

        var filtered = originales.filter((docu) => {
            return docu.categoria_id == cat_id;
        });

        if (cat_id == 50) {
            filtered.sort((a: Documento, b: Documento) => {
                if (a.file < b.file) {
                    return -1;
                } else if (a.file > b.file) {
                    return 1;
                } else {
                    return 0;
                }
            }).sort((a: Documento, b: Documento) => {
                if (a.orden_compra < b.orden_compra) {
                    return -1;
                } else if (a.orden_compra > b.orden_compra) {
                    return 1;
                } else {
                    return 0;
                }
            });
        } else {
            filtered.sort((a: Documento, b: Documento) => {
                if (a.file < b.file) {
                    return -1;
                } else if (a.file > b.file) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }
        return filtered;
    }


}



