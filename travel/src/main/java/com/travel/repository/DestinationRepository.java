package com.travel.repository;

import com.travel.model.Destination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Destination entity
 * Provides CRUD operations and custom query methods
 */
@Repository
public interface DestinationRepository extends JpaRepository<Destination, Long> {
    List<Destination> findAllByOrderByCreatedAtDesc();
}




