import React from "react";
import { Box, Typography } from "@mui/material";

export const TagComponent = (props) => {
    /**
     * Hooks.
     */

    const { id, name, color } = props;

    return (
        <Box sx={{ backgroundColor: "#FFEBEE", marginX: 1, paddingX: 1, paddingY: "0.1", borderRadius: 2 }} key={id}>
            <Typography sx={{ color: `${color}` }}>
                {name}
            </Typography>
        </Box>
    )
}