import React, { useState, Fragment, useMemo } from "react";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Typography, Paper, Checkbox, IconButton, Tooltip, TextField } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
// Icon.
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseIcon from '@mui/icons-material/Pause';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
// 
import { StepComponent } from "../stepsComponent/stepsComponent";
import { TagComponent } from "../tagComponent/tagComponent";
import { TableHeader } from "./tableHeader";
import { StatusType } from "../../utils/customs/customs";


function createData(name, calories, fat, carbs, protein) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
    };
}

const rows = [
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Dessert (100g serving)',
    },
    {
        id: 'calories',
        numeric: true,
        disablePadding: false,
        label: 'Calories',
    },
    {
        id: 'fat',
        numeric: true,
        disablePadding: false,
        label: 'Fat (g)',
    },
    {
        id: 'carbs',
        numeric: true,
        disablePadding: false,
        label: 'Carbs (g)',
    },
    {
        id: 'protein',
        numeric: true,
        disablePadding: false,
        label: 'Protein (g)',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Table
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export const EnhancedTable = ({ tableData }) => {

    /**
     * Hooks.
     */

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [constructData, setConstructData] = useState(tableData?.length ? tableData : []);
    const [play, setPlay] = useState(false);
    const [textInfo, setTextInfo] = useState("");
    const [showTextInput, setShowTextInput] = useState(false);
    const [showIndex, setShowIndex] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedItemId, setSelectedItemId] = useState(null);


    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - constructData.length) : 0;

    const visibleRows = useMemo(
        () =>
            stableSort(constructData, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    );


    // Component  Functions 


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };







    const handelPlayPause = (isItemSelected, Id) => {

    }


    const handleInputChange = (event, itemId) => {



        console.log(" event event ", event.target.value)


        console.log(" itemId  itemId ", itemId)

        const updatedItems = constructData.map((item) => {
            if (item.id === itemId) {
                return { ...item, name: event.target.value };
            }
            return item;
        });

        setConstructData(updatedItems);

    };


    const handleChangeName = (item, indexId) => {

        setSelectedItem(item)
        setTextInfo(item.name);
        setSelectedItemId(indexId)

        // const updatedTables = constructData.map( (item)  => {
        //     if( item.id  === )
        // } )

        // setSelectedItem(item);
        // setTextInfo(item.name);
        // setShowTextInput(true)

        // const updatedTables = [...constructData];
        // setConstructData(updatedTables)

    }


    const handleSaveName = (itemId) => {
        const updatedItems = constructData.map((item) => {
            if (item.id === itemId) {
                return { ...item, name: textInfo };
            }
            return item;
        });

        setConstructData(updatedItems);
        setSelectedItemId(null)
    }

    const handleCanceleName = () => {
        setSelectedItemId(null)
    }

    const handleLinkPath = () => {


    }



    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <TableHeader
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={constructData.length}
                        />
                        <TableBody>
                            {visibleRows.map((constructData, index) => {
                                const isItemSelected = isSelected(constructData.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        // onClick={(event) => handleClick(event, constructData.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={constructData.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        {/* Checkbox */}
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        {/* Name */}
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            <Box display={"flex"} alignItems={"center"}>
                                                <IconButton onClick={
                                                    (event) => handelPlayPause(event, constructData.id)
                                                }>
                                                    {play ? (
                                                        <PauseIcon />
                                                    ) : (
                                                        <PlayCircleIcon />
                                                    )}
                                                </IconButton>
                                                <Box display={"flex"} alignItems={"center"} >
                                                    <Box>
                                                        {selectedItemId === constructData.id ? (
                                                            <TextField
                                                                required
                                                                id="outlined-required"
                                                                label="Required"
                                                                defaultValue={textInfo}
                                                                onChange={(event) => handleInputChange(event, constructData.id)}
                                                            />


                                                        ) : (
                                                            <Typography>
                                                                {constructData.name}
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                    <Box display={"flex"} alignItems={"center"}>
                                                        {selectedItemId === constructData.id ? (
                                                            <>
                                                                <IconButton onClick={() => handleSaveName(constructData.id)}>
                                                                    <CheckIcon />
                                                                </IconButton>
                                                                <IconButton onClick={() => handleCanceleName()}>
                                                                    <CloseIcon />
                                                                </IconButton>
                                                            </>

                                                        ) : (
                                                            <>
                                                                <IconButton


                                                                    onClick={() => handleChangeName(constructData, constructData.id)}
                                                                >
                                                                    <EditIcon />
                                                                </IconButton>
                                                            </>
                                                        )}

                                                    </Box>
                                                </Box>
                                                <Box display={"flex"} alignItems={"center"}>
                                                    {constructData?.tags?.length && (
                                                        <Fragment>
                                                            {constructData?.tags
                                                                .slice(0, 2)
                                                                .map((item) => (
                                                                    <Box display={"flex"}>
                                                                        <TagComponent
                                                                            color={item.color}
                                                                            id={item.id}
                                                                            name={item.name}
                                                                        />

                                                                    </Box>
                                                                ))}
                                                            {constructData?.tags?.length > 2 && (
                                                                <Box sx={{ backgroundColor: "#F4F6F7", paddingX: 1, paddingY: "0.1", borderRadius: 2 }}>
                                                                    <Typography sx={{ color: "#9A9EAF", }}>
                                                                        {"+"}
                                                                        {constructData?.tags?.length - 2}
                                                                    </Typography>

                                                                </Box>
                                                            )}
                                                        </Fragment>
                                                    )}
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        {/* Modified */}
                                        <TableCell align="right">
                                            <Box display={"flex"}>
                                                Jun 23, 2023
                                            </Box>
                                        </TableCell>
                                        {/* Storage */}
                                        <TableCell align="right">
                                            <Box display={"flex"}>
                                                {(constructData.storage !== 0 ? (constructData.storage / 1000000).toFixed(2) : constructData.storage)}
                                                {" MB "}
                                            </Box>
                                        </TableCell>
                                        {/* Status */}
                                        <TableCell align="right">
                                            <Box display={"flex"}>
                                                <Typography sx={{ color: constructData.status === "completed" ? "#5ACF59" : "#838C97" }}>
                                                    {StatusType(constructData.status)}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        {/* Action */}
                                        <TableCell align="right">
                                            <Box display={"flex"}>
                                                {constructData?.steps?.length && (
                                                    <Fragment>
                                                        <StepComponent
                                                            stepData={
                                                                constructData?.steps
                                                            }
                                                            itemInfo={constructData}
                                                        />
                                                    </Fragment>
                                                )}

                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{ height: 55 }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={tableData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}