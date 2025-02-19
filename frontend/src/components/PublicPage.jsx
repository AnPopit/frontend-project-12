import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Channel from './Channel.jsx';
import Messages from './Messages.jsx';
import ModalAddChannel from './ModalAddChannel.jsx';
import ModalDelChannel from './ModalDelChannel.jsx';
import ModalUpdateChannel from './ModalUpdateChannel.jsx';
import routes from '../routes.js';
import { setChannel } from '../slices/channelsSlice.js';

const PublicPage = () => {
  const [isAddChannel, setAddChannel] = useState(false);
  const [isDelChannel, setDelChannel] = useState(false);
  const [isUpdateChannel, setUpdateChannel] = useState(false);
  const [channelForAction, setchannelForAction] = useState({});
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const getChannel = async (token) => {
      const response = await axios.get(routes.channelsPath(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setChannel(response.data));
    };
    try {
      getChannel(auth.token);
    } catch (e) {
      if (e.response.status === 401) {
        toast.error(t('errors.unknown'));
        return;
      }
      toast.error(t('errors.network'));
    }
  }, [isAddChannel]);

  return (
    <>

      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <Channel
            setAddChannel={setAddChannel}
            setDelChannel={setDelChannel}
            setUpdateChannel={setUpdateChannel}
            setchannelForAction={setchannelForAction}
          />
          <Messages />

        </div>
      </div>
      {isAddChannel ? <ModalAddChannel setAddChannel={setAddChannel} /> : null}
      {isDelChannel ? (
        <ModalDelChannel
          channelForAction={channelForAction}
          setDelChannel={setDelChannel}
        />
      ) : null}
      {isUpdateChannel ? (
        <ModalUpdateChannel
          channelForAction={channelForAction}
          setUpdateChannel={setUpdateChannel}
        />
      ) : null}
    </>
  );
};

export default PublicPage;
