import gsap from "gsap";
import { TilingSprite } from "pixi.js";
import { App } from "../core/App";
import { ObjectBase } from "../core/ObjectBase";
import { Renderer } from "../widget/Renderer";
import { EventType } from "../core/EventType";
import { VerticalScrollBar } from "./VerticalScrollBar";

export class ListView extends ObjectBase {
  private mScrollBar: VerticalScrollBar;

  private mIndex: number;
  private mSelectedIndex: number;

  private mData: Array<any>;

  private mRednererAry: Array<Renderer>;

  private mViewerContainer: PIXI.Container;
  private mListContainer: PIXI.Container;

  // protected mListMove: boolean;
  private mScrolling: boolean;

  private mStartPos: number;
  private mFirstDownPos: number;

  private mMaxWidth: number;
  private mMaxHeight: number;

  private mMask: PIXI.Graphics;
  private mMaskRadius: number;

  private mExamList: boolean;
  set examList(v: boolean) {
    this.mExamList = v;
  }

  constructor(w: number, h: number, r = 40) {
    super();

    this.mExamList = false;

    this.mMaxWidth = w;
    this.mMaxHeight = h;

    this.mIndex = 0;

    this.mMaskRadius = r;

    // this.mListMove = true;
    this.mScrolling = false;

    this.mData = [];
    this.mRednererAry = [];

    this.mViewerContainer = new PIXI.Container();
    this.mListContainer = new PIXI.Container();

    this.mMask = new PIXI.Graphics();
    this.addChild(this.mMask);

    this.mViewerContainer.addChild(this.mListContainer);
    this.addChild(this.mViewerContainer);


    // pointerupoutside
    this.mViewerContainer.interactive = true;
    this.mViewerContainer.on("pointerdown", (evt: PIXI.InteractionEvent) =>
    this.onListViewDown(evt)
    );
    this.mViewerContainer.on("pointerup", (evt: PIXI.InteractionEvent) =>
      this.onListViewUp(evt)
    );

    // this.mViewerContainer.on('pointertap', (evt: PIXI.InteractionEvent )=> this.onListViewUp(evt) );
    // this.mViewerContainer.on('pointerout', (evt: PIXI.InteractionEvent )=> this.onListViewUp(evt) );
    this.mViewerContainer.on("pointerupoutside", (evt: PIXI.InteractionEvent) =>
      this.onListViewUp(evt)
    );
    this.mViewerContainer.on("pointermove", (evt: PIXI.InteractionEvent) =>
      this.onListViewMove(evt)
    );
  }

  get index(): number {
    return this.mIndex;
  }
  set index(n: number) {
    this.mIndex = n;
  }

  get selectedIndex(): number {
    return this.mSelectedIndex;
  }
  set selectedIndex(n: number) {
    this.mSelectedIndex = n;

    for (const render of this.mRednererAry) {
      if (n == render.index) {
        render.selected(true);
      } else {
        render.selected(false);
      }
    }
  }

  get data(): Array<any> {
    return this.mData;
  }
  set data(pData: Array<any>) {
    this.removeAll();

    for (let i = 0; i < pData.length; i++) {
      const data = pData[i];
      data.index = i;
      this.add(data);
    }

    if (this.mListContainer.height <= this.mMaxHeight) {
      this.mMaxHeight = this.mListContainer.height;
    }

    if (this.mScrollBar) {
      if (this.mListContainer.height <= this.mMaxHeight) {
        this.mScrollBar.visible = false;
      } else {
        const ratio = this.mListContainer.height / this.mMaxHeight;
        this.mScrollBar.letKnowListViewRatio(ratio);
        this.mScrollBar.visible = true;
      }
    }

    this.setArea(this.mMaxWidth, this.mMaxHeight);

    this.refreshScrollBar();

    this.setProgress(0);
  }

  linkScrollBar(scBar: VerticalScrollBar) {
    this.mScrollBar = scBar;
    this.refreshScrollBar();
  }

  private refreshScrollBar() {
    if (this.mScrollBar) {
      if (this.mListContainer.height <= this.mMaxHeight) {
        this.mScrollBar.visible = false;
      } else {
        const ratio = this.mListContainer.height / this.mMaxHeight;
        this.mScrollBar.letKnowListViewRatio(ratio);

        // 스크롤바에도 리스트뷰를 등록해준다.
        this.mScrollBar.linkListView(this);

        this.mScrollBar.visible = true;
      }
    }
  }

  // override
  draw(info: any): Renderer {
    // info는 mData의 정보
    const list = new Renderer();

    list.interactive = true;

    list.on("pointerup", () => {
      this.index = list.index;

      // if(!this.mListMove) console.log(list.index);
    });
    // list.label = info.label;
    list.index = info.index;

    return list;
  }

  private setArea(w: number, h: number) {
    this.mExamList ? (h = this.mListContainer.height) : null;

    this.mMask.clear();

    this.mMask.beginFill(0xff0000);
    this.mMask.drawRect(0, 0, w, h - this.mMaskRadius);
    this.mMask.drawRoundedRect(0, 0, w, h, this.mMaskRadius);
    this.mMask.endFill();

    this.mask = this.mMask;
  }

  private add(pData: any) {
    this.mData.push(pData);
    const list = this.draw(pData);
    list.y = this.mListContainer.height;

    this.mRednererAry.push(list);

    // list.interactive = true;

    // list.on('click', ()=> {
    //     console.log("click");
    // })

    this.mListContainer.addChild(list);
  }

  private removeAll() {
    this.mListContainer.removeChildren();
    this.mData = [];
    this.mListContainer.y = 0;
    this.mRednererAry = [];
  }

  private onListViewDown(evt: PIXI.InteractionEvent) {
    this.mStartPos = evt.data.getLocalPosition(this.mListContainer).y;
    this.mFirstDownPos = evt.data.getLocalPosition(this).y;
    this.mScrolling = true;
    // this.mListMove = false;
    // evt.stopPropagation();
  }

  private onListViewUp(evt: PIXI.InteractionEvent) {
    this.mScrolling = false;
    // this.mListMove = false;

    const lastUpPos = evt.data.getLocalPosition(this).y;
    if (Math.abs(this.mFirstDownPos - lastUpPos) < 10) {
      // App.Handle.AddOnScreenDebugMessage( this.index );
      //this.dispatchEvent(EventType.ButtonDown, this.index);
      this.dispatchEvent(EventType.ButtonDown, {
        index: this.index,
        selectedIndex: this.mSelectedIndex,
      });
    }
  }

  private onListViewMove(evt: PIXI.InteractionEvent) {
    if (this.mScrolling && !this.mExamList) {
      // this.mListMove = true;

      const currentPos = evt.data.getLocalPosition(evt.currentTarget).y;

      this.mListContainer.y = currentPos - this.mStartPos;

      if (this.mListContainer.y > 0) {
        this.mListContainer.y = 0;
        this.mStartPos = evt.data.getLocalPosition(this.mListContainer).y;
      }

      if (
        this.mMaxHeight >
        this.mListContainer.y + this.mListContainer.height
      ) {
        this.mListContainer.y = this.mMaxHeight - this.mListContainer.height;
        this.mStartPos = evt.data.getLocalPosition(this.mListContainer).y;
      }

      this.setProgress();
    }
  }

  receiveProgress(per: number) {
    //this.mThumb.y / this.mMaxMoveValue * 100;

    console.log(per);

    const range = this.mMaxHeight - this.mListContainer.height;

    this.mListContainer.y = range * per * 0.01;
  }

  // 스크롤바 위치
  private setProgress(fix?: number) {
    let per: number;

    if (fix != undefined) {
      per = fix;
    } else {
      per = Number(
        (
          (this.mListContainer.y /
            (this.mMaxHeight - this.mListContainer.height)) *
          100
        ).toFixed(1)
      );
    }

    if (per < 0 || per > 100) return;

    // 스크롤바와 연동이 되어있다면 스크롤바의 값도 갱신.
    if (this.mScrollBar) this.mScrollBar.thumbPosition = per;
  }
}
