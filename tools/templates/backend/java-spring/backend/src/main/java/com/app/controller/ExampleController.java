package com.app.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
public class ExampleController {

    @GetMapping("/api/example")
    public Map<String, Object> example() {
        return Map.of(
            "message", "Hello from java-spring backend!",
            "timestamp", Instant.now().toString()
        );
    }
}
