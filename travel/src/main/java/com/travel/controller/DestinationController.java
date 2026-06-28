package com.travel.controller;

import com.travel.dto.DestinationRequest;
import com.travel.model.Destination;
import com.travel.service.DestinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Controller for Destination endpoints
 * Handles destination CRUD operations
 */
@RestController
@RequestMapping("/api/destinations")
@CrossOrigin(origins = "*")
public class DestinationController {

    @Autowired
    private DestinationService destinationService;

    /**
     * Get all destinations (public endpoint)
     * @return List of all destinations
     */
    @GetMapping
    public ResponseEntity<List<Destination>> getAllDestinations() {
        List<Destination> destinations = destinationService.getAllDestinations();
        return ResponseEntity.ok(destinations);
    }

    /**
     * Get destination by ID (public endpoint)
     * @param id Destination ID
     * @return Destination details
     */
    @GetMapping("/{id}")
    public ResponseEntity<Destination> getDestinationById(@PathVariable Long id) {
        return destinationService.getDestinationById(id)
                .map(destination -> ResponseEntity.ok(destination))
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Create a new destination (Admin only)
     * @param destinationRequest Destination creation request
     * @return Created destination
     */
    @PostMapping
    public ResponseEntity<?> createDestination(@Valid @RequestBody DestinationRequest destinationRequest) {
        try {
            Destination destination = new Destination();
            destination.setDestinationName(destinationRequest.getDestinationName());
            destination.setDescription(destinationRequest.getDescription());
            destination.setPrice(destinationRequest.getPrice());
            destination.setImageUrl(destinationRequest.getImageUrl());
            destination.setDuration(destinationRequest.getDuration());

            Destination createdDestination = destinationService.createDestination(destination);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdDestination);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error creating destination: " + e.getMessage());
        }
    }

    /**
     * Update destination (Admin only)
     * @param id Destination ID
     * @param destinationRequest Updated destination data
     * @return Updated destination
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateDestination(@PathVariable Long id,
                                                @Valid @RequestBody DestinationRequest destinationRequest) {
        try {
            Destination destination = new Destination();
            destination.setDestinationName(destinationRequest.getDestinationName());
            destination.setDescription(destinationRequest.getDescription());
            destination.setPrice(destinationRequest.getPrice());
            destination.setImageUrl(destinationRequest.getImageUrl());
            destination.setDuration(destinationRequest.getDuration());

            Destination updatedDestination = destinationService.updateDestination(id, destination);
            return ResponseEntity.ok(updatedDestination);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    /**
     * Delete destination (Admin only)
     * @param id Destination ID
     * @return Success message
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDestination(@PathVariable Long id) {
        try {
            destinationService.deleteDestination(id);
            return ResponseEntity.ok("Destination deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Error deleting destination: " + e.getMessage());
        }
    }
}




