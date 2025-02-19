import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, Form, Modal, FormGroup, FormControl,
} from 'react-bootstrap';
import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { setActiveChannel, updateChannel } from '../slices/channelsSlice.js';
import routes from '../routes.js';

const Update = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { setUpdateChannel, channelForAction } = props;
  const channels = useSelector((state) => state.channels);
  const inputEl = useRef(null);
  const [isError, setisError] = useState(false);
  const getArrayChannel = () => {
    const arrayChannel = channels.list.map((el) => el.name);
    return arrayChannel;
  };

  const schema = yup.object({
    name: yup.string()
      .required()
      .min(3)
      .max(20)
      .notOneOf(
        getArrayChannel(),
        t('validation.uniq'),
      ),
  });

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: channelForAction.name,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const editedChannel = { name: values.name };
      axios.patch(routes.editChannelsPath(channelForAction.id), editedChannel, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      }).then((response) => {
        dispatch(updateChannel(response.data));
        dispatch(setActiveChannel({ id: response.data.id, name: response.data.name }));
        setUpdateChannel(false);
        toast.success(t('channels.renamed'));
      })
        .catch(() => {
          formik.setSubmitting(false);
          toast.error(t('errors.network'));
        });
    },
  });

  const handleClose = () => setUpdateChannel(false);

  const checkVal = () => {
    if (formik.errors.name) {
      formik.setSubmitting(false);
      setisError(true);
    }
  };

  return (
    <Modal show>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>{t('channels.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl isInvalid={isError} onFocus={() => inputEl.current.select()} id="name" name="name" className="mb-2 form-control" ref={inputEl} onChange={formik.handleChange} value={formik.values.name} />
            <label className="visually-hidden" htmlFor="name">{t('channels.channelName')}</label>
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            <div className="invalid-feedback" />
          </FormGroup>
          <Modal.Footer>
            <Button onClick={handleClose} variant="secondary" disabled={formik.isSubmitting}>
              {t('modals.cancel')}
            </Button>
            <Button onClick={checkVal} variant="primary" type="submit">
              {t('modals.submit')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>

  );
};

export default Update;
