import React, { useState, Fragment, useMemo, useEffect } from "react";
import PropTypes from 'prop-types';
import { format } from 'date-fns'
import { alpha } from '@mui/material/styles';
import { Box, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Toolbar, Typography, Paper, Checkbox, IconButton,  TextField } from "@mui/material";
import { StepComponent } from "../stepsComponent/stepsComponent";
import { TagComponent } from "../tagComponent/tagComponent";
import { TableHeader } from "./tableHeader";
import { StatusType } from "../../utils/customs/customs";
// Icon.
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseIcon from '@mui/icons-material/Pause';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';


export const EnhancedTable = ({ tableData }) => {
    /**
     * Hooks.
     */

    const [constructData, setConstructData] = useState(tableData?.length ? tableData : []);


    const [sortBy, setSortBy] = useState(null); // Column to sort by
    const [sortOrder, setSortOrder] = useState('asc');

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('modified');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [textInfo, setTextInfo] = useState("");
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [statusName, setStatusName] = useState("in_progress");
    const [pousedStatus, setPousedStatus] = useState("PAUSED");
    const [modifiedTime, setModifiedTime] = useState(new Date());

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - constructData.length) : 0;


    // Component  Functions 

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    const sortTable = (column) => {
        let order = 'asc';
        if (sortBy === column && sortOrder === 'asc') {
          order = 'desc';
        }
        
        // Update state variables
        setSortBy(column);
        setSortOrder(order);
        
        // Sort the data array
        const sortedData = [...constructData].sort((a, b) => {
          if (order === 'asc') {
            return a[column] - b[column];
          } else {
            return b[column] - a[column];
          }
        });
        
        // Update the sorted data
        setConstructData(sortedData);
      };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = constructData.map((n) => n.name);
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

    const handelPlayPause = (itemId, selectStatus) => {
        if (selectStatus === statusName) {
            const changeItems = constructData.map((item) => {

                if (item?.id === itemId) {

                    return { ...item, status: pousedStatus }
                }
                return item;
            })
            setConstructData(changeItems)

        } else {
            const updatedItems = constructData.map((item) => {
                if (item?.id === itemId) {
                    return {
                        ...item,
                        status: statusName,
                    }
                }
                return item;
            })
            setConstructData(updatedItems);
        }
    }

    const handleInputChange = (event, itemId) => {

        const updatedItems = constructData.map((item) => {
            if (item?.id === itemId) {
                return { ...item, name: event.target.value };
            }
            return item;
        });

        setTextInfo(event.target.value)
        setConstructData(updatedItems);

    };

    const handleChangeName = (item, indexId) => {
        setTextInfo(item.name);
        setSelectedItemId(indexId);
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
        setConstructData(tableData)
        setSelectedItemId(null)
    }

    const handleLinkPath = (indexId) => {
        // window.open(`/workflows/current-workflow/${indexId}`)
    }


    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <Toolbar
                    sx={{
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                        ...(selected.length > 0 && {
                            bgcolor: (theme) =>
                                alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                        }),
                    }}
                >
                    {selected.length > 0 ? (
                        <Typography
                            sx={{ flex: '1 1 100%' }}
                            color="inherit"
                            variant="subtitle1"
                            component="div"
                        >
                            {selected.length} selected
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

                </Toolbar>
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
                            sortTable={sortTable}
                            onRequestSort={handleRequestSort}
                            rowCount={constructData.length}
                        />
                        <TableBody>
                            {constructData
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage)
                                .map((constructData, index) => {
                                    const isItemSelected = isSelected(constructData.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover

                                            onClick={() => handleLinkPath(constructData.id)}
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
                                                    onChange={(event) => handleClick(event, constructData.id)}
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
                                                    <IconButton onClick={() => handelPlayPause(constructData?.id, constructData.status)}>
                                                        {constructData.status === statusName ? (
                                                            <PauseIcon />
                                                        ) : (
                                                            <PlayCircleIcon />
                                                        )}
                                                    </IconButton>
                                                    <Box display={"flex"} alignItems={"center"} >
                                                        <Box minWidth={200}>
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
                                                                    .map((item, index) => (
                                                                        <Box display={"flex"} key={index}>
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
                                                    {constructData.status === statusName ? (
                                                        <Typography>
                                                            {format(modifiedTime, 'LLLL dd yyyy')}
                                                        </Typography>
                                                    ) : (
                                                        <Typography>
                                                            Jun 23, 2023
                                                        </Typography>

                                                    )}

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
                                                    <Typography sx={{
                                                        color:
                                                            constructData.status === "completed" ? "#5ACF59" :
                                                                "completed" ? "#838C97" :
                                                                    "in_progress" ? "#52B2FC" : "#52B2FC"
                                                    }}>
                                                        {StatusType(constructData.status)}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            {/* Action */}
                                            <TableCell align="right">
                                                <Box display={"flex"} alignItems={"center"} justifyContent={"flex-end"} >
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