module.exports={
  "id": "hotel_bap_search_message_01",
    "type": "object",
    "properties": {
      "intent": {
        "id": "hotel_bap_search_message_02",
        "type": "object",
        "properties": {
          "category": {
            "id": "hotel_bap_search_message_03",
            "type": "object",
            "properties": {
              "descriptor": {
                "id": "hotel_bap_search_message_04",
                "type": "object",
                "properties": {
                  "code": {
                    "id": "hotel_bap_search_message_05",
                    "type": "string",
                    "minLength": 1
                  }
                }
              }
            }
          },
          "tags": {
            "id": "hotel_bap_search_message_06",
            "type": "array",
            "minItems": 1,
            "element": {
              "id": "hotel_bap_search_message_07",
              "type": "object",
              "properties": {
                "descriptor": {
                  "id": "hotel_bap_search_message_08",
                  "type": "object",
                  "properties": {
                    "code": {
                      "id": "hotel_bap_search_message_09",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "list": {
                  "id": "hotel_bap_search_message_10",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "hotel_bap_search_message_11",
                    "type": "object",
                    "properties": {
                      "descriptor": {
                        "id": "hotel_bap_search_message_12",
                        "type": "object",
                        "properties": {
                          "code": {
                            "id": "hotel_bap_search_message_13",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "value": {
                        "id": "hotel_bap_search_message_14",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }