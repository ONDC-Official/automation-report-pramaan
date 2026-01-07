module.exports= {
    "id": "hotal_bap_cancel_message_01",
    "type": "object",
    "properties": {
      "order_id": {
        "id": "hotal_bap_cancel_message_02",
        "type": "string",
        "minLength": 1
      },
      "cancellation_reason_id": {
        "id": "hotal_bap_cancel_message_03",
        "type": "string",
        "minLength": 1
      },
      "descriptor": {
        "id": "hotal_bap_cancel_message_04",
        "type": "object",
        "properties": {
          "short_desc": {
            "id": "hotal_bap_cancel_message_05",
            "type": "string",
            "minLength": 1
          },
          "long_desc": {
            "id": "hotal_bap_cancel_message_06",
            "type": "string",
            "minLength": 1
          }
        }
      }
    }
  }