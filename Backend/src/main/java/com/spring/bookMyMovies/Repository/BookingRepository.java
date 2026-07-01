package com.spring.bookMyMovies.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.bookMyMovies.Entity.Booking;

public interface BookingRepository extends  JpaRepository<Booking, Long>{

	List<Booking> findByUserId(Long userid);
	List<Booking> findByShowsId(Long showsid);

}
