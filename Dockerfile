FROM maven:3-eclipse-temurin-17 as package

# Fallback value for the API_PROFILE environment variable
ENV API_PROFILE="default"

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

FROM package as layer

# Extract JAR to access project files
RUN jar xf workflow.jar

# Analyze project dependencies
RUN jdeps \
    --multi-release 17 \
    --class-path 'BOOT-INF/lib/*' \
    --recursive \
    --print-module-deps \
    --ignore-missing-deps \
    -quiet \
    workflow.jar > deps.info

# Build custom JRE based on used dependencies
RUN jlink \
    --add-modules $(cat deps.info) \
    --add-modules jdk.crypto.ec \
    --compress 2 \
    --strip-debug \
    --no-header-files \
    --no-man-pages \
    --output /jre

# Extract JAR to layers
RUN java -Djarmode=layertools -jar workflow.jar extract --destination layers

FROM debian:bookworm-slim as prod

# Fallback value for the API_PROFILE environment variable
ENV API_PROFILE="default"

# Set work directory to the project root directory
WORKDIR /workflow

# Setup custom JRE
ENV JAVA_HOME /user/java/jre
ENV PATH $JAVA_HOME/bin:$PATH
COPY --from=layer /jre $JAVA_HOME

# Copy layers from extracted JAR
COPY --from=layer /workflow/layers/dependencies .
COPY --from=layer /workflow/layers/spring-boot-loader .
COPY --from=layer /workflow/layers/snapshot-dependencies .
COPY --from=layer /workflow/layers/application .

# Serve application for production
ENTRYPOINT ["java", "-Dspring.profiles.active=${API_PROFILE}", "org.springframework.boot.loader.launch.JarLauncher"]
