// import React, { useCallback, useEffect, useState } from 'react';
// import '../index.css';
// import { Badge, Calendar, Button, Space, Modal, Form, Input, DatePicker, Select, Divider, TimePicker, message, Radio } from 'antd';
// import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
// import dayjs from 'dayjs';
// import axios from 'axios';

// function Schedule2() {

//     const [form] = Form.useForm();
//     const [isPopup, setPopup] = useState(false);
//     const [messageApi, contextHolder] = message.useMessage();

//     const getListData = (value) => {
//         let listData;
//         const dayValue = dayjs(value).format('YYYYMMDD'); // dayjs 형변환 후 param 전달
//         axios.get('http://localhost:8080/lesson/getDayScheduleList', {
//             params: {
//                 dayValue: dayValue
//             }
//         }).then(function (response) {
//             if (response.data.length > 0) {
//                 for (let i = 0; i < response.data.length; i++) {
//                     console.log(response.data[i].startDate);
//                 }

//                 // listData = [
//                 //     {
//                 //         type: 'warning',
//                 //         content: 'This is warning event.',
//                 //       },
//                 // ]
//             }
//         }).catch(function (error) {
//             console.log('response exception : ', error);
//         });
//         //debugger;
//         //console.log(12345);
//         return listData || [];
//     };

//     const insertLesson = () => {
//         setPopup(true);
//     };

//     const popupHandleCancel = () => {
//         form.resetFields(); // 데이터 초기화
//         setPopup(false);
//     }

//     const dateCellRender = useCallback((value) => {
//         const listData = getListData(value);

//         console.log(12345);
//         return (
//             <ul className="events">
//                 {listData.map((item) => (
//                     <li key={item.content}>
//                         <Badge status={item.type} text={item.content} />
//                     </li>
//                 ))}
//             </ul>
//         );
//     }, [getListData]);

//     const onFinish = (values) => {
//         if (!values.fields) {
//             messageApi.open({
//                 key: 'insertLessonValidation',
//                 type: 'warning',
//                 content: '시간을 입력해주세요.',
//                 duration: 1,
//                 style: {
//                     marginTop: '20%',
//                 },
//             });
//             return;
//         } else {
//             // 시작, 종료시간 HH:mm 변환
//             const formatFields = values['fields'];
//             for (let i = 0; i < formatFields.length; i++) {
//                 values.fields[i].rangeTime[0] = formatFields[i].rangeTime[0].format('HH:mm');
//                 values.fields[i].rangeTime[1] = formatFields[i].rangeTime[1].format('HH:mm');
//             }

//             const dataList = {
//                 ...values,
//                 'startDate': dayjs(values.startDate).format('YYYY-MM-DD')
//             };

//             console.log('onFinish(values) of form : ', dataList);
//             axios.post("http://localhost:8080/lesson/insertSchedule", {
//                 //datas: JSON.stringify(dataList) -- JSON 객체를 param으로 할 경우
//                 userName: dataList.userName,
//                 startDate: dataList.startDate,
//                 cycle: dataList.cycle,
//                 fields: dataList.fields
//             }).then(function (response) {
//                 console.log('response success : ', response);
//                 form.resetFields();
//                 setPopup(false);
//             }).catch(function (error) {
//                 console.log('response exception : ', error);
//                 form.resetFields();
//                 setPopup(false);
//             });
//         }
//     };

//     return (
//         <>
//             <Space direction="vertical" >
//                 <Space>
//                     <Button type="primary" onClick={insertLesson}>수강등록</Button>
//                 </Space>
//             </Space>
//             <Calendar dateCellRender={dateCellRender} />

            

//         </>
//     );
// }
// export default React.memo(Schedule2);