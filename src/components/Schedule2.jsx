import React, { useState } from 'react';
import '../index.css';
import { Badge, Calendar, Button, Space, Modal, Form, Input, DatePicker, Select, Divider, TimePicker, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import moment from 'moment';
import axios from 'axios';

function Schedule2() {

    const [form] = Form.useForm();
    const [isPopup, setPopup] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const getListData = (value) => {
        let listData;
        switch (value.date()) {
            case 8:
                listData = [
                    {
                        type: 'warning',
                        content: 'This is warning event.',
                    }
                ];
                break;
            default:
        }
        return listData || [];
    };

    const getMonthData = (value) => {
        if (value.month() === 8) {
            return 1394;
        }
    };

    const insertLesson = () => {
        setPopup(true);
    };

    const popupHandleCancel = () => {
        form.resetFields(); // 데이터 초기화
        setPopup(false);
    }

    const monthCellRender = (value) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };
    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };

    const onFinish = (values) => {
        if (!values.fields) {
            messageApi.open({
                key: 'insertLessonValidation',
                type: 'warning',
                content: '시간을 입력해주세요.',
                duration: 1,
                style: {
                    marginTop: '20%',
                },
            });
            return;
        } else {
            // 시작, 종료시간 HH:mm 변환
            const formatFields = values['fields'];
            for (let i = 0; i < formatFields.length; i++) {
                values.fields[i].RangeTime[0] = formatFields[i].RangeTime[0].format('HH:mm');
                values.fields[i].RangeTime[1] = formatFields[i].RangeTime[1].format('HH:mm');
            }

            const dataList = {
                ...values,
                'startDate': moment(values.startDate).format("YYYY-MM-DD")
            };

            console.log('onFinish(values) of form : ', dataList);

            axios.post("http://localhost:8080/lesson/insertSchedule", {
                startDate: dataList.startDate,
                userName: dataList.userName,
                fields: dataList.fields
            }).then(function (response) {
                console.log('response : ', response);
                setPopup(false);
            }).catch(function (error) {
                console.log('response : ', error);
                setPopup(false);
            });
        }
    };

    return (
        <>
            <Space direction="vertical" >
                <Space>
                    <Button type="primary" onClick={insertLesson}>수강등록</Button>
                </Space>
            </Space>
            <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />

            <Modal title="수강등록" open={isPopup} footer={null} style={{ textAlign: 'center' }} onCancel={(popupHandleCancel)}>
                {contextHolder}
                <Form layout="vertical" form={form} autoComplete="off" onFinish={onFinish} >
                    <Form.Item label="이름" name="userName" rules={[{ required: true, message: '이름을 입력해주세요!' }]} >
                        <Input.Search />
                    </Form.Item>
                    <Form.Item label="시작일" name="startDate" rules={[{ required: true, message: '시작일을 선택해주세요!' }]} >
                        <DatePicker style={{ float: 'left', width: '100%' }} />
                    </Form.Item>
                    <Form.List name="fields">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field, index) => (
                                    <div key={field.key}>
                                        <Divider style={{ paddingTop: '10px', margin: '0px' }}>시간 {index + 1}
                                            {fields.length > 1 ? (
                                                <MinusCircleOutlined
                                                    style={{ paddingLeft: '5px' }}
                                                    onClick={() => remove(field.name)}
                                                />
                                            ) : null}
                                        </Divider>

                                        <Form.Item label="요일" name={[index, "yoil"]} rules={[{ required: true, message: '요일을 선택해주세요!' }]} >
                                            <Select>
                                                <Select.Option value="MON">월요일</Select.Option>
                                                <Select.Option value="TUE">화요일</Select.Option>
                                                <Select.Option value="WEN">수요일</Select.Option>
                                                <Select.Option value="THU">목요일</Select.Option>
                                                <Select.Option value="FRI">금요일</Select.Option>
                                                <Select.Option value="SAT">토요일</Select.Option>
                                                <Select.Option value="SUN">일요일</Select.Option>
                                            </Select>
                                        </Form.Item>

                                        <Form.Item label="시작시간/종료시간" name={[index, "RangeTime"]} rules={[{ required: true, message: '시작시간/종료시간을 선택해주세요!' }]}>
                                            <TimePicker.RangePicker format={'HH:mm'} minuteStep={10} style={{ width: '100%' }} />
                                        </Form.Item>

                                        <Form.Item label="추가인원" name={[index, "addUser"]} >
                                            <Input.Search />
                                        </Form.Item>
                                    </div>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Add field
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    <Form.Item style={{ marginBottom: '0px' }}>
                        <Button type="primary" htmlType="submit">
                            등록
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

        </>
    );
}
export default Schedule2;