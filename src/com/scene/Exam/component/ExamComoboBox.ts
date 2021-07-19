import { Button } from "../../../widget/Button";
import { ListView } from "../../../widget/ListView";
import { ComboBox } from "../../../widget/ComboBox";
import { ViewerRscManager } from "../../../manager/ViewerRscManager";
import { Renderer } from "../../../widget/Renderer";
import { EventType } from "../../../../com/core/EventType";
import gsap from "gsap";

class HeadButton extends Button {
  private mText: PIXI.Text;
  private mCurser: PIXI.Sprite;

  constructor() {
    super(ViewerRscManager.Handle.getResource("exam", "drop_head.png").texture);

    this.mCurser = new PIXI.Sprite(
      ViewerRscManager.Handle.getResource("exam", "drop_curser.png").texture
    );
    this.mCurser.anchor.set(0.5, 0.5);
    this.mCurser.position.set(1004, 56);
    gsap.to(this.mCurser, { angle: 180, duration: 0 });

    this.addChild(this.mCurser);

    const style = new PIXI.TextStyle({
      align: "left",
      fill: "#6e539e",
      fontFamily: "TmoneyRoundWindExtraBold",
      fontWeight: "bold",
      fontSize: 54,
      lineHeight: 28,
    });

    this.mText = new PIXI.Text("", style);
    this.mText.position.set(166, 23);
    this.addChild(this.mText);
  }

  set label(txt: string) {
    this.mText.text = txt;
  }

  open() {
    gsap.killTweensOf(this.mCurser);
    gsap.to(this.mCurser, { angle: 0, duration: 0.5 });
  }

  close() {
    gsap.killTweensOf(this.mCurser);
    gsap.to(this.mCurser, { angle: 180, duration: 0.5 });
  }
}

class ComboRenderer extends Renderer {
  public mLabelText: PIXI.Text;
  private mNormalTexture: PIXI.Texture;
  private mSelTexture: PIXI.Texture;
  private mSprite: PIXI.Sprite;

  constructor() {
    super();
  }

  //override;
  draw() {
    const style = new PIXI.TextStyle({
      align: "left",
      fill: "#6e539e",
      fontFamily: "TmoneyRoundWindExtraBold",
      fontWeight: "bold",
      fontSize: 54,
      lineHeight: 28,
    });

    this.mNormalTexture = ViewerRscManager.Handle.getResource(
      "exam",
      "drop_list_normal.png"
    ).texture;
    this.mSelTexture = ViewerRscManager.Handle.getResource(
      "exam",
      "drop_list_over.png"
    ).texture;

    this.mSprite = new PIXI.Sprite();
    this.mSprite.texture = this.mNormalTexture;
    this.addChild(this.mSprite);

    this.mLabelText = new PIXI.Text("", style);
    this.mLabelText.position.set(166, 22);
    this.addChild(this.mLabelText);
  }

  over() {
    this.mSprite.texture = this.mSelTexture;
  }

  out() {
    this.mSprite.texture = this.mNormalTexture;
  }
}

class ComboListView extends ListView {
  constructor() {
    super(1066, 464, 80);
    //this.addChild(this.mBg);
  }

  draw(info: any): ComboRenderer {
    this.examList = true;
    const list = new ComboRenderer();
    list.interactive = true;
    list.index = info.index;
    list.mLabelText.text = info.label;
    list.on("pointerup", () => {
      this.index = info.comboIdx;
    });

    list.on("pointerover", () => {
      list.over();
    });
    list.on("pointerout", () => {
      list.out();
    });
    return list;
  }
}

export class ExamComoboBox extends ComboBox {
  constructor() {
    super();
    this.mBg = new PIXI.NineSlicePlane(
      ViewerRscManager.Handle.getResource("common", "drop_bg.png").texture,
      84,
      84,
      84,
      84
    );
    this.mBg.position.set(-15, -15);
    this.mBg.width = 1096;
    this.bgContainer.addChild(this.mBg);

    this.init(new HeadButton(), new ComboListView());

    this.mHeadButton.addCustomEventListener(EventType.ButtonTab, () => {
      if (this.mOpen) {
        (this.mHeadButton as HeadButton).open();
      } else {
        (this.mHeadButton as HeadButton).close();
      }
    });

    this.mListView.addCustomEventListener(EventType.ButtonDown, () => {
      this.close();
      this.dispatchEvent(EventType.ComboBoxChange, this.mListView.index);
    });
  }

  additionalClose() {
    (this.mHeadButton as HeadButton).close();
  }

  set label(txt: string) {
    const btn = this.mHeadButton as HeadButton;
    btn.label = txt;
  }
}
