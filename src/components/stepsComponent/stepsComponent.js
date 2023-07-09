import React, { useState } from "react";
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DialogComponent } from "../dialogComponent/dialogComponent";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";

export const StepComponent = (props) => {
    /**
     * Hooks.
     */





    const navigate = useNavigate();
    // const navigation = useNavigation();

    const { stepData, itemInfo } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMoreItem = () => {
        // console.log(" item item  ", itemInfo)

        //  locations.pathname(`workflows/current-workflow/`);

        navigate("workflows/current-workflow",
            {
                state: {
                    itemInfo
                },
            }
        );

        // navigation.location("workflows/current-workflow/")

    }

    return (

        <Box display={"flex"}>
            <DialogComponent
                stepData={
                    stepData
                }
                itemInfo={itemInfo}
            />
            <Box sx={{ mx: 1 }}>
                <IconButton

                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClickMenu}

                >
                    <MoreVertIcon />
                </IconButton>
            </Box>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleMoreItem}>
                    View Item
                </MenuItem>
            </Menu>

        </Box>

    )
}