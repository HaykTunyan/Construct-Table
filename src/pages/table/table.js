import React from "react";
import { Container, Divider, Typography , Box  } from "@mui/material";
import { EnhancedTable } from "../../components";
import { DataSimple } from "../../utils";


export const TableView = () => {


    const tableData = DataSimple;


    /**
     * Hooks.
     */

    return (
        <Container>
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