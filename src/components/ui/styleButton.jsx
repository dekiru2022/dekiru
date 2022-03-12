//
// styleButton.jsx
// 我喜屋
// 2022/1/29
// 共通部品(Button)
//

// インポート
import * as React from 'react';
import Button from '@material-ui/core/Button';
import { Link as LinkRouter } from 'react-router-dom';
import '../../styles/Button.css'

const setFontSize = (fontSize) =>{
    return (fontSize) ? fontSize : '1.5rem'
}

/**
 * StyleButton
 * @param {String} title - ボタンに表示する文字
 * @param {String} to - クリック後に飛ぶルーティング用パス
 * @param {Any} onClick - ハンドラを指定
 * @returns StyleButon
 */
export const StyleButton = ({ title, to, onClick, fontSize }) => {
    return (
        <Button
            style={{
                // ボタン
                width: 'auto',
                height: 'auto',

                // テキスト
                color: '#FFF',
                fontSize: setFontSize(fontSize) ,
                borderRadius: 20,
            }}
            className="style-button"
            variant="contained"
            component={LinkRouter}
            to={to}
            onClick={onClick}
        >
            {title}
        </Button>
    )
}

/**
 * StyleButton
 * @param {String} title - ボタンに表示する文字
 * @param {String} to - クリック後に飛ぶルーティング用パス
 * @param {Any} onClick - ハンドラを指定
 * @returns StyleButon
 */
 export const StyleQuesButton = ({ title, to, onClick, fontSize }) => {
    return (
        <Button
            style={{
                // ボタン
                width: 'auto',
                height: 'auto',

                // テキスト
                color: '#FFF',
                fontSize: setFontSize(fontSize) ,
                borderRadius: 20,
            }}
            className="style-ques-button"
            variant="contained"
            component={LinkRouter}
            to={to}
            onClick={onClick}
        >
            {title}
        </Button>
    )
}

/**
 * BackButton
 * @param {String} title - ボタンに表示する文字
 * @param {String} to - クリック後に飛ぶルーティング用パス
 * @returns BackButon
 */
export const BorderButton = ({ to, onClick }) => {
    return (
        <Button
            style={{
                // ボタン
                width: 'auto',
                height: 'auto',
                backgroundColor: '#FFF',
                border: '0.1rem solid #26418D',
                borderRadius: 20,

                // テキスト
                color: '#26418D',
                fontSize: '1.5rem',
            }}
            variant="contained"
            component={LinkRouter}
            to={to}
            onClick={onClick}
        >
            戻る
        </Button>
    )
}