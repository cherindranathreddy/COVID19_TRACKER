import React from 'react';
import {Card,CardContent,Typography} from "@material-ui/core";
import './InfoBox.css';

function InfoBox({title,active,total}) {
    return (
        <Card>
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>

                <h2 className= "infoBox__cases">
                    {active}
                </h2>

                <Typography className="infoBox__total" color="textSecondary">
                {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox;
