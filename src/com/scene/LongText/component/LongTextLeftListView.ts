import { LongTextLeftRenderer } from './LongTextLeftRenderer';
import { ListView } from '../../../widget/ListView';
import { EventType } from '../../../core/EventType'

export class LongTextLeftListView extends ListView {


    constructor( w: number, h: number ) {
        
        super( w, h);
    }

    draw( info: any ): LongTextLeftRenderer {

        const list = new LongTextLeftRenderer();
        list.interactive = true;
        list.index = info.index;
        list.mTitleText.text = info.title;

        list.on('pointerup', ()=>{ this.index = list.index;})
        return list;  
    }
}