package com.travel.repository;

import com.travel.model.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for ContactMessage entity
 * Provides CRUD operations and custom query methods
 */
@Repository
public interface ContactRepository extends JpaRepository<ContactMessage, Long> {
    List<ContactMessage> findAllByOrderBySubmittedAtDesc();
}




