import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

export default function Footer() {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"></section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                e-Nurse{" "}
              </h6>
              <p>A tool that helps you understand your medicine better</p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Tools</h6>
              <p>
                <a href="#!" className="text-reset">
                  Interactions
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Consultings
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Doctors
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Drugs List
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a href="https://go.drugbank.com/" className="text-reset">
                  DrugBank
                </a>
              </p>
              <p>
                <a href="https://www.nlm.nih.gov/" className="text-reset">
                  National Library of Medicine{" "}
                </a>
              </p>
              <p>
                <a
                  href="https://lhncbc.nlm.nih.gov/RxNav/APIs/InteractionAPIs.html"
                  className="text-reset"
                >
                  Drug Interaction API
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Burcistanbul, 34522 Esenyurt/İstanbul
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                Medical@e-nurse.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 90 546 186 1920
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 90 234 567 8989
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2023 Copyright:
        <a className="text-reset fw-bold" href="https://e-Nurse.com/">
          e-Nurse.com
        </a>
      </div>
    </MDBFooter>
  );
}
