import React from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { ArrowRightSquare } from 'react-bootstrap-icons';










const Messages = (props) => {
    const { messages } = props;
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        onSubmit: (values) => {
            //post запрос
        },
    });
    return (
        <div class="col p-0 h-100">
            <div class="d-flex flex-column h-100">
                <div class="bg-light mb-4 p-3 shadow-sm small"><
                    p class="m-0"><b># general</b></p><span class="text-muted">1 сообщение</span>
                </div>
                <div id="messages-box" class="chat-messages overflow-auto px-5 ">
                    <div class="text-break mb-2"><b>admin</b>: 1</div>
                </div>
                <div className="mt-auto px-5 py-3">
                    <Form noValidate="" className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
                        <Form.Group>
                            <Form.Control aria-label="Новое сообщение" className="border-0 p-0 ps-2 form-control" id="messages" name="messages" value={formik.values.messages} onChange={formik.handleChange} placeholder="Введите сообщение..." />
                            <Button type="submit" disabled="" className="btn btn-group-vertical">
                                <ArrowRightSquare size={20} />
                                <span class="visually-hidden">Отправить</span>
                            </Button>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </div>
    )


}

export default Messages;

