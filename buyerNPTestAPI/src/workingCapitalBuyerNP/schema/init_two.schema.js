module.exports = {
    "id": "wc_log_bap_init_message_01",
    "type": "object",
    "properties": {
        "order": {
            "id": "wc_log_bap_init_message_02",
            "type": "object",
            "properties": {
               
               
                "tags": {
                    "id": "wc_log_bap_init_message_30",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "wc_log_bap_init_message_31",
                        "type": "object",
                        "properties": {
                            "display": {
                                "id": "wc_log_bap_init_message_32",
                                "type": "boolean"
                            },
                            "descriptor": {
                                "id": "wc_log_bap_init_message_33",
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "id": "wc_log_bap_init_message_34",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "code": {
                                        "id": "wc_log_bap_init_message_35",
                                        "type": "string",
                                        "minLength": 1
                                    }
                                }
                            },
                            "list": {
                                "id": "wc_log_bap_init_message_36",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "wc_log_bap_init_message_37",
                                    "type": "object",
                                    "properties": {
                                        "descriptor": {
                                            "id": "wc_log_bap_init_message_38",
                                            "type": "object",
                                            "properties": {
                                                "code": {
                                                    "id": "wc_log_bap_init_message_39",
                                                    "type": "string",
                                                    "minLength": 1
                                                }
                                            }
                                        },
                                        "value": {
                                            "id": "wc_log_bap_init_message_40",
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
