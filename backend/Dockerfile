FROM maven:3.9.6-eclipse-temurin-22 AS build
WORKDIR /app
COPY . .
RUN mvn -f backend/pom.xml clean package -DskipTests

FROM eclipse-temurin:22-jre-alpine
WORKDIR /app
COPY --from=build /app/backend/target/pujroute-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]