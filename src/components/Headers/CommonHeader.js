/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from "react";
import { fetchget } from "variables/Data.js";
// reactstrap components
import {
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  Badge,
} from "reactstrap";

const Header = ({ data = [] }) => {
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Card className=" shadow border-0 mt-2">
              <CardBody className="py-5">
                <div className="icon icon-shape icon-shape-success rounded-circle mb-2">
                  <i className="ni ni-ambulance" />
                </div>
                <h4 className="text-primary text-uppercase mb-1">
                  {data.doctor}
                </h4>
                <p classNamdata="description ">{data.description}</p>
                <div>
                  {data.starttime != undefined && (
                    <Badge
                      style={{ fontSize: 13 }}
                      color="danger"
                      pill
                      className="mr-1 mt-0"
                    >
                      {data.starttime.substring(0, 5) +
                        " - " +
                        data.endtime.substring(0, 5)}
                    </Badge>
                  )}
                </div>
              </CardBody>
            </Card>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
