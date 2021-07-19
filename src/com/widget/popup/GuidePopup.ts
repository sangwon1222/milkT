import { ObjectBase } from '../../core/ObjectBase';
import { Button } from '../../widget/Button';
import { ViewerRscManager } from '../../manager/ViewerRscManager';
import { EventType } from '../../core/EventType';
import Config from '../../../Utill/Config';
import { TypeingApp } from '@/com/TypeingApp';

import { SceneName } from '../../core/SceneBast';

export class TabButton extends Button {

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
        this.mText.x = 144 - (this.mText.width / 2);
    }
}

export class PageButton extends Button {

    private mNumTxt: PIXI.Text;

    constructor( n: number) {

        super( 
            ViewerRscManager.Handle.getResource("guidepopup", "page_btn_normal.png").texture,
            ViewerRscManager.Handle.getResource("guidepopup", "page_btn_sel.png").texture
        );

        const style = new PIXI.TextStyle({
            fill: "#ffffff",
            fontFamily: "TmoneyRoundWindExtraBold",
            fontWeight: "bold",
            fontSize: 46,
            lineHeight:25
        });

        this.mNumTxt = new PIXI.Text( `${n}`, style);
        this.mNumTxt.pivot.set( this.mNumTxt.width / 2, this.mNumTxt.height / 2);
        this.mNumTxt.position.set(58, 47);
        this.addChild(this.mNumTxt);
    }
}



export class GuidePopupPage extends ObjectBase {

    private mAnimal: PIXI.Sprite;
    private mScript: PIXI.Sprite;

    private mPopKr: PIXI.Sprite;
    private mPopEn: PIXI.Sprite;

    private mPageBtnAry: Array< PageButton >;
    private mpageAry: Array< PIXI.Container >

    constructor( index: number ) {

        super();

      
        if( index == SceneName.Intro ) {
            this.drawTypeOne();
        } 
        else if( index == SceneName.SelectGame)
        {
            this.drawTypeThree( index );
        }
        else
        {
            this.drawTypeTwo( index );
        }
        

        this.visible = false;
    }

    private drawTypeOne() {
     
        this.mPageBtnAry = [];
        this.mpageAry = [];

        // 우측 이미지 좌표.
        const imPos = [ [1470, 140], [ 1348, 170 ], [1300, 146]];

        let xpos = 710;
        const ypos = 552;

        for( let i = 0; i < 3; i++ ) {

            // 페이지 생성
            const page = new PIXI.Container();
            const script = new PIXI.Sprite( ViewerRscManager.Handle.getResource("guidepopup", `guide_0_script_${ i + 1 }.png`).texture );
            script.position.set( 91, 130 );
            page.addChild(script);

            const image = new PIXI.Sprite( ViewerRscManager.Handle.getResource("guidepopup", `guide_0_img_${ i + 1 }.png`).texture );
            image.position.set( imPos[i][0], imPos[i][1] );
            page.addChild(image);

            page.zIndex = i;
            if( i != 0 ) page.visible = false;
            
            this.addChild(page);
            this.mpageAry.push( page );

            // 하단 페이지 버튼 생성
            const pageBtn = new PageButton( i + 1 );
            pageBtn.position.set(xpos, ypos);
            pageBtn.zIndex = i + 10;
            pageBtn.index = i;
            this.addChild(pageBtn);
            xpos += 227;

            pageBtn.addCustomEventListener(EventType.ButtonTab, ()=>{
                
                for(const btn of this.mPageBtnAry) {
                    if (btn == pageBtn) {
                        btn.selected = true;
                        this.mpageAry[ btn.index ].visible = true;
                    } else {
                        btn.selected = false;
                        this.mpageAry[ btn.index ].visible = false;
                    }
                }
            })

            if( i == 0) pageBtn.selected = true;
            this.mPageBtnAry.push(pageBtn);
        }

        this.mAnimal = new PIXI.Sprite( ViewerRscManager.Handle.getResource("guidepopup", `guide_0_ch.png`).texture );
        this.mAnimal.anchor.set(0.5,1);
        this.mAnimal.position.set(236, 735);
        this.addChild(this.mAnimal);

    }

    private drawTypeTwo( index: number) {
        
        this.mScript = new PIXI.Sprite( ViewerRscManager.Handle.getResource("guidepopup", `guide_${index}_script.png`).texture );
        this.mScript.position.set(91, 130);
        this.addChild(this.mScript);

        this.mPopEn = new PIXI.Sprite( ViewerRscManager.Handle.getResource("guidepopup", `guide_${index}_en.png`).texture );
        this.mPopEn.position.set(1118, 62);
        this.addChild(this.mPopEn);

        this.mPopKr = new PIXI.Sprite( ViewerRscManager.Handle.getResource("guidepopup", `guide_${index}_kr.png`).texture );
        this.mPopKr.position.set(1280, 240);
        this.addChild(this.mPopKr);

        this.mAnimal = new PIXI.Sprite( ViewerRscManager.Handle.getResource("guidepopup", `guide_${index}_ch.png`).texture );
        this.mAnimal.anchor.set(0.5,1);
        this.mAnimal.position.set(298, 708);
        this.addChild(this.mAnimal);
   
    }

    private drawTypeThree( index: number ) 
    {

        this.mPageBtnAry = [];
        this.mpageAry = [];
        

        // 우측 이미지 좌표.
        const imPos = [ [1470, 140], [ 1348, 170 ], [1300, 146]];

        let xpos = 710;
        const ypos = 552;

        

        for( let i = 0; i < 3; i++ ) {

            // 페이지 생성
            const page = new PIXI.Container();

            const image = new PIXI.Sprite();
            const icon = new PIXI.Sprite();

            if( i == 0 )
            {
                this.mScript = new PIXI.Sprite( ViewerRscManager.Handle.getResource("guidepopup", `guide_6_script.png`).texture );
                this.mScript.position.set(91, 130);
                page.addChild(this.mScript);

                image.texture = ViewerRscManager.Handle.getResource("guidepopup", `guide_6_kr.png`).texture;
                image.position.set(1270, 130);
                page.addChild(image);

                icon.texture = ViewerRscManager.Handle.getResource("guidepopup", `guide_6_ch.png`).texture 
                icon.anchor.set(0.5,1);
                icon.position.set(298, 708);
                page.addChild(icon);
            }

            if( i == 1)
            {
                const title = new PIXI.Sprite( ViewerRscManager.Handle.getResource("guidepopup", `space_title.png`).texture );
                const t1 = new PIXI.Sprite( ViewerRscManager.Handle.getResource("guidepopup", `space_t1.png`).texture );
                const t2 = new PIXI.Sprite( ViewerRscManager.Handle.getResource("guidepopup", `space_t2.png`).texture );
                const t3 = new PIXI.Sprite( ViewerRscManager.Handle.getResource("guidepopup", `space_t3.png`).texture );
                const t4 = new PIXI.Sprite( ViewerRscManager.Handle.getResource("guidepopup", `space_t4.png`).texture );
                const image = new PIXI.Sprite( ViewerRscManager.Handle.getResource("guidepopup", `space.png`).texture );

                title.position.set(68, 70);
                t1.position.set(68, 189);
                t2.position.set(68, 263);
                t3.position.set(68, 336);
                t4.position.set(68, 466);
                image.position.set(1270, 130);

                page.addChild(title);
                page.addChild(t1);
                page.addChild(t2);
                page.addChild(t3);
                page.addChild(t4);
                page.addChild(image);
            }

            if( i == 2 )
            {
                const title = new PIXI.Sprite( ViewerRscManager.Handle.getResource("guidepopup", `forest_title.png`).texture );
                const t1 = new PIXI.Sprite( ViewerRscManager.Handle.getResource("guidepopup", `forest_t1.png`).texture );
                const t2 = new PIXI.Sprite( ViewerRscManager.Handle.getResource("guidepopup", `forest_t2.png`).texture );
                const t3 = new PIXI.Sprite( ViewerRscManager.Handle.getResource("guidepopup", `forest_t3.png`).texture );
                const t4 = new PIXI.Sprite( ViewerRscManager.Handle.getResource("guidepopup", `forest_t4.png`).texture );
                const image = new PIXI.Sprite( ViewerRscManager.Handle.getResource("guidepopup", `forest.png`).texture );

                title.position.set(68, 70);
                t1.position.set(68, 189);
                t2.position.set(68, 263);
                t3.position.set(68, 336);
                t4.position.set(68, 466);
                image.position.set(1270, 130);

                page.addChild(title);
                page.addChild(t1);
                page.addChild(t2);
                page.addChild(t3);
                page.addChild(t4);
                page.addChild(image);
            }
     
            page.zIndex = i;
            if( i != 0 ) page.visible = false;
            
            this.addChild(page);
            this.mpageAry.push( page );

            // 하단 페이지 버튼 생성
            const pageBtn = new PageButton( i + 1 );
            pageBtn.position.set(xpos, ypos);
            pageBtn.zIndex = i + 10;
            pageBtn.index = i;
            this.addChild(pageBtn);
            xpos += 227;

            pageBtn.addCustomEventListener(EventType.ButtonTab, ()=>{
                
                for(const btn of this.mPageBtnAry) {
                    if (btn == pageBtn) {
                        btn.selected = true;
                        this.mpageAry[ btn.index ].visible = true;
                    } else {
                        btn.selected = false;
                        this.mpageAry[ btn.index ].visible = false;
                    }
                }
            })

            if( i == 0) pageBtn.selected = true;
            this.mPageBtnAry.push(pageBtn);
        }
    }
}

export class GuidePopup extends ObjectBase{

    private mPopupContainer: ObjectBase;

    private mTabContainer: ObjectBase;

    private mPageContainer: ObjectBase;

    private mLeftCurBtn: Button;
    private mRightCurBtn: Button;

    private mCloseBtn: Button;
    private mTabAry: Array< TabButton >;

    private mTabPage: Array< ObjectBase >;

    private mCurrentIdx: number;
    private mMaxIdx: number;

    private mButtonSheet: PIXI.LoaderResource;

    constructor( idx: number ) {

        super();
        this.init( idx );
    }

    private async init( idx: number) {

        this.mButtonSheet = ViewerRscManager.Handle.getResource("button", "button.json");

        this.mCurrentIdx = 0;
        this.mMaxIdx = 7;

        const dimmed = new PIXI.Graphics();
        dimmed.beginFill(0x000000,0.8);
        dimmed.drawRect(0,0,Config.w,Config.h);
        dimmed.endFill();
        this.addChild(dimmed);
        dimmed.interactive = true;

        this.mPopupContainer = new ObjectBase();
        this.mPopupContainer.position.set(140, 220);
        this.addChild(this.mPopupContainer);

        this.mTabAry = [];
        this.mTabPage = [];

        const popBg = new PIXI.Sprite(ViewerRscManager.Handle.getResource("guidepopup", "guide_pop_bg.png").texture);
        this.mPopupContainer.addChild(popBg);

        const popInBg = new PIXI.Sprite(ViewerRscManager.Handle.getResource("guidepopup", "guide_pop_in_bg.png").texture);
        popInBg.position.set(145, 320);
        this.mPopupContainer.addChild(popInBg);

        this.mPageContainer = new ObjectBase();
        this.mPageContainer.position.set(145, 320);
        this.mPopupContainer.addChild(this.mPageContainer);

        this.mTabContainer = new ObjectBase();
        this.mTabContainer.position.set(145, 220);
        this.mPopupContainer.addChild(this.mTabContainer);

       // this.mCloseBtn = new Button( ViewerRscManager.Handle.getResource("common", "btn_popup_close.png").texture);
        this.mCloseBtn = new Button( this.mButtonSheet.textures[`btn_popup_close.png`]);
        this.mCloseBtn.position.set(2100,50);
        this.mCloseBtn.addCustomEventListener(EventType.ButtonTab, ()=> {
            //const container = this.parent;
            //container.removeChild(this);
            TypeingApp.Handle.popupRoot.removeChild( this );
        });
        this.mPopupContainer.addChild(this.mCloseBtn);


        this.mLeftCurBtn = new Button( ViewerRscManager.Handle.getResource("guidepopup", "left_cur_btn.png").texture )
        this.mLeftCurBtn.position.set(30,599);
        this.mLeftCurBtn.addCustomEventListener(EventType.ButtonTab, ()=> {

            if( this.mCurrentIdx == 0) {
                this.mCurrentIdx = this.mMaxIdx - 1;
            } else {
                this.mCurrentIdx--;
            }
            this.selectTab(this.mCurrentIdx);
        })
        this.mPopupContainer.addChild(this.mLeftCurBtn);

        this.mRightCurBtn = new Button( ViewerRscManager.Handle.getResource("guidepopup", "right_cur_btn.png").texture )
        this.mRightCurBtn.position.set(2134,599);
        this.mRightCurBtn.addCustomEventListener(EventType.ButtonTab, ()=> {

            if( this.mCurrentIdx == this.mMaxIdx - 1) {
               this.mCurrentIdx = 0;
               
            } else {
                this.mCurrentIdx++;
            }
            this.selectTab(this.mCurrentIdx);
        })
        this.mPopupContainer.addChild(this.mRightCurBtn);


        const labelAry = ["학습 안내", "자리 연습", "낱말 연습", "문장 연습", "긴 글 연습", "타자 검정", "타자 게임"];
        let xpos = 0;

        for( let i = 0; i < this.mMaxIdx; i++) {
            const tabBtn = new TabButton(
                ViewerRscManager.Handle.getResource("guidepopup", "guide_tab_normal.png").texture,
                ViewerRscManager.Handle.getResource("guidepopup", "guide_tab_sel.png").texture
            );
            tabBtn.position.set(xpos, 0);
            tabBtn.text = labelAry[i];
            tabBtn.index = i;
            this.mTabAry.push(tabBtn);
            tabBtn.addCustomEventListener(EventType.ButtonTab, ()=> {
                this.selectTab(tabBtn.index);
                
            });
            this.mTabContainer.addChild(tabBtn);

            xpos += 284;

            const page = new GuidePopupPage( i );
            this.mTabPage.push( page );
            this.mPageContainer.addChild(page);
        }

        this.selectTab( idx );

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
