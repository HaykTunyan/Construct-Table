import React from "react";
import { Box, Container, Alert, Stack } from "@mui/material";

export const NotFound = () => {

    /**
     * Hooks.
     */

    return (
        <>
            <Box>
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error">This is  nothing here: 404  page!</Alert>
                </Stack>
            </Box>
        </>
    )
}