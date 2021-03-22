import React, { useState } from "react";
import { Media, Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

export default (flagClassName) => {
  const kooriFlagStyle = {
    position: "absolute",
    right: '9vw',
    top: '26.5vh',
    width: '135px',
  };
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        <div style={kooriFlagStyle} className={flagClassName}>
          <p>
            <img src="/assets/media/images/background/KooriFlag.png" />
          </p>
        </div>
      </Button>

      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton style={{ backgroundColor : "antiquewhite", fontFamily:'quagmire'}}>
        <Modal.Title>Acknowledgement to country</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor : "antiquewhite"}}>
          We Acknowledge the Traditional Custodians of the Wattamattagal clan of
          the Darug Nation, whose Cultures and Customs have nurtured, and
          continue to nurture, this land, since the Dreaming. We pay our
          respects to Elders past and present.
        </Modal.Body>
      </Modal>
    </div>
  );
};
