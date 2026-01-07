module.exports = {
    "type": "object",
    "properties": {
        "intent": {
            "id": "b2c_log_bap_search_message_01",
            "type": "object",
            "properties": {
                "category": {
                    "id": "b2c_log_bap_search_message_02",
                    "type": "object",
                    "properties": {
                        "id": {
                            "id": "b2c_log_bap_search_message_03",
                            "type": "string",
                            "minLength": 1
                        }
                    }
                },
                "provider": {
                    "id": "b2c_log_bap_search_message_04",
                    "type": "object",
                    "properties": {
                        "time": {
                            "id": "b2c_log_bap_search_message_05",
                            "type": "object",
                            "properties": {
                                "days": {
                                    "id": "b2c_log_bap_search_message_06",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "duration": {
                                    "id": "b2c_log_bap_search_message_07",
                                    "type": "string",
                                    "minLength": 1,
                                    "format": "duration",
                                    "errorMessage": "Duration must be RFC3339 duration."
                                },
                                "range": {
                                    "id": "b2c_log_bap_search_message_08",
                                    "type": "object",
                                    "properties": {
                                        "start": {
                                            "id": "b2c_log_bap_search_message_09",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "end": {
                                            "id": "b2c_log_bap_search_message_10",
                                            "type": "string",
                                            "minLength": 1
                                        }
                                    }
                                },
                                "schedule": {
                                    "id": "b2c_log_bap_search_message_11",
                                    "type": "object",
                                    "properties": {
                                        "holidays": {
                                            "id": "b2c_log_bap_search_message_12",
                                            "type": "array",
                                            "minItems": 1,
                                            "element": {
                                                "id": "b2c_log_bap_search_message_13",
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
                "fulfillment": {
                    "id": "b2c_log_bap_search_message_14",
                    "type": "object",
                    "properties": {
                        "type": {
                            "id": "b2c_log_bap_search_message_15",
                            "type": "string",
                            "minLength": 1,
                            "enum": ["Delivery", "Return"]
                        },
                        "start": {
                            "id": "b2c_log_bap_search_message_16",
                            "type": "object",
                            "properties": {
                                "location": {
                                    "id": "b2c_log_bap_search_message_17",
                                    "type": "object",
                                    "properties": {
                                        "gps": {
                                            "id": "b2c_log_bap_search_message_18",
                                            "type": "string",
                                            "minLength": 1,
                                            "pattern": "^-?\\d{1,3}\\.\\d{6}, ?-?\\d{1,3}\\.\\d{6}$",
                                            "errorMessage": "gps coordinates must have 6 digits after decimal"
                                        },
                                        "address": {
                                            "id": "b2c_log_bap_search_message_19",
                                            "type": "object",
                                            "properties": {
                                                "area_code": {
                                                    "id": "b2c_log_bap_search_message_20",
                                                    "type": "string",
                                                    "minLength": 1,
                                                    "pattern": "^\\d{6}$",
                                                    "errorMessage": "area_code should be in proper format"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "end": {
                            "id": "b2c_log_bap_search_message_21",
                            "type": "object",
                            "properties": {
                                "location": {
                                    "id": "b2c_log_bap_search_message_22",
                                    "type": "object",
                                    "properties": {
                                        "gps": {
                                            "id": "b2c_log_bap_search_message_23",
                                            "type": "string",
                                            "minLength": 1,
                                            "pattern": "^-?\\d{1,3}\\.\\d{6}, ?-?\\d{1,3}\\.\\d{6}$",
                                            "errorMessage": "gps coordinates must have 6 digits after decimal"
                                        },
                                        "address": {
                                            "id": "b2c_log_bap_search_message_24",
                                            "type": "object",
                                            "properties": {
                                                "area_code": {
                                                    "id": "b2c_log_bap_search_message_25",
                                                    "type": "string",
                                                    "minLength": 1,
                                                    "pattern": "^\\d{6}$",
                                                    "errorMessage": "area_code should be in proper format"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "payment": {
                    "id": "b2c_log_bap_search_message_26",
                    "type": "object",
                    "properties": {
                        "type": {
                            "id": "b2c_log_bap_search_message_27",
                            "type": "string",
                            "minLength": 1,
                            "enum": ["ON-ORDER", "ON-FULFILLMENT", "POST-FULFILLMENT"]
                        }
                    }
                },
                "@ondc/org/payload_details": {
                    "id": "b2c_log_bap_search_message_28",
                    "type": "object",
                    "properties": {
                        "category": {
                            "id": "b2c_log_bap_search_message_29",
                            "type": "string",
                            "minLength": 1
                        },
                        "value": {
                            "id": "b2c_log_bap_search_message_30",
                            "type": "object",
                            "properties": {
                                "currency": {
                                    "id": "b2c_log_bap_search_message_31",
                                    "type": "string",
                                    "minLength": 1,
                                    "compliance": "currency"
                                },
                                "value": {
                                    "id": "b2c_log_bap_search_message_32",
                                    "type": "string",
                                    "minLength": 1
                                }
                            }
                        },
                        "dangerous_goods": {
                            "id": "b2c_log_bap_search_message_33",
                            "type": "boolean"
                        },
                        "dimensions": {
                            "id": "b2c_log_bap_search_message_34",
                            "type": "object",
                            "properties": {
                                "length": {
                                    "id": "b2c_log_bap_search_message_35",
                                    "type": "object",
                                    "properties": {
                                        "unit": {
                                            "id": "b2c_log_bap_search_message_36",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "value": {
                                            "id": "b2c_log_bap_search_message_37",
                                            "type": "number"
                                        }
                                    }
                                },
                                "breadth": {
                                    "id": "b2c_log_bap_search_message_38",
                                    "type": "object",
                                    "properties": {
                                        "unit": {
                                            "id": "b2c_log_bap_search_message_39",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "value": {
                                            "id": "b2c_log_bap_search_message_40",
                                            "type": "number"
                                        }
                                    }
                                },
                                "height": {
                                    "id": "b2c_log_bap_search_message_41",
                                    "type": "object",
                                    "properties": {
                                        "unit": {
                                            "id": "b2c_log_bap_search_message_42",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "value": {
                                            "id": "b2c_log_bap_search_message_43",
                                            "type": "number"
                                        }
                                    }
                                }
                            }
                        },
                        "weight": {
                            "id": "b2c_log_bap_search_message_44",
                            "type": "object",
                            "properties": {
                                "unit": {
                                    "id": "b2c_log_bap_search_message_45",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "value": {
                                    "id": "b2c_log_bap_search_message_46",
                                    "type": "number"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "required": ["intent"]
};
