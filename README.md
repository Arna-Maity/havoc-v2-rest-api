# havoc-v2-rest-api

Test the APIs using [POSTMAN](https://www.postman.com/). 
## Installing Dependencies
`npm install`

## Starting the API Server
`npm run dev`

## Supported API Endpoints:

### 1. \<root_url\>/devices

    Returns a list of supported devices in the JSON format.

### 2. \<root_url\>/devices/\<deviceCodename\>

    Returns information about a particular device specified by the <deviceCodename> slug field. 

### 3. \<root_url\>/about

    Returns a list of developers currently involved with the project in JSON format.

### 3. \<root_url\>/about/\<developerId\>

    Returns details regarding a particular developer identified by the <developerId> slug field.

    
## References:

1. [REST API Tutorial Series](https://www.youtube.com/playlist?list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q).
2. [GraphQL API Tutorial Series](https://www.youtube.com/playlist?list=PL55RiY5tL51rG1x02Yyj93iypUuHYXcB_).