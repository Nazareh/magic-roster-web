import React, { Component } from 'react'
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';


class ListUser extends Component {
    constructor() {
        super();
        this.state  = {
            rows: [],
        };
    }

    componentDidMount() {
        const username = 'nazarehturmina@gmail.com';
        const password = 'supersecret';
        const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
        const url = 'http://localhost:8080/api/v1/users';
        // const url = 'https://jsonplaceholder.typicode.com/users';

        console.log('begin');
        axios.get(url
            ,{
            headers: {
                // 'Authorization':'Basic ${token}'
                'Access-Control-Allow-Origin':'*'
            }}
        ).then(response => {
                    console.log(response.data);
                    return this.setState({rows: response.data});
                })
        console.log('END');
    }
    render() {
        const columns = [
            { id: 'id', label: 'ID', minWidth: 20 },
            { id: 'firstName', label: 'First Name', minWidth: 80 },
            { id: 'lastName', label: 'Last Name', minWidth: 200, format: value => value.toLocaleString(),},
            { id: 'email', label: 'Email', minWidth: 170,format: value => value.toLocaleString(),},

        ];

        return (
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {columns.map(column => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                        {this.state.rows.map(row => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map(column => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
            </Table>
        );
    }
}

export default ListUser;