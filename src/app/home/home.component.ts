/**
 * Created by calderon on 5/17/17.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {Proveedor, Documento, Categoria, Orden} from "../_models/proveedor";
import {ProveedorService} from "../_services/proveedor.service";
import {saveAs as importedSaveAs} from "file-saver";
import {FileUploader, FileItem} from "ng2-file-upload";
import {isNullOrUndefined} from "util";
import {AppConfig} from "../app.config";
import {Router, RouterStateSnapshot} from "@angular/router";

//const URL = 'http://localhost:3000/documentos';

@Component({
   // moduleId: module.id,
    selector: 'home-component',
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    currentProveedor: Proveedor;
    //proveedores: Proveedor[] = [];

    tab_selected: number = 0;

    currentProveedorToken: any;

    ordenes: Orden[];

    documentoToDelete: Documento;
    itemToCancelar: FileItem;

    categorias: Categoria[];
    categoriaSelected: Categoria;
    ordenCompra: Orden;

    categoSelectedVolatile: string;

    uploader: FileUploader = new FileUploader({url: this.config.apiUrlDocus, itemAlias: 'documento[attachment]', autoUpload: false, queueLimit: 10});

    uploaderFactura: FileUploader = new FileUploader({url: this.config.apiUrlDocus, itemAlias: 'documento[attachment]', autoUpload: false, queueLimit: 10});

    groupMap = {};
    //distintos: string[] =[];
    facturas: Documento[] = [];

    constructor(private proveedorService: ProveedorService, private config: AppConfig, private router: Router) {
        //this.currentProveedor = JSON.parse(localStorage.getItem('currentProveedor'));
    }

    nine(item: FileItem) {
        console.log('mime3> ' + item.file.type.split('/')[1]);
    }

    ngOnInit() {
        // this.loadAllProveedores();

        this.currentProveedorToken = JSON.parse(localStorage.getItem('currentProveedor'));

        if (this.currentProveedorToken && this.currentProveedorToken.rfc) {
            //this.cargarDocumentos();
            this.cargarProveedor();

            this.cargarCategorias();
        } else {
            console.log("Get Proveedor Error");
        }

        this.uploader.onAfterAddingFile = (file) => {
            file.withCredentials = false;
        };
        this.uploader.onBuildItemForm = (item: FileItem, form) => {
            form.append("documento[proveedor_id]", this.currentProveedor.id);
            form.append("documento[categoria_id]",  this.categoSelectedVolatile);
            form.append("commit", "Save");
        };
        this.uploader.onCompleteItem = (item: FileItem, response: any, status: any, headers: any) => {
            item.remove();
            $('#toastUploaded').trigger('show');
            this.cargarDocumentosOf();
        };
        this.uploader.onErrorItem = (item: FileItem, response: string, status: number, headers: any) => {
            console.log("errorItem>>>: ", item, status, response);
            this.cargarDocumentosOf();
        };

        /* XML */
        this.uploaderFactura.onAfterAddingFile = (file) => {
            file.withCredentials = false;
        };
        this.uploaderFactura.onBuildItemForm = (item: FileItem, form) => {
            form.append("documento[proveedor_id]", this.currentProveedor.id);
            form.append("documento[categoria_id]", 50);
            form.append("documento[orden_compra]", this.ordenCompra);
            form.append("commit", "Save");
        };
        this.uploaderFactura.onCompleteItem = (item: FileItem, response: any, status: any, headers: any) => {
            item.remove();
            $('#toastUploaded').trigger('show');
            this.cargarDocumentosOf();
        };
        this.uploaderFactura.onErrorItem = (item: FileItem, response: string, status: number, headers: any) => {
            console.log("errorItem>>>: ", item, status, response);
            this.cargarDocumentosOf();
        };


    }
/*
    cargarDocumentos() {
        this.proveedorService.getByRfc(this.currentProveedorToken.rfc).subscribe(
                (response: Proveedor) => {
                    this.currentProveedor = response;
                },
            error => console.log(error),
            () => console.log("Get Proveedor:" + this.currentProveedorToken.rfc)
        );
    }
*/

    itemIsUploading(item: FileItem) {
        var r = item.isUploading;
        console.log(r, item.isReady, item.isUploaded);
        return r;
    }

    cargarProveedor() {

        this.proveedorService.getByRfc(this.currentProveedorToken.rfc).subscribe(
            (response: Proveedor) => {
                this.currentProveedor = response;

                this.cargarOrdenesOf();

                this.cargarFacturas();
            },
            error => {
                console.log(error);
                this.router.navigate(['/login']); // , { queryParams: { returnUrl: state this.st.url }});
            },
            () => console.log("Get Proveedor:" + this.currentProveedorToken.rfc)
        );

    }

    hasGroup(idx) {
        return  this.groupMap[idx] == true;
    }

    cargarDocumentosOf() {
        this.proveedorService.getDocusOf(this.currentProveedor.id).subscribe(
            (response: Documento[]) => {
                this.currentProveedor.documentos = response;

                this.cargarFacturas();
            },
            error => console.log(error),
            () => {}
        );
    }

    cargarFacturas() {
        this.facturas = this.currentProveedor.documentos.filter((docu) => {
            return docu.categoria_id == 50;
        });
        this.facturas = this.facturas.sort(function(f1,f2) {
            return (f1.orden_compra > f2.orden_compra) ? 1 : ((f2.orden_compra > f1.orden_compra) ? -1 : 0);
        });

        var ddss:string[] = [];
        this.groupMap = this.facturas.reduce(function(map, factura, idx, arr) {
            map[idx] = false;
            if (idx == 0 || factura.orden_compra != arr[idx-1].orden_compra) {
                map[idx] = true;
                ddss.push(factura.orden_compra);
            }
            return map;
        }, {});
    }

    uploadItem(select_id: string, item: FileItem) {
        this.categoSelectedVolatile =  $('#' + select_id).val() ;
        item.upload();
    }
    uploadFacturaItem(item: FileItem) {
        this.categoSelectedVolatile =  '55';
        item.upload();
    }

    cargarCategorias() {
        this.proveedorService.getCategos().subscribe(
            (response: Categoria[]) => {
                this.categorias = response;

                this.categoriaSelected = this.categorias[0];
            },
            error => console.log(error),
            () => console.log("Get Categos:" + this.currentProveedorToken.rfc)
        );
    }

    cargarOrdenesOf() {
        this.proveedorService.getOrdenesOf(this.currentProveedor.rfc).subscribe(
            (response: Orden[]) => {
                this.ordenes = response;
            },
            error => console.log(error),
            () => console.log("Get Ordenes:" + this.currentProveedorToken.rfc + " -- " + this.ordenes.length)
        );
    }

    onTabSelect(event, details) {
        this.tab_selected = event.target.selected;
    }

    /*
    notificarCambio(cambio: any) {

        this.cargarDocumentosOf();

    }
*/

    download(docu: Documento) {
        this.proveedorService.downloadFile(docu.id).subscribe(blob => {
                importedSaveAs(blob, docu.file);
            $('#toastDownloaded').trigger('show');
            }
        );
    }

    deleteDocumentoDlg(docu: Documento) {
        this.documentoToDelete = docu;
        $('#confirmarDeleteDlg').trigger('open');
    }

    deleteDocumentoSrv(id: number) {
        this.proveedorService.deleteDocumento(id).subscribe(
            (response: any) => {
                // nothing
                $('#toastDeleted').trigger('show');
            },
            error => console.log(error),
            () => {
                console.log("Delete documento: " + id);
                this.cargarDocumentosOf();
            }
        );
    }

    cancelar(item:FileItem) {
        $('#toastCanceled').trigger('show');
    }

    selectedCategoriaChange(event) {
        this.categoriaSelected = event; // se requiere; de lo contrario solo cambia el value pero no el Id
        if (isNullOrUndefined(this.categoriaSelected)) return;
    }
    getCodeNotEmpty(catego: Categoria):String   {
        let result = isNullOrUndefined(catego) ? '' : catego.categoria;
        console.log("getTextNotEmpty>> ", result);
        return result;
    };

    ordenIsInvalid() {
        let pattern = new RegExp('[^//W]');
        let r = pattern.test(this.ordenCompra.orden);
        console.log(this.ordenCompra,r);
        return r;

        /*
        let isInvalid = $('#inputOrden').hasClass('ng-invalid');
        return isInvalid;
        */
    }

    onChangeCategoria() {

    }

    onSearchXml() {
        //this.uploaderXml.clearQueue();
        //$('#uploader_xml_id').trigger('click');

    }
    onSearchPdf() {
    //    this.uploaderPdf.clearQueue();
    //    $('#uploader_pdf_id').trigger('click');
    }

    /*
    ordenValida() {
        let pattern = new RegExp('[\w]+');
        return pattern.test(this.ordenCompra);

    }
    */

    endsWith(nom: string):string {
        if (isNullOrUndefined(nom)) {
            return 'UNF';
        }
        if (nom.toLowerCase().endsWith('.pdf')) {
            return 'PDF';
        } else if (nom.toLowerCase().endsWith('.xml')) {
            return 'XML';
        } else {
            return 'NONE';
        }
    }

    formatOrdenCompra(oc: string) {
        if (oc) {
            while (oc.length < 8) oc = oc + ' ';
            return oc;
        }
        return oc;
    }

    txtCatego(id: number): string {
        if (isNullOrUndefined(this.categorias)) {
            return '...';
        }
        let catego = this.categorias.find(c => c.id == id);
       return catego.categoria;
    }

    selectedOrdenChange(event) {
        //this.ordenCompra = event;
    }

    hasOrdenes() {
        return !isNullOrUndefined(this.ordenes) && this.ordenes.length > 0;
    }

}

