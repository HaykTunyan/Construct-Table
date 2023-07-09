import React, { useState, Fragment } from "react";
import { Box, IconButton, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import UploadIcon from '@mui/icons-material/Upload';
import { useNavigate } from "react-router-dom";

export const DialogComponent = ({ stepData, itemInfo }) => {
    /**
     * Hooks.
     */

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [params, setParams] = useState(null)

    const handleClickOpen = (item) => {
        setOpen(true);
        setParams(item)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAccepet = () => {
        navigate("workflows/current-workflow",
            {
                state: {
                    itemInfo
                },
            })
    }

    const handleDownload = () => {
        const json = JSON.stringify(itemInfo);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = itemInfo.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <Fragment>
            {stepData.map((item, index) => (
                <Box key={index} sx={{ mx: 1 }}>
                    <IconButton onClick={() => handleClickOpen(item)}>
                        <img src={item.automation_icon_url} alt={item.automation_name} height={24} width={24} />
                    </IconButton>
                </Box>
            ))}
            <Box sx={{ mx: 1 }}>
                <IconButton onClick={() => handleClickOpen()}>
                    <UploadIcon />
                </IconButton>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Use
                    {"  "}
                    {params?.automation_name ?
                        params?.automation_name :
                        "Upload Item"
                    }
                    {"  "}
                    service
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Box display={"flex"} alignItems={"center"} alignContent={"center"} justifyContent={"center"} >
                            {params && (
                                <Box sx={{ marginRight: 2 }}>
                                    <img src={params?.automation_icon_url} alt={params?.automation_name}
                                        height={24} width={24}
                                    />
                                </Box>
                            )}
                            <Typography >
                                Construct Date Table Description
                            </Typography>
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    {params ? (
                        <Button onClick={handleAccepet} autoFocus>
                            Open Workflow
                        </Button>
                    ) : (
                        <Button onClick={handleDownload} autoFocus>
                            Download Workflow
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </Fragment>
    )

}