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
  CardHeader,
  Form,
  FormGroup,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

const Header = ({ cari, setCari, header }) => {
  return (
    <>
      <div className="header bg-gradient-default pb-8 pt-5 pt-md-8 opacity-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-3">{header}</h3>
                <Form>
                  <FormGroup>
                    <InputGroup>
                      <Input
                        value={cari}
                        onChange={(e) => {
                          setCari(e.target.value);
                        }}
                        placeholder={"Search " + header}
                        type="text"
                      />
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-send" />
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                </Form>
              </CardHeader>
            </Card>{" "}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
