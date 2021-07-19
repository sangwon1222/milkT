import gsap from "gsap";
import { TilingSprite } from "pixi.js";
import { App } from "../core/App";
import { ObjectBase } from "../core/ObjectBase";
import { Renderer } from "../widget/Renderer";
import { EventType } from "../core/EventType";

export class HorizoneListView extends ObjectBase {
  private mIndex: number;
  private mSelectedIndex: number;

  private mData: Array<any>;

  private mViewerContainer: PIXI.Container;
  private mListContainer: PIXI.Container;

  // protected mListMove: boolean;
  private mScrolling: boolean;

  private mStartPos: number;
  private mFirstDownPos: number;

  private mMaxWidth: number;
  // private mRednererAry: Array<any>

  constructor(w: number, h: number) {
    super();

    this.mIndex = 0;

    this.mMaxWidth = w;

    // this.mListMove = true;
    this.mScrolling = false;

    this.mData = [];
    // this.mRednererAry = [];

    this.mViewerContainer = new PIXI.Container();
    this.mListContainer = new PIXI.Container();

    this.mViewerContainer.addChild(this.mListContainer);
    this.addChild(this.mViewerContainer);

    this.setArea(w, h);

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
  }

  // override
  draw(info: any): Renderer {
    // info는 mData의 정보
    const list = new Renderer();

    list.interactive = true;

    list.on("pointerup", () => {
      this.mSelectedIndex = list.index;

      // if(!this.mListMove) console.log(list.index);
    });
    // list.label = info.label;
    list.index = info.index;

    return list;
  }

  private setArea(w: number, h: number) {
    const mask = new PIXI.Graphics();

    mask.beginFill(0xffffff);
    mask.drawRect(this.x, this.y, w - 40, h);
    mask.drawRoundedRect(this.x, this.y, w, h, 40);
    mask.endFill();

    this.addChild(mask);
    this.mask = mask;
  }

  private add(pData: any) {
    this.mData.push(pData);
    const list = this.draw(pData);
    list.x = this.mListContainer.width;

    this.mListContainer.addChild(list);
  }

  private removeAll() {
    this.mListContainer.removeChildren();
    this.mData = [];
    this.mListContainer.x = 0;
    // this.mRednererAry = [];
  }

  private onListViewDown(evt: PIXI.InteractionEvent) {
    this.mStartPos = evt.data.getLocalPosition(this.mListContainer).x;
    this.mFirstDownPos = evt.data.getLocalPosition(this).x;
    this.mScrolling = true;
    // this.mListMove = false;
    // evt.stopPropagation();
  }

  private onListViewUp(evt: PIXI.InteractionEvent) {
    this.mScrolling = false;
    // this.mListMove = false;

    const lastUpPos = evt.data.getLocalPosition(this).x;
    if (Math.abs(this.mFirstDownPos - lastUpPos) < 10) {
      // App.Handle.AddOnScreenDebugMessage( this.index );

      this.dispatchEvent(EventType.ButtonDown, {
        index: this.index,
        selectedIndex: this.mSelectedIndex,
      });
    }
  }

  private onListViewMove(evt: PIXI.InteractionEvent) {
    if (this.mScrolling) {
      // this.mListMove = true;

      const currentPos = evt.data.getLocalPosition(evt.currentTarget).x;

      this.mListContainer.x = currentPos - this.mStartPos;

      if (this.mListContainer.x > 0) {
        this.mListContainer.x = 0;
        this.mStartPos = evt.data.getLocalPosition(this.mListContainer).x;
      }

      if (this.mMaxWidth > this.mListContainer.x + this.mListContainer.width) {
        this.mListContainer.x = this.mMaxWidth - this.mListContainer.width;
        this.mStartPos = evt.data.getLocalPosition(this.mListContainer).x;
      }

      this.setProgress();
    }
  }

  private setProgress(fix?: number) {
    let per: number;

    if (fix != undefined) {
      per = fix;
    } else {
      per = Number(
        (
          (this.mListContainer.x /
            (this.mMaxWidth - this.mListContainer.width)) *
          100
        ).toFixed(1)
      );
    }

    if (per < 0 || per > 100) return;
    // console.log(per);
  }
}
