import React from "react";


export const TableBody = () => {
    return (

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
                                () => handelPlayPause( constructData.id)
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

    )
}