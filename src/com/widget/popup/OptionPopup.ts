import { TypeingApp } from '../../TypeingApp';
import { ObjectBase } from '../../core/ObjectBase';
import { Button } from '../Button';
import { LanguageManager } from '../../manager/LanguageManager';
import { SoundManager } from '../../manager/SoundManager';
import { ViewerRscManager } from '../../manager/ViewerRscManager';
import { EventType } from '../../core/EventType';

import { PopupBase } from "./PopupBase";

import { HeaderBtn } from '../Header';

export class OptionPopup extends PopupBase{


    private mLangBtn: Button;
    private mBGMBtn: Button;
    private mEfSoundBtn: Button;
    private mConfrimBtn: Button;
    private mCloseBtn: Button;

    // Intro 에 있는 한영 전환 버튼
    private mKorEngBtn: HeaderBtn

    private mButtonSheet: PIXI.LoaderResource;
    private mPopupSysSheet: PIXI.LoaderResource;

    constructor() 
    {
        super();
    }

    init() {

        this.mButtonSheet = ViewerRscManager.Handle.getResource("button", "button.json");
        this.mPopupSysSheet = ViewerRscManager.Handle.getResource("popup", "popup_system.json");

   
        this.mPopupContainer.position.set(780, 421);
        //const popBg = new PIXI.Sprite(ViewerRscManager.Handle.getResource("common", "bg_popup_option.png").texture);
        const popBg = new PIXI.Sprite(this.mPopupSysSheet.textures['bg_popup_option.png']);
        this.mPopupContainer.addChild(popBg);

       // this.mCloseBtn = new Button( ViewerRscManager.Handle.getResource("common", "btn_popup_close.png").texture);
       this.mCloseBtn = new Button( this.mButtonSheet.textures['btn_popup_close.png'] );
        this.mCloseBtn.position.set(880,50);
        this.mCloseBtn.addCustomEventListener(EventType.ButtonTab, ()=> {
           // const container = this.parent;
            //container.removeChild(this);
            TypeingApp.Handle.popupRoot.removeChild( this );
        });
        this.mPopupContainer.addChild(this.mCloseBtn);

        this.mLangBtn = new Button(
            this.mButtonSheet.textures['btn_option_en.png'],
            this.mButtonSheet.textures['btn_option_kr.png']
        );
        this.mLangBtn.addCustomEventListener(EventType.ButtonTab, ()=> {
            this.mLangBtn.selected = !this.mLangBtn.selected;
        });
        this.mLangBtn.selected = LanguageManager.Handle.langFlag;
        this.mLangBtn.position.set(580,230);
        this.mPopupContainer.addChild(this.mLangBtn);


        // BGM 버튼
        this.mBGMBtn = new Button(
            this.mButtonSheet.textures['btn_option_off.png'],
            this.mButtonSheet.textures['btn_option_on.png']
        );
        this.mBGMBtn.addCustomEventListener(EventType.ButtonTab, ()=> {
            this.mBGMBtn.selected = !this.mBGMBtn.selected;
        });
        this.mBGMBtn.selected = SoundManager.Handle.bgmSoundFlag;
        this.mBGMBtn.position.set(580,376);
        this.mPopupContainer.addChild(this.mBGMBtn);


        // 효과음 버튼
        this.mEfSoundBtn = new Button(
            this.mButtonSheet.textures['btn_option_off.png'],
            this.mButtonSheet.textures['btn_option_on.png']
        );
        this.mEfSoundBtn.addCustomEventListener(EventType.ButtonTab, ()=> {
            this.mEfSoundBtn.selected = !this.mEfSoundBtn.selected;
        });
        this.mEfSoundBtn.selected = SoundManager.Handle.effectSoundFlag;
        this.mEfSoundBtn.position.set(580,522);
        this.mPopupContainer.addChild(this.mEfSoundBtn);


        // 확인 버튼
        this.mConfrimBtn = new Button(
            this.mButtonSheet.textures['btn_popup_summit.png']
        );
        this.mConfrimBtn.position.set(339,668);
        this.mConfrimBtn.addCustomEventListener(EventType.ButtonTab, ()=> {
            this.onSummit();
        });

        window.onkeyup=(evt)=>{
            if(evt.keyCode == 13 || evt.key == "Enter" ){ 
                SoundManager.Handle.Effect_CLICK();
                this.onSummit();
            }
        }

        this.mPopupContainer.addChild(this.mConfrimBtn);
    }

    private onSummit()
    {

         // 한영키
         if( LanguageManager.Handle.langFlag != this.mLangBtn.selected) {

            LanguageManager.Handle.langFlag = this.mLangBtn.selected;
            SoundManager.Handle.Effect_CHANGE_LANG();

            console.log( this );

            TypeingApp.Handle.getHeader().langBtn.selected = !this.mLangBtn.selected;
            //console.log(this.parent as Header);
            //( this.parent as Header ).langBtn.selected = !this.mLangBtn.selected;
        }

        // BGM 키
        if( SoundManager.Handle.bgmSoundFlag != this.mBGMBtn.selected ) {
            SoundManager.Handle.bgmSoundFlag = this.mBGMBtn.selected;
        }

        // Effect 키
        if( SoundManager.Handle.effectSoundFlag != this.mEfSoundBtn.selected ) {
            SoundManager.Handle.effectSoundFlag = this.mEfSoundBtn.selected;
        }

        window.onkeyup = null;
        
        TypeingApp.Handle.popupRoot.removeChild( this );

    }
}