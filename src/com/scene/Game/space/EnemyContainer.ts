import { EventType } from '../../../core/EventType';
import { CustomEvent } from '../../../core/CustomEvent';
import { ObjectBase } from '../../../core/ObjectBase';
import { Enemy } from './Enemy';
import { EffectType } from '../component/EffectType';
import gsap from 'gsap';



/*
<긍정 이벤트 효과>
1. 생명력 모두 회복
2. 느려지는 효과 3초
3. 모두 없어지는 효과.
4. 정지하기 2초
5. 빨라지는 효과
*/

const COMBO_DATA = [
    0,20,30,40,50,60,70,80,90,100,
    110,120,130,140,150,160,170,180,190,200,
    210,220,230,240,250,260,270,280,290,300,
    310,320,330,340,350,360,370,380,390,400,
    410,420,430,440,450,460,470,480,490,500
];

const LEVEL = [
    {
        "interval":290, //간격
        "dropspeed": 0.8, // 낙하속도
        "score":1000, // 기본 점수
        "maxcombo":30, // 최고 가능 콤보수
        "bonuscombo":[100,200,300], // 10단위로 콤보 성공시 추가 보너스 점수
        "effect_freq":6 // 특수 텍스트가 생성되는 빈도
    },
    {
        "interval":280,
        "dropspeed": 1.3,
        "score":1100,
        "maxcombo":30,
        "bonuscombo":[110,220,330],
        "effect_freq":6
    },
    {
        "interval":270,
        "dropspeed": 1.8,
        "score":1200,
        "maxcombo":30,
        "bonuscombo":[120,240,360],
        "effect_freq":6
    },
    {
        "interval":260,
        "dropspeed": 2.3,
        "score":1300,
        "maxcombo":30,
        "bonuscombo":[130,260,390],
        "effect_freq":6
    },
    {
        "interval":250,
        "dropspeed": 2.8,
        "score":1400,
        "maxcombo":30,
        "bonuscombo":[140,280,420],
        "effect_freq":5
    },
    {
        "interval":240,
        "dropspeed": 3.3,
        "score":1500,
        "maxcombo":30,
        "bonuscombo":[150,300,450],
        "effect_freq":5
    },
    {
        "interval":230,
        "dropspeed": 3.8,
        "score":1600,
        "maxcombo":30,
        "bonuscombo":[160,320,480],
        "effect_freq":5
    },
    {
        "interval":220,
        "dropspeed": 4.3,
        "score":1700,
        "maxcombo":50,
        "bonuscombo":[170,340,510,680,850],
        "effect_freq":5
    },

]

export class EnemyContainer extends ObjectBase
{
    private mTotal: number; // 생성되어야 하는 총 적의 수
    private mLevel: number;
    private mWordData: Array<string>;
    private mFreq: number; // 특수 텍스트가 생성되는 배수값
    private mComboCnt: number;
    private mDelayedCall: gsap.core.Tween;

    private mIsPlay: boolean;

    constructor( )
    {
        super(); 
    }

    setData( $data: any )
    {
        this.clearContainer();
        this.mWordData = $data.wordData;
        this.mLevel = $data.level;
        this.mFreq = LEVEL[ this.mLevel ].effect_freq;
        this.mTotal = LEVEL[ this.mLevel ].maxcombo;
        this.mComboCnt = 0;
        this.makeEnemey();
        this.pause();
        this.mIsPlay = true;
    }

    matchText( txt: string )
    {
        for( let i = this.children.length - 1; i >= 0; i--)
        {
            const child = this.children[i] as Enemy;
            if( child.ticker && child.getText() == txt )
            {
                child.ticker = false;
                this.checkCombo();
                child.setExpo( this.mComboCnt);
                this.checkDestoryCnt();
                this.checkType( child.getType());
            }
        }
    }


    clearContainer()
    {
        this.mWordData = [];
        for( let i = this.children.length - 1; i >= 0; i--)
        {
            const child = this.children[i] as Enemy;
            child.removeCustomEventListener( EventType.CRASH );
            child.removeTicker();
            this.removeChild( child ); 
        }

        this.mDelayedCall = gsap.delayedCall(0, ()=> null )
        this.mDelayedCall.kill();
        console.log(`Enmey Container Child Length = ${this.children.length}`);
    }

    pause()
    {
        for( let i = this.children.length - 1; i >= 0; i--)
        {
            const child = this.children[i] as Enemy;
            child.speed = 0;
        }
    }

    resume()
    {
        this.setOriginally(); 
    }

    setTimeSlow()
    {
        for( let i = this.children.length - 1; i >= 0; i--)
        {
            const child = this.children[i] as Enemy;
            child.speed = 0.5;
        }

        this.mDelayedCall = gsap.delayedCall(3, ()=>{ this.setOriginally() })
    }

    setTimeFast()
    {
        for( let i = this.children.length - 1; i >= 0; i--)
        {
            const child = this.children[i] as Enemy;
            child.speed = 5;
        }

        this.mDelayedCall = gsap.delayedCall(1, ()=>{ this.setOriginally() })
    }

    setTimeStop()
    {
        for( let i = this.children.length - 1; i >= 0; i--)
        {
            const child = this.children[i] as Enemy;
            child.speed = 0;
        }

        this.mDelayedCall = gsap.delayedCall(1, ()=>{ this.setOriginally() })
    }

    setRemover()
    {
        for( let i = this.children.length - 1; i >= 0; i--)
        {
            const child = this.children[i] as Enemy;
            if( child.y > 0 && child.ticker) {
                child.ticker = false;
                this.checkCombo();
                child.setExpo( this.mComboCnt );
              
            }
        }

        this.mDelayedCall = gsap.delayedCall(0, ()=>{ this.setOriginally() })
    }

    setRecover()
    {
        this.dispatchEvent(EventType.ReceiveGameRecover);
    }

    // 모든 효과를 정상으로 돌린다.
    private setOriginally()
    {
        for( let i = this.children.length - 1; i >= 0; i--)
        {
            const child = this.children[i] as Enemy;
            child.speed = LEVEL[ this.mLevel ].dropspeed;
        }

        this.checkDestoryCnt();
    }

    private makeEnemey()
    {
        let posX = 0;
        let posY = -245;

        for( let i = 1; i <= this.mTotal; i++ )
        {
            //******************* */ 마지막 이벤트 글씨 안나오게 분기처리를 나타낸다. 210323 0312 김태신 과장 요청에 의한 수정********************** 
            // const enemy = ( i %  ( this.mFreq ) == 0 ) ?  new Enemy( true ) :  new Enemy( false );
            let enemy: Enemy;
            if( i ==  this.mTotal )
            {
                enemy = new Enemy( false );
            } else {
                enemy = ( i %  ( this.mFreq ) == 0 ) ?  new Enemy( true ) :  new Enemy( false );
            }

            //충돌 감지 이벤트
            enemy.addCustomEventListener( EventType.CRASH, (evt: CustomEvent)=> { this.crash( evt ) } );
            //이속------------------------------------------------------
            enemy.speed = LEVEL[ this.mLevel ].dropspeed;
            //단어------------------------------------------------------
            enemy.setText( this.mWordData[i]);
            //위치------------------------------------------------------
            posX= Math.floor(Math.random() * ( 2560 - enemy.width ));
            enemy.position.set(posX, posY);
            //적 간 거리 ------------------------------------------------

            posY -= LEVEL[ this.mLevel ].interval;
            
            this.addChild(enemy);
        }
    }

    private crash( evt: CustomEvent ) 
    {
        const enmey = evt.data as Enemy;
        this.mComboCnt = 0;
        enmey.ticker = false;
        enmey.setCrash();
        this.checkDestoryCnt();
        this.dispatchEvent( EventType.CRASH);
    }

    private checkCombo() 
    {
        // 최대 콤보 달성시 콤보 초기화
        if (this.mComboCnt == this.mTotal)
            this.mComboCnt = 0;
        let score = LEVEL[this.mLevel].score + COMBO_DATA[this.mComboCnt];
        this.mComboCnt += 1;
        // 콤보 10단위로 추가 보너스 점수를 준다.
        if (this.mComboCnt % 10 == 0 && this.mComboCnt != 0) {
            const idx = (this.mComboCnt / 10) - 1;
            const bonus = LEVEL[this.mLevel].bonuscombo[idx];
            score += bonus;
        }
        
        this.dispatchEvent(EventType.RecieveScore, score);
    }

    private checkType( type: EffectType )
    {
        switch( type )
        {
            case EffectType.TimeSlow:
                console.log("TimeSlow");
                this.setTimeSlow();
                break;
            case EffectType.TimeStop:
                console.log("TimeStop");
                this.setTimeStop();
                break;
            case  EffectType.TimeFast:
                console.log("TimeFast");
                this.setTimeFast();
                break;
            case EffectType.Remover:
                console.log("Remover");
                this.setRemover();
                break;
            case EffectType.Recover:
                console.log("setRecover");
                this.setRecover();
                break;
            default : break;
        }
    }

    private checkDestoryCnt()
    {
        let cnt = 0;
        for( let i = this.children.length - 1; i >= 0; i--)
        {
            const child = this.children[i] as Enemy;
            if(child.ticker == false ) cnt++;
        }

        if(cnt == this.mTotal)
        {
            this.mDelayedCall = gsap.delayedCall(0, ()=> null )
            this.mDelayedCall.kill();
            if(this.mIsPlay) this.dispatchEvent( EventType.RecieveGameSucceed);
            console.log("Game End");
            this.mIsPlay = false;
        }
    }
}