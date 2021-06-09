import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {withStyles} from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 100,
    },
});



class TableCultivo extends Component<any, any> {
    //@ts-ignore
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.id,
            classes: this.props.classes,
            rows: [{name:"",data:""}]
        }
    }

    /*const handleSubmit = async () => {
        const info = await downloadInfoCultivo(this.id);
        //@ts-ignore
        const rows = info.map(campo => createData(campo.alias,campo.value));
        console.log(rows)
        return rows;
    }*/
    createData(name:any, data:any) {
        return {name, data};
    }

    componentDidMount() {
        const local = 'http://localhost:8080/api/predioidentify';
        const pruebas = 'http://187.191.53.158:8080/api/predioidentify';
        let route = pruebas +'?&id='+this.state.id;
        fetch(route, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(r => r.json())
            .then(r => {
                //@ts-ignore
                this.setState({ rows: r.map(campo => this.createData(campo.alias,campo.value)) })
            })
    }
    render() {
        return (
            <TableContainer component={Paper}>
                <Table className={this.state.classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Nombre</StyledTableCell>
                            <StyledTableCell align="center">Datos</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.rows.map((row: any) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row" align="center">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.data}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default function MyTable(props:any){
    const classes = useStyles();
    return (<TableCultivo classes={classes} id={props.id}/>)
}
