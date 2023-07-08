import React from "react";
import { Container, Divider, Typography, Box } from "@mui/material";
import { EnhancedTable } from "../../components";
import { DataSimple } from "../../utils";

export const TableView = () => {
    /**
     * Hooks.
     */

    const tableData = DataSimple;

    return (
        <Container maxWidth="xl">
            <Box sx={{ m: 4 }}>
                <Typography
                    variant="h4"
                    component={"h4"}
                > Construct Table  </Typography>
            </Box>
            <Divider />
            <EnhancedTable tableData={tableData} />
        </Container>
    )
}