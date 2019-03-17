## Setup Instructions

LINUX (tested on Ubuntu)

1. Open Terminal

2. Install Node.js
    sudo apt install nodejs npm

3. Install Node Packet Manager
    sudo apt install npm

4. Navigate to the contact-app directory:

5. Install dependencies with npm: (might take a while)
    npm install

6. Build with:
    ng serve -o

## General OO

The Contact List Manager application that I have been developing is created using Angular (TypeScript).

Right now, the app allows you to view your contact list, create contacts of both personal and business type, edit and delete contacts and obtain the list as a portable JSON or XML file. Persistence is implemented through a Firebase NoSQL cloud database.

Angular follows a component-based web design philosophy, and its web applications are designed using a composition of highly specialized components. Each component has all of its own necessary HTML, CSS, and TypeScript code all packed together and the components are fit together to create a complete and modular web page. This leads to very low coupling and high maintainability, but it is also the cause of some of the TypeScript files I have delivered looking quite sparse. I just want to make it clear that these files are intentionally developed this way in accordance with Angular design. These files include `*.component.ts` files.

Other Aspects of OO Design in TypeScript are changed by Angular as well. For example you will see constructors like this in some files:

```
constructor(private fb: FormBuilder, private listService: ListService) { }
```

These variables actually MUST be declared like this. This is to create real-time links between components and is known as Dependency Injection in Angular.

The directory where the majority of my TypeScript code can be found is within `contact-app/src/app`. This directory will hold some of the base classes within the `classes` folder, the individual components within the other respectively named folders, and all of the necessary services, interfaces, and some boilerplate code.

## OO Showcase

The first case of OO I would like to showcase is the Contact and PersonalContact classes found in `/src/app/classes/Contact.ts` and `/src/app/classes/PersonalContact.ts` respectively.

The Contact class is the foundation of my application, and serves as an abstract class to be inherited by other instantiable classes. This class contains private parameters, able to be set through the constructor at instantiation, and able to be accessed and mutated through getters and setters. It also contains two simple methods. It is a great example of a highly specialized and organized class.

The PersonalContact class is one of the child classes of the Contact class, inheriting its functionality. The PersonalContact class expands upon the Contact class, adding an additional parameter. It builds upon the constructor of the parent class, calling super(), and creates additional getters and setters for the new parameter. Finally it overrides one of its inherited methods, outputHTML(), and calls to super() once more.

All together this is a perfect example of inheritance, abstraction, accessors & mutators, and the use of super(). This relationship is also the basis for the polymorphic Contact[] used throughout the application.

The second case of OO I would like to showcase is the ListService class found in `/src/app/list.service.ts`.

This class looks a bit different due to it being an Angular Service, used to communicate between the Components and the Data. This is an excellent example of MVC as the service acts as a Model accessing the database, and communicating back and forth with the components (Controller).

This class also extensively uses lambdas pipe data from the database into the interface and to pipe observable changes into other components. This is a standard use of lambdas in Angular and TypeScript, and it not only shortens code but also allows for this observable subscription to be possible.

## User Stories

As a user, I would like it so that the theme choice is made persistent, so that I don't have to configure the app to use my preferred theme every time the page reloads.

* `/src/app/theme.service.ts` now communicates the theme to a document on the firestore cloud, which is updated on theme changes and queried upon the building of the website. Theme changes now persist across all instances. On startup, because it needs to wait for a response from the database, it takes a half second to load the theme, which is something I'd like to explore solutions for in the future.

As a user, I would like to be able to upload images to contacts so that I can distinguish contacts at a glance.

* As of now this is partially implemented. Images can be successfully uploaded to the firebase storage cloud. However retrieving them and binding them to the Contact objects is still being implemented. This is challenging because firebase does not allow images to be stored in its databases, which are where the Contact list is stored. Rather, images and other media are to be stored on the Firebase Storage, which forces a seperation between the Contact list and the images and makes it difficult to keep track of corresponding files.

As a user, I would like to be able to see random jokes on the webpage so that I will be more entertained.

* Not my best user story, but it facilitates the usage of a REST api in my project. More details on implementation below.

As a user, I would like to be able to convert the temperature from celcius to farenheit so that I can better understand the relationship between the different temperature metrics.

* Again, not related to my app but this was the SOAP api that I chose to use. More details on implementation below.

#### Pre and Post Conditions

Typescript and Angular does not support strong pre and post conditions, and so I have instead used comments to define them. The comments are made in the standard JavaDoc style for readability. Examples of these pre and post conditions can be found within the Contact class at `/src/app/classes/Contact.ts` and within the ExportComponent class at `/src/app/export/export.component.ts`.

#### Exception Handling

All http requests sent from my app are intercepted and checked for exceptions by the code found in `/src/app/http-error.interceptor.ts`. Requests are first checked for exceptions. If an error is caught, the request is tried once more, to see if the exception was a fluke. The exception is then caught, a corresponding error message is output to the console, and the exception is thrown. With some clever manipulation of Node protocols, this interceptor can be called and reused upon any HTTP request, for example the RESTful API consumption found in `/src/app/rest.service.ts`. The idea for this came from https://scotch.io/bar-talk/error-handling-with-angular-6-tips-and-best-practices192 and is an example of best practices for exception handling and code reuse in Angular.

#### MVC

Angular is a component-based web design, and is often similar to MVC design. The models are the base classes found within `/src/app/classes/`, as well as any interfaces and services found within `/src/app/`. The controllers are the components, which are highly specialized typescript blocks that communicate between the models and the HTML/SASS. The view is the HTML/SASS that build the visual and interactible website. Each component has a designated HTML/SASS block that it communicates with. 

A good example of this structure is the implementation of the REST Api consumption. The view is the HTML code in `/src/app/rest/rest.component.html`, which sends a message to the controller when the button is pressed on the screen. The controller is the RestComponent class found in `/src/app/rest/rest.component.ts`, which then calls the model to perform the HTTP request. The model is the RestService class found in `/src/app/rest.service.ts`, and it creates the HTTP request and stores the result. The result is then passed back to the controller to be sent to the view, where it is injected into the HTML to be displayed on the website.
 
## REST and SOAP Web Services Consumption

#### REST

The RESTful web service I chose to use is called the Official Joke API and can be found at https://github.com/15Dkatz/official_joke_api. Navigate to the REST API tab on my website to use it. Clicking on the Generate Joke button will send a GET request to the API, which returns the information pertaining to a random joke in their library. The code for this implementation can be found within `/src/app/rest.service.ts`. This was fairly straightforward to implement due to NodeJS and Angular's exisiting support for REST messaging.

#### SOAP

The SOAP web service I chose to use for this is called TemperatureConverter and can be found at https://www.w3schools.com/xml/tempconvert.asmx?op=CelsiusToFahrenheit. Navigate to the REST API tab on my website to use it. Entering a celcius temperature value and clicking convert will generate and send a SOAP request to the web service which will return the corresponding Farenheit value to be shown on the screen. The code for this implementation can be found within `/src/app/soap.service.ts`, however the implementation for this is not fully functional, since there are still some kinks with configuring the SOAP request properly. NodeJS applications are not designed with SOAP as an intended use, and support for SOAP is limited.

## REST vs SOAP

#### What are REST and SOAP?

REST (Respresentational State Transfer) and SOAP (Simple Object Access Protocol) are both different methods of communication used by web services, and generally differ in use depending on use cases.

SOAP defines a standard communication protocol (set of rules) specification for XML-based message exchange. SOAP uses different transport protocols, such as HTTP and SMTP. The standard protocol HTTP makes it easier for SOAP model to tunnel across firewalls and proxies without any modifications to the SOAP protocol. SOAP can sometimes be slower than middleware technologies like CORBA or ICE due to its verbose XML format. SOAP uses Web Services Description Language (WSDL), which describes a common set of rules to define the messages, bindings, operations and location of the service. WSDL is akin to a contract to define the interface that the service offers.

REST describes a set of architectural principles by which data can be transmitted over a standardized interface (such as HTTP). REST does not contain an additional messaging layer and focuses on design rules for creating stateless services. A client can access the resource using the unique URI and a representation of the resource is returned. While accessing RESTful resources with HTTP protocol, the URL of the resource serves as the resource identifier and GET, PUT, DELETE, POST and HEAD are the standard HTTP operations to be performed on that resource.

#### Comparison
In terms of use SOAP and REST often differ. For many SOAP is difficult and cumbersome to use, and thus REST is often preferred when the goal is lightweight usage. For example, when working with SOAP you need to create the XML structure for every request, whereas with REST often a simple URL is used to request to an endpoint. 

#### SOAP advantages
* SOAP is Language, platform, and transfer independent, which can make it more suitable or necessary for certain applications. REST requires the use of HTTP.
* The Web Services Description Language (WSDL) describes a standardized interface, whereas in a REST web service producers and consumers must understand the context and content being passed along as there is no standard set of rules to describe the interface.
* Supports several protocols and technologies, including WSDL, XSDs and WS-Addressing.
* Requires less plumbing code than REST services design for operations which require conversational state and contextual information to be maintained (e.g., transactions, security, coordination, addressing and trust).
* Works well in distributed enterprise environments.
* Features built-in error handling.

#### REST Advantages
* REST has a smaller learning curve and is relatively simpler to implement and maintain.
* Data can be returned in multiple formats (e.g, JSON, XML, CSV, RSS). This means that it can be more efficient than SOAP when using smaller message formats, use less bandwidth communicating metadata, and use formats more applicable to the application.
* REST is closer to web technologies in design philosophy.

#### My experience

In my experience implementing SOAP and REST consumption, it was exponentially more difficult trying to implement SOAP consumption. Although SOAP is more difficult generally due to some of the aforementioned advantages of REST, the difficulty is multiplied when using a web development language like TypeScript and Angular, which are designed around the usage of REST.


#### References
* https://smartbear.com/blog/test-and-monitor/understanding-soap-and-rest-basics/
* https://searchmicroservices.techtarget.com/tip/REST-vs-SOAP-Choosing-the-best-web-service