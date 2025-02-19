import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { delChannel } from '../slices/channelsSlice.js';
import { delChannelFromMessages } from '../slices/messagesSlice.js';
import routes from '../routes.js';

const Del = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const { setDelChannel, channelForAction } = props;

  const handleDelChannel = () => {
    axios.delete(routes.editChannelsPath(channelForAction.id), {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    }).then((response) => {
      dispatch(delChannel(response.data.id));
      dispatch((delChannelFromMessages(response.data.id)));
      setDelChannel(false);
      toast.success(t('channels.removed'));
    })
      .catch(() => {
        toast.error(t('errors.network'));
      });
  };

  const handleClose = () => setDelChannel(false);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>{t('channels.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.confirmation')}</p>
        <Modal.Footer>
          <Button onClick={handleClose} variant="secondary">
            {t('modals.cancel')}
          </Button>
          <Button onClick={handleDelChannel} variant="danger" type="submit">
            {t('modals.confirm')}
          </Button>
        </Modal.Footer>

      </Modal.Body>
    </Modal>
  );
};

export default Del;
