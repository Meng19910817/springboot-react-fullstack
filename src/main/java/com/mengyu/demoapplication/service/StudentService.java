package com.mengyu.demoapplication.service;

import com.mengyu.demoapplication.dao.StudentRepository;
import com.mengyu.demoapplication.exception.BadRequestException;
import com.mengyu.demoapplication.exception.StudentNotFoundException;
import com.mengyu.demoapplication.model.Student;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public void addStudent(Student student) throws BadRequestException {
        Boolean exists = studentRepository.selectExistEmail(student.getEmail());
        if(exists) {
            throw new BadRequestException("Email "+ student.getEmail() + " already exists");
        }
        studentRepository.save(student);
    }

    public void deleteStudent(Long studentId) {
        if(!studentRepository.existsById(studentId)) {
            throw new StudentNotFoundException("Student with id " + studentId + " does not exists");
        }
        studentRepository.deleteById(studentId);
    }
}
