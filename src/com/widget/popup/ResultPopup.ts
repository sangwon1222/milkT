import { EventType } from '../../../com/core/EventType';
import { ViewerRscManager } from '../../manager/ViewerRscManager';
import { SoundManager } from '../../manager/SoundManager';
import { Button } from '../../widget/Button';
import { TypeingApp } from '../../TypeingApp';
import { PopupBase } from "./PopupBase";
import { SceneName } from '../../core/SceneBast';

const style = new PIXI.TextStyle({
    fontSize:54,
    fontFamily: "TmoneyRoundWindExtraBold",
    fill:0XFFFFFF,
    lineHeight:74
})

export class ResultPopup extends PopupBase {

    private mTitle: PIXI.Text;
    private mBg: PIXI.Sprite;
    private mSummitBtn: Button;

    private mLabel: string;
    private mType: number;
    private mResultData: any;

    private mButtonSheet: PIXI.LoaderResource;
    private mPopupResultSheet: PIXI.LoaderResource;

    constructor( title: string, type: number, resultData: any )
    {
        super();

        this.mLabel = title;
        this.mType = type;
        this.mResultData = resultData;
        this.drawFrame();
    }

    init()
    {
        this.mButtonSheet = ViewerRscManager.Handle.getResource("button", "button.json");
        this.mPopupResultSheet = ViewerRscManager.Handle.getResource("popup", "popup_result.json");
    }


    private drawFrame()
    {
        this.mBg = new PIXI.Sprite(
            //ViewerRscManager.Handle.getResource("common", `bg_popup_result_${ this.mType }.png`).texture
            this.mPopupResultSheet.textures[ `bg_popup_result_${ this.mType }.png` ]
        );
        
        this.mTitle = new PIXI.Text( this.mLabel,
            {
                fontSize:54,
                fontFamily: "TmoneyRoundWindExtraBold",
                fill:0XFFFFFF,
                lineHeight:26
            } )
        this.mTitle.position.set(86, 150);


        this.mSummitBtn = new Button(
            //ViewerRscManager.Handle.getResource("common","btn_popup_end.png").texture
            this.mButtonSheet.textures["btn_popup_end.png"]
        )
       // this.mSummitBtn.setAnchor(0.5, 0.5);
        this.mSummitBtn.addCustomEventListener( EventType.ButtonTab, ()=>{

            this.closePopup();
            if(this.mType == 0 || this.mType == 1)
            {
                TypeingApp.Handle.getHeader().close();
            }

            if( this.mType == 2 )
            {
                SoundManager.Handle.stopBgmSound();
                //SoundManager.Handle.BGM_Main();
                TypeingApp.Handle.getHeader().sceneMove(SceneName.SelectGame);
            }
            
        });

        window.onkeyup=(evt)=>{
            if(evt.keyCode == 13 || evt.key == "Enter" ){
                window.onkeyup = null;
                TypeingApp.Handle.getHeader().close();
                TypeingApp.Handle.popupRoot.removeChild( this );
            }
        }

        this.mPopupContainer.addChild(this.mBg);
        this.mPopupContainer.addChild(this.mTitle);
        this.mPopupContainer.addChild(this.mSummitBtn);

        if( this.mType == 0) 
        {
            this.mPopupContainer.position.set( 780 , 463);
            this.mTitle.position.set(86, 150);
            this.mSummitBtn.position.set( 339, 574);
        } 

        if( this.mType== 1)
        {
            this.mPopupContainer.position.set( 780 , 378);
            this.mTitle.position.set(86, 150);
            this.mSummitBtn.position.set( 339, 743);
        }  

        if( this.mType== 2)
        {
            this.mPopupContainer.position.set( 780 , 442);
            this.mTitle.position.set(86, 172);
            this.mSummitBtn.position.set( 125, 596);

            const rePlayBtn = new Button(
                //ViewerRscManager.Handle.getResource("common","btn_popup_replay.png").texture
                this.mButtonSheet.textures[ "btn_popup_replay.png" ]
            );
            rePlayBtn.addCustomEventListener( EventType.ButtonTab, ()=> {
                this.closePopup();
                this.dispatchEvent( EventType.ReceiveData);
            })

            rePlayBtn.position.set(554, 596);
            this.mPopupContainer.addChild(rePlayBtn);
        }  

        

        this.darwText( this.mType, this.mResultData);
    }

    private darwText($type: number, $data: any) {

        // ?????? ??????, ?????? ??????
        if ($type == 0) 
        {
            const wrongTxt = new PIXI.Text( `${$data.wrong}???`, style );
            wrongTxt.pivot.set(wrongTxt.width / 2, wrongTxt.height / 2);
            wrongTxt.tint = 0xf84d4d;
            wrongTxt.position.set(194, 450);
            this.mPopupContainer.addChild(wrongTxt);

            const timeTxt = new PIXI.Text( this.setTimeFormat($data.time), style );
            timeTxt.pivot.set(timeTxt.width / 2, timeTxt.height / 2)
            timeTxt.tint = 0x2eb424;
            timeTxt.position.set(530, 450);
            this.mPopupContainer.addChild(timeTxt);

            const accuracyTxt =  new PIXI.Text( `${$data.accuracy}%`, style );
            accuracyTxt.pivot.set(accuracyTxt.width / 2, accuracyTxt.height / 2)
            accuracyTxt.tint = 0x00a4d6;
            accuracyTxt.position.set(867, 450);
            this.mPopupContainer.addChild(accuracyTxt);
        }


        // ?????? ??????, ??? ??? ??????, ?????? ??????
        if( $type == 1 )
        {
            const averageTxt = new PIXI.Text( this.setAverageFormat($data.average) , style );
            averageTxt.pivot.set(averageTxt.width/2,averageTxt.height/2)
            averageTxt.tint=0xffa200;
            averageTxt.position.set(295,444);
            this.mPopupContainer.addChild(averageTxt);

            const wrongTxt = new PIXI.Text( `${$data.wrong}???`, style );
            wrongTxt.pivot.set(wrongTxt.width / 2, wrongTxt.height / 2);
            wrongTxt.tint = 0xf84d4d;
            wrongTxt.position.set(760, 444);
            this.mPopupContainer.addChild(wrongTxt);

            const accuracyTxt =  new PIXI.Text( `${ this.setAccuracyFormat( $data.accuracy)}%`, style );
            accuracyTxt.pivot.set(accuracyTxt.width / 2, accuracyTxt.height / 2)
            accuracyTxt.tint = 0x00a4d6;
            accuracyTxt.position.set(295, 655);
            this.mPopupContainer.addChild(accuracyTxt);

            const timeTxt = new PIXI.Text( this.setTimeFormat($data.time), style );
            timeTxt.pivot.set(timeTxt.width / 2, timeTxt.height / 2)
            timeTxt.tint = 0x2eb424;
            timeTxt.position.set(760, 655);
            this.mPopupContainer.addChild(timeTxt);
        }

        // ?????? ??????
        if( $type == 2 )
        {
            const scoreTxt = new PIXI.Text( `${$data.score}???` , style );
            scoreTxt.pivot.set(scoreTxt.width/2,scoreTxt.height/2)
            scoreTxt.tint=0xf84d4d;
            scoreTxt.position.set(301,476);
            this.mPopupContainer.addChild(scoreTxt);

            const levelTxt = new PIXI.Text( `${$data.level}??????` , style );
            levelTxt.pivot.set(levelTxt.width/2,scoreTxt.height/2)
            levelTxt.tint=0x00a4d6;
            levelTxt.position.set(760,476);
            this.mPopupContainer.addChild(levelTxt);
        }
    }

    private setAccuracyFormat( valeu: number ) 
    {
        if(Number.isNaN(valeu)) {
            return "-";
        }
        return valeu;
    }

  

    private setAverageFormat( value: number) {

        //?????? ????????? ?????? ?????? 1000?????? ??????.
        if( value > 1000) value = 1000;

        return `${value}???`

    }

    private setTimeFormat(value: number) {

        // ????????? ?????? 30????????? ??????.
        if(value > 1800) value = 1800;

        let min: string;
        let sec: string;

        if(value > 59) {
            min = `${Math.floor(value / 60)} ??? `;
            sec = `${value % 60} ???`;
        } else {
            min = "";
            sec = `${value} ???`;
        }

        const comp = `${min}${sec}`

        //console.log(comp);
        return comp;
    }
}