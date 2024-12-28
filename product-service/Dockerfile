# Build stage
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM openjdk:17-jdk-slim
WORKDIR /app

# Download the Amazon DocumentDB certificate
RUN apt-get update && apt-get install -y wget \
    && wget https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem \
    && keytool -import -alias docdb -file global-bundle.pem -keystore documentdb-truststore.jks -storepass changeit -noprompt \
    && rm global-bundle.pem \
    && apt-get remove -y wget \
    && apt-get clean

COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080

ENV JAVA_OPTS="-Djavax.net.ssl.trustStore=/app/documentdb-truststore.jks -Djavax.net.ssl.trustStorePassword=changeit"

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"] 