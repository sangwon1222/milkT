import { ObjectBase } from "../core/ObjectBase";
import { ViewerRscManager } from '../manager/ViewerRscManager';
import { Button } from "./Button";
import { ListView } from './ListView';

export class Thumb extends ObjectBase {

    private mThumb: ObjectBase;
    private mThumbNormal: PIXI.NineSlicePlane;

    constructor( normal: PIXI.Texture, sel?: PIXI.Texture, dis?: PIXI.Texture ) {

        super();
        this.mThumb = new ObjectBase();
        this.addChild(this.mThumb);

        this.mThumbNormal = new PIXI.NineSlicePlane(normal, 0, 10, 0, 10);
        this.mThumb.addChild(this.mThumbNormal);
    }

    setThumbHeight( h: number ) {

        this.mThumbNormal.height = h;
    }
}

export class VerticalScrollBar extends ObjectBase {

    private mThumb: Thumb;
    private mMaxMoveValue: number; // Thumb의 최대 움직임 거리

    private mScrollArea: PIXI.Graphics;
    private mDraging: boolean;
    private mStartPos: number;

    private mListView: ListView;

    constructor( w: number, h: number, thumb?: Thumb ) {
        // w 스크롤바의 영역 (w,h)

        super();

        this.mDraging = false;
        

        // 스크롤바의 영역을 만든다.
        this.mScrollArea = new PIXI.Graphics();
        this.mScrollArea.beginFill(0xff0000);
        this.mScrollArea.drawRect(0,0,w,h);
        this.mScrollArea.endFill();
        this.mScrollArea.alpha = 0;

        this.mScrollArea.interactive = true;
        this.mScrollArea.on("pointerup", ( evt: PIXI.InteractionEvent )=> {
            //
            const touchY =  evt.data.getLocalPosition( this ).y

            if(touchY < this.mMaxMoveValue) {
                this.mThumb.y = touchY;
            } else {
                this.mThumb.y = this.mMaxMoveValue;
            }
            if(this.mListView) this.mListView.receiveProgress(this.thumbPosition);

        })
        this.addChild(this.mScrollArea);

        if( thumb ) {
            this.mThumb = thumb;
        } else {
            this.mThumb = new Thumb(ViewerRscManager.Handle.getResource("common", "thumb.png").texture);
        }

        this.mThumb.interactive = true;

        this.mThumb.on("pointerdown", ( evt: PIXI.InteractionEvent )=> { 
            this.mStartPos = evt.data.getLocalPosition( this.mThumb ).y;
            this.mDraging = true;
        });

        this.mThumb.on("pointerup", ( evt: PIXI.InteractionEvent )=> { this.mDraging = false;});

        this.mThumb.on("pointerupoutside", ( evt: PIXI.InteractionEvent )=> { this.mDraging = false;});

        this.mThumb.on("pointermove", ( evt: PIXI.InteractionEvent )=> { 
           
            if( this.mDraging ) {
                
                const currentPos = evt.data.getLocalPosition( this ).y;
                this.mThumb.y = currentPos - this.mStartPos;

                if(this.mThumb.y < 0 ) {
                    this.mThumb.y = 0;
                    this.mThumb.y = 0;
                }
    
                if(this.mThumb.y > this.mMaxMoveValue) {
                    this.mThumb.y = this.mMaxMoveValue
                }

                if(this.mListView) this.mListView.receiveProgress(this.thumbPosition);
                
                  
            }
        });

        this.addChild(this.mThumb);
    }


    // ListView --> ScrollBar
    // ListView 위젯에 ScrollBar가 등록되면 listView의 전체 값에서 보여지는 값의 비율을 알려준다
    // 그 값으로 thumb의 height 값을 계산한다.
    letKnowListViewRatio( ratio: number) {
        
         // ratio 값이 1보다 작거나 같다면 스크롤 생성이 필요 없다.
        if( ratio > 1) {
            this.mThumb.setThumbHeight( Math.floor(this.mScrollArea.height / ratio) );

            // 최소 높이 설정 필요.(코드 미 구현)

            this.mMaxMoveValue = this.mScrollArea.height - this.mThumb.height;  
        } 
    }

    // ListView에서 해당 함수를 호출한다.
    linkListView( listview: ListView ) {

        this.mListView = listview;
    }
    

    // Thumb의 위치를 퍼센트 비율로 위치 시킨다.
    set thumbPosition( per: number ){
        this.mThumb.y = per * this.mMaxMoveValue * 0.01;
    }
    get thumbPosition(): number { return this.mThumb.y / this.mMaxMoveValue * 100;}
}