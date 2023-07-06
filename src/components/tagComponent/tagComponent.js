import React, { Fragment, useState } from "react";
import { Box, Typography } from "@mui/material";

export const TagComponent = (props) => {

    const { tags, id, name, color } = props;
    const [ background, setBackground ] = useState();

    return (
        <Box sx={{ backgroundColor: "#FFEBEE", marginX: 1, paddingX: 1, paddingY: "0.1", borderRadius: 2 }}>
            <Typography sx={{ color: "#f35d5d" }}>
                {name}
            </Typography>
        </Box>
    )
}