import { EventType } from '../../../core/EventType';
import { CustomEvent } from '../../../core/CustomEvent';
import { ObjectBase } from '../../../core/ObjectBase';
import { ViewerRscManager } from '../../../manager/ViewerRscManager';
import { InputText2 } from '../../../widget/InputText2';

const style = new PIXI.TextStyle({
    fill: "#010101",
    fontFamily: "NanumGothicBold",
    fontWeight: "normal",
    fontSize: 60,
});

export class InputContainer extends ObjectBase
{
    private mInputText: InputText2;
    private mWrap: PIXI.Container;

    constructor( $category: string )
    {
        super();

        this.mWrap = new PIXI.Container();
        this.mWrap.position.set(948, 1380);

        const bg = new PIXI.Sprite(ViewerRscManager.Handle.getResource( `${$category}`, "input_bg.png").texture);
        this.mWrap.addChild(bg);

        this.mInputText = new InputText2( 490, 60, 0xffb000, style );
        this.mInputText.htmlInput.disabled = true;
        this.mInputText.y = 54;

        this.mInputText.htmlInput.disabled = false;
        this.mInputText.addCustomEventListener(EventType.InputTextInput, (evt)=> this.onInput(evt));
        this.mInputText.addCustomEventListener(EventType.InputTextKeyUp, (evt)=> this.onKeyUp(evt));
        this.mWrap.addChild(this.mInputText);

        this.mInputText.x = 335 - this.mInputText.getDisplayWidth() / 2;
        this.addChild(this.mWrap);
    }

    clearContainer()
    {
        this.mInputText.removeCustomEventListener(EventType.InputTextInput);
        this.mInputText.removeCustomEventListener(EventType.InputTextKeyUp);
        this.mInputText.clear();
    }

    focusIn()
    {
        this.mInputText.inFocus();
    }

    focusOut()
    {
        this.mInputText.outFocus();
    }

    private onInput( evt: CustomEvent ) 
    {
        this.mInputText.x = 335 - this.mInputText.getDisplayWidth() / 2;
    }

    private onKeyUp( evt: CustomEvent ) {
        if(evt.data == 13 || evt.data == 32) {
            const txt = this.mInputText.text.trim();
            this.mInputText.text = "";
            this.mInputText.x = 335 - this.mInputText.getDisplayWidth() / 2;
            //this.dispatchEvent( EventType.GameOnKeyUp, txt);
            this.dispatchEvent( EventType.RecieveText, txt);
        }  
    }
}






    
