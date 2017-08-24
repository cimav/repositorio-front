import {FileItem} from "ng2-file-upload";
/**
 * Created by calderon on 5/17/17.
 */
export class Proveedor {
    id: number
    rfc: string;
    password: string;
    razon_social: string;
    auth_token: string;

    documentos: Documento[];

}

export class Documento {
    id: number;
    attachment; string;
    file: string;
    categoria_id: number;
    proveedor_id: number;
    orden_compra: string;
    updated_at: Date;
    created_at: Date;
}

export class Orden {
    orden: string;
}

/*
export const CATEGORIAS: Categoria[] = [
    { id: 0, categoria: 'Sin categoría' },
    { id: 1, code: 'Primera' },
    { id: 2, code: 'Segunda' },
    { id: 3, code: 'Tercera' }
];
*/
export class Categoria {
    id: number;
    categoria: string;

}

/*
export const CATEGOS = [
    { id: 1, txt: '1) Primera de la lista - Antepenultima' },
    { id: 2, txt: '2) Segunda - Penultima' },
    { id: 3, txt: '3) Segunda - Ultima' },
    { id: 50, txt: '50) Las Facturas' }
];
*/