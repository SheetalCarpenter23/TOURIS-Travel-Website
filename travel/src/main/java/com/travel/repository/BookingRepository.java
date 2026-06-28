package com.travel.repository;

import com.travel.model.Booking;
import com.travel.model.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId);
    List<Booking> findByDestinationId(Long destinationId);
    List<Booking> findByStatus(BookingStatus status);
    List<Booking> findByTravelDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    List<Booking> findByUserIdAndStatus(Long userId, BookingStatus status);
    List<Booking> findByUserIdAndTravelDateBetween(Long userId, LocalDateTime startDate, LocalDateTime endDate);
    long countByDestinationIdAndStatus(Long destinationId, BookingStatus status);
} 