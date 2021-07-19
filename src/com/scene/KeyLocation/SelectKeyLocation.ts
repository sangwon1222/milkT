import { TypeingApp } from '../../TypeingApp';
import { SceneBase, SceneName } from '../../core/SceneBast';
import { DataManager} from '../../manager/DataManager';
import { LanguageManager } from '../../manager/LanguageManager';
import { SoundManager } from '../../manager/SoundManager';
import { ViewerRscManager } from '../../manager/ViewerRscManager';
import { EventType } from "../../core/EventType";
import { CustomEvent} from '../../core/CustomEvent';
import gsap from 'gsap';
import { Button } from '@/com/widget/Button';

export class SelectKeyLocation extends SceneBase 
{
    private DATA: any;

    private mButtonSheet: PIXI.LoaderResource;
    private mLocationSheet: PIXI.LoaderResource;

    constructor() {
        super();
        this.name = "SelectKeyLocation";
        this.visible = false;
    }

    async onInit(){

        // 헤더 상태 설정
        TypeingApp.Handle.getHeader().setSubMode();
        // 언어 상태와 데이타 값을 가져온다.
        this.DATA = await DataManager.Handle.getData( "keylocation", LanguageManager.Handle.LANG);

        this.mButtonSheet = ViewerRscManager.Handle.getResource("button", "button.json");
        this.mLocationSheet = ViewerRscManager.Handle.getResource("location", "location.json");
    }

    async onStart(){
        const queryData = await DataManager.Handle.getPracticeQuery("1", LanguageManager.Handle.LANG);
        if (queryData.data) {
            let count = 0;
            const subLen = this.DATA.length;
            for (let q = 0; q < subLen; q++) {
                if (queryData.data[count].Complete == `Y`) this.DATA[q].did = true;
                count++;
            }
        }
        this.draw();
        this.visible = true;
    }

    private draw() 
    {
        //
        const title = new PIXI.Sprite(ViewerRscManager.Handle.getResource( `keylocation`,`title.png`).texture )
        title.position.set(1066, 120);
        this.addChild( title );

        const script = new PIXI.Sprite(ViewerRscManager.Handle.getResource( `keylocation`,`guide_text.png`).texture )
        script.position.set(455, 234);
        this.addChild( script );

        let totalMode = 8;
        let keyAry = ["base", "leftup", "index", "rightup", "leftdown", "rightdown", "leftdouble", "rightdouble"];

        let stx = 220;
        let xpos = stx;
        let ypos = 515;
        let linedown = 4;

        if( LanguageManager.Handle.LANG != "kr" ) 
        {
            totalMode = 6;
            linedown = 3;
            stx = 500;
            xpos = stx;
            keyAry = ["base", "leftup_en", "index", "rightup_en", "doubledown","all"];
        } 

        for( let i = 0; i < totalMode; i++ ) 
        {
            if( i % linedown == 0 && i > 0) {
                ypos += 494;
                xpos = stx;
            }

            const ct = new PIXI.Container();
            //console.log(`${keyAry[i]}.png`);
            const btn = new Button(
                //ViewerRscManager.Handle.getResource("common", `${keyAry[i]}.png`).texture
                this.mLocationSheet.textures[`${keyAry[i]}.png`]
            );

            btn.index = i;
            btn.addCustomEventListener( EventType.ButtonUp, ()=> {
                
                DataManager.Handle.saveMemoryData( this.DATA, btn.index);
                this.dispatchEvent(EventType.ReceiveData, SceneName.TypingKeyLocation);
            })

            const state = new PIXI.Sprite();

            if(this.DATA[i].did)
            {
                state.texture = this.mButtonSheet.textures[`again_btn.png`];
            } else {
                state.texture = this.mButtonSheet.textures[`practice_btn.png`];
            }
            state.position.set(98, 372);

            ct.position.set(xpos, ypos);
            ct.addChild(btn);
            ct.addChild(state);

            this.addChild(ct);

            xpos += 553;
       
        }
    }
}