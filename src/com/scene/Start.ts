// core
import {  TypeingApp } from '../TypeingApp';
import { EventType } from '../core/EventType';
import { SceneBase } from '../core/SceneBast';
import { CustomEvent } from '../core/CustomEvent'
// widget
import { Button } from '../widget/Button'
// manager
import { ViewerRscManager } from '../manager/ViewerRscManager'
import { SoundManager } from '../manager/SoundManager';

import gsap from 'gsap';
import { BluetoothPopup } from '../widget/popup/BluetoothPopup';


import { QuitPopup } from '../widget/popup/QuitPopup';



export class Start extends SceneBase{

    private mClose: Button;
    private mStart: Button;

    private mButtonSheet: PIXI.LoaderResource;

    constructor()
    {
        super();
    }

    async onInit(){

 
       this.mButtonSheet = ViewerRscManager.Handle.getResource("button", "button.json");
    }

    async onStart(){
        
        console.log("start");

        const bg = new PIXI.Sprite( PIXI.Texture.from('rsc/source/loader/images/start.png') );
        this.addChild( bg );

        // 클로즈 버튼
        // --------------------------------------------------------------------------------------------------------------------------------
        this.mClose = new Button( this.mButtonSheet.textures['btn_header_close.png']);
        this.mClose.position.set(2394,70);
        this.mClose.addCustomEventListener(EventType.ButtonTab, ()=> {
            console.log("close");
            const popup = new QuitPopup();
        });
        this.addChild(this.mClose); 


        this.mStart = new Button( this.mButtonSheet.textures['btn_tr.png']);
        this.mStart.width = 334;
        this.mStart.height = 186;
        this.mStart.position.set(1111,736);
        this.mStart.addCustomEventListener(EventType.ButtonTab, ()=> {
            this.dispatchEvent("startClick");
        });
        this.addChild(this.mStart); 

        this.visible = true;
    }
}