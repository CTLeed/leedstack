package com.app.controller;

import com.app.entity.ContactMessage;
import com.app.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ContactController {

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    @PostMapping("/contact")
    public ResponseEntity<?> submitContact(@RequestBody Map<String, String> body) {
        ContactMessage contact = new ContactMessage();
        contact.setName(body.get("name"));
        contact.setEmail(body.get("email"));
        contact.setMessage(body.get("message"));

        contactMessageRepository.save(contact);

        return ResponseEntity.ok(Map.of("success", true));
    }
}
