import { PopupBase } from './PopupBase';
import { ViewerRscManager } from '../../manager/ViewerRscManager';
import { Button } from '../Button';
import { EventType } from '../../../com/core/EventType';

export class QuitPopup extends PopupBase
{

    private mButtonSheet: PIXI.LoaderResource;
    private mPopupSysSheet: PIXI.LoaderResource;

    constructor()
    {
        super();
    }

    init(){

        this.mButtonSheet = ViewerRscManager.Handle.getResource("button", "button.json");
        this.mPopupSysSheet = ViewerRscManager.Handle.getResource("popup", "popup_system.json");
        
       // const bg = new PIXI.Sprite( ViewerRscManager.Handle.getResource('common', 'bg_popup_app_exit.png').texture);
        const bg = new PIXI.Sprite( this.mPopupSysSheet.textures[`bg_popup_app_exit.png`] );
        this.mPopupContainer.position.set(680,437);
        this.mPopupContainer.addChild(bg);

       // const btnYes: Button = new Button( ViewerRscManager.Handle.getResource('common', 'btn_popup_yes.png').texture );
        const btnYes: Button =new Button( this.mButtonSheet.textures[`btn_popup_yes.png`] );
        btnYes.addCustomEventListener( EventType.ButtonTab, ()=> { 
           // self.opener = self;
           // window.close(); 
           window[`HybridApp`].appFinish();

        });
        btnYes.position.set(594,437);
        this.mPopupContainer.addChild(btnYes);

        //const btnNo: Button = new Button( ViewerRscManager.Handle.getResource('common', 'btn_popup_no.png').texture );
        const btnNo: Button =new Button( this.mButtonSheet.textures[`btn_popup_no.png`] );
        btnNo.addCustomEventListener( EventType.ButtonTab, ()=> { this.closePopup();});
        btnNo.position.set(164,437);
        this.mPopupContainer.addChild(btnNo);
    }
}