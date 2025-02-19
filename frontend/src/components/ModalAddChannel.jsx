import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  Modal, FormGroup, FormControl, Button, Form,
} from 'react-bootstrap';
import { setActiveChannel } from '../slices/channelsSlice.js';
import routes from '../routes.js';

const Add = (props) => {
  const { t } = useTranslation();
  const auth = useSelector((state) => state.auth);
  const { setAddChannel } = props;
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels);
  const inputEl = useRef(null);
  const getArrayChannel = () => {
    const arrayChannel = channels.list.map((el) => el.name);
    return arrayChannel;
  };

  const schema = yup.object({
    name: yup.string()
      .required(t('validation.required'))
      .min(3, t('validation.min'))
      .max(20, t('validation.max'))
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
      name: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const newChannel = { name: values.name };
      axios.post(routes.channelsPath(), newChannel, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      }).then((response) => {
        dispatch(setActiveChannel({ id: response.data.id, name: response.data.name }));
        setAddChannel(false);
        toast.success(t('channels.created'));
      })
        .catch(() => {
          formik.setSubmitting(false);
          toast.error(t('errors.network'));
        });
    },
  });

  const handleClose = () => setAddChannel(false);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>{t('channels.add')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl isInvalid={!!formik.errors.name} id="name" name="name" className="mb-2 form-control" ref={inputEl} onChange={formik.handleChange} value={formik.values.name} />
            <label className="visually-hidden" htmlFor="name">{t('channels.channelName')}</label>
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            <div className="invalid-feedback" />
          </FormGroup>
          <Modal.Footer>
            <Button onClick={handleClose} variant="secondary" disabled={formik.isSubmitting}>
              {t('modals.cancel')}
            </Button>
            <Button variant="primary" type="submit">
              {t('modals.submit')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>

  );
};

export default Add;
