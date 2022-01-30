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

/**
 * StyleButton
 * @param {String} title - ボタンに表示する文字
 * @param {String} to - クリック後に飛ぶルーティング用パス
 * @param {Any} onClick - ハンドラを指定
 * @returns StyleButon
 */
export const StyleButton = ({ title, to, onClick }) => {
    return (
        <Button
            style={{
                // ボタン
                width: 'auto',
                height: 'auto',
                backgroundColor: '#0093FD',

                // テキスト
                color: '#FFF',
                fontSize: '1.5rem',
            }}
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
export const BackButton = ({ to, onClick }) => {
    return (
        <Button
            style={{
                // ボタン
                width: 'auto',
                height: 'auto',
                backgroundColor: '#8AD3F2',

                // テキスト
                color: '#FFF',
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