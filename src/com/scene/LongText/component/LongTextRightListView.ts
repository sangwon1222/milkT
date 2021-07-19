import { LongTextRightRenderer } from './LongTextRightRenderer';
import { ListView } from '../../../widget/ListView';
import { ViewerRscManager } from '../../../manager/ViewerRscManager';

export class LongTextRightListView extends ListView {

    constructor( w: number, h: number ) {
        
        super( w, h);

    }

    draw( info: any ): LongTextRightRenderer {

        const list = new LongTextRightRenderer();
        list.interactive = true;
        list.on('pointerup', ()=>{ this.index = list.index;})

        let numStr = String(info.index + 1);

        if(numStr.length == 1) {
            numStr = `0${numStr}`
        }

        list.mTitleText.text = info.title;
        list.mIndexText.text = numStr;
        list.index = info.index;

        if(info.index % 2 == 0 ) {
            list.setBgTexture(  ViewerRscManager.Handle.getResource("longtext", "listNormal.png").texture );
        } else {           
            list.setBgTexture(  ViewerRscManager.Handle.getResource("longtext", "listSel.png").texture );
        }
    
        if(info.did == true) {
            list.setDidTexture(ViewerRscManager.Handle.getResource( "common", "again_btn.png" ).texture);
        } else {
            list.setDidTexture(ViewerRscManager.Handle.getResource( "common", "practice_btn.png" ).texture);
        }

        return list;  
    }
}
