module.exports = {
    "id": "wc_log_bap_search_message_01",
    "type": "object",
    "properties": {
        "intent": {
            "id": "wc_log_bap_search_message_02",
            "type": "object",
            "properties": {
                "category": {
                    "id": "wc_log_bap_search_message_03",
                    "type": "object",
                    "properties": {
                        "descriptor": {
                            "id": "wc_log_bap_search_message_04",
                            "type": "object",
                            "properties": {
                                "code": {
                                    "id": "wc_log_bap_search_message_05",
                                    "type": "string",
                                    "minLength": 1,
                                    "enum": ["WORKING_CAPITAL_LOAN", "SOLE_PROPRIETORSHIP", "PRIVATE_LTD", "PARTNERSHIP_FIRM"]
                                }
                            }
                        }
                    }
                },
                "tags": {
                    "id": "wc_log_bap_search_message_06",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "wc_log_bap_search_message_07",
                        "type": "object",
                        "properties": {
                            "display": {
                                "id": "wc_log_bap_search_message_08",
                                "type": "boolean"
                            },
                            "descriptor": {
                                "id": "wc_log_bap_search_message_09",
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "id": "wc_log_bap_search_message_10",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "code": {
                                        "id": "wc_log_bap_search_message_11",
                                        "type": "string",
                                        "minLength": 1
                                    }
                                }
                            },
                            "list": {
                                "id": "wc_log_bap_search_message_12",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "wc_log_bap_search_message_13",
                                    "type": "object",
                                    "properties": {
                                        "descriptor": {
                                            "id": "wc_log_bap_search_message_14",
                                            "type": "object",
                                            "properties": {
                                                "code": {
                                                    "id": "wc_log_bap_search_message_15",
                                                    "type": "string",
                                                    "minLength": 1
                                                }
                                            }
                                        },
                                        "value": {
                                            "id": "wc_log_bap_search_message_16",
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
};
