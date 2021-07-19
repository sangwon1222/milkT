import { PopupBase } from './PopupBase';
import { ViewerRscManager } from '../../manager/ViewerRscManager';
import { Button } from '../Button';
import { EventType } from '../../../com/core/EventType';
import { SceneName } from '../../core/SceneBast';
import { SpaceGame } from '../../scene/Game/SpaceGame';
import { ForestGame } from '../../scene/Game/ForestGame';
import { TypeingApp } from '../../TypeingApp';

export class GamePopup extends PopupBase
{
    private mIndex: number;
    private mButtonSheet: PIXI.LoaderResource;
    private mPopupSysSheet: PIXI.LoaderResource;

    constructor( sceneIdx: number)
    {
        super();
        this.mIndex = sceneIdx;
    }

    init(){

        this.mButtonSheet = ViewerRscManager.Handle.getResource("button", "button.json");
        this.mPopupSysSheet = ViewerRscManager.Handle.getResource("popup", "popup_system.json");
        
        //const bg = new PIXI.Sprite( ViewerRscManager.Handle.getResource('common', 'bg_popup_game_end.png').texture);
        const bg = new PIXI.Sprite( this.mPopupSysSheet.textures[`bg_popup_game_end.png`] );

        this.mPopupContainer.position.set(770,434);
        this.mPopupContainer.addChild(bg);

        //const btnNo: Button = new Button( ViewerRscManager.Handle.getResource('common', 'btn_popup_no.png').texture );
        const btnNo: Button =new Button( this.mButtonSheet.textures[`btn_popup_no.png`] );
        btnNo.addCustomEventListener( EventType.ButtonTab, ()=> { 
            this.closePopup();

            if( this.mIndex == SceneName.SpaceGame ) 
            {
               (TypeingApp.Handle.getScene(SceneName.SpaceGame) as SpaceGame).resumeGame();
                return;
            }
            if( this.mIndex == SceneName.ForestGame ) 
            {
               (TypeingApp.Handle.getScene(SceneName.ForestGame) as ForestGame).resumeGame();
                return;
            }

        });
        btnNo.position.set(165,440);
        this.mPopupContainer.addChild(btnNo);


       // const btnYes: Button = new Button( ViewerRscManager.Handle.getResource('common', 'btn_popup_yes.png').texture );
        const btnYes: Button =new Button( this.mButtonSheet.textures[`btn_popup_yes.png`] );
        btnYes.addCustomEventListener( EventType.ButtonTab, ()=> { 
            this.closePopup();
              this.dispatchEvent( EventType.ReceiveData);
        });
        btnYes.position.set(594,440);
        this.mPopupContainer.addChild(btnYes);

    }
}