import React, { Component } from 'react'
import axios from "axios";
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

export default function MaterialTableDemo() {
    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
    };

    const baseUrl = 'http://localhost:8080/api/v1/users';

    const [state, setState] = React.useState({
        columns: [
            {field: 'id', title: 'ID', minWidth: 10,},
            {field: 'email', title: 'Email'},
            {field: 'firstName', title: 'First Name'},
            {field: 'lastName', title: 'Last Name'},
            {field: 'enabled', title: 'Enabled', type:'boolean'}
        ],
        data: []
    });

    axios.get(baseUrl,{headers: {'Access-Control-Allow-Origin': '*'}})
        .then(response  => {
            state.data =[];
            response.data.forEach(value => state.data.push(value));
        });

    let filteredData = state.data;

    return (
        <MaterialTable
            title="Editable Example"
            icons={tableIcons}
            columns={state.columns}
            data={
                query =>
                new Promise((resolve, reject) =>
                    setTimeout(() => {
                        if ( query.search !== '') {
                            filteredData = state.data.filter(row =>
                                row.id.toString().toLowerCase().includes(query.search.toLowerCase()) ||
                                row.email.toLowerCase().includes(query.search.toLowerCase()) ||
                                row.firstName.toLowerCase().includes(query.search.toLowerCase()) ||
                                row.lastName.toLowerCase().includes(query.search.toLowerCase())
                            );
                        }
                        else {
                            filteredData = state.data;
                        }
                            resolve({
                                data: filteredData
                                    .slice(
                                        query.page * query.pageSize,
                                        query.page * query.pageSize + query.pageSize),
                                page: query.page,
                                totalCount: filteredData.length // total row number
                            })
                    },300)
                )
            }
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            setState(prevState => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return {...prevState, data};
                            });
                        }, 300);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState(prevState => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return {...prevState, data};
                                });
                            }
                        }, 300);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            axios.delete(baseUrl+'/'+oldData.id);
                            resolve();
                            setState(prevState => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return {...prevState, data};
                            });
                        }, 150);
                    }),
            }}
        />
    );
};