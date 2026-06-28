package com.travel.controller;

import com.travel.dto.ContactRequest;
import com.travel.model.ContactMessage;
import com.travel.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * Controller for Contact endpoints
 * Handles contact form submissions
 */
@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private ContactService contactService;

    /**
     * Submit a contact form message (public endpoint)
     * @param contactRequest Contact form data
     * @return Success message
     */
    @PostMapping
    public ResponseEntity<?> submitContactMessage(@Valid @RequestBody ContactRequest contactRequest) {
        try {
            ContactMessage contactMessage = new ContactMessage();
            contactMessage.setName(contactRequest.getName());
            contactMessage.setEmail(contactRequest.getEmail());
            contactMessage.setMessage(contactRequest.getMessage());

            ContactMessage savedMessage = contactService.saveContactMessage(contactMessage);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Thank you for your message! We will get back to you soon.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error submitting message: " + e.getMessage());
        }
    }

    /**
     * Get all contact messages (Admin only)
     * @return List of all contact messages
     */
    @GetMapping
    public ResponseEntity<List<ContactMessage>> getAllContactMessages() {
        List<ContactMessage> messages = contactService.getAllContactMessages();
        return ResponseEntity.ok(messages);
    }

    /**
     * Get contact message by ID (Admin only)
     * @param id Message ID
     * @return Contact message details
     */
    @GetMapping("/{id}")
    public ResponseEntity<ContactMessage> getContactMessageById(@PathVariable Long id) {
        try {
            ContactMessage message = contactService.getContactMessageById(id);
            return ResponseEntity.ok(message);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}




