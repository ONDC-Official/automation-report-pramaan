module.exports = {
    "id": "retail_bap_update_message_01",
    "type": "object",
    "properties": {
        "update_target": {
            "id": "retail_bap_update_message_02",
            "type": "string",
            "minLength": 1
        },
        "order": {
            "id": "retail_bap_update_message_03",
            "type": "object",
            "properties": {
                "id": {
                    "id": "retail_bap_update_message_04",
                    "type": "string",
                    "minLength": 1,
                    "maxLength": 32
                },
                "fulfillments": {
                    "id": "retail_bap_update_message_05",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "retail_bap_update_message_06",
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "retail_bap_update_message_07",
                                "type": "string",
                                "minLength": 1
                            },
                            "type": {
                                "id": "retail_bap_update_message_08",
                                "type": "string",
                                "minLength": 1
                            },
                            "tags": {
                                "id": "retail_bap_update_message_09",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "retail_bap_update_message_10",
                                    "type": "object",
                                    "properties": {
                                        "code": {
                                            "id": "retail_bap_update_message_11",
                                            "type": "string",
                                            "minLength": 1,
                                            "enum": [
                                                "return_request"
                                            ]
                                        },
                                        "list": {
                                            "id": "retail_bap_update_message_12",
                                            "type": "array",
                                            "minItems": 1,
                                            "element": {
                                                "allOf": [
                                                    {
                                                        "if": {
                                                            "properties": {
                                                                "code": {
                                                                    "const": "id"
                                                                }
                                                            }
                                                        },
                                                        "then": {
                                                            "type": "object",
                                                            "properties": {
                                                                "code": {
                                                                    "type": "string",
                                                                    "minLength": 1,
                                                                    "enum": ["id"]
                                                                },
                                                                "value": {
                                                                    "type": "string",
                                                                    "minLength": 1
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        "if": {
                                                            "properties": {
                                                                "code": {
                                                                    "const": "item_id"
                                                                }
                                                            }
                                                        },
                                                        "then": {
                                                            "type": "object",
                                                            "properties": {
                                                                "code": {
                                                                    "type": "string",
                                                                    "minLength": 1,
                                                                    "enum": ["item_id"]
                                                                },
                                                                "value": {
                                                                    "type": "string",
                                                                    "minLength": 1
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        "if": {
                                                            "properties": {
                                                                "code": {
                                                                    "const": "parent_item_id"
                                                                }
                                                            }
                                                        },
                                                        "then": {
                                                            "type": "object",
                                                            "properties": {
                                                                "code": {
                                                                    "type": "string",
                                                                    "minLength": 1,
                                                                    "enum": ["parent_item_id"]
                                                                },
                                                                "value": {
                                                                    "type": "string",
                                                                    "minLength": 1
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        "if": {
                                                            "properties": {
                                                                "code": {
                                                                    "const": "item_quantity"
                                                                }
                                                            }
                                                        },
                                                        "then": {
                                                            "type": "object",
                                                            "properties": {
                                                                "code": {
                                                                    "type": "string",
                                                                    "minLength": 1,
                                                                    "enum": ["item_quantity"]
                                                                },
                                                                "value": {
                                                                    "type": "string",
                                                                    "minLength": 1
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        "if": {
                                                            "properties": {
                                                                "code": {
                                                                    "const": "reason_id"
                                                                }
                                                            }
                                                        },
                                                        "then": {
                                                            "type": "object",
                                                            "properties": {
                                                                "code": {
                                                                    "type": "string",
                                                                    "minLength": 1,
                                                                    "enum": ["reason_id"]
                                                                },
                                                                "value": {
                                                                    "type": "string",
                                                                    "minLength": 1
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        "if": {
                                                            "properties": {
                                                                "code": {
                                                                    "const": "reason_desc"
                                                                }
                                                            }
                                                        },
                                                        "then": {
                                                            "type": "object",
                                                            "properties": {
                                                                "code": {
                                                                    "type": "string",
                                                                    "minLength": 1,
                                                                    "enum": ["reason_desc"]
                                                                },
                                                                "value": {
                                                                    "type": "string",
                                                                    "minLength": 0
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        "if": {
                                                            "properties": {
                                                                "code": {
                                                                    "const": "images"
                                                                }
                                                            }
                                                        },
                                                        "then": {
                                                            "type": "object",
                                                            "properties": {
                                                                "code": {
                                                                    "type": "string",
                                                                    "minLength": 1,
                                                                    "enum": ["images"]
                                                                },
                                                                "value": {
                                                                    "type": "string",
                                                                    "minLength": 1
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        "if": {
                                                            "properties": {
                                                                "code": {
                                                                    "const": "ttl_approval"
                                                                }
                                                            }
                                                        },
                                                        "then": {
                                                            "type": "object",
                                                            "properties": {
                                                                "code": {
                                                                    "type": "string",
                                                                    "minLength": 1,
                                                                    "enum": ["ttl_approval"]
                                                                },
                                                                "value": {
                                                                    "type": "string",
                                                                    "minLength": 1,
                                                                    "format": "duration",
                                                                    "errorMessage": "Duration must be RFC3339 duration."
                                                                }
                                                            }
                                                        }
                                                    },
                                                    {
                                                        "if": {
                                                            "properties": {
                                                                "code": {
                                                                    "const": "ttl_reverseqc"
                                                                }
                                                            }
                                                        },
                                                        "then": {
                                                            "type": "object",
                                                            "properties": {
                                                                "code": {
                                                                    "type": "string",
                                                                    "minLength": 1,
                                                                    "enum": ["ttl_reverseqc"]
                                                                },
                                                                "value": {
                                                                    "type": "string",
                                                                    "minLength": 1,
                                                                    "format": "duration",
                                                                    "errorMessage": "Duration must be RFC3339 duration."
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
                        },
                        "required": {
                            "type": "array",
                            "element": {
                                "allOf": [
                                    {
                                        "if": {
                                            "properties": {
                                                "update_target": {
                                                    "const": "item"
                                                }
                                            }
                                        },
                                        "then": [
                                            "type",
                                            "tags"
                                        ]
                                    },
                                    {
                                        "if": {
                                            "properties": {
                                                "update_target": {
                                                    "const": "payment"
                                                }
                                            }
                                        },
                                        "then": [
                                            "type",
                                            "id"
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                },
                "payment": {
                    "id": "retail_bap_update_message_13",
                    "type": "object",
                    "properties": {
                        "@ondc/org/settlement_details": {
                            "id": "retail_bap_update_message_14",
                            "type": "array",
                            "minItems": 1,
                            "element": {
                                "id": "retail_bap_update_message_15",
                                "type": "object",
                                "properties": {
                                    "settlement_timestamp": {
                                        "id": "retail_bap_update_message_16",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "settlement_counterparty": {
                                        "id": "retail_bap_update_message_17",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "settlement_phase": {
                                        "id": "retail_bap_update_message_18",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "settlement_type": {
                                        "id": "retail_bap_update_message_19",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "settlement_amount": {
                                        "id": "retail_bap_update_message_20",
                                        "type": "string",
                                        "minLength": 1
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "required": {
                "type": "array",
                "element": {
                    "allOf": [
                        {
                            "if": {
                                "properties": {
                                    "update_target": {
                                        "const": "payment"
                                    }
                                }
                            },
                            "then": [
                                "id",
                                "fulfillments",
                                "payment"
                            ]
                        },
                        {
                            "if": {
                                "properties": {
                                    "update_target": {
                                        "const": "item"
                                    }
                                }
                            },
                            "then": [
                                "id",
                                "fulfillments",
                            ]
                        }
                    ]
                }
            }
        }
    },
    "required": ["order"]
}