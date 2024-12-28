# Build stage
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
COPY src/main/resources/truststore.jks /app/truststore.jks
EXPOSE 8080
ENTRYPOINT ["java", \
            "-Djavax.net.ssl.trustStore=/app/truststore.jks", \
            "-Djavax.net.ssl.trustStorePassword=changeit", \
            "-jar", "app.jar"] 