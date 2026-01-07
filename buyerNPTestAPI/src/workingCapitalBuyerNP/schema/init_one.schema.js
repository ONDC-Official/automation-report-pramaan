module.exports = {
    "id": "wc_log_bap_init_message_01",
    "type": "object",
    "properties": {
        "order": {
            "id": "wc_log_bap_init_message_02",
            "type": "object",
            "properties": {
                "provider": {
                    "id": "wc_log_bap_init_message_03",
                    "type": "object",
                    "properties": {
                        "id": {
                            "id": "wc_log_bap_init_message_04",
                            "type": "string",
                            "minLength": 1
                        }
                    }
                },
                "fulfillments": {
                    "id": "wc_log_bap_init_message_05",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "wc_log_bap_init_message_06",
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "wc_log_bap_init_message_07",
                                "type": "string",
                                "minLength": 1
                            },
                            "customer": {
                                "id": "wc_log_bap_init_message_08",
                                "type": "object",
                                "properties": {
                                    "person": {
                                        "id": "wc_log_bap_init_message_09",
                                        "type": "object",
                                        "properties": {
                                            "name": {
                                                "id": "wc_log_bap_init_message_10",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "dob": {
                                                "id": "wc_log_bap_init_message_11",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "gender": {
                                                "id": "wc_log_bap_init_message_12",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "creds": {
                                                "id": "wc_log_bap_init_message_13",
                                                "type": "array",
                                                "minItems": 1,
                                                "element": {
                                                    "id": "wc_log_bap_init_message_14",
                                                    "type": "object",
                                                    "properties": {
                                                        "id": {
                                                            "id": "wc_log_bap_init_message_15",
                                                            "type": "string",
                                                            "minLength": 1
                                                        },
                                                        "type": {
                                                            "id": "wc_log_bap_init_message_16",
                                                            "type": "string",
                                                            "minLength": 1
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "contact": {
                                        "id": "wc_log_bap_init_message_17",
                                        "type": "object",
                                        "properties": {
                                            "email": {
                                                "id": "wc_log_bap_init_message_18",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "phone": {
                                                "id": "wc_log_bap_init_message_19",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "items": {
                    "id": "wc_log_bap_init_message_20",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "wc_log_bap_init_message_21",
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "wc_log_bap_init_message_22",
                                "type": "string",
                                "minLength": 1
                            },
                            "parent_item_id": {
                                "id": "wc_log_bap_init_message_23",
                                "type": "string",
                                "minLength": 1
                            }
                        }
                    }
                },
                "tags": {
                    "id": "wc_log_bap_init_message_24",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "wc_log_bap_init_message_25",
                        "type": "object",
                        "properties": {
                            "display": {
                                "id": "wc_log_bap_init_message_26",
                                "type": "boolean"
                            },
                            "descriptor": {
                                "id": "wc_log_bap_init_message_27",
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "id": "wc_log_bap_init_message_28",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "code": {
                                        "id": "wc_log_bap_init_message_29",
                                        "type": "string",
                                        "minLength": 1
                                    }
                                }
                            },
                            "list": {
                                "id": "wc_log_bap_init_message_30",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "wc_log_bap_init_message_31",
                                    "type": "object",
                                    "properties": {
                                        "descriptor": {
                                            "id": "wc_log_bap_init_message_32",
                                            "type": "object",
                                            "properties": {
                                                "code": {
                                                    "id": "wc_log_bap_init_message_33",
                                                    "type": "string",
                                                    "minLength": 1
                                                }
                                            }
                                        },
                                        "value": {
                                            "id": "wc_log_bap_init_message_34",
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
