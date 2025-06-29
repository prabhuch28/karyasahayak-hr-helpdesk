package com.phonefinder.repository;

import com.phonefinder.model.Phone;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhoneRepository extends MongoRepository<Phone, String> {
    
    List<Phone> findByBrandIgnoreCase(String brand);
    
    List<Phone> findByTypeIgnoreCase(String type);
    
    List<Phone> findByPriceBetween(Double minPrice, Double maxPrice);
    
    List<Phone> findByRatingGreaterThanEqual(Double rating);
    
    List<Phone> findByAvailability(String availability);
    
    @Query("{ 'name': { $regex: ?0, $options: 'i' } }")
    List<Phone> findByNameContainingIgnoreCase(String name);
    
    @Query("{ $and: [ " +
           "{ $or: [ { 'brand': { $regex: ?0, $options: 'i' } }, { ?0: { $exists: false } } ] }, " +
           "{ $or: [ { 'type': { $regex: ?1, $options: 'i' } }, { ?1: { $exists: false } } ] }, " +
           "{ $or: [ { 'price': { $gte: ?2, $lte: ?3 } }, { $and: [ { ?2: null }, { ?3: null } ] } ] }, " +
           "{ $or: [ { 'rating': { $gte: ?4 } }, { ?4: null } ] } " +
           "] }")
    List<Phone> findWithFilters(String brand, String type, Double minPrice, Double maxPrice, Double minRating);
}