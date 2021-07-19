import { ViewerRscManager } from '../../../manager/ViewerRscManager'

const style = new PIXI.TextStyle({
    align: "left",
    fill: "#999999",
    fontFamily: "NanumGothicBold",
    fontWeight: "normal",
    fontSize: 50,
});

export class TextBg extends PIXI.Container {

    private mText: PIXI.Text;
    private mQSprite: PIXI.Sprite;
    private mISprite: PIXI.Sprite;

    constructor() {

        super();

        this.mQSprite = new PIXI.Sprite();
        this.mQSprite.position.set(140,-530);
        this.mQSprite.texture = ViewerRscManager.Handle.getResource("exam", "focus_q.png").texture;

        this.mISprite = new PIXI.Sprite();
        this.mISprite.position.set(140,-20);
        this.mISprite.texture = ViewerRscManager.Handle.getResource("exam", "focus_i.png").texture;

        this.mText = new PIXI.Text("", style );
        this.mText.position.set(340, 0);

        
        this.addChild(this.mText);
        this.addChild(this.mQSprite);
        this.addChild(this.mISprite);
    }

    setLabel( txt: string ) {

        const tempTxt = new PIXI.Text("", style );
        const temp = txt.split("");

        for( let i = 0; i < temp.length; i++) {
            
            tempTxt.text += temp[i];

            if (tempTxt.width >= 1980) {
                break;
            }
        }
    
        this.mText.text = tempTxt.text;
    }

    setFocus( bool: boolean ) {

        if(bool) {
            this.mText.visible = false;
            this.mISprite.visible = true;
            this.mQSprite.visible = true;
        } else {
            this.mText.visible = true;
            this.mISprite.visible = false;
            this.mQSprite.visible = false;
        }
    }

}