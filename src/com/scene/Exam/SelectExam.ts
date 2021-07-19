import { TypeingApp } from "../../TypeingApp";
import { SceneBase, SceneName } from "../../core/SceneBast";
import { DataManager } from "../../manager/DataManager";
import { LanguageManager } from "../../manager/LanguageManager";
import { ViewerRscManager } from "../../manager/ViewerRscManager";
import { VerticalScrollBar } from "../../widget/VerticalScrollBar";
import { ExamListView } from "./component/ExamListView";
import { EventType } from "../../core/EventType";
import { CustomEvent } from "../../core/CustomEvent";
import { SoundManager } from "../../../com/manager/SoundManager";

export class SelectExam extends SceneBase {
  private DATA: any;
  private mScrollBar: VerticalScrollBar;
  private mListView: ExamListView;

  constructor() {
    super();
    this.name = "SelectExam";
    this.visible = false;
  }

  async onInit() {
    // 헤더 상태 설정
    TypeingApp.Handle.getHeader().setSubMode();
    // 언어 상태와 데이타 값을 가져온다.
    this.DATA = await DataManager.Handle.getData(
      "exam",
      LanguageManager.Handle.LANG
    );
  }

  async onStart() {
    const queryData = await DataManager.Handle.getPracticeQuery(
      "5",
      LanguageManager.Handle.LANG
    );
    if (queryData.data) {
      console.log(queryData.data);
      let count = 0;
      const subLen = this.DATA.length;
      for (let q = 0; q < subLen; q++) {
        console.log(this.DATA[q].did);
        //console.log(queryData.data[count].Complete);
        if (queryData.data[count].Complete == `Y`) this.DATA[q].did = true;
        count++;
      }
    }

    this.draw();
    this.visible = true;
  }

  private draw() {
    const title = new PIXI.Sprite(
      ViewerRscManager.Handle.getResource("exam", "title.png").texture
    );
    title.position.set(1066, 120);
    this.addChild(title);

    const script = new PIXI.Sprite(
      ViewerRscManager.Handle.getResource("exam", "script.png").texture
    );
    script.position.set(455, 215);
    this.addChild(script);

    const listBg = new PIXI.Sprite(
      ViewerRscManager.Handle.getResource("exam", "list_bg.png").texture
    );
    listBg.position.set(330, 515);
    this.addChild(listBg);

    const listHead = new PIXI.Sprite(
      ViewerRscManager.Handle.getResource("exam", "list_head.png").texture
    );
    listHead.position.set(330, 515);
    this.addChild(listHead);

    // ListView
    this.mListView = new ExamListView(1900, 810);
    this.mListView.position.set(330, 607);
    this.mListView.data = this.DATA;

    this.mListView.addCustomEventListener(EventType.ButtonDown, (evt) =>
      this.onListDown(evt)
    );

    this.addChild(this.mListView);

    //ScrolLBar
    this.mScrollBar = new VerticalScrollBar(20, 714);
    this.mScrollBar.position.set(2186, 655);
    this.addChild(this.mScrollBar);

    this.mListView.linkScrollBar(this.mScrollBar);
  }

  onListDown(evt: CustomEvent) {
    SoundManager.Handle.Effect_CLICK();
    DataManager.Handle.saveMemoryData(this.DATA, evt.data["selectedIndex"]);
    this.dispatchEvent(EventType.ReceiveData, SceneName.TypingExam);
  }
}
