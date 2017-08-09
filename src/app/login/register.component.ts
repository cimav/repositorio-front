import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProveedorService} from "../_services/proveedor.service";
import {Proveedor} from "../_models/proveedor";
import {CipherOption, DecryptedMessage, WordArray} from "crypto-js.d.ts/crypto-js";

@Component({
//    moduleId: module.id,
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})

export class RegisterComponent implements OnInit, OnDestroy{

    proveedorModel: Proveedor;
    loading = false;
    existe: Boolean = false;

    // http://jasonwatmore.com/post/2016/08/16/angular-2-jwt-authentication-example-tutorial

    @ViewChild('toastSuccesRegister') toastSuccesRegister:ElementRef;
    @ViewChild('toastErrorRegister') toastErrorRegister:ElementRef;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private proveedorService: ProveedorService) {

    }

    private sub: any;
    //a_rfc: string;

    ngOnInit() {

        this.proveedorModel = new Proveedor();
        this.sub = this.route.params.subscribe(params => {
            //this.a_rfc = params['p_rfc']; // (+) converts string 'id' to a number
            this.proveedorModel.rfc  = params['p_rfc']; // (+) converts string 'id' to a number
            /*
            let encryptedMessage:WordArray =  .encrypt("el mensaje enviado","elsecreto"); // .HmacSHA256("es el rfc", "laclave");
            console.log(">>>>>",encryptedMessage);
            let decryptedMessage:DecryptedMessage = crypto.decrypt(encryptedMessage,"elsecreto");
            console.log(">>>>>",decryptedMessage);
            */

            /*
            this.proveedorService.existRfc(this.proveedorModel.rfc)
                .subscribe(
                    (response: Boolean) => {
                        this.existe = response;
                    },
                    error => {
                        this.toastErrorRegister.nativeElement.open();
                        this.loading = false;
                    }
                )
            */
        });

    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    onSubmit() {
        this.loading = true;

        if (this.existe) {
            this.proveedorService.update(this.proveedorModel)
                .subscribe(
                    data => {
                        this.toastSuccesRegister.nativeElement.open();
                        // set success message and pass true paramater to persist the message after redirecting to the login page
                        this.router.navigate(['/login']);
                    },
                    error => {
                        this.toastErrorRegister.nativeElement.open();
                        this.loading = false;
                    });

        } else {
            this.proveedorService.create(this.proveedorModel)
                .subscribe(
                    data => {
                        this.toastSuccesRegister.nativeElement.open();
                        // set success message and pass true paramater to persist the message after redirecting to the login page
                        this.router.navigate(['/login']);
                    },
                    error => {
                        this.toastErrorRegister.nativeElement.open();
                        this.loading = false;
                    });
        }
    }

    rfcOnChange(event) {
        event.target.value = event.target.value.toUpperCase()
    }

}