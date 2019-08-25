package com.pb.tctransactions.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class RulesToDeleteDto {
    List<String> ids;
}
