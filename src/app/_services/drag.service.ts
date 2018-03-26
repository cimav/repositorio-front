import {Injectable} from "@angular/core";
/**
 * Created by calderon on 21/3/18.
 */

// https://www.radzen.com/blog/angular-drag-and-drop/

@Injectable()
export class DragService {
    private zone: string;

    startDrag(zone: string) {
        this.zone = zone;
    }

    accepts(zone: string): boolean {
        return zone == this.zone;
    }
}
