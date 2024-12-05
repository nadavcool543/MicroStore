package com.example.authservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtService jwtService;

    @GetMapping("/success")
    public ResponseEntity<AuthResponse> success(@AuthenticationPrincipal OAuth2User principal) {
        String email = principal.getAttribute("email");
        String name = principal.getAttribute("name");
        String picture = principal.getAttribute("picture");

        String token = jwtService.generateToken(email);

        AuthResponse response = AuthResponse.builder()
            .token(token)
            .email(email)
            .name(name)
            .picture(picture)
            .build();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/failure")
    public ResponseEntity<String> failure() {
        return ResponseEntity.status(401).body("Authentication failed");
    }

    @GetMapping("/user")
    public ResponseEntity<UserInfo> getUserInfo(@AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            return ResponseEntity.status(401).build();
        }

        UserInfo userInfo = UserInfo.builder()
            .email(principal.getAttribute("email"))
            .name(principal.getAttribute("name"))
            .picture(principal.getAttribute("picture"))
            .build();

        return ResponseEntity.ok(userInfo);
    }
} 