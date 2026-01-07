module.exports =
{
    "id": "gc_bpp_on_status_message_01",
    "type": "object",
    "properties": {
        "order": {
            "id": "gc_bpp_on_status_message_02",
            "type": "object",
            "properties": {
                "id": {
                    "id": "gc_bpp_on_status_message_03",
                    "type": "string",
                    "minLength": 1
                },
                "status": {
                    "id": "gc_bpp_on_status_message_04",
                    "type": "string",
                    "minLength": 1
                },
                "fulfillments": {
                    "id": "gc_bpp_on_status_message_5",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "gc_bpp_on_status_message_6",
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "gc_bpp_on_status_message_7",
                                "type": "string",
                                "minLength": 1
                            },
                            "type": {
                                "id": "gc_bpp_on_status_message_8",
                                "type": "string",
                                "minLength": 1
                            },
                            "customer": {
                                "id": "gc_bpp_on_status_message_9",
                                "type": "object",
                                "properties": {
                                    "person": {
                                        "id": "gc_bpp_on_status_message_10",
                                        "type": "object",
                                        "properties": {
                                            "name": {
                                                "id": "gc_bpp_on_status_message_11",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    },
                                    "contact": {
                                        "id": "gc_bpp_on_status_message_12",
                                        "type": "object",
                                        "properties": {
                                            "phone": {
                                                "id": "gc_bpp_on_status_message_13",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "email": {
                                                "id": "gc_bpp_on_status_message_14",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    }
                                }
                            },
                            "stops": {
                                "id": "gc_bpp_on_status_message_15",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "gc_bpp_on_status_message_16",
                                    "type": "object",
                                    "properties": {
                                        "id": {
                                            "id": "gc_bpp_on_status_message_17",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "contact": {
                                            "id": "gc_bpp_on_status_message_18",
                                            "type": "object",
                                            "properties": {
                                                "phone": {
                                                    "id": "gc_bpp_on_status_message_19",
                                                    "type": "string",
                                                    "minLength": 1
                                                },
                                                "email": {
                                                    "id": "gc_bpp_on_status_message_20",
                                                    "type": "string",
                                                    "minLength": 1
                                                }
                                            }
                                        },
                                        "person": {
                                            "id": "gc_bpp_on_status_message_21",
                                            "type": "object",
                                            "properties": {
                                                "name": {
                                                    "id": "gc_bpp_on_status_message_22",
                                                    "type": "string",
                                                    "minLength": 1
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "tags": {
                                "id": "gc_bpp_on_status_message_23",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "gc_bpp_on_status_message_24",
                                    "type": "object",
                                    "properties": {
                                        "descriptor": {
                                            "id": "gc_bpp_on_status_message_25",
                                            "type": "object",
                                            "properties": {
                                                "code": {
                                                    "id": "gc_bpp_on_status_message_26",
                                                    "type": "string",
                                                    "minLength": 1
                                                }
                                            }
                                        },
                                        "list": {
                                            "id": "gc_bpp_on_status_message_27",
                                            "type": "array",
                                            "minItems": 1,
                                            "element": {
                                                "id": "gc_bpp_on_status_message_28",
                                                "type": "object",
                                                "properties": {
                                                    "descriptor": {
                                                        "id": "gc_bpp_on_status_message_29",
                                                        "type": "object",
                                                        "properties": {
                                                            "code": {
                                                                "id": "gc_bpp_on_status_message_30",
                                                                "type": "string",
                                                                "minLength": 1
                                                            }
                                                        }
                                                    },
                                                    "value": {
                                                        "id": "gc_bpp_on_status_message_31",
                                                        "type": "string",
                                                        "minLength": 1
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "allOf": [
                                {
                                    "if": {
                                        "properties": { "status": { "const": "ON_HOLD" } }
                                    },
                                    "then": {
                                        "properties": {
                                            "tags": { "minItems": 1 }
                                        }
                                    },
                                    "else": {
                                        "properties": {
                                            "tags": { "minItems": 0 }
                                        }
                                    }
                                }
                            ]
                        }
                    }
                },
                "provider": {
                    "id": "gc_bpp_on_status_message_32",
                    "type": "object",
                    "properties": {
                        "id": {
                            "id": "gc_bpp_on_status_message_33",
                            "type": "string",
                            "minLength": 1
                        }
                    }
                },
                "items": {
                    "id": "gc_bpp_on_status_message_34",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "gc_bpp_on_status_message_35",
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "gc_bpp_on_status_message_36",
                                "type": "string",
                                "minLength": 1
                            },
                            "quantity": {
                                "id": "gc_bpp_on_status_message_37",
                                "type": "object",
                                "properties": {
                                    "selected": {
                                        "id": "gc_bpp_on_status_message_38",
                                        "type": "object",
                                        "properties": {
                                            "count": {
                                                "id": "gc_bpp_on_status_message_39",
                                                "type": "number"
                                            }
                                        }
                                    }
                                }
                            },
                            "price": {
                                "id": "gc_bpp_on_status_message_40",
                                "type": "object",
                                "properties": {
                                    "currency": {
                                        "id": "gc_bpp_on_status_message_41",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "value": {
                                        "id": "gc_bpp_on_status_message_42",
                                        "type": "string",
                                        "minLength": 1
                                    }
                                }
                            },
                            "fulfillment_ids": {
                                "id": "gc_bpp_on_status_message_43",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "gc_bpp_on_status_message_44",
                                    "type": "string",
                                    "minLength": 1
                                }
                            },
                            "tags": {
                                "id": "gc_bpp_on_status_message_45",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "gc_bpp_on_status_message_46",
                                    "type": "object",
                                    "properties": {
                                        "descriptor": {
                                            "id": "gc_bpp_on_status_message_47",
                                            "type": "object",
                                            "properties": {
                                                "code": {
                                                    "id": "gc_bpp_on_status_message_48",
                                                    "type": "string",
                                                    "minLength": 1
                                                }
                                            }
                                        },
                                        "list": {
                                            "id": "gc_bpp_on_status_message_49",
                                            "type": "array",
                                            "minItems": 1,
                                            "element": {
                                                "id": "gc_bpp_on_status_message_50",
                                                "type": "object",
                                                "properties": {
                                                    "descriptor": {
                                                        "id": "gc_bpp_on_status_message_51",
                                                        "type": "object",
                                                        "properties": {
                                                            "code": {
                                                                "id": "gc_bpp_on_status_message_52",
                                                                "type": "string",
                                                                "minLength": 1
                                                            }
                                                        }
                                                    },
                                                    "value": {
                                                        "id": "gc_bpp_on_status_message_53",
                                                        "type": "string",
                                                        "minLength": 1
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "allOf": [
                                {
                                    "if": {
                                        "properties": { "status": { "const": "IN_PROGRESS" } }
                                    },
                                    "then": {
                                        "properties": {
                                            "price": { "minItems": 1 }
                                        }
                                    },
                                    "else": {
                                        "properties": {
                                            "price": { "minItems": 0 }
                                        }
                                    }
                                }
                            ]
                        }
                    }
                },
                "billing": {
                    "id": "gc_bpp_on_status_message_54",
                    "type": "object",
                    "properties": {
                        "name": {
                            "id": "gc_bpp_on_status_message_55",
                            "type": "string",
                            "minLength": 1
                        },
                        "address": {
                            "id": "gc_bpp_on_status_message_56",
                            "type": "string",
                            "minLength": 1
                        },
                        "city": {
                            "id": "gc_bpp_on_status_message_57",
                            "type": "object",
                            "properties": {
                                "name": {
                                    "id": "gc_bpp_on_status_message_58",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "code": {
                                    "id": "gc_bpp_on_status_message_59",
                                    "type": "string",
                                    "minLength": 1
                                }
                            }
                        },
                        "state": {
                            "id": "gc_bpp_on_status_message_60",
                            "type": "object",
                            "properties": {
                                "name": {
                                    "id": "gc_bpp_on_status_message_61",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "code": {
                                    "id": "gc_bpp_on_status_message_62",
                                    "type": "string",
                                    "minLength": 1
                                }
                            }
                        },
                        "email": {
                            "id": "gc_bpp_on_status_message_63",
                            "type": "string",
                            "minLength": 1
                        },
                        "phone": {
                            "id": "gc_bpp_on_status_message_64",
                            "type": "string",
                            "minLength": 1
                        }
                    }
                },
                "offers": {
                    "id": "gc_bpp_on_status_message_65",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "gc_bpp_on_status_message_66",
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "gc_bpp_on_status_message_67",
                                "type": "string",
                                "minLength": 1
                            },
                            "item_ids": {
                                "id": "gc_bpp_on_status_message_68",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "gc_bpp_on_status_message_69",
                                    "type": "string",
                                    "minLength": 1
                                }
                            }
                        }
                    }
                },
                "quote": {
                    "id": "gc_bpp_on_status_message_70",
                    "type": "object",
                    "properties": {
                        "price": {
                            "id": "gc_bpp_on_status_message_71",
                            "type": "object",
                            "properties": {
                                "currency": {
                                    "id": "gc_bpp_on_status_message_72",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "value": {
                                    "id": "gc_bpp_on_status_message_73",
                                    "type": "string",
                                    "minLength": 1
                                }
                            }
                        },
                        "breakup": {
                            "id": "gc_bpp_on_status_message_74",
                            "type": "array",
                            "minItems": 1,
                            "element": {
                                "id": "gc_bpp_on_status_message_75",
                                "type": "object",
                                "properties": {
                                    "item": {
                                        "id": "gc_bpp_on_status_message_76",
                                        "type": "object",
                                        "properties": {
                                            "id": {
                                                "id": "gc_bpp_on_status_message_77",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "quantity": {
                                                "id": "gc_bpp_on_status_message_78",
                                                "type": "object",
                                                "properties": {
                                                    "selected": {
                                                        "id": "gc_bpp_on_status_message_79",
                                                        "type": "object",
                                                        "properties": {
                                                            "count": {
                                                                "id": "gc_bpp_on_status_message_80",
                                                                "type": "number"
                                                            }
                                                        }
                                                    }
                                                }
                                            },
                                            "price": {
                                                "id": "gc_bpp_on_status_message_81",
                                                "type": "object",
                                                "properties": {
                                                    "currency": {
                                                        "id": "gc_bpp_on_status_message_82",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "value": {
                                                        "id": "gc_bpp_on_status_message_83",
                                                        "type": "string",
                                                        "minLength": 1
                                                    }
                                                }
                                            },
                                            "allOf": [
                                                {
                                                    "if": {
                                                        "properties": { "status": { "const": "IN_PROGRESS" } }
                                                    },
                                                    "then": {
                                                        "properties": {
                                                            "price": { "minItems": 1 },
                                                            "quantity": { "minItems": 1 }
                                                        }
                                                    },
                                                    "else": {
                                                        "properties": {
                                                            "price": { "minItems": 0 },
                                                            "quantity": { "minItems": 0 }
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    },
                                    "title": {
                                        "id": "gc_bpp_on_status_message_84",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "price": {
                                        "id": "gc_bpp_on_status_message_85",
                                        "type": "object",
                                        "properties": {
                                            "currency": {
                                                "id": "gc_bpp_on_status_message_86",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "value": {
                                                "id": "gc_bpp_on_status_message_87",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "ttl": {
                            "id": "gc_bpp_on_status_message_88",
                            "type": "string",
                            "minLength": 1
                        }
                    }
                },
                "payments": {
                    "id": "gc_bpp_on_status_message_89",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "gc_bpp_on_status_message_90",
                        "type": "object",
                        "properties": {
                            "type": {
                                "id": "gc_bpp_on_status_message_91",
                                "type": "string",
                                "minLength": 1
                            },
                            "collected_by": {
                                "id": "gc_bpp_on_status_message_92",
                                "type": "string",
                                "minLength": 1
                            },
                            "status": {
                                "id": "gc_bpp_on_status_message_93",
                                "type": "string",
                                "minLength": 1
                            },
                            "url": {
                                "id": "gc_bpp_on_status_message_94",
                                "type": "string",
                                "minLength": 1
                            },
                            "params": {
                                "id": "gc_bpp_on_status_message_95",
                                "type": "object",
                                "properties": {
                                    "currency": {
                                        "id": "gc_bpp_on_status_message_96",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "transaction_id": {
                                        "id": "gc_bpp_on_status_message_97",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "amount": {
                                        "id": "gc_bpp_on_status_message_98",
                                        "type": "string",
                                        "minLength": 1
                                    }
                                }
                            },
                            "tags": {
                                "id": "gc_bpp_on_status_message_99",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "gc_bpp_on_status_message_100",
                                    "type": "object",
                                    "properties": {
                                        "descriptor": {
                                            "id": "gc_bpp_on_status_message_101",
                                            "type": "object",
                                            "properties": {
                                                "code": {
                                                    "id": "gc_bpp_on_status_message_102",
                                                    "type": "string",
                                                    "minLength": 1
                                                }
                                            }
                                        },
                                        "list": {
                                            "id": "gc_bpp_on_status_message_103",
                                            "type": "array",
                                            "minItems": 1,
                                            "element": {
                                                "id": "gc_bpp_on_status_message_104",
                                                "type": "object",
                                                "properties": {
                                                    "descriptor": {
                                                        "id": "gc_bpp_on_status_message_105",
                                                        "type": "object",
                                                        "properties": {
                                                            "code": {
                                                                "id": "gc_bpp_on_status_message_106",
                                                                "type": "string",
                                                                "minLength": 1
                                                            }
                                                        }
                                                    },
                                                    "value": {
                                                        "id": "gc_bpp_on_status_message_107",
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
                },
                "created_at": {
                    "id": "gc_bpp_on_status_message_108",
                    "type": "string",
                    "minLength": 1
                },
                "updated_at": {
                    "id": "gc_bpp_on_status_message_109",
                    "type": "string",
                    "minLength": 1
                }

            }
        }
    },
    "required": ["order"]
}

