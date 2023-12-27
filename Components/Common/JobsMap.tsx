import React from 'react';
import { Button, Card, Col, ProgressBar, Row } from 'react-bootstrap';
import { VectorMap } from '@south-paw/react-vector-maps';
import world from '../Common/world.svg.json';
const JobsMap = () => {
    return (
        <React.Fragment>
            <Row>
                <Col xl={12}>

                    <Card className="card-height-100">
                        <Card.Header className="align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Top Retail Sales Location</h4>
                            <div className="flex-shrink-0">
                                <Button variant='soft-primary' size='sm' type="button">
                                    Export Report
                                </Button>
                            </div>
                        </Card.Header>


                        <Card.Body>

                            <Row>
                                <Col lg={8}>
                                    <div
                                        className="text-center"
                                    >
                                        <div id="world_map_line_markers" className="custom-vector-map">
                                            <VectorMap {...world} />
                                        </div>
                                    </div>

                                </Col>
                                <Col lg={4}>
                                    <div className="mb-4">
                                        <h6 className="text-muted mb-3 fw-medium fs-12 text-uppercase">All Users Statistics</h6>
                                        <h4>1,87,42,102 <small className="text-muted fw-normal fs-13">users</small></h4>
                                    </div>
                                    <div>
                                        <p className="mb-2 fw-medium">Current Activity</p>

                                        <ProgressBar className="mb-4">
                                            <ProgressBar variant="primary" now={8} key={1} />
                                            <ProgressBar variant="success" now={20} key={2} />
                                            <ProgressBar variant="info" now={14} key={3} />
                                            <ProgressBar variant="danger" now={7} key={4} />
                                            <ProgressBar variant="secondary" now={25} key={5} />
                                            <ProgressBar variant="dark" now={10} key={6} />
                                            <ProgressBar variant="warning" now={2} key={7} />
                                            <ProgressBar variant="light" now={14} key={8} />
                                        </ProgressBar>

                                        <p><i className="ri-checkbox-blank-circle-fill text-primary align-bottom me-1"></i> Canada <span className="float-end">8%</span></p>
                                        <p><i className="ri-checkbox-blank-circle-fill text-success align-bottom me-1"></i>Greenland <span className="float-end">20%</span></p>
                                        <p><i className="ri-checkbox-blank-circle-fill text-info align-bottom me-1"></i>US <span className="float-end">14%</span></p>
                                        <p><i className="ri-checkbox-blank-circle-fill text-secondary align-bottom me-1"></i>Russia <span className="float-end">25%</span></p>
                                        <p><i className="ri-checkbox-blank-circle-fill text-danger align-bottom me-1"></i>Brazil <span className="float-end">7%</span></p>
                                        <p><i className="ri-checkbox-blank-circle-fill text-dark align-bottom me-1"></i>Sydney <span className="float-end">10%</span></p>
                                        <p><i className="ri-checkbox-blank-circle-fill text-warning align-bottom me-1"></i>Norway<span className="float-end">2%</span></p>
                                        <p><i className="ri-checkbox-blank-circle-fill text-light align-bottom me-1"></i>China <span className="float-end">14%</span></p>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>

                    </Card>

                </Col>

            </Row>
        </React.Fragment>
    );
}

export default JobsMap;