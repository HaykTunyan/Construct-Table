import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import UploadIcon from '@mui/icons-material/Upload';
import { DialogComponent } from "../dialogComponent/dialogComponent";

export const StepComponent = (props) => {

    /**
     * Hooks.
     */

    const { stepData, itemInfo } = props;




    return (
        <>
            <Box display={"flex"}>
                <DialogComponent
                    stepData={
                        stepData
                    }

itemInfo={itemInfo}
                />
            </Box>
        </>
    )
}