package com.travel.controller;

import com.travel.dto.BookingRequest;
import com.travel.dto.BookingResponse;
import com.travel.model.Booking;
import com.travel.model.Destination;
import com.travel.service.BookingService;
import com.travel.service.DestinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Controller for Booking endpoints
 * Handles booking operations
 */
@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private DestinationService destinationService;

    /**
     * Create a new booking
     * Requires user to be logged in (userId should be extracted from token in production)
     * @param userId User ID (temporary - should come from authentication token)
     * @param bookingRequest Booking request with destination ID
     * @return Created booking response
     */
    @PostMapping
    public ResponseEntity<?> createBooking(
            @RequestHeader(value = "userId", required = false) Long userId,
            @Valid @RequestBody BookingRequest bookingRequest) {
        
        // In production, extract userId from JWT token
        // For now, accept it as header or use a default
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("User must be logged in to make a booking");
        }

        try {
            Booking booking = bookingService.createBooking(userId, bookingRequest.getDestinationId());
            
            // Get destination details for response
            Destination destination = destinationService.getDestinationById(bookingRequest.getDestinationId())
                    .orElse(null);

            BookingResponse response = new BookingResponse();
            response.setBookingId(booking.getId());
            response.setUserId(booking.getUserId());
            response.setDestinationId(booking.getDestinationId());
            response.setDestinationName(destination != null ? destination.getDestinationName() : "Unknown");
            response.setBookingDate(booking.getBookingDate());
            response.setStatus(booking.getStatus().toString());

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    /**
     * Get all bookings for a user
     * @param userId User ID (temporary - should come from authentication token)
     * @return List of user's bookings
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookingResponse>> getUserBookings(@PathVariable Long userId) {
        List<Booking> bookings = bookingService.getBookingsByUserId(userId);
        
        List<BookingResponse> responses = bookings.stream().map(booking -> {
            BookingResponse response = new BookingResponse();
            response.setBookingId(booking.getId());
            response.setUserId(booking.getUserId());
            response.setDestinationId(booking.getDestinationId());
            response.setBookingDate(booking.getBookingDate());
            response.setStatus(booking.getStatus().toString());

            // Get destination name
            if (booking.getDestinationId() != null) {
                destinationService.getDestinationById(booking.getDestinationId())
                        .ifPresent(dest -> response.setDestinationName(dest.getDestinationName()));
            }

            return response;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(responses);
    }

    /**
     * Get all bookings (Admin only)
     * @return List of all bookings
     */
    @GetMapping
    public ResponseEntity<List<BookingResponse>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        
        List<BookingResponse> responses = bookings.stream().map(booking -> {
            BookingResponse response = new BookingResponse();
            response.setBookingId(booking.getId());
            response.setUserId(booking.getUserId());
            response.setDestinationId(booking.getDestinationId());
            response.setBookingDate(booking.getBookingDate());
            response.setStatus(booking.getStatus().toString());

            // Get destination name
            if (booking.getDestinationId() != null) {
                destinationService.getDestinationById(booking.getDestinationId())
                        .ifPresent(dest -> response.setDestinationName(dest.getDestinationName()));
            }

            return response;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(responses);
    }

    /**
     * Cancel a booking
     * @param bookingId Booking ID
     * @return Success message
     */
    @PutMapping("/{bookingId}/cancel")
    public ResponseEntity<?> cancelBooking(@PathVariable Long bookingId) {
        try {
            bookingService.cancelBooking(bookingId);
            return ResponseEntity.ok("Booking cancelled successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }
}




