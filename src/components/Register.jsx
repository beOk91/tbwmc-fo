import React, { useContext, useEffect, useRef, useState } from 'react';
import { DatePicker,TimePicker, Form, Table, Input,Popconfirm, Button, Select} from 'antd';
import moment from "moment";
import dayjs from 'dayjs';

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

const Register = ()=> {
    const [userName,setUserName] = useState('');
    const [registeredDt, setRegisteredDt]= useState('');

    const [dataSource, setDataSource] = useState([]);

    const onChange = (e)=>{
        const {value, name} = e.target;
        switch(name){
            case 'userName':
                setUserName(value);
                return;
        }
    };

    const onChangeDatePicker = (date, dateString) => {
        console.log(date, dateString);
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

  const handleAdd = () => {
    if(dataSource.length<7){
        const newData = {
        key: count,
        day:'mon',
        lessonTime: '00:01',
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

    return (
        <>
            <form>
                <div style={{margin: "10px 10px 10px 10px"}}>
                    <label htmlFor="email">이름</label>
                    <Input style={{width: "150px", marginLeft:"20px"}} placeholder="이름" onChange={onChange} value={userName} name="userName" required/>
                </div>
                <div>
                    <label htmlFor="email">등록일</label>
                    <DatePicker onChange={onChangeDatePicker} style={{marginLeft:"20px"}}/>
                </div>
                <div style={{margin: "10px 10px 10px 10px", display: "block", float:"right"}}>
                    <Button
                        onClick={handleAdd}
                        type="primary"
                        style={{
                        height:"30px", right:0, marginRight:0
                        }}>
                        추가
                    </Button>
                </div>
                <div>
                    <Table
                        components={components}
                        rowClassName={() => 'editable-row'}
                        bordered
                        dataSource={dataSource}
                        columns={columns}
                    />
                </div>
            </form>
        </>
    )
};

export default Register;