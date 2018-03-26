import {Directive, Input, Output, HostListener, EventEmitter} from "@angular/core";
import {DragService} from "./drag.service";
/**
 * Created by calderon on 21/3/18.
 */

@Directive({
    selector: '[myDropTarget]'
})
export class DropTargetDirective {
    constructor(private dragService: DragService) {
    }

    @Input()
    set myDropTarget(options: DropTargetOptions) {
        if (options) {
            this.options = options;
        }
    }

    @Output('myDrop') drop = new EventEmitter();

    private options: DropTargetOptions = {};

    @HostListener('dragenter', ['$event'])
    @HostListener('dragover', ['$event'])
    onDragOver(event) {
        const { zone = 'zone'} = this.options;

        if (this.dragService.accepts(zone)) {
            event.preventDefault();
        }
    }

    @HostListener('drop', ['$event'])
    onDrop(event) {

        const data =  JSON.parse(event.dataTransfer.getData('data'));

        const { cat_id = '0'} = this.options;

        var str = '{"doc_id": "' + data.doc_id + '", "old_cat_id": "' + data.old_cat_id + '", "new_cat_id": "' + cat_id + '"}';
        const jsonData = JSON.parse(str);

        this.drop.next(jsonData);
    }
}
export interface DropTargetOptions {
    zone?: string;
    cat_id?: string;
}