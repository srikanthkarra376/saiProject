package com.collectifjadore.api.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "curriculumn_entry")
@Data
public class CurriculumEntry {

    @Id
    private String id;
    private String title;
    private String link;

    private EMediaType mediaType;
}
