import { ObjectBase } from "../core/ObjectBase";
import { EventType } from "../core/EventType";
import { CustomEvent } from "../core/CustomEvent";

import { ListView } from "../widget/ListView";
import { Button } from "./Button";
import { TypeingApp } from "../TypeingApp";
import gsap from "gsap/all";

export class ComboBox extends ObjectBase {
  // 콤보박스가 펼쳐지는 최대 높이.
  private mSpredHeight: number;

  private mSelectedIndex: number;

  protected mHeadButton: Button;
  protected mListView: ListView;

  protected mOpen: boolean;

  protected mBg: PIXI.NineSlicePlane;

  private mBgContainer: PIXI.Container;

  private mData: Array<any>;

  constructor() {
    super();

    this.mSelectedIndex = 0;

    this.mBgContainer = new PIXI.Container();
    this.mBgContainer.visible = false;
  }

  init(headButton: Button, listView: ListView) {
    this.mOpen = false;
    this.mHeadButton = headButton;
    this.mListView = listView;

    this.mListView.y = this.mHeadButton.height;
    this.mListView.visible = false;

    this.mHeadButton.addCustomEventListener(
      EventType.ButtonTab,
      (evt: CustomEvent) => {
        this.mOpen = !this.mOpen;
        this.setListVisible();
        this.dispatchEvent(EventType.ButtonTab, evt);
      }
    );

    this.addChild(this.mBgContainer);
    this.addChild(this.mHeadButton);
    this.addChild(this.mListView);
  }

  close() {
    this.mOpen = false;
    this.additionalClose();
    this.setListVisible();
  }

  // 확장시 close 호출시 추가로 해야 할 코드 삽입
  additionalClose() {
    //
  }

  private setListVisible() {
    //
    if (this.mOpen) {
      this.mListView.visible = true;
      this.mBgContainer.visible = true;
      this.addEvent();
    } else {
      this.mListView.visible = false;
      this.mBgContainer.visible = false;
      this.removeEvent();
    }
  }

  private addEvent() {
    TypeingApp.Handle.stage.interactive = true;
    TypeingApp.Handle.stage.addListener(
      "pointerdown",
      (evt: PIXI.InteractionEvent) => this.onOutDown(evt)
    );
  }

  private removeEvent() {
    TypeingApp.Handle.stage.interactive = false;
    TypeingApp.Handle.stage.removeListener(
      "pointerdown",
      (evt: PIXI.InteractionEvent) => this.onOutDown(evt)
    );
  }

  private onOutDown(evt: PIXI.InteractionEvent) {
    const globalPoint = evt.data.getLocalPosition(
      TypeingApp.Handle.stage
    ) as PIXI.Point;
    if (
      globalPoint.x < this.x ||
      globalPoint.x > this.x + this.width ||
      globalPoint.y < this.y ||
      globalPoint.y > this.y + this.height
    ) {
      this.removeEvent();
      this.close();
    }
  }

  get bgContainer(): PIXI.Container {
    return this.mBgContainer;
  }

  // get data(): Array<any> { return this.mData; }
  set data(pData: Array<any>) {
    this.mData = [];

    const len = pData.length;

    for (let i = 0; i < len; i++) {
      if (this.mSelectedIndex != i) {
        this.mData.push(pData[i]);
      }
    }

    this.mBg.height = (len - 1) * 116 + 146;
    this.mListView.data = this.mData;
  }

  set selectedIndex(idx: number) {
    this.mSelectedIndex = idx;
  }
  get selectedIndex(): number {
    return this.mSelectedIndex;
  }
}
