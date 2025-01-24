FROM maven:3-amazoncorretto-17-alpine as package

# Fallback value for the API_PROFILE argument
ARG API_PROFILE="default"

# Set work directory to the project root directory
WORKDIR /workflow

# Install Maven dependencies locally
COPY pom.xml .
RUN mvn dependency:go-offline

# Build application into the JAR file
COPY src src
RUN mvn clean package -DskipTests

# Copy built JAR to achieve consistent filename
RUN cp target/*.jar workflow.jar

FROM package as dev

# Set necessary environment variables for debugging
ENV JAVA_TOOL_OPTIONS -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:8081

# Serve application for development
ENTRYPOINT ["java", "-Dspring.profiles.active=${API_PROFILE}", "-jar", "workflow.jar"]

FROM package as prod

# Serve application for production
ENTRYPOINT ["java", "-Dspring.profiles.active=${API_PROFILE}", "-jar", "workflow.jar"]
