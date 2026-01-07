// max id - 48
module.exports = {
    "id": "gc_bap_init_01",
    "type": "object",
    "properties": {
        "order": {
            "id": "gc_bap_init_02",
            "type": "object",
            "properties": {
                "provider": {
                    "id": "gc_bap_init_03",
                    "type": "object",
                    "properties": {
                        "id": {
                            "id": "gc_bap_init_04",
                            "type": "string",
                            "minLength": 1
                        }
                    }
                },
                "fulfillments": {
                    "id": "gc_bap_init_05",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "gc_bap_init_06",
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "gc_bap_init_07",
                                "type": "string",
                                "minLength": 1
                            },
                            "id": "gc_bap_init_08",
                            "type": {
                                "id": "gc_bap_init_09",
                                "type": "string",
                                "minLength": 1,
                                "enum": ["ONLINE_EMAIL", "ONLINE_SMS", "ONLINE_EMAIL_SMS", "BPP_ONLINE_EMAIL_SMS", "BAP"]
                            },
                            "stops": {
                                "id": "gc_bap_init_10",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "gc_bap_init_11",
                                    "type": "object",
                                    "properties": {
                                        "contact": {
                                            "id": "gc_bap_init_12",
                                            "type": "object",
                                            "properties": {
                                                "phone": {
                                                    "id": "gc_bap_init_13",
                                                    "type": "string",
                                                    "minLength": 1
                                                },
                                                "email": {
                                                    "id": "gc_bap_init_14",
                                                    "type": "string",
                                                    "minLength": 1,
                                                    "compliance": "email"
                                                }
                                            }
                                        },
                                        "person": {
                                            "id": "gc_bap_init_15",
                                            "type": "object",
                                            "properties": {
                                                "name": {
                                                    "id": "gc_bap_init_16",
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
                },
                "items": {
                    "id": "gc_bap_init_17",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "gc_bap_init_18",
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "gc_bap_init_19",
                                "type": "string",
                                "minLength": 1
                            },
                            "quantity": {
                                "id": "gc_bap_init_20",
                                "type": "object",
                                "properties": {
                                    "selected": {
                                        "id": "gc_bap_init_21",
                                        "type": "object",
                                        "properties": {
                                            "count": {
                                                "id": "gc_bap_init_22",
                                                "type": "number"
                                            }
                                        }
                                    }
                                }
                            },
                            "fulfillment_ids": {
                                "id": "gc_bap_init_23",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "gc_bap_init_24",
                                    "type": "string",
                                    "minLength": 1
                                }
                            },
                            "tags": {
                                "id": "gc_bap_init_25",
                                "type": "array",
                                "minItems": 1,
                                "optional": true,
                                "element": {
                                    "id": "gc_bap_init_26",
                                    "type": "object",
                                    "optional": true,
                                    "properties": {
                                        "descriptor": {
                                            "id": "gc_bap_init_27",
                                            "type": "object",
                                            "optional": true,
                                            "properties": {
                                                "code": {
                                                    "id": "gc_bap_init_28",
                                                    "type": "string",
                                                    "minLength": 1,
                                                    "optional": true,
                                                    "enum": ["CUSTOMIZATION"]
                                                }
                                            }
                                        },
                                        "list": {
                                            "id": "gc_bap_init_29",
                                            "type": "array",
                                            "minItems": 1,
                                            "element": {
                                                "allOf": [
                                                    {
                                                        "if": {
                                                            "properties": {
                                                                "descriptor": {
                                                                    "code": {
                                                                        "const": "RECEIVER_NAME"
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        "then": {
                                                            "id": "gc_bap_init_30",
                                                            "type": "object",
                                                            "optional": true,
                                                            "properties": {
                                                                "descriptor": {
                                                                    "id": "gc_bap_init_31",
                                                                    "type": "object",
                                                                    "optional": true,
                                                                    "properties": {
                                                                        "code": {
                                                                            "id": "gc_bap_init_32",
                                                                            "type": "string",
                                                                            "minLength": 1,
                                                                            "optional": true,
                                                                            "enum": ["RECEIVER_NAME"]
                                                                        }
                                                                    }
                                                                },
                                                                "value": {
                                                                    "id": "gc_bap_init_33",
                                                                    "type": "string",
                                                                    "optional": true,
                                                                    "minLength": 1
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        "if": {
                                                            "properties": {
                                                                "descriptor": {
                                                                    "code": {
                                                                        "const": "MESSAGE"
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        "then": {
                                                            "id": "gc_bap_init_45",
                                                            "type": "object",
                                                            "optional": true,
                                                            "properties": {
                                                                "descriptor": {
                                                                    "id": "gc_bap_init_46",
                                                                    "type": "object",
                                                                    "optional": true,
                                                                    "properties": {
                                                                        "code": {
                                                                            "id": "gc_bap_init_47",
                                                                            "type": "string",
                                                                            "minLength": 1,
                                                                            "optional": true,
                                                                            "enum": ["MESSAGE"]
                                                                        }
                                                                    }
                                                                },
                                                                "value": {
                                                                    "id": "gc_bap_init_48",
                                                                    "type": "string",
                                                                    "optional": true,
                                                                    "minLength": 1
                                                                }
                                                            }
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "billing": {
                    "id": "gc_bap_init_34",
                    "type": "object",
                    "properties": {
                        "name": {
                            "id": "gc_bap_init_35",
                            "type": "string",
                            "minLength": 1
                        },
                        "address": {
                            "id": "gc_bap_init_36",
                            "type": "string",
                            "minLength": 1
                        },
                        "city": {
                            "id": "gc_bap_init_37",
                            "type": "object",
                            "properties": {
                                "name": {
                                    "id": "gc_bap_init_38",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "code": {
                                    "id": "gc_bap_init_39",
                                    "type": "string",
                                    "minLength": 1,
                                    "compliance": "city"
                                }
                            }
                        },
                        "state": {
                            "id": "gc_bap_init_40",
                            "type": "object",
                            "properties": {
                                "name": {
                                    "id": "gc_bap_init_41",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "code": {
                                    "id": "gc_bap_init_42",
                                    "type": "string",
                                    "minLength": 1
                                }
                            }
                        },
                        "email": {
                            "id": "gc_bap_init_43",
                            "type": "string",
                            "minLength": 1,
                            "compliance": "email"
                        },
                        "phone": {
                            "id": "gc_bap_init_44",
                            "type": "string",
                            "minLength": 1
                        }
                    }
                }
            }
        }
    }
};
