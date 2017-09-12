import React from 'react';
import {Col, Grid, Image, Row} from "react-bootstrap";

const WelcomeBanner = (props) => {

    const profile = props.profile;

    return (
        <Grid>
            <Row>
                <Col md={2}>
                    <Image src={profile.images[0].url} responsive circle/>
                </Col>
                <Col md={10}>
                    <h1 className="text-right">Welcome, {profile.id}!</h1>
                </Col>
            </Row>
        </Grid>
    )
}

export default WelcomeBanner;