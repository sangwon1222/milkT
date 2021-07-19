import { ShortTextLeftRenderer } from './ShortTextLeftRenderer';
import { ListView } from '../../../widget/ListView';

export class ShortTextLeftListView extends ListView {

    constructor( w: number, h: number ) {
        
        super( w, h);
    }
    
    draw( info: any ): ShortTextLeftRenderer {

        const list = new ShortTextLeftRenderer();
        list.interactive = true;
        list.index = info.index;
        list.mTitleText.text = info.title;


        list.on('pointerup', ()=>{   
            
            this.index = list.index; 
        })
        return list;  
    }
}