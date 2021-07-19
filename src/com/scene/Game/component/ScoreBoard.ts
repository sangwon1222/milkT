import { ObjectBase } from '../../../core/ObjectBase';
import { ViewerRscManager } from '../../../manager/ViewerRscManager';
import { Heart } from './Heart';
import * as Util from '../../../../Utill/Config';
import { EventType } from '../../../../com/core/EventType';

export class ScoreBoard extends ObjectBase {

    private mLifeCnt: number;
    private mScore: number;


   // private mLevelSpr: PIXI.Sprite;
   private mLevelTxt: PIXI.Text;

    private mHeartAry: Array< Heart >;

    private mText: PIXI.Text;

    private mCommonSheet: PIXI.LoaderResource;

    constructor() {

        super();

        this.mCommonSheet = ViewerRscManager.Handle.getResource("game", "game_common.json");

        

        this.mScore = 0;

        //const bg = new PIXI.Sprite(ViewerRscManager.Handle.getResource("gamecommon", "score_board.png").texture);
        const bg = new PIXI.Sprite( this.mCommonSheet.textures[`score_board.png`]);
        this.addChild(bg);

        const scoreStyle = new PIXI.TextStyle({
            fill: "#ffe001",
            fontFamily: "TmoneyRoundWindExtraBold",
            fontSize: 56
        });

        this.mText = new PIXI.Text("", scoreStyle)
        this.mText.pivot.set(this.mText.width,0);
        this.mText.position.set(486,28);
        this.score = 0;
        this.addChild(this.mText);

        this.mHeartAry = [];
        let xpos = 178;

        for(let i = 0; i < 10; i++ ) {
            const heart = new Heart();
            heart.position.set(xpos,98);
            this.mHeartAry.push(heart);
            this.addChild(heart);

            xpos += 52;
        }

        const levelStyle = new PIXI.TextStyle({
            fill: "#ffe001",
            fontFamily: "TmoneyRoundWindExtraBold",
            fontSize: 120,
            stroke: "#002632",
            strokeThickness: 20
        });

        this.mLevelTxt = new PIXI.Text("", levelStyle);
        this.mLevelTxt.pivot.set( this.mLevelTxt.width / 2,this.mLevelTxt.height / 2);
        this.mLevelTxt.position.set(78,87);
        this.addChild( this.mLevelTxt );
    }

    get lifeCnt(): number { return this.mLifeCnt; }
    set lifeCnt( n: number ) {
        this.mLifeCnt = n;
    }

    get score(): number { return this.mScore; }
    set score( n: number ) {


        this.mScore = n;
        this.mText.text = Util.addComma(this.mScore );
        this.mText.pivot.set(this.mText.width,0);
        this.mText.position.set(486,28);
        
    }


    drawLevel( level: number ) {
       this.mLevelTxt.text = String( level );
       this.mLevelTxt.pivot.set( this.mLevelTxt.width / 2,this.mLevelTxt.height / 2);
       this.mLevelTxt.position.set(78,87);
    }

    lifeFull() {

        for( const heart of this.mHeartAry) {
            heart.full();
        }
        this.lifeCnt = 10;
    }

    // 하트 하나 감소
    lifeReduce() {
        if(this.lifeCnt <= 0 ) return;
        this.lifeCnt--;
        const heart = this.mHeartAry[this.lifeCnt];
        heart.empty();
        this.dispatchEvent( EventType.RecieveNoVitality, this.lifeCnt );
    }
}