module.exports = {
    "type": "object",
    "properties": {
        "order": {
            "id": "b2c_log_bap_init_message_01",
            "type": "object",
            "properties": {
                "provider": {
                    "id": "b2c_log_bap_init_message_02",
                    "type": "object",
                    "properties": {
                        "id": {
                            "id": "b2c_log_bap_init_message_03",
                            "type": "string",
                            "minLength": 1
                        }
                    }
                },
                "items": {
                    "id": "b2c_log_bap_init_message_04",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "b2c_log_bap_init_message_05",
                                "type": "string",
                                "minLength": 1
                            },
                            "fulfillment_id": {
                                "id": "b2c_log_bap_init_message_06",
                                "type": "string",
                                "minLength": 1
                            },
                            "category_id": {
                                "id": "b2c_log_bap_init_message_07",
                                "type": "string",
                                "minLength": 1
                            },
                            "descriptor": {
                                "id": "b2c_log_bap_init_message_08",
                                "type": "object",
                                "properties": {
                                    "code": {
                                        "id": "b2c_log_bap_init_message_09",
                                        "type": "string",
                                        "minLength": 1
                                    }
                                }
                            }
                        }
                    }
                },
                "fulfillments": {
                    "id": "b2c_log_bap_init_message_10",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "b2c_log_bap_init_message_11",
                                "type": "string",
                                "minLength": 1
                            },
                            "type": {
                                "id": "b2c_log_bap_init_message_12",
                                "type": "string",
                                "minLength": 1,
                                "enum": ["Delivery", "Return"]
                            },
                            "start": {
                                "id": "b2c_log_bap_init_message_13",
                                "type": "object",
                                "properties": {
                                    "location": {
                                        "id": "b2c_log_bap_init_message_14",
                                        "type": "object",
                                        "properties": {
                                            "gps": {
                                                "id": "b2c_log_bap_init_message_15",
                                                "type": "string",
                                                "minLength": 1,
                                                "pattern": "^-?\\d{1,3}\\.\\d{6}, ?-?\\d{1,3}\\.\\d{6}$",
                                                "errorMessage": "gps coordinates must have 6 digits after decimal"
                                            },
                                            "address": {
                                                "id": "b2c_log_bap_init_message_16",
                                                "type": "object",
                                                "properties": {
                                                    "name": {
                                                        "id": "b2c_log_bap_init_message_17",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "building": {
                                                        "id": "b2c_log_bap_init_message_18",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "locality": {
                                                        "id": "b2c_log_bap_init_message_19",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "city": {
                                                        "id": "b2c_log_bap_init_message_20",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "state": {
                                                        "id": "b2c_log_bap_init_message_21",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "country": {
                                                        "id": "b2c_log_bap_init_message_22",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "area_code": {
                                                        "id": "b2c_log_bap_init_message_23",
                                                        "type": "string",
                                                        "minLength": 1,
                                                        "pattern": "^\\d{6}$",
                                                        "errorMessage": "area_code should be in proper format"
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "contact": {
                                        "id": "b2c_log_bap_init_message_24",
                                        "type": "object",
                                        "properties": {
                                            "phone": {
                                                "id": "b2c_log_bap_init_message_25",
                                                "type": "string",
                                               "minLength": 1,
                                                "compliance": "phone"
                                            },
                                            "email": {
                                                "id": "b2c_log_bap_init_message_26",
                                                "type": "string",
                                                "minLength": 1,
                                                "compliance": "email"
                                            }
                                        }
                                    }
                                }
                            },
                            "end": {
                                "id": "b2c_log_bap_init_message_27",
                                "type": "object",
                                "properties": {
                                    "location": {
                                        "id": "b2c_log_bap_init_message_28",
                                        "type": "object",
                                        "properties": {
                                            "gps": {
                                                "id": "b2c_log_bap_init_message_29",
                                                "type": "string",
                                                "minLength": 1,
                                                "pattern": "^-?\\d{1,3}\\.\\d{6}, ?-?\\d{1,3}\\.\\d{6}$",
                                                "errorMessage": "gps coordinates must have 6 digits after decimal"
                                            },
                                            "address": {
                                                "id": "b2c_log_bap_init_message_30",
                                                "type": "object",
                                                "properties": {
                                                    "name": {
                                                        "id": "b2c_log_bap_init_message_31",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "building": {
                                                        "id": "b2c_log_bap_init_message_32",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "locality": {
                                                        "id": "b2c_log_bap_init_message_33",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "city": {
                                                        "id": "b2c_log_bap_init_message_34",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "state": {
                                                        "id": "b2c_log_bap_init_message_35",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "country": {
                                                        "id": "b2c_log_bap_init_message_36",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "area_code": {
                                                        "id": "b2c_log_bap_init_message_37",
                                                        "type": "string",
                                                        "minLength": 1,
                                                        "pattern": "^\\d{6}$",
                                                        "errorMessage": "area_code should be in proper format"
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "contact": {
                                        "id": "b2c_log_bap_init_message_38",
                                        "type": "object",
                                        "properties": {
                                            "phone": {
                                                "id": "b2c_log_bap_init_message_39",
                                                "type": "string",
                                               "minLength": 1,
                                                "compliance": "phone"
                                            },
                                            "email": {
                                                "id": "b2c_log_bap_init_message_40",
                                                "type": "string",
                                                "minLength": 1,
                                                "compliance": "email"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "billing": {
                "id": "b2c_log_bap_init_message_41",
                "type": "object",
                "properties": {
                    "name": {
                        "id": "b2c_log_bap_init_message_42",
                        "type": "string",
                        "minLength": 1
                    },
                    "address": {
                        "id": "b2c_log_bap_init_message_43",
                        "type": "object",
                        "properties": {
                            "name": {
                                "id": "b2c_log_bap_init_message_44",
                                "type": "string",
                                "minLength": 1
                            },
                            "building": {
                                "id": "b2c_log_bap_init_message_45",
                                "type": "string",
                                "minLength": 1
                            },
                            "locality": {
                                "id": "b2c_log_bap_init_message_46",
                                "type": "string",
                                "minLength": 1
                            },
                            "city": {
                                "id": "b2c_log_bap_init_message_47",
                                "type": "string",
                                "minLength": 1
                            },
                            "state": {
                                "id": "b2c_log_bap_init_message_48",
                                "type": "string",
                                "minLength": 1
                            },
                            "country": {
                                "id": "b2c_log_bap_init_message_49",
                                "type": "string",
                                "minLength": 1
                            },
                            "area_code": {
                                "id": "b2c_log_bap_init_message_50",
                                "type": "string",
                                "minLength": 1,
                                "pattern": "^\\d{6}$",
                                "errorMessage": "area_code should be in proper format"
                            }
                        }
                    },
                    "tax_number": {
                        "id": "b2c_log_bap_init_message_51",
                        "type": "string",
                        "minLength": 1
                    },
                    "phone": {
                        "id": "b2c_log_bap_init_message_52",
                        "type": "string",
                        "minLength": 1,
                        "compliance": "phone"
                    },
                    "email": {
                        "id": "b2c_log_bap_init_message_53",
                        "type": "string",
                        "minLength": 1,
                        "compliance": "email"
                    },
                    "created_at": {
                        "id": "b2c_log_bap_init_message_54",
                        "type": "string",
                        "minLength": 1,
                        "format": "rfc3339-date-time",
                        "errorMessage": "Time must be RFC3339 UTC timestamp format."
                    },
                    "updated_at": {
                        "id": "b2c_log_bap_init_message_55",
                        "type": "string",
                        "minLength": 1,
                        "format": "rfc3339-date-time",
                        "errorMessage": "Time must be RFC3339 UTC timestamp format."
                    }
                }
            },
            "payment": {
                "id": "b2c_log_bap_init_message_56",
                "type": "object",
                "properties": {
                    "type": {
                        "id": "b2c_log_bap_init_message_57",
                        "type": "string",
                        "minLength": 1,
                        "enum": ["ON-ORDER", "ON-FULFILLMENT", "POST-FULFILLMENT"]
                    }
                }
            }
        }
    }
};