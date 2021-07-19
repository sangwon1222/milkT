import { PopupBase } from "./PopupBase";
import { ViewerRscManager } from '../../manager/ViewerRscManager';
import { Button } from '../Button';
import { EventType } from '../../../com/core/EventType';

import { InputText2 } from '../InputText2';


class LevelButton extends Button
{
    private mText: PIXI.Text;

    
   

    constructor( normal: PIXI.Texture, sel: PIXI.Texture)
    {
        super( normal, sel);  
        const style = new PIXI.TextStyle({
            fill: "#ffffff",
            fontFamily: "TmoneyRoundWindExtraBold",
            fontWeight: "bold",
            fontSize: 70,
            lineHeight:36
        });
        this.mText = new PIXI.Text("", style);      
        this.addChild( this.mText );

        
    }

    setText(t: string)
    {
        this.mText.text = t;
        this.mText.pivot.set(0.5,0);
        this.mText.position.set( 191 - this.mText.width / 2, 34);
    }
}

export class LevelPopup extends PopupBase
{
    private mBtnAry: Array<LevelButton>;
    private mSelectLevel: number;
    private mSelectGame: number;
    private mButtonSheet: PIXI.LoaderResource;

    constructor( selectGame: number)
    {
        super();
        this.mSelectGame = selectGame;
    }

    init(){
        

        this.mButtonSheet = ViewerRscManager.Handle.getResource("button", "button.json");
        const bg = new PIXI.Sprite( ViewerRscManager.Handle.getResource('common', 'bg_popup_level.png').texture);
        this.mPopupContainer.position.set(414,320);
        this.mPopupContainer.addChild(bg);

        //const closeBtn = new Button( ViewerRscManager.Handle.getResource("common", "btn_popup_close.png").texture);
        const closeBtn = new Button( this.mButtonSheet.textures[`btn_popup_close.png`]);

        closeBtn.position.set(1642, 174);
        closeBtn.addCustomEventListener(EventType.ButtonTab, ()=>{
            this.closePopup();
        });
        this.mPopupContainer.addChild(closeBtn);

        this.mBtnAry = [];

        let stPosX = 83;
        let stPosY = 384;

        for( let i = 0; i < 8; i++)
        {
            const btn = new LevelButton(
                ViewerRscManager.Handle.getResource("common", "btn_level_normal.png").texture,
                ViewerRscManager.Handle.getResource("common", "btn_level_sel.png").texture
            );
            btn.position.set(stPosX, stPosY);
            btn.setText(`${i+1}단계`);
            btn.index = i;
            btn.addCustomEventListener( EventType.ButtonTab, ()=> this.selectLevelButton(btn.index));

            stPosX += 420;

            this.mPopupContainer.addChild( btn );
            if( i == 3 )
            {
                stPosX = 83;
                stPosY += 220; 
            }

            this.mBtnAry.push(btn);
        }
        this.selectLevelButton(0);

       // const startBtn = new Button( ViewerRscManager.Handle.getResource("common", "btn_popup_start.png").texture );
        const startBtn = new Button( this.mButtonSheet.textures[`btn_popup_start.png`]);
        startBtn.position.set(712, 834); 
        startBtn.addCustomEventListener( EventType.ButtonTab, ()=>{
            this.dispatchEvent(EventType.ReceiveData, { level:this.mSelectLevel });
            this.closePopup();
        })
        this.mPopupContainer.addChild(startBtn);
    }

    private selectLevelButton($index: number)
    {
        for( const btn of this.mBtnAry )
        {
            if( btn.index == $index)
            {
                this.mSelectLevel = $index;
                btn.selected = true;
            }else{
                btn.selected = false;
            }
        }
    }
}