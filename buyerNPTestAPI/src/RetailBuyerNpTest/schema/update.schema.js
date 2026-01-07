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
                                                            "id": "retail_bap_update_message_13",
                                                            "type": "object",
                                                            "properties": {
                                                                "code": {
                                                                    "id": "retail_bap_update_message_14",
                                                                    "type": "string",
                                                                    "minLength": 1,
                                                                    "enum": ["id"]
                                                                },
                                                                "value": {
                                                                    "id": "retail_bap_update_message_15",
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
                                                            "id": "retail_bap_update_message_16",
                                                            "type": "object",
                                                            "properties": {
                                                                "code": {
                                                                    "id": "retail_bap_update_message_17",
                                                                    "type": "string",
                                                                    "minLength": 1,
                                                                    "enum": ["item_id"]
                                                                },
                                                                "value": {
                                                                    "id": "retail_bap_update_message_18",
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
                                                            "id": "retail_bap_update_message_19",
                                                            "type": "object",
                                                            "properties": {
                                                                "code": {
                                                                    "id": "retail_bap_update_message_20",
                                                                    "type": "string",
                                                                    "minLength": 1,
                                                                    "enum": ["parent_item_id"]
                                                                },
                                                                "value": {
                                                                    "id": "retail_bap_update_message_21",
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
                                                            "id": "retail_bap_update_message_22",
                                                            "type": "object",
                                                            "properties": {
                                                                "code": {
                                                                    "id": "retail_bap_update_message_23",
                                                                    "type": "string",
                                                                    "minLength": 1,
                                                                    "enum": ["item_quantity"]
                                                                },
                                                                "value": {
                                                                    "id": "retail_bap_update_message_24",
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
                                                            "id": "retail_bap_update_message_25",
                                                            "type": "object",
                                                            "properties": {
                                                                "code": {
                                                                    "id": "retail_bap_update_message_26",
                                                                    "type": "string",
                                                                    "minLength": 1,
                                                                    "enum": ["reason_id"]
                                                                },
                                                                "value": {
                                                                    "id": "retail_bap_update_message_27",
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
                                                            "id": "retail_bap_update_message_28",
                                                            "type": "object",
                                                            "properties": {
                                                                "code": {
                                                                    "id": "retail_bap_update_message_29",
                                                                    "type": "string",
                                                                    "minLength": 1,
                                                                    "enum": ["reason_desc"]
                                                                },
                                                                "value": {
                                                                    "id": "retail_bap_update_message_30",
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
                                                            "id": "retail_bap_update_message_31",
                                                            "type": "object",
                                                            "properties": {
                                                                "code": {
                                                                    "id": "retail_bap_update_message_32",
                                                                    "type": "string",
                                                                    "minLength": 1,
                                                                    "enum": ["images"]
                                                                },
                                                                "value": {
                                                                    "id": "retail_bap_update_message_33",
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
                                                            "id": "retail_bap_update_message_34",
                                                            "type": "object",
                                                            "properties": {
                                                                "code": {
                                                                    "id": "retail_bap_update_message_35",
                                                                    "type": "string",
                                                                    "minLength": 1,
                                                                    "enum": ["ttl_approval"]
                                                                },
                                                                "value": {
                                                                    "id": "retail_bap_update_message_36",
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
                                                            "id": "retail_bap_update_message_37",
                                                            "type": "object",
                                                            "properties": {
                                                                "code": {
                                                                    "id": "retail_bap_update_message_38",
                                                                    "type": "string",
                                                                    "minLength": 1,
                                                                    "enum": ["ttl_reverseqc"]
                                                                },
                                                                "value": {
                                                                    "id": "retail_bap_update_message_39",
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
                                                "type": {
                                                    "const": "Return"
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
                                                "type": {
                                                    "const": "Cance"
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
                // "payment": {
                //     "type": "object",
                //     "properties": {
                //         "@ondc/org/settlement_details": {
                //             "type": "array",
                //             "minItems": 1,
                //             "element": {
                //                 "type": "object",
                //                 "properties": {
                //                     "settlement_timestamp": {
                //                         "type": "string",
                //                         "minLength": 1
                //                     },
                //                     "settlement_counterparty": {
                //                         "type": "string",
                //                         "minLength": 1
                //                     },
                //                     "settlement_phase": {
                //                         "type": "string",
                //                         "minLength": 1
                //                     },
                //                     "settlement_type": {
                //                         "type": "string",
                //                         "minLength": 1
                //                     },
                //                     "settlement_amount": {
                //                         "type": "string",
                //                         "minLength": 1
                //                     }
                //                 }
                //             }
                //         }
                //     }
                // }
            },
            // "required": {
            //     "type": "array",
            //     "element": {
            //         "allOf": [
            //             {
            //                 "if": {
            //                     "properties": {
            //                         "update_target": {
            //                             "const": "payment"
            //                         }
            //                     }
            //                 },
            //                 "then": [
            //                     "id",
            //                     "fulfillments",
            //                     "payment"
            //                 ]
            //             },
            //             {
            //                 "if": {
            //                     "properties": {
            //                         "state": {
            //                             "const": "Completed"
            //                         }
            //                     }
            //                 },
            //                 "then": [
            //                     "id",
            //                     "fulfillments",
            //                 ]
            //             }
            //         ]
            //     }
            // }
        }
    },
    "required": ["order"]
}