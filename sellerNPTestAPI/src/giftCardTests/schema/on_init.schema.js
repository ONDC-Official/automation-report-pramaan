module.exports = {
    "id": "gc_bpp_on_init_message_01",
    "type": "object",
    "properties": {
        "order": {
            "id": "gc_bpp_on_init_message_02",
            "type": "object",
            "properties": {
                "fulfillments": {
                    "id": "gc_bpp_on_init_message_3",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "gc_bpp_on_init_message_4",
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "gc_bpp_on_init_message_5",
                                "type": "string",
                                "minLength": 1
                            },
                            "id": {
                                "id": "gc_bpp_on_init_message_6",
                                "type": {
                                    "id": "gc_bpp_on_init_message_7",
                                    "type": "string",
                                    "minLength": 1
                                }
                            },
                            "customer": {
                                "id": "gc_bpp_on_init_message_8",
                                "type": "object",
                                "properties": {
                                    "person": {
                                        "id": "gc_bpp_on_init_message_9",
                                        "type": "object",
                                        "properties": {
                                            "name": {
                                                "id": "gc_bpp_on_init_message_10",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    },
                                    "contact": {
                                        "id": "gc_bpp_on_init_message_11",
                                        "type": "object",
                                        "properties": {
                                            "phone": {
                                                "id": "gc_bpp_on_init_message_12",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "email": {
                                                "id": "gc_bpp_on_init_message_13",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    }
                                }
                            },
                            "stops": {
                                "id": "gc_bpp_on_init_message_14",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "gc_bpp_on_init_message_15",
                                    "type": "object",
                                    "properties": {
                                        "id": {
                                            "id": "gc_bpp_on_init_message_16",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "contact": {
                                            "id": "gc_bpp_on_init_message_17",
                                            "type": "object",
                                            "properties": {
                                                "phone": {
                                                    "id": "gc_bpp_on_init_message_18",
                                                    "type": "string",
                                                    "minLength": 1
                                                },
                                                "email": {
                                                    "id": "gc_bpp_on_init_message_19",
                                                    "type": "string",
                                                    "minLength": 1
                                                }
                                            }
                                        },
                                        "person": {
                                            "id": "gc_bpp_on_init_message_20",
                                            "type": "object",
                                            "properties": {
                                                "name": {
                                                    "id": "gc_bpp_on_init_message_21",
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
                "provider": {
                    "id": "gc_bpp_on_init_message_22",
                    "type": "object",
                    "properties": {
                        "id": {
                            "id": "gc_bpp_on_init_message_23",
                            "type": "string",
                            "minLength": 1
                        }
                    }
                },
                "items": {
                    "id": "gc_bpp_on_init_message_24",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "gc_bpp_on_init_message_25",
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "gc_bpp_on_init_message_26",
                                "type": "string",
                                "minLength": 1
                            },
                            "quantity": {
                                "id": "gc_bpp_on_init_message_27",
                                "type": "object",
                                "properties": {
                                    "selected": {
                                        "id": "gc_bpp_on_init_message_28",
                                        "type": "object",
                                        "properties": {
                                            "count": {
                                                "id": "gc_bpp_on_init_message_29",
                                                "type": "number"
                                            }
                                        }
                                    }
                                }
                            },
                            "price": {
                                "id": "gc_bpp_on_init_message_30",
                                "type": "object",
                                "properties": {
                                    "currency": {
                                        "id": "gc_bpp_on_init_message_31",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "value": {
                                        "id": "gc_bpp_on_init_message_32",
                                        "type": "string",
                                        "minLength": 1
                                    }
                                }
                            },
                            "fulfillment_ids": {
                                "id": "gc_bpp_on_init_message_33",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "gc_bpp_on_init_message_34",
                                    "type": "string",
                                    "minLength": 1
                                }
                            },
                            "cancellation_terms": {
                                "id": "gc_bpp_on_init_message_35",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "gc_bpp_on_init_message_36",
                                    "type": "object",
                                    "properties": {
                                        "cancel_eligible": {
                                            "id": "gc_bpp_on_init_message_37",
                                            "type": "string",
                                            "minLength": 1
                                        }
                                    }
                                }
                            },
                            "return_terms": {
                                "id": "gc_bpp_on_init_message_38",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "gc_bpp_on_init_message_39",
                                    "type": "object",
                                    "properties": {
                                        "return_eligible": {
                                            "id": "gc_bpp_on_init_message_40",
                                            "type": "string",
                                            "minLength": 1
                                        }
                                    }
                                }
                            },
                            "tags": {
                                "id": "gc_bpp_on_init_message_41",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "gc_bpp_on_init_message_42",
                                    "type": "object",
                                    "properties": {
                                        "descriptor": {
                                            "id": "gc_bpp_on_init_message_43",
                                            "type": "object",
                                            "properties": {
                                                "code": {
                                                    "id": "gc_bpp_on_init_message_44",
                                                    "type": "string",
                                                    "minLength": 1
                                                }
                                            }
                                        },
                                        "list": {
                                            "id": "gc_bpp_on_init_message_45",
                                            "type": "array",
                                            "minItems": 1,
                                            "element": {
                                                "id": "gc_bpp_on_init_message_46",
                                                "type": "object",
                                                "properties": {
                                                    "descriptor": {
                                                        "id": "gc_bpp_on_init_message_47",
                                                        "type": "object",
                                                        "properties": {
                                                            "code": {
                                                                "id": "gc_bpp_on_init_message_48",
                                                                "type": "string",
                                                                "minLength": 1
                                                            }
                                                        }
                                                    },
                                                    "value": {
                                                        "id": "gc_bpp_on_init_message_49",
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
                "billing": {
                    "id": "gc_bpp_on_init_message_50",
                    "type": "object",
                    "properties": {
                        "name": {
                            "id": "gc_bpp_on_init_message_51",
                            "type": "string",
                            "minLength": 1
                        },
                        "address": {
                            "id": "gc_bpp_on_init_message_52",
                            "type": "string",
                            "minLength": 1
                        },
                        "city": {
                            "id": "gc_bpp_on_init_message_53",
                            "type": "object",
                            "properties": {
                                "name": {
                                    "id": "gc_bpp_on_init_message_54",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "code": {
                                    "id": "gc_bpp_on_init_message_55",
                                    "type": "string",
                                    "minLength": 1
                                }
                            }
                        },
                        "state": {
                            "id": "gc_bpp_on_init_message_56",
                            "type": "object",
                            "properties": {
                                "name": {
                                    "id": "gc_bpp_on_init_message_57",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "code": {
                                    "id": "gc_bpp_on_init_message_58",
                                    "type": "string",
                                    "minLength": 1
                                }
                            }
                        },
                        "email": {
                            "id": "gc_bpp_on_init_message_59",
                            "type": "string",
                            "minLength": 1
                        },
                        "phone": {
                            "id": "gc_bpp_on_init_message_60",
                            "type": "string",
                            "minLength": 1
                        }
                    }
                },
                "offers": {
                    "id": "gc_bpp_on_init_message_61",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "gc_bpp_on_init_message_62",
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "gc_bpp_on_init_message_63",
                                "type": "string",
                                "minLength": 1
                            },
                            "item_ids": {
                                "id": "gc_bpp_on_init_message_64",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "gc_bpp_on_init_message_65",
                                    "type": "string",
                                    "minLength": 1
                                }
                            }
                        }
                    }
                },
                "quote": {
                    "id": "gc_bpp_on_init_message_66",
                    "type": "object",
                    "properties": {
                        "price": {
                            "id": "gc_bpp_on_init_message_67",
                            "type": "object",
                            "properties": {
                                "currency": {
                                    "id": "gc_bpp_on_init_message_68",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "value": {
                                    "id": "gc_bpp_on_init_message_69",
                                    "type": "string",
                                    "minLength": 1
                                }
                            }
                        },
                        "breakup": {
                            "id": "gc_bpp_on_init_message_70",
                            "type": "array",
                            "minItems": 1,
                            "element": {
                                "id": "gc_bpp_on_init_message_71",
                                "type": "object",
                                "properties": {
                                    "item": {
                                        "id": "gc_bpp_on_init_message_72",
                                        "type": "object",
                                        "properties": {
                                            "id": {
                                                "id": "gc_bpp_on_init_message_73",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "quantity": {
                                                "id": "gc_bpp_on_init_message_74",
                                                "type": "object",
                                                "properties": {
                                                    "selected": {
                                                        "id": "gc_bpp_on_init_message_75",
                                                        "type": "object",
                                                        "properties": {
                                                            "count": {
                                                                "id": "gc_bpp_on_init_message_76",
                                                                "type": "number"
                                                            }
                                                        }
                                                    }
                                                }
                                            },
                                            "price": {
                                                "id": "gc_bpp_on_init_message_77",
                                                "type": "object",
                                                "properties": {
                                                    "currency": {
                                                        "id": "gc_bpp_on_init_message_78",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "value": {
                                                        "id": "gc_bpp_on_init_message_79",
                                                        "type": "string",
                                                        "minLength": 1
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "title": {
                                        "id": "gc_bpp_on_init_message_80",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "price": {
                                        "id": "gc_bpp_on_init_message_81",
                                        "type": "object",
                                        "properties": {
                                            "currency": {
                                                "id": "gc_bpp_on_init_message_82",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "value": {
                                                "id": "gc_bpp_on_init_message_83",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "ttl": {
                            "id": "gc_bpp_on_init_message_84",
                            "type": "string",
                            "minLength": 1
                        }
                    }
                },
                "payments": {
                    "id": "gc_bpp_on_init_message_85",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "gc_bpp_on_init_message_86",
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "gc_bpp_on_init_message_87",
                                "type": "string",
                                "minLength": 1
                            },
                            "collected_by": {
                                "id": "gc_bpp_on_init_message_88",
                                "type": "string",
                                "minLength": 1
                            },
                            "status": {
                                "id": "gc_bpp_on_init_message_89",
                                "type": "string",
                                "minLength": 1
                            },
                            "tags": {
                                "id": "gc_bpp_on_init_message_90",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "gc_bpp_on_init_message_91",
                                    "type": "object",
                                    "properties": {
                                        "descriptor": {
                                            "id": "gc_bpp_on_init_message_92",
                                            "type": "object",
                                            "properties": {
                                                "code": {
                                                    "id": "gc_bpp_on_init_message_93",
                                                    "type": "string",
                                                    "minLength": 1
                                                }
                                            }
                                        },
                                        "list": {
                                            "id": "gc_bpp_on_init_message_94",
                                            "type": "array",
                                            "minItems": 1,
                                            "element": {
                                                "id": "gc_bpp_on_init_message_95",
                                                "type": "object",
                                                "properties": {
                                                    "descriptor": {
                                                        "id": "gc_bpp_on_init_message_96",
                                                        "type": "object",
                                                        "properties": {
                                                            "code": {
                                                                "id": "gc_bpp_on_init_message_97",
                                                                "type": "string",
                                                                "minLength": 1
                                                            }
                                                        }
                                                    },
                                                    "value": {
                                                        "id": "gc_bpp_on_init_message_98",
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
    },
    "required": ["order"]
}