package com.travel.dto;

import javax.validation.constraints.NotNull;

/**
 * DTO for Booking requests
 */
public class BookingRequest {
    @NotNull(message = "Destination ID is required")
    private Long destinationId;

    // Getters and Setters
    public Long getDestinationId() {
        return destinationId;
    }

    public void setDestinationId(Long destinationId) {
        this.destinationId = destinationId;
    }
}




