package com.example.orderservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Document(collection = "orders")
@AllArgsConstructor
@NoArgsConstructor
public class Order {
    @Id
    private String id;
    private String userId;
    private List<OrderItem> items;
    private Double totalAmount;
    private String status;
    private LocalDateTime createdAt;
    private String shippingAddress;
    private String trackingNumber;
    private String paymentMethod;
} 