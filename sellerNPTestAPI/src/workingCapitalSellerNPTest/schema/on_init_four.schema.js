module.exports = {
    "id": "wc_log_bpp_on_init_message_01",
    "type": "object",
    "properties": {
        "order": {
            "id": "wc_log_bpp_on_init_message_02",
            "type": "object",
            "properties": {
                "provider": {
                    "id": "wc_log_bpp_on_init_message_03",
                    "type": "object",
                    "properties": {
                        "id": {
                            "id": "wc_log_bpp_on_init_message_04",
                            "type": "string",
                            "minLength": 1
                        },
                        "descriptor": {
                            "id": "wc_log_bpp_on_init_message_05",
                            "type": "object",
                            "properties": {
                                "images": {
                                    "id": "wc_log_bpp_on_init_message_06",
                                    "type": "array",
                                    "minItems": 1,
                                    "element": {
                                        "id": "wc_log_bpp_on_init_message_07",
                                        "type": "object",
                                        "properties": {
                                            "size_type": {
                                                "id": "wc_log_bpp_on_init_message_08",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "url": {
                                                "id": "wc_log_bpp_on_init_message_09",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    }
                                },
                                "long_desc": {
                                    "id": "wc_log_bpp_on_init_message_10",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "name": {
                                    "id": "wc_log_bpp_on_init_message_11",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "short_desc": {
                                    "id": "wc_log_bpp_on_init_message_12",
                                    "type": "string",
                                    "minLength": 1
                                }
                            }
                        },
                        "tags": {
                            "id": "wc_log_bpp_on_init_message_13",
                            "type": "array",
                            "minItems": 1,
                            "element": {
                                "id": "wc_log_bpp_on_init_message_14",
                                "type": "object",
                                "properties": {
                                    "descriptor": {
                                        "id": "wc_log_bpp_on_init_message_15",
                                        "type": "object",
                                        "properties": {
                                            "code": {
                                                "id": "wc_log_bpp_on_init_message_16",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "name": {
                                                "id": "wc_log_bpp_on_init_message_17",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    },
                                    "list": {
                                        "id": "wc_log_bpp_on_init_message_18",
                                        "type": "array",
                                        "minItems": 1,
                                        "element": {
                                            "id": "wc_log_bpp_on_init_message_19",
                                            "type": "object",
                                            "properties": {
                                                "descriptor": {
                                                    "id": "wc_log_bpp_on_init_message_20",
                                                    "type": "object",
                                                    "properties": {
                                                        "code": {
                                                            "id": "wc_log_bpp_on_init_message_21",
                                                            "type": "string",
                                                            "minLength": 1
                                                        },
                                                        "name": {
                                                            "id": "wc_log_bpp_on_init_message_22",
                                                            "type": "string",
                                                            "minLength": 1
                                                        }
                                                    }
                                                },
                                                "value": {
                                                    "id": "wc_log_bpp_on_init_message_23",
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
                "quote": {
                    "id": "wc_log_bpp_on_init_message_24",
                    "type": "object",
                    "properties": {
                        "id": {
                            "id": "wc_log_bpp_on_init_message_25",
                            "type": "string",
                            "minLength": 1
                        },
                        "price": {
                            "id": "wc_log_bpp_on_init_message_26",
                            "type": "object",
                            "properties": {
                                "currency": {
                                    "id": "wc_log_bpp_on_init_message_27",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "value": {
                                    "id": "wc_log_bpp_on_init_message_28",
                                    "type": "string",
                                    "minLength": 1
                                }
                            }
                        },
                        "breakup": {
                            "id": "wc_log_bpp_on_init_message_29",
                            "type": "array",
                            "minItems": 1,
                            "element": {
                                "id": "wc_log_bpp_on_init_message_30",
                                "type": "object",
                                "properties": {
                                    "title": {
                                        "id": "wc_log_bpp_on_init_message_31",
                                        "type": "string",
                                        "minLength": 1,
                                        "enum": ["WORKING_CAPITAL_LIMIT", "CURRENT_UTLIZATION", "PROCESSING_FEE", "INSURANCE_CHARGES", "OTHER_UPFRONT_CHARGES", "OTHER_CHARGES", "LATE_FEE_AMOUNT", "FORCLOSUER_CHARGES", "PRE_PAYMENT_CHARGE"]
                                    },
                                    "price": {
                                        "id": "wc_log_bpp_on_init_message_32",
                                        "type": "object",
                                        "properties": {
                                            "value": {
                                                "id": "wc_log_bpp_on_init_message_33",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "currency": {
                                                "id": "wc_log_bpp_on_init_message_34",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    }
                                }
                            }
                        }

                    },
                    "ttl": {
                        "id": "wc_log_bpp_on_init_message_35",
                        "type": "string",
                        "minLength": 1
                    }
                },
                "items": {
                    "id": "wc_log_bpp_on_init_message_36",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "wc_log_bpp_on_init_message_37",
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "wc_log_bpp_on_init_message_38",
                                "type": "string",
                                "minLength": 1
                            },
                            "parent_item_id": {
                                "id": "wc_log_bpp_on_init_message_39",
                                "type": "string",
                                "minLength": 1
                            },
                            "descriptor": {
                                "id": "wc_log_bpp_on_init_message_40",
                                "type": "object",
                                "properties": {
                                    "code": {
                                        "id": "wc_log_bpp_on_init_message_41",
                                        "type": "string",
                                        "minLength": 1,
                                        "enum": ["LOAN"]
                                    },
                                    "name": {
                                        "id": "wc_log_bpp_on_init_message_42",
                                        "type": "string",
                                        "minLength": 1
                                    }
                                }
                            },
                            "category_ids": {
                                "id": "wc_log_bpp_on_init_message_43",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "wc_log_bpp_on_init_message_44",
                                    "type": "object",
                                    "properties": {}
                                }
                            },
                            // "fulfillment_ids": {
                            //     "id": "wc_log_bpp_on_init_message_45",
                            //     "type": "array",
                            //     "minItems": 1,
                            //     "element": {
                            //         "id": "wc_log_bpp_on_init_message_46",
                            //         "type": "object",
                            //         "properties": {}
                            //     }
                            // },
                            "price": {
                                "id": "wc_log_bpp_on_init_message_47",
                                "type": "object",
                                "properties": {
                                    "currency": {
                                        "id": "wc_log_bpp_on_init_message_48",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "value": {
                                        "id": "wc_log_bpp_on_init_message_49",
                                        "type": "string",
                                        "minLength": 1
                                    }
                                }
                            },
                            "tags": {
                                "id": "wc_log_bpp_on_init_message_50",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "wc_log_bpp_on_init_message_51",
                                    "type": "object",
                                    "properties": {
                                        "descriptor": {
                                            "id": "wc_log_bpp_on_init_message_52",
                                            "type": "object",
                                            "properties": {
                                                "code": {
                                                    "id": "wc_log_bpp_on_init_message_53",
                                                    "type": "string",
                                                    "minLength": 1
                                                },
                                                "name": {
                                                    "id": "wc_log_bpp_on_init_message_54",
                                                    "type": "string",
                                                    "minLength": 1
                                                }
                                            }
                                        },
                                        "list": {
                                            "id": "wc_log_bpp_on_init_message_55",
                                            "type": "array",
                                            "minItems": 1,
                                            "element": {
                                                "id": "wc_log_bpp_on_init_message_56",
                                                "type": "object",
                                                "properties": {
                                                    "descriptor": {
                                                        "id": "wc_log_bpp_on_init_message_57",
                                                        "type": "object",
                                                        "properties": {
                                                            "code": {
                                                                "id": "wc_log_bpp_on_init_message_58",
                                                                "type": "string",
                                                                "minLength": 1
                                                            },
                                                            "name": {
                                                                "id": "wc_log_bpp_on_init_message_59",
                                                                "type": "string",
                                                                "minLength": 1
                                                            }
                                                        }
                                                    },
                                                    "value": {
                                                        "id": "wc_log_bpp_on_init_message_60",
                                                        "type": "string",
                                                        "minLength": 1
                                                    }
                                                }
                                            }
                                        },
                                        "display": {
                                            "id": "wc_log_bpp_on_init_message_61",
                                            "type": "boolean"
                                        }
                                    }
                                }
                            },
                            "xinput": {
                                "id": "wc_log_bpp_on_init_message_62",
                                "type": "object",
                                "properties": {
                                    "form": {
                                        "id": "wc_log_bpp_on_init_message_63",
                                        "type": "object",
                                        "properties": {
                                            "id": {
                                                "id": "wc_log_bpp_on_init_message_64",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    },
                                    "form_response": {
                                        "id": "wc_log_bpp_on_init_message_65",
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "id": "wc_log_bpp_on_init_message_66",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "submission_id": {
                                                "id": "wc_log_bpp_on_init_message_67",
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
                "payments": {
                    "id": "wc_log_bpp_on_init_message_68",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "wc_log_bpp_on_init_message_69",
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "wc_log_bpp_on_init_message_70",
                                "type": "string",
                                "minLength": 1
                            },
                            "collected_by": {
                                "id": "wc_log_bpp_on_init_message_71",
                                "type": "string",
                                "minLength": 1
                            },
                            "params": {
                                "id": "wc_log_bpp_on_init_message_72",
                                "type": "object",
                                "properties": {
                                    "amount": {
                                        "id": "wc_log_bpp_on_init_message_73",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "currency": {
                                        "id": "wc_log_bpp_on_init_message_74",
                                        "type": "string",
                                        "minLength": 1
                                    }
                                }
                            },
                            "status": {
                                "id": "wc_log_bpp_on_init_message_75",
                                "type": "string",
                                "minLength": 1
                            },
                            "type": {
                                "id": "wc_log_bpp_on_init_message_76",
                                "type": "string",
                                "minLength": 1
                            }
                        }
                    }
                },
                "tags": {
                    "id": "wc_log_bpp_on_init_message_77",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "wc_log_bpp_on_init_message_78",
                        "type": "object",
                        "properties": {
                            "display": {
                                "id": "wc_log_bpp_on_init_message_79",
                                "type": "boolean"
                            },
                            "descriptor": {
                                "id": "wc_log_bpp_on_init_message_80",
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "id": "wc_log_bpp_on_init_message_81",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "code": {
                                        "id": "wc_log_bpp_on_init_message_82",
                                        "type": "string",
                                        "minLength": 1
                                    }
                                }
                            },
                            "list": {
                                "id": "wc_log_bpp_on_init_message_83",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "wc_log_bpp_on_init_message_84",
                                    "type": "object",
                                    "properties": {
                                        "descriptor": {
                                            "id": "wc_log_bpp_on_init_message_85",
                                            "type": "object",
                                            "properties": {
                                                "code": {
                                                    "id": "wc_log_bpp_on_init_message_86",
                                                    "type": "string",
                                                    "minLength": 1
                                                }
                                            }
                                        },
                                        "value": {
                                            "id": "wc_log_bpp_on_init_message_87",
                                            "type": "string",
                                            "minLength": 1
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "fulfillments": {
                    "id": "wc_log_bpp_on_init_message_88",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "wc_log_bpp_on_init_message_89",
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "wc_log_bpp_on_init_message_90",
                                "type": "string",
                                "minLength": 1
                            },
                            "customer": {
                                "id": "wc_log_bpp_on_init_message_91",
                                "type": "object",
                                "properties": {
                                    "person": {
                                        "id": "wc_log_bpp_on_init_message_92",
                                        "type": "object",
                                        "properties": {
                                            "name": {
                                                "id": "wc_log_bpp_on_init_message_93",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "dob": {
                                                "id": "wc_log_bpp_on_init_message_94",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "gender": {
                                                "id": "wc_log_bpp_on_init_message_95",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "creds": {
                                                "id": "wc_log_bpp_on_init_message_96",
                                                "type": "array",
                                                "minItems": 1,
                                                "element": {
                                                    "id": "wc_log_bpp_on_init_message_97",
                                                    "type": "object",
                                                    "properties": {
                                                        "id": {
                                                            "id": "wc_log_bpp_on_init_message_98",
                                                            "type": "string",
                                                            "minLength": 1
                                                        },
                                                        "type": {
                                                            "id": "wc_log_bpp_on_init_message_99",
                                                            "type": "string",
                                                            "minLength": 1
                                                        }
                                                    },
                                                    "required": {
                                                        "type": "array",
                                                        "element": {
                                                            "allOf": [
                                                                {
                                                                    "if": {
                                                                        "properties": {
                                                                            "type": "params",
                                                                            "step": {
                                                                                "const": [
                                                                                    "on_init_initiate_drawdown",
                                                                                    "IV"
                                                                                ]
                                                                            }
                                                                        }
                                                                    },
                                                                    "then": [
                                                                        "id",
                                                                        "type"
                                                                    ]
                                                                },
                                                                {
                                                                    "if": {
                                                                        "properties": {
                                                                            "type": "params",
                                                                            "step": {
                                                                                "const": [
                                                                                    "on_init_invoice",

                                                                                ]
                                                                            }
                                                                        }
                                                                    },
                                                                    "then": [

                                                                        "type"
                                                                    ]
                                                                },

                                                            ]
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
                                                                "type": "params",
                                                                "step": {
                                                                    "const": [
                                                                        "on_init_upload_invoice"
                                                                    ]
                                                                }
                                                            }
                                                        },
                                                        "then": [
                                                            "name",
                                                            "creds"
                                                        ]
                                                    }
                                                ]
                                            }
                                        }
                                    },
                                    "contact": {
                                        "id": "wc_log_bpp_on_init_message_100",
                                        "type": "object",
                                        "properties": {
                                            "email": {
                                                "id": "wc_log_bpp_on_init_message_101",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "phone": {
                                                "id": "wc_log_bpp_on_init_message_102",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    }
                                }
                            },
                            "tags": {
                                "id": "wc_log_bpp_on_init_message_103",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "wc_log_bpp_on_init_message_104",
                                    "type": "object",
                                    "properties": {
                                        "descriptor": {
                                            "id": "wc_log_bpp_on_init_message_105",
                                            "type": "object",
                                            "properties": {
                                                "code": {
                                                    "id": "wc_log_bpp_on_init_message_106",
                                                    "type": "string",
                                                    "minLength": 1
                                                },
                                                "name": {
                                                    "id": "wc_log_bpp_on_init_message_107",
                                                    "type": "string",
                                                    "minLength": 1
                                                }
                                            }
                                        },
                                        "list": {
                                            "id": "wc_log_bpp_on_init_message_108",
                                            "type": "array",
                                            "minItems": 1,
                                            "element": {
                                                "id": "wc_log_bpp_on_init_message_109",
                                                "type": "object",
                                                "properties": {
                                                    "descriptor": {
                                                        "id": "wc_log_bpp_on_init_message_110",
                                                        "type": "object",
                                                        "properties": {
                                                            "code": {
                                                                "id": "wc_log_bpp_on_init_message_111",
                                                                "type": "string",
                                                                "minLength": 1
                                                            },
                                                            "name": {
                                                                "id": "wc_log_bpp_on_init_message_112",
                                                                "type": "string",
                                                                "minLength": 1
                                                            }
                                                        }
                                                    },
                                                    "value": {
                                                        "id": "wc_log_bpp_on_init_message_113",
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
                        "required": {
                            "type": "array",
                            "element": {
                                "allOf": [
                                    {
                                        "if": {
                                            "properties": {
                                                "type": "params",
                                                "step": {
                                                    "const": [
                                                        "on_init_upload_invoice"
                                                    ]
                                                }
                                            }
                                        },
                                        "then": [
                                            "id",
                                            "customer"
                                        ]
                                    }
                                ]
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
                                    "type": "params",
                                    "step": {
                                        "const": [
                                            "IV",
                                            "on_init_upload_invoice"
                                        ]
                                    }
                                }
                            },
                            "then": [
                                "provider",
                                "quote",
                                "items",
                                "payments",
                                "fulfillments",
                                "tags"
                            ]
                        },
                        {
                            "if": {
                                "properties": {
                                    "type": "params",
                                    "domain": {
                                        "step": [
                                            "on_init_initiate_drawdown"
                                        ]
                                    }
                                }
                            },
                            "then": [
                                "provider",
                                "quote",
                                "items",
                                "tags"
                            ]
                        }
                    ]
                }
            }
        }
    }
}