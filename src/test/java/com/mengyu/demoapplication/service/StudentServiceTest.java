package com.mengyu.demoapplication.service;

import com.mengyu.demoapplication.dao.StudentRepository;
import com.mengyu.demoapplication.exception.BadRequestException;
import com.mengyu.demoapplication.exception.StudentNotFoundException;
import com.mengyu.demoapplication.model.Gender;
import com.mengyu.demoapplication.model.Student;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class StudentServiceTest {

    @Mock
    private StudentRepository studentRepository;
//    private AutoCloseable autoCloseable;
    private StudentService underTest;

    @BeforeEach
    void setUp() {
//        autoCloseable = MockitoAnnotations.openMocks(this);
        underTest = new StudentService(studentRepository);
    }

//    @AfterEach
//    void tearDown() throws Exception {
//        autoCloseable.close();
//    }

    @Test
    void getAllStudents() {
        underTest.getAllStudents();
        verify(studentRepository).findAll();
    }

    @Test
    void addStudent() {
        //given
        Student student = new Student("Jame", "Jame@gmail.com", Gender.Male);
        //when
        underTest.addStudent(student);
        //then
        ArgumentCaptor<Student> studentArgumentCaptor = ArgumentCaptor.forClass(Student.class);
        verify(studentRepository).save(studentArgumentCaptor.capture());
        Student captoredStudent = studentArgumentCaptor.getValue();
        assertThat(captoredStudent).isEqualTo(student);
    }

    @Test
    void throwExceptionAddStudent() {
        //given
        Student student = new Student("Jame", "Jame@gmail.com", Gender.Male);

        //mock this method will return true
        given(studentRepository.selectExistEmail(anyString()))
                .willReturn(true);
        //then
        assertThatThrownBy(() -> underTest.addStudent(student))
            .isInstanceOf(BadRequestException.class)
                .hasMessageContaining("Email "+ student.getEmail() + " already exists");
        //after throwing exception, the next line would not be executed
        verify(studentRepository, never()).save(any());
    }

    @Test
    void deleteStudent() {
        Long studentId = 1L;
        given(studentRepository.existsById(anyLong())).willReturn(true);
        underTest.deleteStudent(studentId);
        verify(studentRepository).deleteById(studentId);
    }

    @Test
    void throwExceptionDeleteStudent() {
        Long studentId = 1L;
        assertThatThrownBy(() -> underTest.deleteStudent(studentId))
                .isInstanceOf(StudentNotFoundException.class)
                .hasMessageContaining("Student with id " + studentId + " does not exists");
        verify(studentRepository, never()).deleteById(any());
    }
}