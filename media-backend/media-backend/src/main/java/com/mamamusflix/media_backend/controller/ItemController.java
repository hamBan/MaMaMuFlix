package com.mamamusflix.media_backend.controller;

import com.mamamusflix.media_backend.model.Item;
import com.mamamusflix.media_backend.model.UpdateItemRequest;
import com.mamamusflix.media_backend.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @PostMapping("/addItem")
    public ResponseEntity<String> addItem(@RequestBody Item item) {
        return itemService.addItem(item);
    }

    @GetMapping("/getuItem")
    public ResponseEntity<?> getuItem(@RequestParam String uid) {
        return itemService.getuItem(uid);
    }

    @GetMapping("/getItem")
    public ResponseEntity<?> getItem(@RequestParam String title) {
        return itemService.getItem(title);
    }

    @GetMapping("/getLoadingItems")
    public ResponseEntity<?> getLoadingItems() {
        return itemService.getLoadingItems();
    }

    @PostMapping("/updateItem")
    public ResponseEntity<String> updateItem(@RequestBody UpdateItemRequest updateItem) {
        return itemService.updateItem(updateItem);
    }

    @DeleteMapping("/deleteItem")
    public ResponseEntity<String> deleteItem(@RequestParam String uid) {
        return itemService.deleteItem(uid);
    }
}
