package com.example.productservice.config;

import com.example.productservice.model.Product;
import com.example.productservice.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(ProductRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.saveAll(Arrays.asList(
                    new Product(null, "iPhone 14 Pro", "Latest Apple iPhone with dynamic island", 999.99, 50,
                            "https://m.media-amazon.com/images/I/71ZDY57yTQL._AC_SL1500_.jpg",
                            "Smartphones", 4.8, 245),
                    new Product(null, "Google Pixel 7 Pro", "Advanced AI camera system with Tensor G2", 899.99, 35,
                            "https://m.media-amazon.com/images/I/71vFKBpKakL._AC_SL1500_.jpg",
                            "Smartphones", 4.7, 156),
                    new Product(null, "MacBook Pro 16\"", "Apple M2 Pro chip, 16GB RAM, 512GB SSD", 2499.99, 30,
                            "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spacegray-select-202301?wid=904&hei=840&fmt=jpeg",
                            "Laptops", 4.9, 189),
                    new Product(null, "Lenovo ThinkPad X1 Carbon", "14\" Ultra-light Business Laptop", 1799.99, 20,
                            "https://m.media-amazon.com/images/I/71krmFgx5pL._AC_SL1500_.jpg",
                            "Laptops", 4.6, 88),
                    new Product(null, "AirPods Pro", "Active noise cancellation earbuds", 249.99, 100,
                            "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=1144&hei=1144&fmt=jpeg",
                            "Audio", 4.7, 552),
                    new Product(null, "Bose QuietComfort 45", "Premium noise cancelling headphones", 329.99, 65,
                            "https://m.media-amazon.com/images/I/51JbsHSktkL._AC_SL1500_.jpg",
                            "Audio", 4.8, 523),
                    new Product(null, "iPad Air", "10.9-inch display, M1 chip", 599.99, 45,
                            "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-wifi-blue-202203?wid=940&hei=1112&fmt=png-alpha",
                            "Tablets", 4.8, 325),
                    new Product(null, "Apple Watch Series 8", "Always-on Retina display, health features", 399.99, 60,
                            "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MKUQ3_VW_34FR+watch-45-alum-midnight-nc-8s_VW_34FR_WF_CO?wid=1400&hei=1400",
                            "Wearables", 4.6, 427)
                ));
            }
        };
    }
} 