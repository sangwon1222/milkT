import { ViewerRscManager } from '../../../manager/ViewerRscManager';
import * as Style from '../../../design/TextStyle';

export class TextBg extends PIXI.Container {

    private mFocusBg: PIXI.Texture
    private mDefaultBg: PIXI.Texture;

    private mText: PIXI.Text;

    private mSprite: PIXI.Sprite;

    constructor() {

        super();

        this.mFocusBg = ViewerRscManager.Handle.getResource("longtext", "longText_focus.png").texture;
        this.mDefaultBg = ViewerRscManager.Handle.getResource("longtext", "longText_default.png").texture;

        this.mSprite = new PIXI.Sprite();
        this.mSprite.texture = this.mDefaultBg;

        this.mText = new PIXI.Text("", Style.longTextBgStyle() );
        this.mText.position.set(220, 144);

        this.addChild(this.mSprite);
        this.addChild(this.mText);
    }

    setLabel( txt: string ) {

        const tempTxt = new PIXI.Text("", Style.longTextBgStyle());

        const temp = txt.split("");

        for( let i = 0; i < temp.length; i++) {
            
            tempTxt.text += temp[i];

            if (tempTxt.width >= 1400) {
                break;
            }
        }
    

        this.mText.text = tempTxt.text;
    }

    setFocus( bool: boolean ) {

        if(bool) {
            this.mSprite.texture = this.mFocusBg;
            this.mText.visible = false;
        } else {
            this.mSprite.texture = this.mDefaultBg;
            this.mText.visible = true;
        }
    }

}