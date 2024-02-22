package com.coremedia.blueprint.bulkoperations.studio;

import com.coremedia.blueprint.bulkoperations.studio.bulk.BulkOperationsResource;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.context.annotation.Bean;

@AutoConfiguration
public class BulkOperationsStudioConfiguration {

  @Bean
  public BulkOperationsResource bulkOperationsResource() {
    return new BulkOperationsResource();
  }

}
