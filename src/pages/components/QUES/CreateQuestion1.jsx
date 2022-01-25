import Box from '@mui/material/Box';
import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function CreateQuestion1(props) {

    const { formData, inputChange, categoriesArray } = props;

    return (
        <Box xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
            <InputLabel id="demo-simple-select-label" sx={{ width: '60%' }}>カテゴリ</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="カテゴリー"
                onChange={inputChange}
                name="category_id"
                defaultValue={formData.category_id}
            >
                {categoriesArray.map((categoryArray,index) => (
                <MenuItem value={categoryArray.id} key={index}>{categoryArray.category}</MenuItem>
                ))}
            </Select>
        </Box>
    )
}

export default CreateQuestion1