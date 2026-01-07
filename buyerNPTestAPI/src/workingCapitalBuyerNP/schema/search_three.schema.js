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
                "provider": {
                    "id": "wc_log_bap_search_message_06",
                    "type": "object",
                    "properties": {
                        "id": {
                            "id": "wc_log_bap_search_message_07",
                            "type": "string",
                            "minLength": 1
                        },
                        "fulfillments": {
                            "id": "wc_log_bap_search_message_08",
                            "type": "array",
                            "minItems": 1,
                            "element": {
                                "id": "wc_log_bap_search_message_09",
                                "type": "object",
                                "properties": {
                                    "customer": {
                                        "id": "wc_log_bap_search_message_10",
                                        "type": "object",
                                        "properties": {
                                            "person": {
                                                "id": "wc_log_bap_search_message_11",
                                                "type": "object",
                                                "properties": {
                                                    "name": {
                                                        "id": "wc_log_bap_search_message_12",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "dob": {
                                                        "id": "wc_log_bap_search_message_13",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "gender": {
                                                        "id": "wc_log_bap_search_message_14",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "creds": {
                                                        "id": "wc_log_bap_search_message_15",
                                                        "type": "array",
                                                        "minItems": 1,
                                                        "element": {
                                                            "id": "wc_log_bap_search_message_16",
                                                            "type": "object",
                                                            "properties": {
                                                                "id": {
                                                                    "id": "wc_log_bap_search_message_17",
                                                                    "type": "string",
                                                                    "minLength": 1
                                                                },
                                                                "type": {
                                                                    "id": "wc_log_bap_search_message_18",
                                                                    "type": "string",
                                                                    "minLength": 1
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            },
                                            "contact": {
                                                "id": "wc_log_bap_search_message_19",
                                                "type": "object",
                                                "properties": {
                                                    "email": {
                                                        "id": "wc_log_bap_search_message_20",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "phone": {
                                                        "id": "wc_log_bap_search_message_21",
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
                            "id": "wc_log_bap_search_message_22",
                            "type": "array",
                            "minItems": 1,
                            "element": {
                                "id": "wc_log_bap_search_message_23",
                                "type": "object",
                                "properties": {
                                    "id": {
                                        "id": "wc_log_bap_search_message_24",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "xinput": {
                                        "id": "wc_log_bap_search_message_25",
                                        "type": "object",
                                        "properties": {
                                            "form": {
                                                "id": "wc_log_bap_search_message_26",
                                                "type": "object",
                                                "properties": {
                                                    "id": {
                                                        "id": "wc_log_bap_search_message_27",
                                                        "type": "string",
                                                        "minLength": 1
                                                    }
                                                }
                                            },
                                            "form_response": {
                                                "id": "wc_log_bap_search_message_28",
                                                "type": "object",
                                                "properties": {
                                                    "status": {
                                                        "id": "wc_log_bap_search_message_29",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "submission_id": {
                                                        "id": "wc_log_bap_search_message_30",
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
                        "tags": {
                            "id": "wc_log_bap_search_message_31",
                            "type": "array",
                            "minItems": 1,
                            "element": {
                                "id": "wc_log_bap_search_message_32",
                                "type": "object",
                                "properties": {
                                    "display": {
                                        "id": "wc_log_bap_search_message_33",
                                        "type": "boolean"
                                    },
                                    "descriptor": {
                                        "id": "wc_log_bap_search_message_34",
                                        "type": "object",
                                        "properties": {
                                            "name": {
                                                "id": "wc_log_bap_search_message_35",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "code": {
                                                "id": "wc_log_bap_search_message_36",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    },
                                    "list": {
                                        "id": "wc_log_bap_search_message_37",
                                        "type": "array",
                                        "minItems": 1,
                                        "element": {
                                            "id": "wc_log_bap_search_message_38",
                                            "type": "object",
                                            "properties": {
                                                "descriptor": {
                                                    "id": "wc_log_bap_search_message_39",
                                                    "type": "object",
                                                    "properties": {
                                                        "code": {
                                                            "id": "wc_log_bap_search_message_40",
                                                            "type": "string",
                                                            "minLength": 1
                                                        }
                                                    }
                                                },
                                                "value": {
                                                    "id": "wc_log_bap_search_message_41",
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
};
