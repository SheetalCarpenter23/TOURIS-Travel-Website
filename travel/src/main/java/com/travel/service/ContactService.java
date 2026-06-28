package com.travel.service;

import com.travel.model.ContactMessage;
import com.travel.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class for Contact operations
 * Handles business logic for contact form submissions
 */
@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    public ContactMessage saveContactMessage(ContactMessage contactMessage) {
        return contactRepository.save(contactMessage);
    }

    public List<ContactMessage> getAllContactMessages() {
        return contactRepository.findAllByOrderBySubmittedAtDesc();
    }

    public ContactMessage getContactMessageById(Long id) {
        return contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact message not found with id: " + id));
    }
}




