import { values } from "ramda";

export const responseData = {
  "timestamp": "",
  "type": "REPLY",
  "body": {
    "b7f947eb-4425-4b15-af79-ee3a91d08fba": {
      "msgId": "b7f947eb-4425-4b15-af79-ee3a91d08fba",
      "txId": "b7f947eb-4425-4b15-af79-ee3a91d08fba",
      "operationName": "getHospitalId",
      "requestMessage": {
        "timestamp": "2019-07-194T00:07:258Z",
        "principal": {
          "userId": "shailendra@gmail.com"
        },
        "body": {
          "type": "hospital"
        },
        "contentType": "application/json",
        "destination": "NavigatorServiceJob;0",
        "replyTo": "_node1_reply;0",
        "correlationId": "_Message_14d6041e-a185-415e-8c16-6047dab77284:b7f947eb-4425-4b15-af79-ee3a91d08fba",
        "operation": "getHospitalId",
        "msgId": "b7f947eb-4425-4b15-af79-ee3a91d08fba",
        "id": "133",
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaGFpbGVuZHJhQGdtYWlsLmNvbSIsImlzcyI6InBydWRlbnRpYWwiLCJwZXJtaXNzaW9ucyI6WyJhcHBVc2VyIl0sImlhdCI6MTU2MjkyNTU0OSwiZXhwIjoxNTgwOTI1NTQ5fQ.farT7jCC9bZWNa_88sugIrmc_ABOV00pEBcUOHwzUQ0"
      },
      "replyMessage": {
        "timestamp": "",
        "principal": {
          "userId": "shailendra@gmail.com"
        },
        "type": "REPLY",
        "body": {
          "id": "133",
          "name": "COLUMBIA ASIA HOSPITAL - CHERAS",
          "type": "HOSPITAL",
          "timing": "Monday-Friday: 9:00am-5:00pm \n\nSaturday: 9:00am-12:00pm \n\nSunday & Holiday: Closed",
          "specialities": [
            "RADIOLOGIST",
            "OBSTETRICIAN & GYNAECOLOGIST",
            "ANAESTHESIOLOGIST",
            "EAR, NOSE & THROAT SURGEON",
            "PHYSICIAN",
            "ORTHOPAEDIC",
            "DERMATOLOGIST",
            "MEDICAL OFFICER",
            "UROLOGIST",
            "CARDIOLOGIST",
            "OPHTHALMOLOGIST",
            "ORTHOPAEDIC & TRAUMATOLOGY SURGEON",
            "PAEDIATRICIAN",
            "GENERAL SURGEON",
            "OTORHINOLARYNGOLOGIST, HEAD & NECK SURGEON",
            "CHIEF MEDICAL OFFICER"
          ],
          "contactDetails": {
            "website": {
              "channel": "CUSTOM",
              "customChannel": "website",
              "value": "http://www.columbiaasia.com/cheras/"
            },
            "phone": {
              "channel": "PHONE",
              "value": "+60390869999"
            },
            "fax": {
              "channel": "CUSTOM",
              "customChannel": "fax",
              "value": "+60390869888"
            }
          },
          "address": {
            "line1": "Lot 33107, Jalan Suakasih",
            "line2": "43200 Batu 9 Cheras",
            "line3": "Selangor",
            "latitude": 3.0315,
            "longitude": 101.7629
          }
        },
        "contentType": "application/json",
        "destination": "_node1_reply;0",
        "status": {
          "code": 0
        },
        "correlationId": "_Message_14d6041e-a185-415e-8c16-6047dab77284:b7f947eb-4425-4b15-af79-ee3a91d08fba",
        "operation": "getHospitalId"
      },
      "childMessages": [
        {
          "msgId": "c35a3a64-98a2-46c2-af2d-dfc56d6f0663",
          "txId": "b7f947eb-4425-4b15-af79-ee3a91d08fba",
          "operationName": "navigator_getHospitalById",
          "requestMessage": {
            "timestamp": "2019-07-194T00:07:263Z",
            "principal": {
              "userId": "shailendra@gmail.com"
            },
            "contentType": "application/json",
            "destination": "Http_Navigator;0",
            "replyTo": "NavigatorServiceJob;0",
            "correlationId": "b7f947eb-4425-4b15-af79-ee3a91d08fba",
            "operation": "navigator_getHospitalById",
            "msgId": "c35a3a64-98a2-46c2-af2d-dfc56d6f0663",
            "txId": "b7f947eb-4425-4b15-af79-ee3a91d08fba",
            "headers": {
              "Content-type": "application/json",
              "Authkey": "XNERWT12",
              "httpMethod": "GET"
            },
            "pathParams": {
              "id": "133"
            },
            "queryParams": {
              "projection": "speciality"
            }
          },
          "replyMessage": {
            "timestamp": "",
            "principal": {
              "userId": "shailendra@gmail.com"
            },
            "type": "REPLY",
            "body": {
              "data": "{\n  \"name\" : \"COLUMBIA ASIA HOSPITAL - CHERAS\",\n  \"id\" : 133,\n  \"speciality\" : [ \"RADIOLOGIST\", \"OBSTETRICIAN & GYNAECOLOGIST\", \"ANAESTHESIOLOGIST\", \"EAR, NOSE & THROAT SURGEON\", \"PHYSICIAN\", \"ORTHOPAEDIC\", \"DERMATOLOGIST\", \"MEDICAL OFFICER\", \"UROLOGIST\", \"CARDIOLOGIST\", \"OPHTHALMOLOGIST\", \"ORTHOPAEDIC & TRAUMATOLOGY SURGEON\", \"PAEDIATRICIAN\", \"GENERAL SURGEON\", \"OTORHINOLARYNGOLOGIST, HEAD & NECK SURGEON\", \"CHIEF MEDICAL OFFICER\" ],\n  \"lbu\" : \"PBTB\",\n  \"latitude\" : \"3.0315\",\n  \"longitude\" : \"101.7629\",\n  \"preferredFlag\" : \"0\",\n  \"timing\" : \"Monday-Friday: 9:00am-5:00pm \\n\\nSaturday: 9:00am-12:00pm \\n\\nSunday & Holiday: Closed\",\n  \"address1\" : \"Lot 33107, Jalan Suakasih\",\n  \"address2\" : \"43200 Batu 9 Cheras\",\n  \"address3\" : \"Selangor\",\n  \"phone1\" : \"+60390869999\",\n  \"mobile\" : \"-\",\n  \"fax\" : \"+60390869888\",\n  \"website\" : \"http://www.columbiaasia.com/cheras/\",\n  \"_links\" : {\n    \"self\" : {\n      \"href\" : \"https://appuat.prubsn.com.my/navigator/hospitals/133\"\n    },\n    \"hospital\" : {\n      \"href\" : \"https://appuat.prubsn.com.my/navigator/hospitals/133{?projection}\",\n      \"templated\" : true\n    },\n    \"area\" : {\n      \"href\" : \"https://appuat.prubsn.com.my/navigator/hospitals/133/area\"\n    },\n    \"doctors\" : {\n      \"href\" : \"https://appuat.prubsn.com.my/navigator/hospitals/133/doctors\"\n    },\n    \"rooms\" : {\n      \"href\" : \"https://appuat.prubsn.com.my/navigator/hospitals/133/rooms\"\n    }\n  }\n}"
            },
            "contentType": "application/xml",
            "destination": "NavigatorServiceJob;0",
            "status": {
              "code": 0
            },
            "correlationId": "b7f947eb-4425-4b15-af79-ee3a91d08fba",
            "operation": "navigator_getHospitalById"
          }
        },
        {
          "msgId": "c35a3a64-98a2-46c2-af2d-dfc56d6f0664",
          "txId": "b7f947eb-4425-4b15-af79-ee3a91d08fba",
          "operationName": "navigator_getHospitalById",
          "requestMessage": {
            "timestamp": "2019-07-194T00:07:263Z",
            "principal": {
              "userId": "shailendra@gmail.com"
            },
            "contentType": "application/json",
            "destination": "Http_Navigator;0",
            "replyTo": "NavigatorServiceJob;0",
            "correlationId": "b7f947eb-4425-4b15-af79-ee3a91d08fba",
            "operation": "navigator_getHospitalById",
            "msgId": "c35a3a64-98a2-46c2-af2d-dfc56d6f0664",
            "txId": "b7f947eb-4425-4b15-af79-ee3a91d08fba",
            "headers": {
              "Content-type": "application/json",
              "Authkey": "XNERWT12",
              "httpMethod": "GET"
            },
            "pathParams": {
              "id": "133"
            },
            "queryParams": {
              "projection": "speciality"
            }
          },
          "replyMessage": {
            "timestamp": "",
            "principal": {
              "userId": "shailendra@gmail.com"
            },
            "type": "REPLY",
            "body": {
              "data": "{\n  \"name\" : \"COLUMBIA ASIA HOSPITAL - CHERAS\",\n  \"id\" : 133,\n  \"speciality\" : [ \"RADIOLOGIST\", \"OBSTETRICIAN & GYNAECOLOGIST\", \"ANAESTHESIOLOGIST\", \"EAR, NOSE & THROAT SURGEON\", \"PHYSICIAN\", \"ORTHOPAEDIC\", \"DERMATOLOGIST\", \"MEDICAL OFFICER\", \"UROLOGIST\", \"CARDIOLOGIST\", \"OPHTHALMOLOGIST\", \"ORTHOPAEDIC & TRAUMATOLOGY SURGEON\", \"PAEDIATRICIAN\", \"GENERAL SURGEON\", \"OTORHINOLARYNGOLOGIST, HEAD & NECK SURGEON\", \"CHIEF MEDICAL OFFICER\" ],\n  \"lbu\" : \"PBTB\",\n  \"latitude\" : \"3.0315\",\n  \"longitude\" : \"101.7629\",\n  \"preferredFlag\" : \"0\",\n  \"timing\" : \"Monday-Friday: 9:00am-5:00pm \\n\\nSaturday: 9:00am-12:00pm \\n\\nSunday & Holiday: Closed\",\n  \"address1\" : \"Lot 33107, Jalan Suakasih\",\n  \"address2\" : \"43200 Batu 9 Cheras\",\n  \"address3\" : \"Selangor\",\n  \"phone1\" : \"+60390869999\",\n  \"mobile\" : \"-\",\n  \"fax\" : \"+60390869888\",\n  \"website\" : \"http://www.columbiaasia.com/cheras/\",\n  \"_links\" : {\n    \"self\" : {\n      \"href\" : \"https://appuat.prubsn.com.my/navigator/hospitals/133\"\n    },\n    \"hospital\" : {\n      \"href\" : \"https://appuat.prubsn.com.my/navigator/hospitals/133{?projection}\",\n      \"templated\" : true\n    },\n    \"area\" : {\n      \"href\" : \"https://appuat.prubsn.com.my/navigator/hospitals/133/area\"\n    },\n    \"doctors\" : {\n      \"href\" : \"https://appuat.prubsn.com.my/navigator/hospitals/133/doctors\"\n    },\n    \"rooms\" : {\n      \"href\" : \"https://appuat.prubsn.com.my/navigator/hospitals/133/rooms\"\n    }\n  }\n}"
            },
            "contentType": "application/xml",
            "destination": "NavigatorServiceJob;0",
            "status": {
              "code": 0
            },
            "correlationId": "b7f947eb-4425-4b15-af79-ee3a91d08fba",
            "operation": "navigator_getHospitalById"
          }
        },
        {
          "msgId": "c35a3a64-98a2-46c2-af2d-dfc56d6f0665",
          "txId": "b7f947eb-4425-4b15-af79-ee3a91d08fba",
          "operationName": "navigator_getHospitalById",
          "requestMessage": {
            "timestamp": "2019-07-194T00:07:263Z",
            "principal": {
              "userId": "shailendra@gmail.com"
            },
            "contentType": "application/json",
            "destination": "Http_Navigator;0",
            "replyTo": "NavigatorServiceJob;0",
            "correlationId": "b7f947eb-4425-4b15-af79-ee3a91d08fba",
            "operation": "navigator_getHospitalById",
            "msgId": "c35a3a64-98a2-46c2-af2d-dfc56d6f0665",
            "txId": "b7f947eb-4425-4b15-af79-ee3a91d08fba",
            "headers": {
              "Content-type": "application/json",
              "Authkey": "XNERWT12",
              "httpMethod": "GET"
            },
            "pathParams": {
              "id": "133"
            },
            "queryParams": {
              "projection": "speciality"
            }
          },
          "replyMessage": {
            "timestamp": "",
            "principal": {
              "userId": "shailendra@gmail.com"
            },
            "type": "REPLY",
            "body": {
              "data": "{\n  \"name\" : \"COLUMBIA ASIA HOSPITAL - CHERAS\",\n  \"id\" : 133,\n  \"speciality\" : [ \"RADIOLOGIST\", \"OBSTETRICIAN & GYNAECOLOGIST\", \"ANAESTHESIOLOGIST\", \"EAR, NOSE & THROAT SURGEON\", \"PHYSICIAN\", \"ORTHOPAEDIC\", \"DERMATOLOGIST\", \"MEDICAL OFFICER\", \"UROLOGIST\", \"CARDIOLOGIST\", \"OPHTHALMOLOGIST\", \"ORTHOPAEDIC & TRAUMATOLOGY SURGEON\", \"PAEDIATRICIAN\", \"GENERAL SURGEON\", \"OTORHINOLARYNGOLOGIST, HEAD & NECK SURGEON\", \"CHIEF MEDICAL OFFICER\" ],\n  \"lbu\" : \"PBTB\",\n  \"latitude\" : \"3.0315\",\n  \"longitude\" : \"101.7629\",\n  \"preferredFlag\" : \"0\",\n  \"timing\" : \"Monday-Friday: 9:00am-5:00pm \\n\\nSaturday: 9:00am-12:00pm \\n\\nSunday & Holiday: Closed\",\n  \"address1\" : \"Lot 33107, Jalan Suakasih\",\n  \"address2\" : \"43200 Batu 9 Cheras\",\n  \"address3\" : \"Selangor\",\n  \"phone1\" : \"+60390869999\",\n  \"mobile\" : \"-\",\n  \"fax\" : \"+60390869888\",\n  \"website\" : \"http://www.columbiaasia.com/cheras/\",\n  \"_links\" : {\n    \"self\" : {\n      \"href\" : \"https://appuat.prubsn.com.my/navigator/hospitals/133\"\n    },\n    \"hospital\" : {\n      \"href\" : \"https://appuat.prubsn.com.my/navigator/hospitals/133{?projection}\",\n      \"templated\" : true\n    },\n    \"area\" : {\n      \"href\" : \"https://appuat.prubsn.com.my/navigator/hospitals/133/area\"\n    },\n    \"doctors\" : {\n      \"href\" : \"https://appuat.prubsn.com.my/navigator/hospitals/133/doctors\"\n    },\n    \"rooms\" : {\n      \"href\" : \"https://appuat.prubsn.com.my/navigator/hospitals/133/rooms\"\n    }\n  }\n}"
            },
            "contentType": "application/xml",
            "destination": "NavigatorServiceJob;0",
            "status": {
              "code": 1
            },
            "correlationId": "b7f947eb-4425-4b15-af79-ee3a91d08fba",
            "operation": "navigator_getHospitalById"
          },
          "childMessages": [
            {
              "msgId": "c35a3a64-98a2-46c2-af2d-dfc56d6f0666",
              "txId": "b7f947eb-4425-4b15-af79-ee3a91d08fba",
              "operationName": "navigator_getHospitalById",
              "requestMessage": {
                "timestamp": "2019-07-194T00:07:263Z",
                "principal": {
                  "userId": "shailendra@gmail.com"
                },
                "contentType": "application/json",
                "destination": "Http_Navigator;0",
                "replyTo": "NavigatorServiceJob;0",
                "correlationId": "b7f947eb-4425-4b15-af79-ee3a91d08fba",
                "operation": "navigator_getHospitalById",
                "msgId": "c35a3a64-98a2-46c2-af2d-dfc56d6f0666",
                "txId": "b7f947eb-4425-4b15-af79-ee3a91d08fba",
                "headers": {
                  "Content-type": "application/json",
                  "Authkey": "XNERWT12",
                  "httpMethod": "GET"
                },
                "pathParams": {
                  "id": "133"
                },
                "queryParams": {
                  "projection": "speciality"
                }
              },
              "replyMessage": {
                "timestamp": "",
                "principal": {
                  "userId": "shailendra@gmail.com"
                },
                "type": "REPLY",
                "body": {
                  "data": "{\n  \"name\" : \"COLUMBIA ASIA HOSPITAL - CHERAS\",\n  \"id\" : 133,\n  \"speciality\" : [ \"RADIOLOGIST\", \"OBSTETRICIAN & GYNAECOLOGIST\", \"ANAESTHESIOLOGIST\", \"EAR, NOSE & THROAT SURGEON\", \"PHYSICIAN\", \"ORTHOPAEDIC\", \"DERMATOLOGIST\", \"MEDICAL OFFICER\", \"UROLOGIST\", \"CARDIOLOGIST\", \"OPHTHALMOLOGIST\", \"ORTHOPAEDIC & TRAUMATOLOGY SURGEON\", \"PAEDIATRICIAN\", \"GENERAL SURGEON\", \"OTORHINOLARYNGOLOGIST, HEAD & NECK SURGEON\", \"CHIEF MEDICAL OFFICER\" ],\n  \"lbu\" : \"PBTB\",\n  \"latitude\" : \"3.0315\",\n  \"longitude\" : \"101.7629\",\n  \"preferredFlag\" : \"0\",\n  \"timing\" : \"Monday-Friday: 9:00am-5:00pm \\n\\nSaturday: 9:00am-12:00pm \\n\\nSunday & Holiday: Closed\",\n  \"address1\" : \"Lot 33107, Jalan Suakasih\",\n  \"address2\" : \"43200 Batu 9 Cheras\",\n  \"address3\" : \"Selangor\",\n  \"phone1\" : \"+60390869999\",\n  \"mobile\" : \"-\",\n  \"fax\" : \"+60390869888\",\n  \"website\" : \"http://www.columbiaasia.com/cheras/\",\n  \"_links\" : {\n    \"self\" : {\n      \"href\" : \"https://appuat.prubsn.com.my/navigator/hospitals/133\"\n    },\n    \"hospital\" : {\n      \"href\" : \"https://appuat.prubsn.com.my/navigator/hospitals/133{?projection}\",\n      \"templated\" : true\n    },\n    \"area\" : {\n      \"href\" : \"https://appuat.prubsn.com.my/navigator/hospitals/133/area\"\n    },\n    \"doctors\" : {\n      \"href\" : \"https://appuat.prubsn.com.my/navigator/hospitals/133/doctors\"\n    },\n    \"rooms\" : {\n      \"href\" : \"https://appuat.prubsn.com.my/navigator/hospitals/133/rooms\"\n    }\n  }\n}"
                },
                "contentType": "application/xml",
                "destination": "NavigatorServiceJob;0",
                "status": {
                  "code": 1
                },
                "correlationId": "b7f947eb-4425-4b15-af79-ee3a91d08fba",
                "operation": "navigator_getHospitalById"
              }
            }
          ]
        }
      ]
    }
  },
  "contentType": "application/json",
  "status": {
    "code": 0
  },
  "correlationId": "ea22e5aa-296f-4d2f-b037-dce22cd9d142",
  "operation": "createEvent"
};

export const makeData = () => values(responseData.body);
