# Public Morozov
Public Morozov is simple REST API backend for frontenders
## Usage
#### Find Objects
```
GET /collection_name
```
You can use query string parameters as MongoDB `find` criterias
#### Create Object
```
POST /collection_name
    { "requrest_body": "json" }
```
#### Update Object
```
PUT /collection_name?_id=document_id
    { "requrest_body": "json" }
```
You must use query string parameters as MongoDB `update` criterias
#### Remove Object
```
DELETE /collection_name?_id=document_id
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
