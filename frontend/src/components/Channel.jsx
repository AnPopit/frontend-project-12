import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import filter from 'leo-profanity';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { PlusSquare } from 'react-bootstrap-icons';
import { setActiveChannel } from '../slices/channelsSlice.js';

const Channel = (props) => {
  const { t } = useTranslation();

  const {
    setAddChannel, setDelChannel, setUpdateChannel, setchannelForAction,
  } = props;
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels);
  const activeChannelId = channels.activeChannel.id;
  const setChannelFun = (id, name) => () => {
    const channel = { id, name };
    dispatch(setActiveChannel(channel));
  };

  const getClass = (id) => (id === activeChannelId ? 'w-100 rounded-0 text-start text-truncate btn btn-secondary' : 'w-100 rounded-0 text-start text-truncate btn');

  const handleAddChannel = () => {
    setAddChannel(true);
  };
  const handleDelModal = (obj) => () => {
    setchannelForAction(obj);
    setDelChannel(true);
  };
  const handleUpdateModal = (obj) => () => {
    setchannelForAction(obj);
    setUpdateChannel(true);
  };

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.channels')}</b>
        <button type="button" onClick={handleAddChannel} className="p-0 text-primary btn btn-group-vertical">
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.list.map((el) => {
          if (el.removable) {
            return (
              <li key={el.id} className="nav-item w-100">
                <div role="group" className="d-flex dropdown btn-group">
                  <button
                    onClick={setChannelFun(el.id, el.name)}
                    type="button"
                    className={getClass(el.id)}
                  >
                    <span className="me-1">#</span>
                    {filter.clean(el.name)}
                  </button>
                  <Dropdown as={ButtonGroup} className="d-flex">
                    <Dropdown.Toggle aria-expanded="false" variant={el.id === activeChannelId ? 'secondary' : null} split className="flex-grow-0">
                      <span className="visually-hidden">{t('channels.menu')}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={handleDelModal({ id: el.id, name: el.name })}>
                        {t('channels.remove')}
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleUpdateModal({ id: el.id, name: el.name })}>
                        {t('channels.rename')}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </li>
            );
          }
          return (
            <li className="nav-item w-100" key={el.id}>
              <button type="button" onClick={setChannelFun(el.id, el.name)} className={getClass(el.id)}>
                <span className="me-1">#</span>
                {filter.clean(el.name)}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Channel;
