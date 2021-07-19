import { ListView } from '../../../widget/ListView';
import { ShortTextRightRenderer } from './ShortTextRightRenderer';
import { ViewerRscManager } from '../../../manager/ViewerRscManager'

export class ShortTextRightListView extends ListView {

    private mRendererName: string;

    constructor( w: number, h: number ) {
        
        super( w, h);
    }

    draw( info: any ): ShortTextRightRenderer {


        const list = new ShortTextRightRenderer();
        list.interactive = true;
        list.on('pointerup', ()=>{ 
            this.index = list.index;
        })

        let numStr = String(info.index + 1);

        if(numStr.length == 1) {
            numStr = `0${numStr}`
        }

        list.mTitleText.text = info.label;
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

        /*
        const list = new ShortTextRenderer();
        list.interactive = true;

        list.on('pointerup', ()=>{ this.selectedIndex = list.index;})

        // list.label = info.label;
        list.index = info.index;
        list.setBgTexture(ViewerRscManager.Handle.getResource( "shorttext", this.rendererName ).texture);
        list.setDidTexture(ViewerRscManager.Handle.getResource( "common", "practice_btn.png" ).texture);

        let numStr = String(info.index + 1);

        if(numStr.length == 1) {
            numStr = `0${numStr}`
        }

        list.mIndexText.text = numStr;

        return list;  
        */
    }
}