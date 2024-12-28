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
COPY ./certs/documentdb-truststore.jks /app/documentdb-truststore.jks
ENV JAVA_OPTS="-Djavax.net.ssl.trustStore=/app/documentdb-truststore.jks -Djavax.net.ssl.trustStorePassword=changeit"
EXPOSE 8080
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"] 