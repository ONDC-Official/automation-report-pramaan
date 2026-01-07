module.exports = {
    "id": "wc_log_bap_select_message_01",
    "type": "object",
    "properties": {
        "order": {
            "id": "wc_log_bap_select_message_02",
            "type": "object",
            "properties": {
                "provider": {
                    "id": "wc_log_bap_select_message_03",
                    "type": "object",
                    "properties": {
                        "id": {
                            "id": "wc_log_bap_select_message_04",
                            "type": "string",
                            "minLength": 1
                        }
                    }
                },
                "fulfillments": {
                    "id": "wc_log_bap_select_message_05",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "wc_log_bap_select_message_06",
                                "type": "string",
                                "minLength": 1
                            },
                            "customer": {
                                "id": "wc_log_bap_select_message_07",
                                "type": "object",
                                "properties": {
                                    "person": {
                                        "id": "wc_log_bap_select_message_08",
                                        "type": "object",
                                        "properties": {
                                            "name": {
                                                "id": "wc_log_bap_select_message_09",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "dob": {
                                                "id": "wc_log_bap_select_message_10",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "gender": {
                                                "id": "wc_log_bap_select_message_11",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "creds": {
                                                "id": "wc_log_bap_select_message_12",
                                                "type": "array",
                                                "minItems": 1,
                                                "element": {
                                                    "type": "object",
                                                    "properties": {
                                                        "id": {
                                                            "id": "wc_log_bap_select_message_13",
                                                            "type": "string",
                                                            "minLength": 1
                                                        },
                                                        "type": {
                                                            "id": "wc_log_bap_select_message_14",
                                                            "type": "string",
                                                            "minLength": 1
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                "contact": {
                                    "id": "wc_log_bap_select_message_15",
                                    "type": "object",
                                    "properties": {
                                        "email": {
                                            "id": "wc_log_bap_select_message_16",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "phone": {
                                            "id": "wc_log_bap_select_message_17",
                                            "type": "string",
                                            "minLength": 1
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "items": {
                    "id": "wc_log_bap_select_message_18",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "wc_log_bap_select_message_19",
                                "type": "string",
                                "minLength": 1
                            },
                            "parent_item_id": {
                                "id": "wc_log_bap_select_message_20",
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