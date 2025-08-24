package com.mamamusflix.media_backend.repository;
import com.mamamusflix.media_backend.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, String>{
    // Spring Data JPA will automatically implement basic CRUD methods
    List<Item> findByTitleContainingIgnoreCase(String title);
    boolean existsByTitleAndTag(String title, Item.Tag tag);

    @Query("SELECT new com.mamamusflix.media_backend.model.ItemDTO(i.uid, i.title, i.poster, i.tag) FROM Item i ORDER BY i.dateadded DESC")
    List<?> getLoadingData();

}
