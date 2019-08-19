package com.pb.tctransactions.configuration;

import com.pb.tctransactions.dto.RuleDto;
import com.pb.tctransactions.model.rules.Rule;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfiguration {

    @Bean
    public ModelMapper getModelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.typeMap(RuleDto.class, Rule.class)
                .addMappings(configurableConditionExpression -> configurableConditionExpression.skip(Rule::setId));
        return modelMapper;
    }
}
