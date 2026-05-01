module.exports = {
    "id": "retail_bap_cancel_message_01",
    "type": "object",
    "properties": {
        "order_id": {
            "id": "retail_bap_cancel_message_02",
            "type": "string",
            "minLength": 1,
            "maxLength": 32
        },
        "cancellation_reason_id": {
            "id": "retail_bap_cancel_message_02",
            "type": "string",
            "minLength": 1,
            "enum": ["001", "003", "004", "006", "009", "010", "999"]
        },
        "descriptor": {
            "id": "retail_bap_cancel_message_03",
            "type": "object",
            "properties": {
                "name": {
                    "id": "retail_bap_cancel_message_04",
                    "type": "string",
                    "minLength": 1
                },
                "short_desc": {
                    "id": "retail_bap_cancel_message_05",
                    "type": "string",
                    "minLength": 1
                },
                "tags": {
                    "id": "retail_bap_cancel_message_06",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "retail_bap_cancel_message_07",
                        "type": "object",
                        "properties": {
                            "code": {
                                "id": "retail_bap_cancel_message_08",
                                "type": "string",
                                "minLength": 1
                            },
                            "list": {
                                "id": "retail_bap_cancel_message_09",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "retail_bap_cancel_message_10",
                                    "type": "object",
                                    "properties": {
                                        "code": {
                                            "id": "retail_bap_cancel_message_11",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "value": {
                                            "id": "retail_bap_cancel_message_12",
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