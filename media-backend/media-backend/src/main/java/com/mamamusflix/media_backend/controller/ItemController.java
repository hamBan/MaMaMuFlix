package com.mamamusflix.media_backend.controller;

import com.mamamusflix.media_backend.model.Item;
import com.mamamusflix.media_backend.model.UpdateItemRequest;
import com.mamamusflix.media_backend.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    @PostMapping("/addItem")
    public ResponseEntity<String> addItem(@RequestBody Item item)
    {
        try {
            boolean exists = itemRepository.existsByTitleAndTag(item.getTitle(), item.getTag());

            if(exists)
                return ResponseEntity.status(400).body("Item already exists");

            String uid = UUID.randomUUID().toString();
            item.setUid(uid);

            itemRepository.save(item);
            return ResponseEntity.ok("Item added successfully");
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/getuItem")
    public ResponseEntity<?> getuItem(@RequestParam String uid)
    {
        try {
            Optional<Item> itemOptional = itemRepository.findById(uid);
            if (itemOptional.isEmpty())
                return ResponseEntity.status(400).body("Item not found");

            Item item = itemOptional.get();
            return ResponseEntity.ok(item);
        }

        catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/getItem")
    public ResponseEntity<?> getItem(@RequestParam String title)
    {
        try {
            List<Item> itemList = itemRepository.findByTitleContainingIgnoreCase(title);

            if (itemList.isEmpty())
                return ResponseEntity.status(400).body("No items found for title: " + title);

            else
                return ResponseEntity.ok(itemList);
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/updateItem")
    public ResponseEntity<String> updateItem(@RequestBody UpdateItemRequest updateItem)
    {
        try {
            Optional<Item> itemOptional = itemRepository.findById(updateItem.getUid());

            if (itemOptional.isEmpty())
                return ResponseEntity.status(400).body("Item not found");

            Item item = itemOptional.get();

            if (updateItem.getTitle() != null)
                item.setTitle(updateItem.getTitle());

            if (updateItem.getReleased() != null)
                item.setReleased(updateItem.getReleased());

            if (updateItem.getDuration() != null)
                item.setDuration(updateItem.getDuration());

            if(updateItem.getPoster() != null)
                item.setPoster(updateItem.getPoster());

            if (updateItem.getVideo() != null)
                item.setVideo(updateItem.getVideo());

            if (updateItem.getTag() != null)
                item.setTag(updateItem.getTag());

            if (updateItem.getGenre() != null)
                item.setGenre(updateItem.getGenre());

            itemRepository.save(item);
            return ResponseEntity.ok("Items updated successfully");
        }

        catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/deleteItem")
    public ResponseEntity<String> deleteItem(@RequestParam String uid)
    {
        try {
            Optional<Item> itemOptional = itemRepository.findById(uid);

            if (itemOptional.isEmpty())
                return ResponseEntity.status(400).body("Item not found");

            itemRepository.deleteById(uid);
            return ResponseEntity.ok("Item deleted successfully");
        }

        catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}
