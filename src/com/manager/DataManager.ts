import Axios, { AxiosResponse } from 'axios';
import Config from '../../Utill/Config';
import { TypeingApp } from '../TypeingApp';

export class DataManager{
    //-----------------------------------
    // singleton
    private static _handle: DataManager;
    static get Handle(): DataManager { 
        if( DataManager._handle === undefined ){
            DataManager._handle = new DataManager();
        }
        return DataManager._handle 
    }

    private mURLRoot: string;

    private mMemoryData: any;
    private mMemoryIndex: number;

    constructor() {
        this.mURLRoot  = "./";
        DataManager._handle = this;

        this.mMemoryData = {};
    }

    async getData(gameName: string, mode: string){
        const getJSON = await Axios.get(`${this.mURLRoot}rsc/table/data.json`);
        //console.log(gameName,mode);
        //console.log(getJSON.data[gameName][mode] )
        return getJSON.data[gameName][mode];
    }

    // 읽어 들인 데이타의 일부분을 보관하는 함수.
    // 선택 화면에서 선택된 항목의 데이타만 받아와서 타이핑시 사용한다.
    saveMemoryData( $data: any, $index?: number )
    {
        this.mMemoryData = $data;
        if( $index != undefined ) this.mMemoryIndex = $index; 
    }

    getMemoryData(): any
    {
        return this.mMemoryData;
    }

    getMemoryIndex(): number
    {
        return this.mMemoryIndex;
    }


    //천재측과의 전용 통신 함수 (타자 연습 여부)
    async getPracticeQuery( $Tcode: string, $LANG: string)
    {
        const data = 
        {
            strUserId: Config.strUserID,
            TCode:$Tcode,
            LangType: ($LANG == `kr`)? "1" : "2"
        }

        try {
            const response = await Axios.get(`http://${Config.strWebDns}/AppCommon/AppTypingStudyChk`, 
            {
                params: {
                    json: JSON.stringify( data )
                }
            });
            console.log(response);
            return response.data;
        } catch (error) {
            const msg = `
            타자 연습 여부 API 접근에 실패했습니다.
            API = http://${Config.strWebDns}/AppCommon/AppTypingComplete
            strUserId = ${Config.strUserID}
            LangType = ${($LANG == `kr`)? "1" : "2"}
            `;
            // TypeingApp.Handle.AddOnScreenDebugMessage(msg); 210323 0314 김태신 과장 요청에 의한 수정 ***********
            console.error(msg);
            return false;
        }
    }

    //천재측과의 전용 통신 함수 (완강 처리)
    async getCompleteQuery( $Dep2: string, $avg: number, $top: number, $accuracy: number, $score: number)
    {
        const data = {
            strUserId: Config.strUserID,
            Dep2: $Dep2,
            avg: String($avg),
            top: String($top),
            accuracy: String($accuracy),
            score: String($score)
        }

        try {
            const response = await Axios.get(`http://${Config.strWebDns}/AppCommon/AppTypingComplete`, 
            {
                params: {
                    json: JSON.stringify( data )
                }
            });
            console.log(response);
            return response.data;
        } catch (error) {
            const msg = `
            완강 처리 API 접근에 실패했습니다.
            API = http://${Config.strWebDns}/AppCommon/AppTypingComplete
            strUserId = ${Config.strUserID}
            Dep2 = ${$Dep2}
            avg = ${$avg}
            top = ${$top}
            accuracy = ${$accuracy}
            score = ${$score}
            `;
            // TypeingApp.Handle.AddOnScreenDebugMessage(msg); 210323 0314 김태신 과장 요청에 의한 수정 ***********
            console.error(msg);
            return false;
        }
    }


    //천재측과의 전용 통신 함수 (나의 기록)
    async getRecordQuery()
    {
        const data = {
            strUserId: Config.strUserID
        }

        try {
            const response = await Axios.get(`http://${Config.strWebDns}/AppCommon/AppTypingStudyRecord`, 
            {
                params: {
                    json: JSON.stringify( data )
                }
            });
            console.log(response);
            return response.data;
        } catch (error) {
            const msg = `
            나의 기록 API 접근에 실패했습니다.
            API = http://${Config.strWebDns}/AppCommon/AppTypingStudyRecord
            strUserId = ${Config.strUserID}
            `;
            // TypeingApp.Handle.AddOnScreenDebugMessage(msg); 210323 0314 김태신 과장 요청에 의한 수정 ***********
            console.error(msg);
            return false;
        }
    }
}