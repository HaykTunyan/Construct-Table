import React from "react";
import { Box, IconButton } from "@mui/material";

export const StepComponent = (props) => {

    /**
     * Hooks.
     */

    const { stepData } = props;

    console.log(" stepData stepData ", stepData)

    return (
        <>
            <Box display={"flex"}>
                {stepData.map((item, index) => (
                    <Box key={index} sx={{ mx: 1 }}>
                        <IconButton  >
                            <img src={item.automation_icon_url} alt={item.automation_name} height={24} width={24} />
                        </IconButton>
                    </Box>
                ))}
            </Box>
        </>
    )
}