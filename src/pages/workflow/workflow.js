import React from "react";
import { Container, Box, Card, CardContent, CardActions, Typography, Button } from "@mui/material";
import { NavLink, useLocation, useNavigate, useNavigation } from "react-router-dom";
import { StatusType } from "../../utils";
import { TagComponent } from "../../components";

export const Workflow = (props) => {
    /**
     * Hooks.
     */





    const locations = useLocation();





    const workflow = locations?.state?.itemInfo;


    console.log(" locations ", workflow)

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
                            <Button variant="text">  Go Back</Button>

                        </NavLink>
                    </Box>
                </Box>



                <Card sx={{ minWidth: 275 }}>
                    <CardContent>

                        <Typography variant="h5" component="div">
                            id:  {workflow.id}
                        </Typography>
                        <Typography variant="h5" component="div">
                            name: {workflow.name}
                        </Typography>
                        <Typography variant="h5" component="div">
                            status: {StatusType(workflow.status)}
                        </Typography>
                        {workflow?.tags?.length && (
                            <Typography variant="h5" component="div">
                                Tags: {
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
                        )}

                    </CardContent>

                </Card>
            </Container>
        </>
    )
}