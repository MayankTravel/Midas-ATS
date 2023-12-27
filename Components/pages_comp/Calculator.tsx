import React, { useState, useRef, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import html2canvas from "html2canvas";
import { Input } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { DownloadTableExcel } from "react-export-table-to-excel";
import moment from "moment";
import { fabClasses } from "@mui/material";
import { Button } from "react-bootstrap";

const Calculator = ({ values, onHide, show , setShow }: any) => {
  const dispatch: any = useDispatch();
  const { mealRate, lodgingRate } = useSelector((state: any) => state.calc);

  const targetElementRef = useRef(null);
  const tableRef = useRef(null);
  const [data, setData] = useState(values);
  const [currentData, setCurrentData] = useState<any>("");

  const currMonLodgRate =
    lodgingRate.length !== 0
      ? lodgingRate.filter((item: any) => item.long === moment().format("MMMM"))
      : [];

  const handleChange = (name: any, e: any) => {
    setCurrentData({ ...values, [name]: e.target.value });
  };

  const captureScreenshot = () => {
    const element = targetElementRef.current;

    if (!element) {
      console.error("Target element not found.");
      return;
    }

    html2canvas(element).then((canvas) => {
      const screenshotUrl = canvas.toDataURL();
      const a = document.createElement("a");
      a.href = screenshotUrl;
      a.download = "pay_package.png";
      a.click();
    });
  };

  const lodRate =
    currMonLodgRate.length !== 0
      ? (currMonLodgRate[0].value + mealRate) * 7
      : 0;

 

  return (
    <>
      <Modal
        onHide={() => {
          onHide();
          setCurrentData("");
        }}
        show={show}
        size="xl"
        contentClassName="bill-calculator"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="mb-3">
          <Modal.Title id="contained-modal-title-vcenter">
            Deal Sheet
          </Modal.Title>
          <Button variant="danger"  onClick={()=>{setShow(false); setCurrentData("");}}>
          <i className="bi bi-x-lg"></i>
          </Button>
        </Modal.Header>
        <div>
          {/* <h2 className="text-center">Bill Rate Calculator</h2> */}
          <div
            className="download-buttons mb-2 mt-2 d-flex justify-content-end me-4"
            style={{ gap: "15px" }}
          >
            <button className="btn btn-primary" onClick={captureScreenshot}>
              Image <i className="bi bi-card-image"></i>
            </button>
            <DownloadTableExcel
              filename="users table"
              sheet="users"
              currentTableRef={tableRef.current}
            >
              <button className="btn btn-secondary"> Export excel <i className="bi bi-download"></i> </button>
            </DownloadTableExcel>
          
          </div>
        </div>
        {values === undefined || values === null ? (
          ""
        ) : (
          <Modal.Body>
            <div className="container">
              <div className="row calculator-row">
                <div className="col-md-6 input-div">
                  <h3
                    className="calc-head"
                    style={{
                      background: "#438eff",
                      color: "white",
                      borderRadius: "10px",
                      padding: "10px",
                    }}
                  >
                    Billing
                  </h3>
                  <div className="row bill-table">
                    <table>
                      <tr>
                        <td>Bill Rate</td>
                        <td>
                          <Input
                            id="bill"
                            name="billRate"
                            value={
                              currentData !== ""
                                ? currentData.BillRate
                                : values.BillRate
                            }
                            onChange={(e) => handleChange("BillRate", e)}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>Guaranteed Hours</td>
                        <td>
                          <Input
                            id="guarHrs"
                            name="guarHrs"
                            value={
                              currentData !== ""
                                ? currentData.GuaranteedHours
                                : values.GuaranteedHours
                            }
                            onChange={(e) => handleChange("GuaranteedHours", e)}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>City</td>
                        <td>
                          <Input id="city" name="city" value={values.City} />
                        </td>
                      </tr>
                      <tr>
                        <td>State</td>
                        <td>
                          <Input id="state" name="state" value={values.State} />
                        </td>
                      </tr>

                      <tr>
                        <td>Job-Type</td>
                        <td>
                          <Input
                            id="jobType"
                            name="jobType"
                            value={
                              values.WorkType == "1"
                                ? "Travel"
                                : values.WorkType == "2"
                                ? "Perm"
                                : values.WorkType == "3"
                                ? "Per Diem"
                                : values.WorkType
                            }
                          />
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>

                <div className="col-md-6">
                  <h3
                    className="calc-head"
                    style={{
                      background: "#438eff",
                      color: "white",
                      borderRadius: "10px",
                      padding: "10px",
                    }}
                  >
                    Paypackage
                  </h3>
                  <div
                    className="row bill-table output-table"
                    ref={targetElementRef}
                  >
                    <table id="table-to-xls" ref={tableRef}>
                      <tr>
                        <td>Location</td>
                        <td>
                          <Input
                            id="location"
                            name="location"
                            value={values.City + "," + values.State}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>Hour Rates</td>
                        <td>
                          <Input
                            id="hourRates"
                            name="hourRates"
                            value={(currentData !== ""
                              ? currentData.BillRate * 0.7
                              : values.BillRate * 0.7
                            ).toFixed(2)}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>Gross Weekly</td>
                        <td>
                          <Input
                            id="grossWeekly"
                            name="grossWeekly"
                            value={(currentData !== ""
                              ? currentData.BillRate *
                                0.7 *
                                currentData.GuaranteedHours
                              : values.BillRate * 0.7 * values.GuaranteedHours
                            ).toFixed(2)}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>Non-Taxes Rates</td>
                        <td>
                          <Input
                            id="nonTax"
                            name="nonTax"
                            value={
                              lodgingRate.length !== 0
                                ? (lodgingRate[0].value + mealRate) * 7
                                : 0
                            }
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>Taxable Rates</td>
                        <td>
                          <Input
                            id="taxRates"
                            name="taxRates"
                            value={(currentData !== ""
                              ? currentData.BillRate *
                                  0.7 *
                                  currentData.GuaranteedHours -
                                lodRate
                              : values.BillRate * 0.7 * values.GuaranteedHours -
                                lodRate
                            ).toFixed(2)}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>Guaranteed Hours</td>
                        <td>
                          <Input
                            id="guarnhrs"
                            name="guarnhrs"
                            value={
                              currentData !== ""
                                ? currentData.GuaranteedHours
                                : values.GuaranteedHours
                            }
                          />
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        )}
      </Modal>
    </>
  );
};

export default Calculator;
