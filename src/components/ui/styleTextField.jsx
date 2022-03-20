//
// styleTextField.jsx
// 我喜屋
// 2022/1/30
// 共通部品(TextField)
//

// インポート
import * as React from 'react';
import { TextField, Input } from '@material-ui/core';


/**
 * StyleTextField
 * @param {String} value - 値
 * @param {String} label - ラベル
 * @param {String} placeholder - デフォルトで表示
 * @param {Any} onChange - ハンドラを指定
 * @returns StyleTextField
 */
export const StyleTextField = ({ value, label, placeholder, onChange }) => {
    return (
        <TextField
            inputProps={{ style: { fontSize: '24px' } }}
            InputLabelProps={{ style: { fontSize: '21px', shrink: true } }}
            size="medium"
            margin="normal"
            variant="outlined"
            fullWidth
            label={label}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
    )
}

/**
 * StyleInputTextField
 * @param {String} value - 値
 * @param {String} label - ラベル
 * @param {String} placeholder - デフォルトで表示
 * @param {Any} onChange - ハンドラを指定
 * @returns StyleTextField
 */
 export const StyleInputTextField = ({ value, label, placeholder }) => {
    return (
        <Input disabled
            inputProps={{ style: { fontSize: '24px' } }}
            InputLabelProps={{ style: { fontSize: '21px', shrink: true } }}
            size="medium"
            margin="normal"
            variant="outlined"
            fullWidth
            label={label}
            value={value}
            placeholder={placeholder}
        />
    )
}

/**
 * StyleMultilineTextField
 * @param {String} value - 値
 * @param {String} label - ラベル
 * @param {String} placeholder - デフォルトで表示
 * @param {Any} onChange - ハンドラを指定
 * @param {Integer} rows - 表示する行数
 * @returns StyleMultilineTextField
 */
 export const StyleMultilineTextField = ({ value, label, placeholder, onChange, rows }) => {
    return (
        <TextField
            inputProps={{ style: { fontSize: '24px' , lineHeight:'1.3' } }}
            InputLabelProps={{ style: { fontSize: '21px' } }}
            size="medium"
            margin="normal"
            variant="outlined"
            multiline
            fullWidth
            rows={rows}
            label={label}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
    )
}