import { Renderer } from '../../../widget/Renderer';
import * as Style from '../../../design/TextStyle';
import { ViewerRscManager } from '../../../manager/ViewerRscManager';

export class LongTextRightRenderer extends Renderer {

    public mIndexText: PIXI.Text;
    public mTitleText: PIXI.Text;
    private mSprite: PIXI.Sprite;
    private mDidSprite: PIXI.Sprite;

    constructor() {

        super();
    }

    //override;
    draw() {

        this.mSprite = new PIXI.Sprite();
        this.mSprite.width = 1370;
        this.mSprite.height = 162;
        this.addChild(this.mSprite);

        this.mIndexText = new PIXI.Text("", Style.longTextStyle1() );
        this.mIndexText.position.set(122, 50);
        this.addChild(this.mIndexText);

        this.mTitleText = new PIXI.Text("", Style.longTextStyle0() );
        this.mTitleText.position.set(261, 53);
        this.addChild(this.mTitleText);

        this.mDidSprite = new PIXI.Sprite();
        this.mDidSprite.position.set(1016, 41);
        this.addChild(this.mDidSprite);
    }

    setBgTexture( texture: PIXI.Texture ) {

        this.mSprite.texture = texture;
    }

    setDidTexture( texture: PIXI.Texture ) {
        this.mDidSprite.texture = texture;
    }
}