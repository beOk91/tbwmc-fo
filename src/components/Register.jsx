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
    if(dataIndex === 'lessonTime'){
        console.log(record[dataIndex]);
        form.setFieldsValue({
            [dataIndex]: dayjs(record[dataIndex],format),
          });
    }else{
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
          });
    }
    
  };

  
  const save = async () => {
    console.log('save!!');
    try {
      const values = await form.validateFields();
      console.log(values);
      values.lessonTime = moment.format({format});
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
  
  const timeChange = (value) =>{
    console.log(value);
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
        {dataIndex === 'lessonTime' ?  <TimePicker ref={inputRef} onChange={timeChange} onBlur={save} format={format} /> : 
         dataIndex === 'day' ? <Select ref={inputRef} onBlur={save} style={{ width: 120}} onChange={handleChange} options={OPTIONS} /> : 
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

const OPTIONS = [
	{ value: "mon", name: "월" },
	{ value: "tue", name: "화" },
	{ value: "wed", name: "수" },
    { value: "thu", name: "목" },
    { value: "fri", name: "금" },
    { value: "sat", name: "토" },
    { value: "sun", name: "일" },
];

const reducer = (state,action)=>{
    switch (action.type) {
      case SIGN_UP_REQUEST:
        break;
        default:
            return;
    }
};

const Register = ({handleCancel})=> {
    const [userName,setUserName] = useState('');
    const [registeredDt, setRegisteredDt]= useState('');
    const [email,setEmail] = useState('');
    const [monthOfRegistration,setMonthOfRegistration] = useState("1");
    const [dataSource, setDataSource] = useState([]);

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
      title: '요일',
      dataIndex: 'day',
      witdh:'10%',
      editable: true,
      
    },
    {
      title: '시작시간',
      dataIndex: 'lessonTime',
      witdh:'20%',
      editable: true,
    },
    {
      title: '삭제',
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
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    }
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
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
    console.log(userName, registeredDt.format('YYYY-MM-DD'), email, dataSource);
    
    handleCancel();
  }

    return (
        <>
            <Form onFinish={onSubmitForm}>
                <div style={{margin: "10px 10px 10px 10px"}}>
                    <Form.Item label="이름">
                        <Input style={{width: "150px"}} placeholder="이름" onChange={onChange} value={userName} name="userName" required/>
                    </Form.Item>
                </div>
                <div>
                    <Form.Item label="등록일">
                        <DatePicker onChange={onChangeDatePicker} value={registeredDt} required/>
                    </Form.Item>
                </div>
                <div>
                    <Form.Item label="이메일">
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
                            추가
                        </Button>
                    </Form.Item>
                </div>
                <Form.Item label="개월수">
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
                    <Button type="primary" htmlType="submit" style={{margin: "10px 10px 10px 10px",float:"right"}}>등록</Button>
                </div>
            </Form>
        </>
    )
};

export default Register;