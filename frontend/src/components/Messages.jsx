import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { animateScroll } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import axios from 'axios';

import filter from 'leo-profanity';
import { Form } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { setMessages } from '../slices/messagesSlice.js';
import routes from '../routes.js';

const Messages = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const inputEl = useRef(null);
  const divEl = useRef(null);

  useEffect(() => {
    try {
      const getMessages = async (token) => {
        const response = await axios.get(routes.messagesPath(), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        response.data.map((el) => dispatch(setMessages(el)));
      };
      getMessages(auth.token);
    } catch (e) {
      toast.error(t('errors.network'));
    }
  }, []);

  const messages = useSelector((state) => state.messages);
  const channels = useSelector((state) => state.channels);

  const { activeChannel } = channels;
  const { username } = auth;

  const formik = useFormik({
    initialValues: {
      messages: '',
    },
    onSubmit: (values) => {
      try {
        const newMessage = { body: values.messages, channelId: activeChannel.id, username };
        axios.post(routes.messagesPath(), newMessage, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }).then((response) => {
          dispatch(setMessages(response.data));
          formik.resetForm();
          inputEl.current.focus();
        });
      } catch (e) {
        toast.error(t('errors.network'));
      }
    },
  });

  const getArrayMessage = (idChannel) => {
    const res = [];
    Object.keys(messages)
      .map((el) => (messages[el].channelId === idChannel ? res.push(messages[el]) : null));
    return res;
  };
  useEffect(() => {
    inputEl.current.focus();
    animateScroll.scrollToBottom({
      containerId: 'messages-box',
    });
    divEl.current?.scrollIntoView();
  }, [activeChannel]);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {activeChannel.name}
            </b>
          </p>
          <span className="text-muted">
            {getArrayMessage(activeChannel.id).length}
            {' '}
            {t('chat.messageCount', { count: getArrayMessage(activeChannel.id).length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {getArrayMessage(activeChannel.id).map((el) => (
            <div key={el.id} className="text-break mb-2">
              <b>{el.username}</b>
              :
              {' '}
              {filter.clean(el.body)}
            </div>
          ))}

        </div>
        <div className="mt-auto px-5 py-3">
          <Form noValidate="" className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
            <Form.Group className="input-group has-validation">
              <Form.Control ref={inputEl} aria-label={t('chat.newMessage')} className="border-0 p-0 ps-2 form-control" id="messages" name="messages" value={formik.values.messages} onChange={formik.handleChange} placeholder={t('chat.inputMesage')} />
              <label className="visually-hidden" htmlFor="messages">{t('chat.newMessage')}</label>
              <button type="submit" disabled="" className="btn btn-group-vertical">
                <ArrowRightSquare fill="currentColor" size={20} />
              </button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
