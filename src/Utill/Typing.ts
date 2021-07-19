//타수 공식
// 타수 * 60 / 시간

// 해당 문자가 한글인지 체크 (한글이면 true 리턴 )
export function checkIsHangul( str: string ): boolean {
    
    const c = str.charCodeAt(0);
    if( 0x1100<=c && c<=0x11FF ) return true;
    if( 0x3130<=c && c<=0x318F ) return true;
    if( 0xAC00<=c && c<=0xD7A3 ) return true;

    return false;
}

// 한글 타이핑 수 
export function getHangulTypingCount( kor: string ): number {
    //

    let cnt = 1;

    const f = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ',
               'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ',
               'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
    const s = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ',
               'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ',
               'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
    const t = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ',
               'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ',
               'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ',
               'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

    const ga = 44032;
    let uni: number = kor.charCodeAt(0);


    // 자음 또는 자음 없이 모음만 들어온 경우..
    if( uni >= 12593 && uni <= 12643) {
        const hg = String.fromCharCode(uni);
        if( hg == 'ㅘ' || hg == 'ㅙ' || hg == 'ㅚ' || hg == 'ㅝ' || hg == 'ㅞ' || hg == 'ㅟ' || hg == 'ㅢ') cnt++;
        return cnt;
    }

    uni = uni - ga;

    const fn = parseInt( String(uni / 588) );
    const sn = parseInt( String((uni - (fn * 588)) / 28) );
    const tn = parseInt( String( uni % 28 ) );

    // 중성체크
    if( s[sn] == 'ㅘ' || s[sn] == 'ㅙ' || s[sn] == 'ㅚ' || s[sn] == 'ㅝ' || s[sn] == 'ㅞ' || s[sn] == 'ㅟ' || s[sn] == 'ㅢ') {
        cnt += 2;
    } else {
        cnt += 1;
    }
        
    // 종성 체크
    if( t[tn] == 'ㄳ' || t[tn] == 'ㄵ' || t[tn] == 'ㄶ' || t[tn] == 'ㄺ' || t[tn] == 'ㄻ' || t[tn] == 'ㄼ' || t[tn] == 'ㄽ' ||
        t[tn] == 'ㄾ' || t[tn] == 'ㄿ' || t[tn] == 'ㅀ' || t[tn] == 'ㅄ') {
        cnt += 2;
    } else if( t[tn] != ''){
        cnt += 1;
    } 

    return cnt;
}

// 조합을 리턴 (한글의 경우 초성 중성 종성)
export function getComposition( str: string ) {

    if(!checkIsHangul(str)) {
        return {
            f: str,
            s: "",
            t: ""
        };
    }

    const f = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ',
               'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ',
               'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
    const s = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ',
               'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ',
               'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
    const t = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ',
               'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ',
               'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ',
               'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

    const ga = 44032;
    let uni: number = str.charCodeAt(0);


    // console.log(`uni = ${uni}`)
   
    // 조합이 안된 한글의 경우
    if( uni >= 12593 && uni <= 12643) {
        return {
            f: String.fromCharCode(uni),
            s: "",
            t: ""
        };
    }
    
    uni = uni - ga;

    const fn = parseInt( String(uni / 588) );
    const sn = parseInt( String((uni - (fn * 588)) / 28) );
    const tn = parseInt( String( uni % 28 ) );

    // console.log(uni / 588);
    // console.log((uni - (fn * 588)) / 28);
    // console.log(uni % 28);

    return {
        f: f[fn],
        s: s[sn],
        t: t[tn]
    };
}

export function getTypingCount( str: string): number {

    let cnt = 0;

    const strAry = str.split('');
    const len = strAry.length;

    for( let i = 0; i < len; i++ ) {

        if(checkIsHangul(strAry[i])) { // 한글인 경우라면.. 쪼개서 카운트
            cnt += getHangulTypingCount( strAry[i] );
        } else {
            // 아니면 걍 1씩 증가.
            cnt++;
        }
    }

    return cnt;
}


export function getLastCompositionChar( str: string ) {
    //
}



