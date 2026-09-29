package com.codeclassic.common.health;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/health")
public class HealthController {
    private final String applicationVersion;

    public HealthController(@Value("${info.app.version:0.0.1-SNAPSHOT}") String applicationVersion) {
        this.applicationVersion = applicationVersion;
    }

    @GetMapping
    public HealthResponse health() {
        return new HealthResponse("UP", "codeclassic-backend", applicationVersion);
    }
}
