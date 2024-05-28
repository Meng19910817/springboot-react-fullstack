
import './App.css';
import {deleteStudent, getStudents} from "./service/student_service";
import {useEffect, useState} from "react";

import {
    DesktopOutlined,
    FileOutlined, LoadingOutlined,
    PieChartOutlined, PlusOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {
    Breadcrumb,
    Layout,
    Menu,
    theme,
    Table,
    Spin,
    Button,
    Badge,
    Tag,
    Avatar,
    Popconfirm,
    Radio,
    notification,
} from 'antd';

import StudentDrawerForm from "./pages/student/StudentDrawerForm";

function App() {


    const [student, setStudent] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);
    const [api, contextHolder] = notification.useNotification();


    const fetchStudents = () => getStudents().then(res => {
        setStudent(res.data);
        setFetching(false);
    }).catch(err => {
        notification.error({
            message : "Fetching student failed.",
            description: `${err.response.data.message}, and status code is [${err.response.data.status}]`
        });
    });

    const renderStudent = () => {
      if(fetching) {
          return <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />;
      }

          return <>
              <StudentDrawerForm
                  showDrawer={showDrawer}
                  setShowDrawer={()=>setShowDrawer()}
                  fetchStudents={()=> fetchStudents()}
              >
              </StudentDrawerForm>

              <Table
                  dataSource={student}
                  columns={columns(fetchStudents)}
                  bordered
                  title={() =>
                      <>
                          <Tag>Number of Students: </Tag>
                          <Badge count={student.length} showZero className="site-badge-count-4"/>
                          <br/> <br/>
                          <Button
                              onClick={() => setShowDrawer(!showDrawer)}
                              type="primary"
                              shape={"round"}
                              icon={<PlusOutlined/>}
                              size={"small"}>Add New Student</Button>
                      </>

                  }
                  pagination={{ pageSize: 50 }}
                  scroll={{ y: 25000 }}

                  rowKey={student => student.id}
              />
          </>;

    }


      useEffect(() => {
        console.log("componentDidMount!");
        fetchStudents();
      }, []);


    return (
       <>
           {contextHolder}
           <Layout style={{ minHeight: '100vh', }}>
               <Layout.Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                   <div className="demo-logo-vertical" />
                   <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
               </Layout.Sider>
               <Layout>
                   <Layout.Header
                       style={{
                           padding: 0,
                           background: theme.useToken().colorBgContainer,
                       }}
                   />
                   <Layout.Content
                       style={{
                           margin: '0 16px',
                       }}
                   >
                       <Breadcrumb
                           style={{
                               margin: '16px 0',
                           }}
                       >
                           <Breadcrumb.Item>User</Breadcrumb.Item>
                           <Breadcrumb.Item>Bill</Breadcrumb.Item>
                       </Breadcrumb>
                       <div
                           style={{
                               padding: 24,
                               minHeight: 360,
                               background: theme.useToken().colorBgContainer,
                               borderRadius: theme.useToken().borderRadiusLG,
                           }}
                       >
                           {renderStudent()}
                       </div>
                   </Layout.Content>
                   <Layout.Footer
                       style={{
                           textAlign: 'center',
                       }}
                   >
                       By Mengyuscode ©{new Date().getFullYear()}
                   </Layout.Footer>
               </Layout>
           </Layout>
       </>
    )


}

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];
const TheAvatar = ({name}) => {
    let trim = name.trim();
    if(trim.length === 0) {
        return <Avatar icon={<UserOutlined/>}/>
    }
    const split = trim.split(" ");
    if(split.length === 1) {
        return <Avatar>{name.charAt(0)}</Avatar>
    }
    return <Avatar>{`${name.charAt(0)}  ${name.charAt(name.length-1)}`}</Avatar>
}

const removeStudent = (studentId, callback) => {
    deleteStudent(studentId).then(() => {
        notification.success({
            message: "Student deleted successfully.",
            description: `Student ${studentId} was deleted.`
        })
        callback();
    })
}

const columns = fetchStudents => [

    {
        title: '',
        dataIndex: 'avatar',
        key: 'avatar',
        render:(text, student) => <TheAvatar name={student.name}/>
    },
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render:(text, student) =>
            <>
                <Radio.Group>
                    <Popconfirm
                        placement="topRight"
                        title={`Are you sure to delete ${student.name}`}
                                onConfirm={() => removeStudent(student.id, fetchStudents)}
                                okText="Yes"
                                cancelText="No">
                        <Radio.Button value="small">Delete</Radio.Button>
                    </Popconfirm>
                    <Radio.Button value="small">Edit</Radio.Button>
                </Radio.Group>
            </>
    },
];
export default App;
