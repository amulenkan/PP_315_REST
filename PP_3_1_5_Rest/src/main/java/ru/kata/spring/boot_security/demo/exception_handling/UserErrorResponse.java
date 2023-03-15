package ru.kata.spring.boot_security.demo.exception_handling;

public class UserErrorResponse {

    private String info;

    private Long timestamp;

    public UserErrorResponse() {
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }
}
