/**
 * Created by calderon on 21/3/18.
 */
import {Directive, HostBinding, Input, HostListener} from "@angular/core";
import {DragService} from "./drag.service";

@Directive({
    selector: '[myDraggable]'
})
export class DraggableDirective {
    constructor(private dragService: DragService) {
    }

    @HostBinding('draggable')
    get draggable() {
        return true;
    }

    @Input()
    set myDraggable(options: DraggableOptions) {
        if (options) {
            this.options = options;
        }
    }

    private options: DraggableOptions = {};

    @HostListener('dragstart', ['$event'])
    onDragStart(event) {
        const { zone = 'zone', doc_id =0, old_cat_id =0} = this.options;

        this.dragService.startDrag(zone);

        var str = '{"doc_id":' + doc_id + ',"old_cat_id":' + old_cat_id +'}';
        event.dataTransfer.setData('data', str);
    }
}
export interface DraggableOptions {
    zone?: string;
    doc_id?: number;
    old_cat_id?: number;
}

