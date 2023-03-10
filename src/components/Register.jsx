import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DatePicker,TimePicker, Form, Table, Input,Popconfirm, Button, Select, Radio} from 'antd';
import moment from "moment";
import dayjs from 'dayjs';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const format = 'HH:mm';
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);



  const toggleEdit = () => {
    console.log('toggleEdit!!');
    console.log(record);
    setEditing(!editing);
    form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    console.log('toggleEdit end');
    
  };

  
  const save = async () => {
    console.log('save!!');
    try {
      const values = await form.validateFields();
      console.log(values);
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  
  const timeChange = (value, timeString) =>{
    console.log('time change');
    console.log(value);
    console.log(timeString);
  }

  let childNode = children;
 
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        {dataIndex === 'day' ? <Select ref={inputRef} onBlur={save} style={{ width: 120}} onChange={handleChange} options={OPTIONS_DAY} /> : 
         <Input ref={inputRef} onPressEnter={save} onBlur={save} />  }
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const OPTIONS_DAY = [
	{ value: "mon", name: "???" },
	{ value: "tue", name: "???" },
	{ value: "wed", name: "???" },
    { value: "thu", name: "???" },
    { value: "fri", name: "???" },
    { value: "sat", name: "???" },
    { value: "sun", name: "???" },
];

const reducer = (state,action)=>{
    switch (action.type) {
      case SIGN_UP_REQUEST:
        break;
        default:
            return;
    }
};

const Register = ({handleCancel, saveMember})=> {
    const [userName,setUserName] = useState('');
    const [registeredDt, setRegisteredDt]= useState('');
    const [email,setEmail] = useState('');
    const [monthOfRegistration,setMonthOfRegistration] = useState("1");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
      if (phoneNumber.length === 10) {
        setPhoneNumber(phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
      }
      if (phoneNumber.length === 13) {
        setPhoneNumber(phoneNumber.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
      }
    }, [phoneNumber]);

    const dispatch = useDispatch();

    const onChange = (e)=>{
        const {value, name} = e.target;
        switch(name){
            case 'userName':
                setUserName(value);
                return;
            case 'email':
                setEmail(value);
                return;
            case 'monthOfRegistration':
                setMonthOfRegistration(value);
                return;
            case 'phoneNumber':
                const regex = /^[0-9\b -]{0,13}$/;
                if (regex.test(e.target.value)) {
                  setPhoneNumber(value);
                }
                return;

        }
    };

    const onChangeDatePicker = (date, dateString) => {
        console.log(date, dateString);
        setRegisteredDt(dayjs(dateString,'YYYY-MM-DD'));
    };

const [count, setCount] = useState(1);
const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns = [
    {
      title: '',
      dataIndex: 'key',
      width: '10%',
    },
    {
      title: '??????',
      dataIndex: 'day',
      witdh:'10%',
      editable: true,
      
    },
    {
      title: '????????????',
      dataIndex: 'lessonTime',
      witdh:'20%',
      editable: true,
    },
    {
      title: '??????',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const options = ['1','2','3'];

  const handleAdd = () => {
    if(dataSource.length<7){
        const newData = {
        key: count,
        day:'mon',
        lessonTime: '00:00',
        };
        console.log(dataSource);
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    }
  };

  const handleSave = (row) => {
    console.log('handle save!');
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    console.log(newData);
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });


  const onSubmitForm = ()=>{
    console.log(userName, registeredDt.format('YYYY-MM-DD'), email, monthOfRegistration, dataSource,phoneNumber);
    console.log(phoneNumber.replace('-',''));
    const memberDto = new FormData();
    memberDto.append('memberName', userName);
    memberDto.append('registeredDt', registeredDt.format('YYYY-MM-DD'));
    memberDto.append('email', email);
    memberDto.append('phoneNumber',phoneNumber.replaceAll('-',''));
    memberDto.append('monthOfRegistration', monthOfRegistration);
    memberDto.append('lessonStartDate',registeredDt.format('YYYYMMDD'));
    for(var i=0;i<dataSource.length;i++){
      memberDto.append('dataSource['+i+'].lessonDay',dataSource[i].day);
      memberDto.append('dataSource['+i+'].lessonTime',dataSource[i].lessonTime.replaceAll(':',''));
      memberDto.append('dataSource['+i+'].lessonStartDate',registeredDt.format('YYYYMMDD'));
      memberDto.append('dataSource['+i+'].monthOfRegistration',monthOfRegistration);
    }
    console.log('memberDto!');
   console.log(...memberDto);
    saveMember(memberDto);
    handleCancel();
  };

    return (
        <>
            <Form onFinish={onSubmitForm}>
                <div style={{margin: "10px 10px 10px 10px"}}>
                    <Form.Item label="??????">
                        <Input style={{width: "150px"}} placeholder="??????" onChange={onChange} value={userName} name="userName" required/>
                    </Form.Item>
                </div>
                <div>
                    <Form.Item label="?????????">
                        <DatePicker onChange={onChangeDatePicker} value={registeredDt} required/>
                    </Form.Item>
                </div>
                <div>
                    <Form.Item label="???????????????">
                        <Input onChange={onChange} value={phoneNumber} name="phoneNumber"/>
                    </Form.Item>
                </div>
                <div>
                    <Form.Item label="?????????">
                        <Input style={{width: "250px"}} onChange={onChange} value={email} name="email" placeholder='cj@cj.net' />
                    </Form.Item>
                </div>
                <div style={{display: "block", float:"right", height:"40px"}}>
                    <Form.Item style={{marginDown:"0px"}}>
                        <Button
                            onClick={handleAdd}
                            type="primary"
                            style={{
                            height:"30px", right:0, marginRight:0
                            }}>
                            ??????
                        </Button>
                    </Form.Item>
                </div>
                <Form.Item label="?????????">
                    <Radio.Group options={options} onChange={onChange} value={monthOfRegistration} name="monthOfRegistration" defaultValue={"1"}/>
                </Form.Item>
                <div>
                    <Table
                        components={components}
                        rowClassName={() => 'editable-row'}
                        bordered
                        dataSource={dataSource}
                        columns={columns}
                    />
                </div>
                <div style={{height:'30px'}}>
                    <Button type="primary" htmlType="submit" style={{margin: "10px 10px 10px 10px",float:"right"}}>??????</Button>
                </div>
            </Form>
        </>
    )
};

export default Register;