package com.example.orderservice.config;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManagerFactory;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.security.KeyStore;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.util.stream.Collectors;

@Configuration
public class MongoConfig extends AbstractMongoClientConfiguration {

    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;

    @Override
    protected String getDatabaseName() {
        return new ConnectionString(mongoUri).getDatabase();
    }

    @Override
    protected void configureClientSettings(MongoClientSettings.Builder builder) {
        try {
            // Read the combined CA bundle
            String caBundleContent = new BufferedReader(
                new InputStreamReader(new ClassPathResource("rds-combined-ca-bundle.pem").getInputStream()))
                .lines()
                .collect(Collectors.joining("\n"));

            // Split certificates
            String[] certificates = caBundleContent.split("-----END CERTIFICATE-----");
            
            // Create keystore and certificate factory
            KeyStore keyStore = KeyStore.getInstance(KeyStore.getDefaultType());
            keyStore.load(null);
            CertificateFactory certificateFactory = CertificateFactory.getInstance("X.509");

            // Add each certificate to the keystore
            for (int i = 0; i < certificates.length; i++) {
                String certContent = certificates[i] + "-----END CERTIFICATE-----";
                if (certContent.trim().length() > 0) {
                    X509Certificate cert = (X509Certificate) certificateFactory.generateCertificate(
                        new java.io.ByteArrayInputStream(certContent.getBytes())
                    );
                    keyStore.setCertificateEntry("AWS-certificate-" + i, cert);
                }
            }

            // Create SSL context
            TrustManagerFactory trustManagerFactory = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
            trustManagerFactory.init(keyStore);
            SSLContext sslContext = SSLContext.getInstance("TLS");
            sslContext.init(null, trustManagerFactory.getTrustManagers(), null);

            // Configure MongoDB client to use SSL
            builder.applyConnectionString(new ConnectionString(mongoUri))
                  .applyToSslSettings(ssl -> ssl.enabled(true).context(sslContext));

        } catch (Exception e) {
            throw new RuntimeException("Failed to configure MongoDB SSL context", e);
        }
    }
} 