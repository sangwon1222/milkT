import { ObjectBase } from '../../core/ObjectBase';
import { Button } from '../Button';
import { ViewerRscManager } from '../../manager/ViewerRscManager';
import { LanguageManager } from '../../manager/LanguageManager';
import { EventType } from '../../core/EventType';
import Config from '../../../Utill/Config';
import * as Util from '../../../Utill/Config';
import { ListView } from '../../widget/ListView';
import { Renderer } from '../../widget/Renderer';
import { VerticalScrollBar } from '../../widget/VerticalScrollBar';
import { DataManager } from '../../manager/DataManager';


class RankRenderer extends Renderer {

    private mBg: PIXI.Graphics;
    
    private mName: PIXI.Text;
    private mID: PIXI.Text;
    private mGrade: PIXI.Text;
    private mScore: PIXI.Text;
    private mStep: PIXI.Text;
    private mRank: PIXI.Text;

    private mMedal: PIXI.Sprite;

    constructor() {

        super();
    }

    //override;
    draw() {

        const style = new PIXI.TextStyle({
            fill: "#333333",
            fontFamily: "TmoneyRoundWindExtraBold",
            fontWeight: "bold",
            fontSize: 40,
            lineHeight:23
        });

        this.mBg = new PIXI.Graphics();
        this.addChild(this.mBg);

        this.mName = new PIXI.Text("", style);
        this.mID = new PIXI.Text("", style);
        this.mGrade = new PIXI.Text("", style);
        this.mScore = new PIXI.Text("", style);
        this.mStep = new PIXI.Text("", style);
        this.mRank = new PIXI.Text("", style);

        this.addChild(this.mName);
        this.addChild(this.mID);
        this.addChild(this.mGrade);
        this.addChild(this.mScore);
        this.addChild(this.mStep);
        this.addChild(this.mRank);
    }

    set medal( texutre: PIXI.Texture ) {
        this.mMedal = new PIXI.Sprite( texutre);
        this.mMedal.anchor.set(0.5, 0.5);
        this.mMedal.position.set(2085, 50);
        this.addChild(this.mMedal);
    }

    set nameTxt( txt: string ) {
        
        this.mName.text = txt;
        this.mName.pivot.set( this.mName.width/2, 0);
        this.mName.position.set(304, 24);
    }

    set idTxt( txt: string ) {
        
        this.mID.text = txt;
        this.mID.pivot.set( this.mID.width/2, 0);
        this.mID.position.set(850, 24);
    }

    set gradeTxt( txt: string ) {
        
        //this.mGrade.text = txt + "학년";
        this.mGrade.text = txt;
        this.mGrade.pivot.set( this.mGrade.width/2, 0);
        this.mGrade.position.set(1262, 24);
    }

    set scoreTxt( txt: string ) {
        
        //this.mScore.text = Util.addComma(txt) + "점";
        this.mScore.text = txt
        this.mScore.pivot.set( this.mScore.width, 0);
        this.mScore.position.set(1685, 24);
    }

    set rankTxt( txt: string ) {
        
        //this.mRank.text = Util.addComma(txt) + "위";
        this.mRank.text = txt;
        this.mRank.pivot.set( this.mRank.width, 0);
        this.mRank.position.set(2000, 24);
    }

    bgFillColor( $index: number ) {
        const index = $index + 1;
        const bgColor = ( index % 2 == 0 )? 0xffffff: 0xf7f7f7; 

        this.mBg.beginFill(bgColor);
        this.mBg.drawRect(0,0, 2260, 100);
        this.mBg.endFill();
    }
}

 class RankListView extends ListView {

    constructor( w: number, h: number) {
        
        super( w, h, 0);
    }

    draw( info: any ): RankRenderer {
        const list = new RankRenderer();
        list.bgFillColor(info.index);
        list.nameTxt = info.Name;
        list.idTxt = info.ID;
        list.gradeTxt = info.Grade;
        list.scoreTxt = info.Score;
        list.rankTxt = info.Rank;
        if(info.RankSort == 1 ) list.medal = ViewerRscManager.Handle.getResource("rankpopup", "gold.png").texture;
        if(info.RankSort == 2 ) list.medal = ViewerRscManager.Handle.getResource("rankpopup", "silver.png").texture;
        if(info.RankSort == 3 ) list.medal = ViewerRscManager.Handle.getResource("rankpopup", "bronze.png").texture;
        return list;
    }
 }


class TabButton extends Button {

    private mText: PIXI.Text;

    constructor( normal: PIXI.Texture, sel?: PIXI.Texture, dis?: PIXI.Texture ) {

        super(normal, sel, dis);

        const style = new PIXI.TextStyle({
            align: "center",
            fill: "#ffffff",
            fontFamily: "TmoneyRoundWindExtraBold",
            fontWeight: "bold",
            fontSize: 40,
            lineHeight:0.63
        });

        this.mText = new PIXI.Text("", style);
        this.mText.y = 24;
        this.addChild(this.mText);
    }

    set text( txt: string ) {

        this.mText.text = txt;
        this.mText.x = 200 - (this.mText.width / 2);
    }
}


class TypingRender extends PIXI.Container {

    private mTitle: PIXI.Text;
    private mAverage: PIXI.Text;
    private mTop: PIXI.Text;
    private mAccuracy: PIXI.Text;

    

    constructor( color = 0xffff00 ) {
        super();

        const style = new PIXI.TextStyle({
            fill: "#333333",
            fontFamily: "TmoneyRoundWindExtraBold",
            fontWeight: "bold",
            fontSize: 40,
            lineHeight:23
        });

        const bg = new PIXI.Graphics();
        bg.beginFill(color);
        bg.drawRect(0,0, 2260, 180);
        bg.endFill();
        bg.alpha = 0;
        this.addChild(bg);

        this.mTitle = new PIXI.Text("", style);
        this.mAverage = new PIXI.Text("", style);
        this.mTop = new PIXI.Text("", style);
        this.mAccuracy = new PIXI.Text("", style);

       

        this.addChild(this.mTitle);
        this.addChild(this.mAverage);
        this.addChild(this.mTop);
        this.addChild(this.mAccuracy);
    }

    

    set titleTxt( txt: string ) {
        
        this.mTitle.text = txt;
        this.mTitle.pivot.set( this.mTitle.width/2, 0);
        this.mTitle.position.set(244, 64);
    }

    set averageTxt( txt: string ) {
        
        this.mAverage.text = Util.addComma(txt) + "타";
        this.mAverage.pivot.set( this.mAverage.width/2, 0);
        this.mAverage.position.set(1082, 64);
    }

    set topTxt( txt: string ) {
        
        this.mTop.text = Util.addComma(txt) + "타";
        this.mTop.pivot.set( this.mTop.width/2, 0);
        this.mTop.position.set(1570, 64);
    }

    set accuracyTxt( txt: string ) {
        
        this.mAccuracy.text = txt + "%";
        this.mAccuracy.pivot.set( this.mAccuracy.width/2, 0);
        this.mAccuracy.position.set(2003, 64);
    }
}

// type = 0 이면 타이핑 기록  / type = 1 게임1 기록 / type = 2 게임2 기록
class RankPopupPage extends ObjectBase {

    private mRecordData: any;

    private mListView: RankListView;
    private mScrollBar: VerticalScrollBar;

    constructor( type: number, data?: any ) {

        super();
        this.mRecordData = {};
        const bg =  new PIXI.Sprite(ViewerRscManager.Handle.getResource("rankpopup", `page${type}_bg.png`).texture);
        this.addChild(bg);

       
        if( data ) this.mRecordData = data;

        if(type == 0) this.drawTypingRecord();
        if(type == 1) this.drawGameRecord();
    }

    // 타이핑 기록을 화면에 뿌려준다.
    private drawTypingRecord() {

        let len = this.mRecordData.length;
        if (len > 0) {
            if (len > 5) len = 5;
            let ypos = 100;
            for (let i = 0; i < len; i++) {

                const data = this.mRecordData[i];
                const render = new TypingRender();

                render.titleTxt = data.Title;
                render.averageTxt = data.Average;
                render.topTxt = data.Top;
                render.accuracyTxt = data.Accuracy;

                render.position.set(0, ypos);
                ypos += 180;
                this.addChild(render)
            }
        }
   
    }

    // 게임 기록을 화면에 뿌려준다.
    private drawGameRecord() {

        // ListView
        this.mListView = new RankListView(2260, 800);
        this.mListView.position.set(0,0);
        this.mListView.data = this.mRecordData.list;
        this.mListView.position.set(0,100);
        this.addChild(this.mListView);

        //ScrolLBar
        this.mScrollBar = new VerticalScrollBar(20,740);
        this.mScrollBar.position.set(2220, 130);
        this.addChild(this.mScrollBar);
        this.mListView.linkScrollBar(this.mScrollBar);
       
        /// MyRecord
        const myData = this.mRecordData.myrecord;
        if(Object.keys(myData).length > 0) {
            const style = new PIXI.TextStyle({
                fill: "#128fe2",
                fontFamily: "TmoneyRoundWindExtraBold",
                fontWeight: "bold",
                fontSize: 40,
                lineHeight:23
            });

            const nameTxt = new PIXI.Text(myData.Name, style);
            nameTxt.pivot.set( nameTxt.width/2, 0);
            nameTxt.position.set(304,954);
            this.addChild(nameTxt);

            const idTxt = new PIXI.Text(myData.ID, style);
            idTxt.pivot.set( idTxt.width/2, 0);
            idTxt.position.set(850,954);
            this.addChild(idTxt);

            //const gradeTxt = new PIXI.Text(myData.Grade + "학년", style);
            const gradeTxt = new PIXI.Text(myData.Grade, style);
            gradeTxt.pivot.set( gradeTxt.width/2, 0);
            gradeTxt.position.set(1262, 954);
            this.addChild(gradeTxt);

            //const scoreTxt = new PIXI.Text( Util.addComma(myData.Score) + "점", style);
            const scoreTxt = new PIXI.Text( myData.Score, style);
            scoreTxt.pivot.set( scoreTxt.width, 0);
            scoreTxt.position.set(1685, 954);
            this.addChild(scoreTxt);

            //const rankTxt = new PIXI.Text( Util.addComma(myData.Rank) + "위", style);
            const rankTxt = new PIXI.Text( myData.Rank, style);
            rankTxt.pivot.set( rankTxt.width, 0);
            rankTxt.position.set(2000, 954);
            this.addChild(rankTxt);
        }
    }
}




export class RankPopup extends ObjectBase{

    private mPopupContainer: ObjectBase;
    private mTabContainer: ObjectBase;
    private mPageContainer: ObjectBase;


    private mCloseBtn: Button;
    private mTabAry: Array< TabButton >;

    private mTabPage: Array< ObjectBase >;

    private mCurrentIdx: number;
    private mMaxIdx: number;

    private mData: any;
    
    private mButtonSheet: PIXI.LoaderResource;

    constructor() {

        super();
        
        this.init();
    }

    private async init() {

        this.mData = {
            "typing":[],
            "game1":{"list":[],"myrecord":{}},
            "game2":{"list":[],"myrecord":{}},
        };

        
        this.mButtonSheet = ViewerRscManager.Handle.getResource("button", "button.json");

        //console.log(this.mData);

        this.mCurrentIdx = 0;
        this.mMaxIdx = 3;

        const dimmed = new PIXI.Graphics();
        dimmed.beginFill(0x000000,0.8);
        dimmed.drawRect(0,0,Config.w,Config.h);
        dimmed.endFill();
        this.addChild(dimmed);
        dimmed.interactive = true;

        this.mPopupContainer = new ObjectBase();
        this.mPopupContainer.position.set(80, 110);
        this.addChild(this.mPopupContainer);

        this.mTabAry = [];
        this.mTabPage = [];

        const popBg = new PIXI.Sprite(ViewerRscManager.Handle.getResource("rankpopup", "bg.png").texture);
        this.mPopupContainer.addChild(popBg);


        const style = new PIXI.TextStyle({
            fill: "#ffffff",
            fontFamily: "TmoneyRoundWindExtraBold",
            fontWeight: "bold",
            fontSize: 54,
            lineHeight:26
        });
        const langTxt = new PIXI.Text("", style);

        if( LanguageManager.Handle.LANG == `kr` ) 
        {
            langTxt.text = `(한글)`;
        } else {
            langTxt.text = `(영어)`;
        }
        langTxt.position.set(386,38);
        this.mPopupContainer.addChild(langTxt);

        this.mPageContainer = new ObjectBase();
        this.mPageContainer.position.set(70, 290);
        this.mPopupContainer.addChild(this.mPageContainer);

        this.mTabContainer = new ObjectBase();
        this.mTabContainer.position.set(70, 190);
        this.mPopupContainer.addChild(this.mTabContainer);

        //this.mCloseBtn = new Button( ViewerRscManager.Handle.getResource("common", "btn_popup_close.png").texture);

        this.mCloseBtn = new Button( this.mButtonSheet.textures[`btn_popup_close.png`]);

       

        this.mCloseBtn.position.set(2250,20);
        this.mCloseBtn.addCustomEventListener(EventType.ButtonTab, ()=> {
            const container = this.parent;
            container.removeChild(this);
        });
        this.mPopupContainer.addChild(this.mCloseBtn);


        const labelAry = ["타자 기록", "우주 탐험 랭킹", "숲속 탐험 랭킹"];
        let xpos = 0;

        const dataLabel = ["typing", "game1", "game2"];

        const queryData = await DataManager.Handle.getRecordQuery();

        /*
       const queryData = [
            [
               {RecordType:"01", LangType:1},
               {RecordType:"01", LangType:1},
               {RecordType:"02", LangType:1, GameType:"6", Name:"테스터1", ID:"abc1", Score:100, Rank:1},
               {RecordType:"02", LangType:1, GameType:"6", Name:"테스터2", ID:"abc1", Score:30000, Rank:2},
               {RecordType:"02", LangType:1, GameType:"6", Name:"테스터3", ID:"abc1", Score:30000, Rank:3},
               {RecordType:"02", LangType:1, GameType:"6", Name:"테스터4", ID:"abc1", Score:30000, Rank:4},
               {RecordType:"02", LangType:1, GameType:"6", Name:"테스터5", ID:"abc1", Score:30000, Rank:5},
               {RecordType:"02", LangType:1, GameType:"6", Name:"테스터6", ID:"abc1", Score:30000, Rank:6},
               {RecordType:"02", LangType:1, GameType:"6", Name:"테스터7", ID:"abc1", Score:30000, Rank:7},
               {RecordType:"02", LangType:1, GameType:"6", Name:"테스터8", ID:"abc1", Score:30000, Rank:8},
               {RecordType:"02", LangType:1, GameType:"6", Name:"테스터9", ID:"abc1", Score:30000, Rank:9},
               {RecordType:"02", LangType:1, GameType:"6", Name:"테스터10", ID:"abc2", Score:20000, Rank:10}
            ]
        ]
        */

        if(queryData)
        {
            const len = queryData.length;
            for( let i = 0; i < len; i++)
            {
                const subLen = queryData[i].length;
                for( let q = 0; q < subLen; q++)
                {
                    const qd = queryData[i][q];
                    const lenType = ( LanguageManager.Handle.LANG == `kr` )? 1 : 2;

                    if(qd.RecordType == "01" && qd.LangType == lenType ) this.mData.typing.push(qd);
                    if(qd.RecordType == "02" && qd.LangType == lenType && qd.GameType == "6") this.mData.game1.list.push(qd);
                    if(qd.RecordType == "02" && qd.LangType == lenType && qd.GameType == "7") this.mData.game2.list.push(qd);
                    //myrecord
                    if(qd.RecordType == "03" && qd.LangType == lenType && qd.GameType == "6") this.mData.game1.myrecord = qd;
                    if(qd.RecordType == "03" && qd.LangType == lenType && qd.GameType == "7") this.mData.game2.myrecord = qd;
                }
            }
        }

        console.log(this.mData);

      // return;


      
        for( let i = 0; i < this.mMaxIdx; i++) {
            const tabBtn = new TabButton(
                ViewerRscManager.Handle.getResource("rankpopup", "tab_normal.png").texture,
                ViewerRscManager.Handle.getResource("rankpopup", "tab_sel.png").texture
            );
            tabBtn.position.set(xpos, 0);
            tabBtn.text = labelAry[i];
            tabBtn.index = i;
            this.mTabAry.push(tabBtn);
            tabBtn.addCustomEventListener(EventType.ButtonTab, ()=> {
                this.selectTab(tabBtn.index);
                
            });
            this.mTabContainer.addChild(tabBtn);

            xpos += 400;

            let type = 0;
            if(i > 0) type = 1;

            const page = new RankPopupPage( type, this.mData[dataLabel[i]] );
            this.mTabPage.push( page );
            this.mPageContainer.addChild(page);
        }
       

        this.selectTab( 0 );

    }

    private selectTab( idx: number ) {

        for( let i = 0; i < this.mMaxIdx; i++) {
            const tab = this.mTabAry[i];
            const page = this.mTabPage[i];

            if(tab.index == idx) {
                this.mCurrentIdx = idx;
                tab.selected = true;
                page.visible = true;
            } else {
                tab.selected = false;
                page.visible = false;
            }
        }
    }
}
