If you have difficulty correctly viewing this file, paste it into an online MarkDown viewer such as https://dillinger.io/

# RESTful Interface

This interface is designed to give other applications the ability to request information from this Contact List App. In this application, the purpose is to manipulate and view the Contact list, which is a persistent collection of Contact objects stored in a database. Because there is no account system and thus no privacy, this interface will allow other applications significant access to the information within the database containing the collection of contacts, including the ability to read, create, and delete contacts. However, some functionality is reserved for those with admin priveledges only and is not accessible by public requests, such as requesting to delete the entire contacts collection. In the future should an account system be created, this interface is likely to be revised for security reasons. Using this interface, other applications will be able to make queries to the database depending on what information they would like, and the interface would return corresponding data back to the client application in the form of JSON or XML data.

## Resource Endpoints

For this interface only the Contact object collection `/contacts` and its Contact object elements `/contacts/{id}` will be availables as object resources, but there will be a wealth of endpoints to make requests to. For consistency and readability, collection nouns are pluralized and single resources are not. Below can be found a full list of URI endpoints.

```
/contacts
/contacts/{id}

/contacts.json
/contacts.xml

/contacts/{id}.json
/contacts/{id}.xml

/contacts/{id}/firstname
/contacts/{id}/lastname
/contacts/{id}/fullname
/contacts/{id}/phone
/contacts/{id}/email
/contacts/{id}/nickname
/contacts/{id}/company
/contacts/{id}/type
```

To read/add new contact to/delete the contact list:
`GET|POST|DELETE /contacts`. By default, this request will return the data in JSON format, but as seen above the returned data format can be specified using `.json` or `.xml`.

To create a new contact in the contact list:
`POST /contacts`

To read a contact from the contact list:
`GET|DELETE /contacts/{id}`. To make this request, `{id}` should be substituted with a valid contact id. By default, this request will return the data in JSON format, but as seen above the returned data format can be specified using `.json` or `.xml`.

To read/write a contact parameter:
`GET|PUT /contacts/{id}/{parameter}`. To make this request, '{parameter}' should be substituted with a valid contact endpoint. The full list of valid endpoints is detailed above.

## HTTP Status Codes

Below can be found a complete table of expected HTTP Status codes from requests.

| Endpoint                  | HTTP Verb | CRUD   | HTTP Status Code                                                                                                                                                     |
|---------------------------|-----------|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| /contacts                 | GET       | Read   | 200(OK)                                                                                                                                                              |
| /contacts                 | POST      | Create |  201(Created), 'Location' header with link to `/customers/{id}` containing new ID.                                                                                   |
| /contacts                 | PUT       | Update | 405(Method Not Allowed), updating entire collection not supported.                                                                                                   |
| /contacts                 | DELETE    | Delete | 200(OK)<br> 403(Forbidden), requires admin access to delete entire collection.                                                                                       |
| /contacts/{id}            | GET       | Read   | 200(OK)<br> 404(Not Found) if ID not found or invalid.                                                                                                               |
| /contacts/{id}            | POST      | Create | 405(Method Not Allowed), creating contacts is done from the `/contacts` endpoint where an ID can be generated.                                                       |
| /contacts/{id}            | PUT       | Update | 405(Method Not Allowed), entire contact objects cannot be updated, only their parameters.<br> Default parameters for new contacts are generated by `POST /contacts`. |
| /contacts/{id}            | DELETE    | Delete | 200(OK)<br> 404(Not Found) if ID not found or invalid.                                                                                                               |
| /contacts/{id}/{parameter}| GET       | Read   | 200(OK)<br> 204(No Content)<br> 404(Not Found) if ID not found or invalid.                                                                                           |
| /contacts/{id}/{parameter}| POST      | Create | 405(Method Not Allowed), parameters are only created with the creation of the contact object.                                                                        |
| /contacts/{id}/{parameter}| PUT       | Update | 200(OK)<br> 404(Not Found) if ID not found or invalid.                                                                                                               |
| /contacts/{id}/{parameter}| DELETE    | Delete | 200(OK)<br> 404(Not Found) if ID not found or invalid.                                                                                                               |

For any request that is entered incorrectly and not listed above, HTTP Status code 400(Bad Request) will be returned.

## Example Data

Returned JSON data from a request `GET /contacts` might look something like:

```
[
    {
        "firstname": "Max",
        "lastname": "Hewitt",
        "phone_number": "9054763434",
        "email": "maxhewitt@uoguelph.ca",
        "nickname": ""
    },
    {
        "firstname": "John",
        "lastname": "Frasier",
        "phone_number": "2034458080",
        "email": "johnfrasier@gmail.com",
        "company": "RBC Financial"
    },
    {
        "firstname": "Luke",
        "lastname": "Harrison",
        "phone_number": "5054046060",
        "email": "lukeharry@hotmail.com",
        "nickname": "Lukewarm"
    }
]
```

Returned JSON data from a request `GET /contacts/{id}` might look something like:

```
[
    {
        "firstname": "Max",
        "lastname": "Hewitt",
        "phone_number": "9054763434",
        "email": "maxhewitt@uoguelph.ca",
        "nickname": ""
    }
]
```

Returned JSON data from a request `GET /contacts/{id}/fullname` might look something like:

```
[
    {
        "fullname": "Max Hewitt"
    }
]
```



