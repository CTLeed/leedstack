package com.app.controller;

import com.app.repository.UserRepository;
<% if (modules.contact) { -%>
import com.app.repository.ContactMessageRepository;
<% } -%>
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

<% if (modules.contact) { -%>
    @Autowired
    private ContactMessageRepository contactMessageRepository;

<% } -%>
    @GetMapping("/stats")
    @PreAuthorize("hasAuthority('SCOPE_admin')")
    public ResponseEntity<?> getStats() {
        long userCount = userRepository.count();
<% if (modules.contact) { -%>
        long contactCount = contactMessageRepository.count();

        return ResponseEntity.ok(Map.of(
            "users", userCount,
            "contacts", contactCount
        ));
<% } else { -%>
        return ResponseEntity.ok(Map.of("users", userCount));
<% } -%>
    }
}
