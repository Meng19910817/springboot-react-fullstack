// import request from "./request";
import axios from "axios";

export const getStudents = () =>
    axios({
        method: 'get',
        url: 'api/v1/students'
    });

export const addNewStudent = student => {
    return axios({
        method: 'post',
        url: 'api/v1/students',
        headers: {
            "Content-Type": "application/json",
        },
        data: JSON.stringify(student)
    });
}

export const deleteStudent = studentId => {
    return axios({
        method: "delete",
        url: `api/v1/students/${studentId}`
    })
}