module.exports={
  "id": "LI_bap_select_message_01",
    "type": "object",
    "properties": {
      "order": {
        "id": "LI_bap_select_message_02",
        "type": "object",
        "properties": {
          "items": {
            "id": "LI_bap_select_message_03",
            "type": "array",
            "minItems": 1,
            "element": {
              "id": "LI_bap_select_message_04",
              "type": "object",
              "properties": {
                "id": {
                  "id": "LI_bap_select_message_05",
                  "type": "string",
                  "minLength": 1
                },
                "parent_item_id": {
                  "id": "LI_bap_select_message_06",
                  "type": "string",
                  "minLength": 1
                },
                "add_ons": {
                  "id": "LI_bap_select_message_07",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "LI_bap_select_message_08",
                    "type": "object",
                    "properties": {
                      "id": {
                        "id": "LI_bap_select_message_09",
                        "type": "string",
                        "minLength": 1
                      },
                      "quantity": {
                        "id": "LI_bap_select_message_10",
                        "type": "object",
                        "properties": {
                          "selected": {
                            "id": "LI_bap_select_message_11",
                            "type": "object",
                            "properties": {
                              "count": {
                                "id": "LI_bap_select_message_12",
                                "type": "number"
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
          },
          "provider": {
            "id": "LI_bap_select_message_13",
            "type": "object",
            "properties": {
              "id": {
                "id": "LI_bap_select_message_14",
                "type": "string",
                "minLength": 1
              }
            }
          }
        }
      }
    }
  }