package com.travel.model;

import javax.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

/**
 * Booking Entity
 * Represents a booking made by a user for a destination
 */
@Data
@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "destination_id", nullable = false)
    private Long destinationId;

    @Column(name = "booking_date", nullable = false)
    private LocalDateTime bookingDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookingStatus status;

    @PrePersist
    protected void onCreate() {
        bookingDate = LocalDateTime.now();
        if (status == null) {
            status = BookingStatus.CONFIRMED;
        }
    }
} 