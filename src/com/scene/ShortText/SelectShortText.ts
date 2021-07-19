import { TypeingApp } from '../../TypeingApp';
import { SceneBase, SceneName } from '../../core/SceneBast';
import { DataManager} from '../../manager/DataManager';
import { LanguageManager } from '../../manager/LanguageManager';
import { ViewerRscManager } from '../../manager/ViewerRscManager';
import { VerticalScrollBar } from '../../widget/VerticalScrollBar';
import { ShortTextLeftListView } from './component/ShortTextLeftListView';
import { ShortTextRightListView } from './component/ShortTextRightListView';
import { EventType } from "../../core/EventType";
import { CustomEvent} from '../../core/CustomEvent';
import gsap from 'gsap';
import { SoundManager } from '../../../com/manager/SoundManager';

export class SelectShortText extends SceneBase{

    private DATA: any;

    private mScrollBar: VerticalScrollBar;
    private mLeftListView: ShortTextLeftListView;
    private mRightListView: ShortTextRightListView;
    private mCategoyIdx: number;
    private mActiveCur: PIXI.Sprite;

    constructor() {
        super();
        this.name = "SelectShortText";
        this.visible = false;
    }

    async onInit(){

        // 헤더 상태 설정
        TypeingApp.Handle.getHeader().setSubMode();
        
        // 언어 상태와 데이타 값을 가져온다.
        this.DATA = await DataManager.Handle.getData( "shorttext", LanguageManager.Handle.LANG);

        // 맨 처음 왼쪽 리스트의 카테고리 선택값
        this.mCategoyIdx = 0;
    }

    async onStart(){
        
       // const queryData = await this.getAppTypingStudyChk();
        const queryData = await DataManager.Handle.getPracticeQuery("3", LanguageManager.Handle.LANG);
        //console.log(queryData.count);

        if (queryData.data) {
            let count = 0;
            for (let i = 0; i < 3; i++) {
                const subLen = this.DATA[i].list.length;
                for (let q = 0; q < subLen; q++) {
                    //console.log(this.DATA[i].list[q].did);
                    if (queryData.data[count].Complete == `Y`) this.DATA[i].list[q].did = true;
                    count++;
                }
            }
        }
        
        this.draw();
        this.mLeftListView.selectedIndex = 0;
        this.visible = true;

        //console.log(this.DATA);
    }
    

    private draw() {

        // 타이틀
        const title = new PIXI.Sprite( ViewerRscManager.Handle.getResource("shorttext", "title.png").texture );
        title.position.set(1066, 120);
        this.addChild( title );
        // 설명글
        const script = new PIXI.Sprite( ViewerRscManager.Handle.getResource("shorttext", "script.png").texture );
        script.position.set(455, 240);
        this.addChild( script );

        // 설정 언어 상태
        //const langState = new PIXI.Sprite( ViewerRscManager.Handle.getResource("common", `state_${ this.LANG }.png`).texture );
        //langState.position.set(400, 70);
        //this.addChild( langState );

        //주제백그라운드
        const categoryBg = new PIXI.Sprite( ViewerRscManager.Handle.getResource("longtext", "categoryBg.png").texture );
        categoryBg.position.set(220, 515);
        this.addChild( categoryBg );

        //주제 머리말
        const categoryHead = new PIXI.Sprite( ViewerRscManager.Handle.getResource("longtext", "categoryHead.png").texture );
        categoryHead.position.set(220, 515);
        this.addChild( categoryHead );

        //리스트 백그라운드
        const listBg = new PIXI.Sprite( ViewerRscManager.Handle.getResource("longtext", "listBg.png").texture );
        listBg.position.set(970, 515);
        this.addChild( listBg );

        //리스트 머리말
        const listHead = new PIXI.Sprite( ViewerRscManager.Handle.getResource("longtext", "listHead.png").texture );
        listHead.position.set(970, 515);
        this.addChild( listHead );


        // ListView
        const mLeftListViewBG = new PIXI.Graphics();
        mLeftListViewBG.beginFill(0xffffff);
        mLeftListViewBG.drawRoundedRect(0,0,650, 810, 40)
        mLeftListViewBG.endFill();
        mLeftListViewBG.position.set(220,604)
        this.addChild(mLeftListViewBG);

        this.mLeftListView = new ShortTextLeftListView(650, 810);
        this.mLeftListView.position.set(220,604);
        this.mLeftListView.data = this.DATA;
        this.mLeftListView.index = 0;
        this.mLeftListView.addCustomEventListener( EventType.ButtonDown, ( evt )=> this.onLeftListDown( evt ) );
        this.addChild(this.mLeftListView);


        const mRightListViewBG = new PIXI.Graphics();
        mRightListViewBG.beginFill(0xffffff);
        mRightListViewBG.drawRoundedRect(0,0,1370, 810, 40)
        mRightListViewBG.endFill();
        mRightListViewBG.position.set(970,607)
        this.addChild(mRightListViewBG);

        this.mRightListView = new ShortTextRightListView(1370, 810);
        this.mRightListView.position.set(970,607);
        this.mRightListView.addCustomEventListener( EventType.ButtonDown, ( evt )=> this.onRightListDown( evt ) );
        this.addChild(this.mRightListView);
        this.setRihgtList( this.mCategoyIdx );

        //ScrolLBar
        this.mScrollBar = new VerticalScrollBar(20,714);
        this.mScrollBar.position.set(2300, 655);
        this.addChild(this.mScrollBar);

        this.mRightListView.linkScrollBar(this.mScrollBar);

        this.mActiveCur = new PIXI.Sprite( ViewerRscManager.Handle.getResource('common', 'active_cur.png').texture );
        this.mActiveCur.position.set(917,658);
        this.addChild(this.mActiveCur);
    }

    private onLeftListDown( evt: CustomEvent ) {
        
        this.mCategoyIdx = evt.data.index;
        this.setRihgtList(this.mCategoyIdx);

        SoundManager.Handle.Effect_CLICK();

        if(this.mCategoyIdx < 3) {
            const ypos = 658 + (this.mCategoyIdx * 162);
            gsap.killTweensOf( this.mActiveCur );
            gsap.to( this.mActiveCur, { y: ypos});

            this.mLeftListView.selectedIndex = this.mCategoyIdx;
        }
    }

    private onRightListDown( evt: CustomEvent ) {
        
        SoundManager.Handle.Effect_CLICK();

        DataManager.Handle.saveMemoryData( this.DATA[ this.mCategoyIdx ], evt.data.index );
        this.dispatchEvent(EventType.ReceiveData, SceneName.TypingShortText);
    }

    private setRihgtList( idx: number ) {
        
        if( this.DATA[idx].list) 
        {
            this.mRightListView.data = this.DATA[idx].list;
        }
    }
}