import { Renderer } from '../../../widget/Renderer';
import * as Style from '../../../design/TextStyle';
import { ViewerRscManager } from '../../../manager/ViewerRscManager';

export class ShortTextLeftRenderer extends Renderer {
    
    public mTitleText: PIXI.Text;

    private mNormalTexture: PIXI.Texture;
    private mSelTexture: PIXI.Texture;
    private mSprite: PIXI.Sprite;

    constructor() {

        super();
    }

    onChangeTexture(sel: boolean){
        if(sel)  {this.mSprite.texture = this.mSelTexture}
        else { this.mSprite.texture = this.mNormalTexture }
    }

    //override;
    draw() {

        this.mNormalTexture = ViewerRscManager.Handle.getResource( "longtext", "categoryNormal.png").texture;
        this.mSelTexture = ViewerRscManager.Handle.getResource( "longtext", "categorySel.png").texture;

        this.mSprite = new PIXI.Sprite();
        this.mSprite.texture = this.mNormalTexture;

        this.addChild(this.mSprite);

        this.mTitleText = new PIXI.Text("", Style.longTextStyle0() );
        this.mTitleText.position.set(100, 53);
        this.addChild(this.mTitleText);
    }

    selected( bool: boolean) {
        // override
        if(bool) {
            this.mSprite.texture = this.mSelTexture;

        } else {
            this.mSprite.texture = this.mNormalTexture;
        }
    }
}