import { PopupBase } from './PopupBase';
import { ViewerRscManager } from '../../manager/ViewerRscManager';
import { Button } from '../Button';
import { EventType } from '../../../com/core/EventType';
import { SoundManager } from '../../manager/SoundManager';

export class BluetoothPopup extends PopupBase
{
    private mButtonSheet: PIXI.LoaderResource;
    private mPopupSysSheet: PIXI.LoaderResource;

    constructor()
    {
        super();
    }

    init()
    {
        this.mButtonSheet = ViewerRscManager.Handle.getResource("button", "button.json");
        this.mPopupSysSheet = ViewerRscManager.Handle.getResource("popup", "popup_system.json");

        //const bg = new PIXI.Sprite( ViewerRscManager.Handle.getResource("common", "bg_popup_bt.png").texture);
        const bg = new PIXI.Sprite( this.mPopupSysSheet.textures[`bg_popup_bt.png`] );
        this.mPopupContainer.position.set(837, 398);
        this.mPopupContainer.addChild(bg);

        //const btnSummit: Button = new Button( ViewerRscManager.Handle.getResource('common', 'btn_popup_summit.png').texture );
        const btnSummit: Button = new Button( this.mButtonSheet.textures[`btn_popup_summit.png`] );

        btnSummit.position.set(1119,991);
        btnSummit.addCustomEventListener( EventType.ButtonTab, ()=> { this.onSummit();});
        this.addChild(btnSummit);

        window.onkeyup=(evt)=>{
            if(evt.keyCode == 13 || evt.key == "Enter" ){ 
                SoundManager.Handle.Effect_CLICK();
                this.onSummit();
            }
        }
    }

    private onSummit()
    {
        window.onkeyup = null;
        this.closePopup();
    }
}

