package com.coremedia.blueprint.bulkoperations.studio;

import com.coremedia.blueprint.bulkoperations.studio.bulk.BulkOperationsResource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BulkOperationsStudioConfiguration {

  @Bean
  BulkOperationsResource bulkOperationsResource() {
    return new BulkOperationsResource();
  }

}
