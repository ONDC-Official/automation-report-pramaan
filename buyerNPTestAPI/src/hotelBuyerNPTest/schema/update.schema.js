module.exports= {
    "id": "hotel_bap_update_message_01",
    "type": "object",
    "properties": {
      "update_target": {
        "id": "hotel_bap_update_message_02",
        "type": "string",
        "minLength": 1
      },
      "order": {
        "id": "hotel_bap_update_message_03",
        "type": "object",
        "properties": {
          "id": {
            "id": "hotel_bap_update_message_04",
            "type": "string",
            "minLength": 1
          },
          "fulfillments": {
            "id": "hotel_bap_update_message_05",
            "type": "array",
            "minItems": 1,
            "element": {
                "id": "hotel_bap_update_message_06",
              "type": "object",
              "properties": {
                "id": {
                    "id": "hotel_bap_update_message_07",
                  "type": "string",
                  "minLength": 1
                },
                "tags": {
                    "id": "hotel_bap_update_message_08",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "hotel_bap_update_message_09",
                    "type": "object",
                    "properties": {
                      "descriptor": {
                        "id": "hotel_bap_update_message_10",
                        "type": "object",
                        "properties": {
                          "code": {
                            "id": "hotel_bap_update_message_11",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "list": {
                        "id": "hotel_bap_update_message_12",
                        "type": "array",
                        "minItems": 1,
                        "element": {
                            "id": "hotel_bap_update_message_13",
                          "type": "object",
                          "properties": {
                            "descriptor": {
                                "id": "hotel_bap_update_message_14",
                              "type": "object",
                              "properties": {
                                "code": {
                                    "id": "hotel_bap_update_message_15",
                                  "type": "string",
                                  "minLength": 1
                                }
                              }
                            },
                            "value": {
                                "id": "hotel_bap_update_message_16",
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
      }
    }
  }