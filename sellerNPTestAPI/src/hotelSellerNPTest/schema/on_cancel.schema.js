module.exports= {
    "id": "hotel_bpp_on_cancel_message_01",
    "type": "object",
    "properties": {
      "order": {
        "id": "hotel_bpp_on_cancel_message_02",
        "type": "object",
        "properties": {
          "id": {
            "id": "hotel_bpp_on_cancel_message_03",
            "type": "string",
            "minLength": 1
          },
          "status": {
            "id": "hotel_bpp_on_cancel_message_04",
            "type": "string",
            "minLength": 1
          },
          "cancellation": {
            "id": "hotel_bpp_on_cancel_message_05",
            "type": "object",
            "properties": {
              "cancelled_by": {
                "id": "hotel_bpp_on_cancel_message_06",
                "type": "string",
                "minLength": 1
              },
              "reason": {
                "id": "hotel_bpp_on_cancel_message_07",
                "type": "object",
                "properties": {
                  "id": {
                    "id": "hotel_bpp_on_cancel_message_08",
                    "type": "string",
                    "minLength": 1
                  },
                  "descriptor": {
                    "id": "hotel_bpp_on_cancel_message_09",
                    "type": "object",
                    "properties": {
                      "short_desc": {
                        "id": "hotel_bpp_on_cancel_message_10",
                        "type": "string",
                        "minLength": 1
                      },
                      "long_desc": {
                        "id": "hotel_bpp_on_cancel_message_11",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  }
                }
              }
            }
          },
          "updated_at": {
            "id": "hotel_bpp_on_cancel_message_12",
            "type": "string",
            "minLength": 1
          }
        }
      }
    }
  }