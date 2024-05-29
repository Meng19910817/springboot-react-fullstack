package com.mengyu.demoapplication.dao;

import com.mengyu.demoapplication.model.Gender;
import com.mengyu.demoapplication.model.Student;
import static org.assertj.core.api.Assertions.*;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
class StudentRepositoryTest {

    @Autowired
    StudentRepository underTest;

    @AfterEach
    void tearDown(){
        underTest.deleteAll();
    }

    @Test
    void selectExistEmail() {
        //given
        String email = "Jame@gmail.com";
        Student student = new Student("Jame", email, Gender.Male);
        underTest.save(student);
        //when
        boolean result = underTest.selectExistEmail(email);

        //then
        assertThat(result).isTrue();
    }

    @Test
    void selectNotExistEmail() {
        //given
        String email = "Jame@gmail.com";

        //when
        boolean result = underTest.selectExistEmail(email);

        //then
        assertThat(result).isFalse();
    }
}