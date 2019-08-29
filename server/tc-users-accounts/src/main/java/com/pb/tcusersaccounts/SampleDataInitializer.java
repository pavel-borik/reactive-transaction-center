package com.pb.tcusersaccounts;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.IOException;
import java.util.concurrent.TimeUnit;

@Log4j2
@Component
class SampleDataInitializer implements ApplicationListener<ApplicationReadyEvent> {

    @Value("classpath:mongo/import.js")
    private Resource dataToImport;

    @Value("classpath:mongo/mongo.importer.bat")
    private Resource importer;

    @Value("${mongo.location}")
    private String mongoLoc;

    @Value("${mongo.import.sample.data}")
    private boolean isImporting;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        if (!isImporting) return;
        try {
            File importFile = dataToImport.getFile();
            File cmdImport = importer.getFile();
            ProcessBuilder pb = new ProcessBuilder(cmdImport.getAbsolutePath(), mongoLoc, importFile.getAbsolutePath())
                    .directory(new File(mongoLoc))
                    .redirectErrorStream(true);
            Process process = pb.start();
            BufferedInputStream bufferedInputStream = new BufferedInputStream(process.getInputStream());
            bufferedInputStream.transferTo(System.out);
            if (process.waitFor(10, TimeUnit.SECONDS)) {
                System.out.println("Import exit code: " + process.exitValue());
            }
        } catch (IOException | InterruptedException e) {
            log.error(e.getMessage());
            e.printStackTrace();
        }
    }
}
