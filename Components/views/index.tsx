import React, { useEffect } from "react";
import Breadcrumb from "@common/Breadcrumb";
import { Card, Col, Container, Row } from "react-bootstrap";
import Head from "next/head";
import Basic from "./Basic";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllJobs } from "Components/slices/jobs/_alljobs/thunk";

const BarCharts = () => {
  const dispatch: any = useDispatch();
  const { jobdata, isLoading } = useSelector((state: any) => ({
    jobdata: state.jobFeeds.jobdata,
    isLoading: state.jobFeeds.isLoading,
  }));
  useEffect(() => {
    fetchAllJobs(dispatch);
  }, []);
  if (isLoading || jobdata[0] === undefined) {
    return "Please While We get All jobs Data For you";
  }
  const active_vms = [
    "AHSA",
    "FieldGlass",
    "Kruse",
    "Medefis5",
    "MedicalSolutions",
    "PeopleFluent",
    "ShiftWise",
    "StafferLink",
  ];

  const vmsNAme = jobdata[0].filter((vms: any) =>
    active_vms.map((item: any) => vms.SourceName === item)
  );

  return (
    <React.Fragment>
      <Head>
        <title>Bar Charts | Hybrix - Admin & Dashboard Template</title>
      </Head>
      <>
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <Card.Header>
                  <h4 className="card-title mb-0">Basic Bar Chart</h4>
                </Card.Header>
                <Card.Body>
                  <Basic
                    dataColors='["--tb-success"]'
                    active_vms={active_vms}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    </React.Fragment>
  );
};

export default BarCharts;
