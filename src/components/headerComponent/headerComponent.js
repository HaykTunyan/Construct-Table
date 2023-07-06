import * as React from 'react';
import { Box, Toolbar, Button, AppBar, Typography } from '@mui/material';




export const HeaderComponent = () => {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Construct Table
                        </Typography>
                     
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}