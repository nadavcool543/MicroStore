package com.example.orderservice.config;

import com.example.orderservice.model.Order;
import com.example.orderservice.model.OrderItem;
import com.example.orderservice.repository.OrderRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Configuration
public class OrderSeeder {

    @Bean
    CommandLineRunner initDatabase(OrderRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                // Sample order items
                OrderItem iphone = new OrderItem("1", "iPhone 14 Pro", 1, 999.99);
                OrderItem airpods = new OrderItem("5", "AirPods Pro", 1, 249.99);
                OrderItem macbook = new OrderItem("3", "MacBook Pro 16\"", 1, 2499.99);
                OrderItem pixel = new OrderItem("2", "Google Pixel 7 Pro", 1, 899.99);
                OrderItem bose = new OrderItem("6", "Bose QuietComfort 45", 1, 329.99);

                repository.saveAll(Arrays.asList(
                    new Order(
                        null,
                        "user123",
                        List.of(iphone, airpods),
                        1249.98,
                        "DELIVERED",
                        LocalDateTime.now().minusDays(30),
                        "123 Main St, City, Country",
                        "TN123456789",
                        "Credit Card"
                    ),
                    new Order(
                        null,
                        "user123",
                        List.of(macbook),
                        2499.99,
                        "SHIPPED",
                        LocalDateTime.now().minusDays(7),
                        "123 Main St, City, Country",
                        "TN987654321",
                        "PayPal"
                    ),
                    new Order(
                        null,
                        "user123",
                        List.of(pixel, bose),
                        1229.98,
                        "PROCESSING",
                        LocalDateTime.now().minusDays(2),
                        "123 Main St, City, Country",
                        null,
                        "Credit Card"
                    ),
                    new Order(
                        null,
                        "user123",
                        List.of(airpods),
                        249.99,
                        "PENDING",
                        LocalDateTime.now().minusHours(4),
                        "123 Main St, City, Country",
                        null,
                        "Credit Card"
                    )
                ));
            }
        };
    }
} 