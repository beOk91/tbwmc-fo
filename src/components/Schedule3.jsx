import React, { useState, useEffect } from 'react';
import '../index.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Button, Modal, Form, Input, DatePicker, Select, Divider, TimePicker, message, Radio } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';
import axios from 'axios';

function Schedule3() {

    const [form] = Form.useForm();
    const [isPopup, setPopup] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [totalData, setTotalData] = useState([]);

    // 최초 진입 시 useEffect 실행
    useEffect(() => {
        eventHandler();
    }, []);

    const insertLesson = () => {
        setPopup(true);
    };

    const popupHandleCancel = () => {
        form.resetFields(); // 데이터 초기화
        setPopup(false);
    }

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
                values.fields[i].rangeTime[0] = formatFields[i].rangeTime[0].format('HH:mm');
                values.fields[i].rangeTime[1] = formatFields[i].rangeTime[1].format('HH:mm');
            }

            const dataList = {
                ...values,
                'startDate': dayjs(values.startDate).format('YYYY-MM-DD')
            };

            console.log('onFinish(values) of form : ', dataList);
            axios.post("http://localhost:8080/lesson/insertSchedule", {
                //datas: JSON.stringify(dataList) -- JSON 객체를 param으로 할 경우
                userName: dataList.userName,
                startDate: dataList.startDate,
                cycle: dataList.cycle,
                fields: dataList.fields
            }).then(function (response) {
                console.log('response success : ', response);
                form.resetFields();
                setPopup(false);
                eventHandler(); // 일정 등록 후 RestAPI 호출
            }).catch(function (error) {
                console.log('response exception : ', error);
                form.resetFields();
                setPopup(false);
            });
        }
    };

    const eventHandler = () => {
        axios.get('http://localhost:8080/lesson/getDayScheduleList')
            .then(function (response) {
                if (response.data.length > 0) {
                    for (let i = 0; i < response.data.length; i++) {
                        const data = {
                            id: response.data[i].lessonDetailSeq,
                            title: response.data[i].name,
                            start: response.data[i].lessonDate + ' ' + response.data[i].startTime,
                            end: response.data[i].lessonDate + ' ' + response.data[i].endTime
                        }
                        setTotalData(totalData => [...totalData, data]);
                    }
                    console.log('response totalData : ', response.data);
                }
            }).catch(function (error) {
                console.log('response exception : ', error);
            });
    };

    return (
        <>
            <div style={{ marginLeft: "auto", height: "30px", marginRight: "15px", margin: "10px 50px 10px 50px" }}>
                <Button size='middle' style={{ position: 'absolute', right: "50px", marginRight: "15px", width: "110px", backgroundColor: '#151515', color: 'white' }} onClick={insertLesson}>
                    수강등록
                </Button>
            </div>
            <div>
                <FullCalendar
                    initialView='dayGridMonth'
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek'

                    }}
                    plugins={[dayGridPlugin, timeGridPlugin]}
                    events={totalData}
                    eventTimeFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        hourCycle: 'h23'
                    }}
                />
            </div>
            <Modal title="수강등록" open={isPopup} footer={null} style={{ textAlign: 'center' }} onCancel={(popupHandleCancel)}>
                {contextHolder}
                <Form layout="vertical" form={form} autoComplete="off" onFinish={onFinish} initialValues={{
                    cycle: '1',
                }}>
                    <Form.Item label="이름" name="userName" rules={[{ required: true, message: '이름을 입력해주세요!' }]} >
                        <Input.Search />
                    </Form.Item>
                    <Form.Item label="시작일" name="startDate" rules={[{ required: true, message: '시작일을 선택해주세요!' }]} >
                        <DatePicker style={{ float: 'left', width: '100%' }} />
                    </Form.Item>
                    <Form.Item label="반복주기" name="cycle" rules={[{ required: true, message: '주기를 선택해주세요!' }]} >
                        <Radio.Group>
                            <Radio value='1'>1 Month</Radio>
                            <Radio value='2'>2 Month</Radio>
                            <Radio value='3'>3 Month</Radio>
                        </Radio.Group>
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

                                        <Form.Item label="시작시간/종료시간" name={[index, "rangeTime"]} rules={[{ required: true, message: '시작시간/종료시간을 선택해주세요!' }]}>
                                            <TimePicker.RangePicker format={'HH:mm'} minuteStep={10} style={{ width: '100%' }} />
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
export default React.memo(Schedule3);