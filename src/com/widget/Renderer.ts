import { ObjectBase } from "../core/ObjectBase";
import * as Style from "../design/TextStyle";

export class Renderer extends ObjectBase {
  // protected mText: PIXI.Text;
  private mIndex: number;

  constructor() {
    super();
    this.init();
  }

  private init() {
    this.draw();
  }

  //override;
  draw() {
    // console.log(info);

    const bg = new PIXI.Graphics();
    bg.beginFill(0xffffff);
    bg.drawRect(0, 0, 400, 140);
    bg.endFill();

    const line = new PIXI.Graphics();
    line.beginFill(0xff0000);
    line.drawRect(0, 139, 400, 1);
    line.endFill();

    this.addChild(bg);
    this.addChild(line);
    // this.mText = new PIXI.Text('', Style.defaultRendererTextStyle() );
    // this.addChild(this.mText);
  }

  // set label( str: string ) {
  //     this.mText.text = str;
  // }
  // get label(): string { return this.mText.text; }

  selected(bool: boolean) {
    // override
  }

  set index(idx: number) {
    this.mIndex = idx;
  }
  get index(): number {
    return this.mIndex;
  }
}
