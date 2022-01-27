import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


function CreateQuestion3(props) {
  const { formData, inputChange } = props;

    return (
        <Box>
            <TableContainer component={Paper}>
                <Table aria-label="Customer Input Data">
                    <TableHead>
                        <TableRow>
                            <TableCell>項目</TableCell>
                            <TableCell align="right">入力内容</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            key={formData.category}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>カテゴリー</TableCell>
                            <TableCell align="right">{formData.category}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>タイトル</TableCell>
                            <TableCell align="right">{formData.title}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>詳細</TableCell>
                            <TableCell align="right">{formData.content}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default CreateQuestion3