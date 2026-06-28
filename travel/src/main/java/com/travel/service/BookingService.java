package com.travel.service;

import com.travel.model.Booking;
import com.travel.model.BookingStatus;
import com.travel.model.Destination;
import com.travel.model.User;
import com.travel.repository.BookingRepository;
import com.travel.repository.DestinationRepository;
import com.travel.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service class for Booking operations
 * Handles business logic for booking management
 */
@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DestinationRepository destinationRepository;

    public Booking createBooking(Long userId, Long destinationId) {
        // Verify user exists
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // Verify destination exists
        Destination destination = destinationRepository.findById(destinationId)
                .orElseThrow(() -> new RuntimeException("Destination not found with id: " + destinationId));

        // Create booking
        Booking booking = new Booking();
        booking.setUserId(userId);
        booking.setDestinationId(destinationId);
        booking.setStatus(BookingStatus.CONFIRMED);

        return bookingRepository.save(booking);
    }

    public List<Booking> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
    }

    public void cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + bookingId));
        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
    }
}




