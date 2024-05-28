import React, { useState } from 'react';
import {LoadingOutlined} from "@ant-design/icons";
import {Button, Col, Drawer, Form, Input, notification, Row, Select, Space, Spin} from 'antd';

import {addNewStudent} from "@/service/student_service";
const { Option } = Select;

function StudentDrawerForm({showDrawer, setShowDrawer, fetchStudents}) {
    const  onClose = () => setShowDrawer(false);
    const [submitting, setSubmitting] = useState(false);

    const onFinish = (student) => {
        setSubmitting(true);
        console.log(JSON.stringify(student, null, 2));

        addNewStudent(student).then(res => {
            console.log("student added");
            onClose();
            notification.success({
                message: "Student added successfully.",
                description: `${student.name} was added to the system.`
            })
            fetchStudents();
        }).catch(err => {
            console.log(err);
            notification.error({
                message : "Student added failed.",
                description: `${err.response.data.message}, and status code is [${err.response.data.status}]`
            });
        }).finally(()=>{
            setSubmitting(false);
        });
    }

    const onFinishFailed = (error) => {
        alert(JSON.stringify(error, null, 2));
    }
    return (
        <>
            {notification.useNotification().contextHolder}
            <Drawer
                title="Add a new student"
                width={720}
                onClose={onClose}
                open={showDrawer}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                    </Space>
                }

            >
                <Form layout="vertical" hideRequiredMark
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter user name',
                                    },
                                ]}
                            >
                                <Input placeholder="Please enter user name" />
                            </Form.Item>
                        </Col>

                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="gender"
                                label="Gender"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select your gender',
                                    },
                                ]}
                            >
                                <Select placeholder="Please select your gender">
                                    <Option value="Female">Female</Option>
                                    <Option value="Male">Male</Option>
                                    <Option value="Others">Others</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter email',
                                    },
                                ]}
                            >
                                <Input placeholder="Please enter email" />
                            </Form.Item>
                        </Col>

                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item>
                                <Button  type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Col>

                    </Row>
                    <Row>
                        {submitting && <Spin
                            indicator={
                                <LoadingOutlined
                                    style={{
                                        fontSize: 24,
                                    }}
                                    spin
                                />
                            }
                        />}
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};
export default StudentDrawerForm;