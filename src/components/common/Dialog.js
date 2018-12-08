import React from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { openDialog } from "../../reducers/app"

const Dialog = (props) => {
  const {
    isOpenDialog, openDialog, dialogMessage
  } = props;

  return (
    <div>
      <Modal show={isOpenDialog} onHide={() => {openDialog(false)}}>
        <Modal.Header closeButton style={{ border: 'none' }}>
          <Modal.Title>
            { dialogMessage.title }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { dialogMessage.content }
        </Modal.Body>
        {/* <Modal.Footer>
          <Button
            bsStyle="primary"
            onClick={() => onSubmit()}
            disabled={isSubmitting}
          >
            <FormattedMessage id="contact_confirm" />
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
};

const mapStateToProps = state => ({
  isOpenDialog: state.app.isOpenDialog,
  dialogMessage: state.app.dialogMessage,
});

const mapDispatchToProps = dispatch => ({
  openDialog: isOpen => dispatch(openDialog(isOpen)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
