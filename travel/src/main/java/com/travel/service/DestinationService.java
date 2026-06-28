package com.travel.service;

import com.travel.model.Destination;
import com.travel.repository.DestinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service class for Destination operations
 * Handles business logic for destination management
 */
@Service
public class DestinationService {

    @Autowired
    private DestinationRepository destinationRepository;

    public List<Destination> getAllDestinations() {
        return destinationRepository.findAllByOrderByCreatedAtDesc();
    }

    public Optional<Destination> getDestinationById(Long id) {
        return destinationRepository.findById(id);
    }

    public Destination createDestination(Destination destination) {
        return destinationRepository.save(destination);
    }

    public Destination updateDestination(Long id, Destination destinationDetails) {
        Destination destination = destinationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Destination not found with id: " + id));
        
        destination.setDestinationName(destinationDetails.getDestinationName());
        destination.setDescription(destinationDetails.getDescription());
        destination.setPrice(destinationDetails.getPrice());
        destination.setImageUrl(destinationDetails.getImageUrl());
        destination.setDuration(destinationDetails.getDuration());
        
        return destinationRepository.save(destination);
    }

    public void deleteDestination(Long id) {
        destinationRepository.deleteById(id);
    }
}




