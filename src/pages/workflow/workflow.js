import React from "react";
import { Container, Box, Card, CardContent, Typography, Button, Divider } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { StatusType } from "../../utils";
import { TagComponent } from "../../components";

export const Workflow = (props) => {
    /**
     * Hooks.
     */

    const locations = useLocation();
    const workflow = locations?.state?.itemInfo;

    return (
        <>
            <Container maxWidth="xl">

                <Box sx={{ m: 4 }} display={"flex"} justifyContent={"space-between"} >
                    <Typography
                        variant="h4"
                        component={"h4"}
                    >
                        Workflow Item
                    </Typography>
                    <Box>
                        <NavLink to="/">
                            <Button variant="text">Go Back</Button>
                        </NavLink>
                    </Box>
                </Box>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} sx={{ paddingY: 2 }}>
                            <Typography variant="h5" component="div">
                                Id:
                            </Typography>
                            <Typography variant="h5" component="div">
                                {workflow.id}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} sx={{ paddingY: 2 }}>
                            <Typography variant="h5" component="div">
                                name:
                            </Typography>
                            <Typography variant="h5" component="div">
                                {workflow.name}
                            </Typography>
                        </Box>
                        <Divider />
                        <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} sx={{ paddingY: 2 }}>
                            <Typography variant="h5" component="div">
                                status:
                            </Typography>
                            <Typography variant="h5" component="div">
                                {StatusType(workflow.status)}
                            </Typography>
                        </Box>
                        <Divider />
                        {workflow?.tags?.length && (
                            <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} sx={{ paddingY: 2 }}>
                                <Typography variant="h5" component="div">
                                    Tags:
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {
                                        workflow?.tags.map((item, index) => (
                                            <Box display={"flex"} alignItems={"center"} key={index}>
                                                <TagComponent
                                                    color={item.color}
                                                    id={item.id}
                                                    name={item.name}
                                                />
                                            </Box>
                                        ))
                                    }
                                </Typography>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </Container>
        </>
    )
}