# Public Morozov
Public Morozov is simple MongoDB REST API for frontenders who have no backend
## Usage
#### Find Objects
```HTTP
GET /collection_name
Accept: application/json
```
You can use query string parameters as MongoDB `find` criterias
#### Create Object
```HTTP
POST /collection_name
Content-Type: application/json

{"first": "first", "second": "second"}
```
#### Update Object
```HTTP
PUT /collection_name?_id=document_id
Content-Type: application/json

{"first": "first", "second": "second"}
```
You must use query string parameters as MongoDB `update` criterias
#### Remove Object
```HTTP
DELETE /collection_name?_id=document_id
Accept: application/json
```
You must use query string parameters as MongoDB `update` criterias
## Install
After installing MongoDB ([MacOS](https://github.com/mongodb/homebrew-brew#setup)) run
```bash
git clone git@github.com:kissarat/morozov.git
cd morozov
npm install
npm start
```
You can customize configuration in `config/local.json` (see [config/default.json](config/default.json) for example)
