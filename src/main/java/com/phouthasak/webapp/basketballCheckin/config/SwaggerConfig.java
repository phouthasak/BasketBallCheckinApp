//package com.phouthasak.webapp.basketballCheckin.config;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import springfox.documentation.builders.ApiInfoBuilder;
//import springfox.documentation.builders.PathSelectors;
//import springfox.documentation.builders.RequestHandlerSelectors;
//import springfox.documentation.service.ApiInfo;
//import springfox.documentation.service.Contact;
//import springfox.documentation.spi.DocumentationType;
//import springfox.documentation.spring.web.plugins.Docket;
//import springfox.documentation.swagger2.annotations.EnableSwagger2;
//
//@Configuration
//@EnableSwagger2
//public class SwaggerConfig {
//    @Value("${swagger.title}")
//    private String title;
//
//    @Value("${swagger.description}")
//    private String description;
//
//    @Value("${swagger.contact.name}")
//    private String name;
//
//    @Value("${swagger.contact.website}")
//    private String website;
//
//    @Value("${swagger.contact.email}")
//    private String email;
//
//    @Value("${spring.app.version}")
//    private String version;
//
//    @Bean
//    public Docket api() {
//        return new Docket(DocumentationType.SWAGGER_2).select()
//                .apis(RequestHandlerSelectors.basePackage("com.phouthasak.webapp.basketballCheckin.controller"))
//                .paths(PathSelectors.regex("/.*"))
//                .build()
//                .apiInfo(apiEndpointsInfo());
//    }
//
//    private ApiInfo apiEndpointsInfo() {
//        return new ApiInfoBuilder()
//                .title(title)
//                .description(description)
//                .contact(new Contact(name, website, email))
//                .license("Apache 2.0")
//                .licenseUrl("http://www.apache.org/licenses/LICENSE-2.0.html")
//                .version(version)
//                .build();
//    }
//}
