module.exports = {
    "id": "gc_bpp_on_update_message_01",
    "type": "object",
    "properties": {
        "order": {
            "id": "gc_bpp_on_update_message_02",
            "type": "object",
            "properties": {
                "id": {
                    "id": "gc_bpp_on_update_message_03",
                    "type": "string",
                    "minLength": 1
                },
                "status": {
                    "id": "gc_bpp_on_update_message_04",
                    "type": "string",
                    "minLength": 1
                },
                "tags": {
                    "id": "gc_bpp_on_update_message_05",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "gc_bpp_on_update_message_06",
                        "type": "object",
                        "properties": {
                            "descriptor": {
                                "id": "gc_bpp_on_update_message_07",
                                "type": "object",
                                "properties": {
                                    "code": {
                                        "id": "gc_bpp_on_update_message_08",
                                        "type": "string",
                                        "minLength": 1
                                    }
                                }
                            },
                            "list": {
                                "id": "gc_bpp_on_update_message_09",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "gc_bpp_on_update_message_10",
                                    "type": "object",
                                    "properties": {
                                        "descriptor": {
                                            "id": "gc_bpp_on_update_message_11",
                                            "type": "object",
                                            "properties": {
                                                "code": {
                                                    "id": "gc_bpp_on_update_message_12",
                                                    "type": "string",
                                                    "minLength": 1
                                                }
                                            }
                                        },
                                        "value": {
                                            "id": "gc_bpp_on_update_message_13",
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
                    "id": "gc_bpp_on_update_message_14",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "gc_bpp_on_update_message_15",
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "gc_bpp_on_update_message_16",
                                "type": "string",
                                "minLength": 1
                            },
                            "type": {
                                "id": "gc_bpp_on_update_message_17",
                                "type": "string",
                                "minLength": 1
                            },
                            "stops": {
                                "id": "gc_bpp_on_update_message_18",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "gc_bpp_on_update_message_19",
                                    "type": "object",
                                    "properties": {
                                        "id": {
                                            "id": "gc_bpp_on_update_message_20",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "contact": {
                                            "id": "gc_bpp_on_update_message_21",
                                            "type": "object",
                                            "properties": {
                                                "phone": {
                                                    "id": "gc_bpp_on_update_message_22",
                                                    "type": "string",
                                                    "minLength": 1
                                                },
                                                "email": {
                                                    "id": "gc_bpp_on_update_message_23",
                                                    "type": "string",
                                                    "minLength": 1
                                                }
                                            }
                                        },
                                        "person": {
                                            "id": "gc_bpp_on_update_message_24",
                                            "type": "object",
                                            "properties": {
                                                "name": {
                                                    "id": "gc_bpp_on_update_message_25",
                                                    "type": "string",
                                                    "minLength": 1
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "tags": {
                                "id": "gc_bpp_on_update_message_26",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "gc_bpp_on_update_message_27",
                                    "type": "object",
                                    "properties": {
                                        "descriptor": {
                                            "id": "gc_bpp_on_update_message_28",
                                            "type": "object",
                                            "properties": {
                                                "code": {
                                                    "id": "gc_bpp_on_update_message_29",
                                                    "type": "string",
                                                    "minLength": 1
                                                }
                                            }
                                        },
                                        "list": {
                                            "id": "gc_bpp_on_update_message_30",
                                            "type": "array",
                                            "minItems": 1,
                                            "element": {
                                                "id": "gc_bpp_on_update_message_31",
                                                "type": "object",
                                                "properties": {
                                                    "descriptor": {
                                                        "id": "gc_bpp_on_update_message_32",
                                                        "type": "object",
                                                        "properties": {
                                                            "code": {
                                                                "id": "gc_bpp_on_update_message_33",
                                                                "type": "string",
                                                                "minLength": 1
                                                            }
                                                        }
                                                    },
                                                    "value": {
                                                        "id": "gc_bpp_on_update_message_34",
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
                "provider": {
                    "id": "gc_bpp_on_update_message_35",
                    "type": "object",
                    "properties": {
                        "id": {
                            "id": "gc_bpp_on_update_message_36",
                            "type": "string",
                            "minLength": 1
                        }
                    }
                },
                "items": {
                    "id": "gc_bpp_on_update_message_37",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "gc_bpp_on_update_message_38",
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "gc_bpp_on_update_message_39",
                                "type": "string",
                                "minLength": 1
                            },
                            "quantity": {
                                "id": "gc_bpp_on_update_message_40",
                                "type": "object",
                                "properties": {
                                    "selected": {
                                        "id": "gc_bpp_on_update_message_41",
                                        "type": "object",
                                        "properties": {
                                            "count": {
                                                "id": "gc_bpp_on_update_message_42",
                                                "type": "number"
                                            }
                                        }
                                    }
                                }
                            },
                            "fulfillment_ids": {
                                "id": "gc_bpp_on_update_message_43",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "gc_bpp_on_update_message_44",
                                    "type": "string",
                                    "minLength": 1
                                }
                            },
                            "tags": {
                                "id": "gc_bpp_on_update_message_45",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "gc_bpp_on_update_message_46",
                                    "type": "object",
                                    "properties": {
                                        "descriptor": {
                                            "id": "gc_bpp_on_update_message_47",
                                            "type": "object",
                                            "properties": {
                                                "code": {
                                                    "id": "gc_bpp_on_update_message_48",
                                                    "type": "string",
                                                    "minLength": 1
                                                }
                                            }
                                        },
                                        "list": {
                                            "id": "gc_bpp_on_update_message_49",
                                            "type": "array",
                                            "minItems": 1,
                                            "element": {
                                                "id": "gc_bpp_on_update_message_50",
                                                "type": "object",
                                                "properties": {
                                                    "descriptor": {
                                                        "id": "gc_bpp_on_update_message_51",
                                                        "type": "object",
                                                        "properties": {
                                                            "code": {
                                                                "id": "gc_bpp_on_update_message_52",
                                                                "type": "string",
                                                                "minLength": 1
                                                            }
                                                        }
                                                    },
                                                    "value": {
                                                        "id": "gc_bpp_on_update_message_53",
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
                    "id": "gc_bpp_on_update_message_54",
                    "type": "object",
                    "properties": {
                        "name": {
                            "id": "gc_bpp_on_update_message_55",
                            "type": "string",
                            "minLength": 1
                        },
                        "address": {
                            "id": "gc_bpp_on_update_message_56",
                            "type": "string",
                            "minLength": 1
                        },
                        "city": {
                            "id": "gc_bpp_on_update_message_57",
                            "type": "object",
                            "properties": {
                                "name": {
                                    "id": "gc_bpp_on_update_message_58",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "code": {
                                    "id": "gc_bpp_on_update_message_59",
                                    "type": "string",
                                    "minLength": 1
                                }
                            }
                        },
                        "state": {
                            "id": "gc_bpp_on_update_message_60",
                            "type": "object",
                            "properties": {
                                "name": {
                                    "id": "gc_bpp_on_update_message_61",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "code": {
                                    "id": "gc_bpp_on_update_message_62",
                                    "type": "string",
                                    "minLength": 1
                                }
                            }
                        },
                        "email": {
                            "id": "gc_bpp_on_update_message_63",
                            "type": "string",
                            "minLength": 1
                        },
                        "phone": {
                            "id": "gc_bpp_on_update_message_64",
                            "type": "string",
                            "minLength": 1
                        }
                    }
                },
                "offers": {
                    "id": "gc_bpp_on_update_message_65",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "gc_bpp_on_update_message_66",
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "gc_bpp_on_update_message_67",
                                "type": "string",
                                "minLength": 1
                            },
                            "item_ids": {
                                "id": "gc_bpp_on_update_message_68",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "gc_bpp_on_update_message_69",
                                    "type": "string",
                                    "minLength": 1
                                }
                            }
                        }
                    }
                },
                "quote": {
                    "id": "gc_bpp_on_update_message_70",
                    "type": "object",
                    "properties": {
                        "id": {
                            "id": "gc_bpp_on_update_message_71",
                            "type": "string",
                            "minLength": 1
                        },
                        "price": {
                            "id": "gc_bpp_on_update_message_72",
                            "type": "object",
                            "properties": {
                                "currency": {
                                    "id": "gc_bpp_on_update_message_73",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "value": {
                                    "id": "gc_bpp_on_update_message_74",
                                    "type": "string",
                                    "minLength": 1
                                }
                            }
                        },
                        "breakup": {
                            "id": "gc_bpp_on_update_message_75",
                            "type": "array",
                            "minItems": 1,
                            "element": {
                                "id": "gc_bpp_on_update_message_76",
                                "type": "object",
                                "properties": {
                                    "item": {
                                        "id": "gc_bpp_on_update_message_77",
                                        "type": "object",
                                        "properties": {
                                            "id": {
                                                "id": "gc_bpp_on_update_message_78",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    },
                                    "title": {
                                        "id": "gc_bpp_on_update_message_79",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "price": {
                                        "id": "gc_bpp_on_update_message_80",
                                        "type": "object",
                                        "properties": {
                                            "currency": {
                                                "id": "gc_bpp_on_update_message_81",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "value": {
                                                "id": "gc_bpp_on_update_message_82",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "ttl": {
                            "id": "gc_bpp_on_update_message_83",
                            "type": "string",
                            "minLength": 1
                        }
                    }
                },
                "payments": {
                    "id": "gc_bpp_on_update_message_84",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "gc_bpp_on_update_message_85",
                        "type": "object",
                        "properties": {
                            "type": {
                                "id": "gc_bpp_on_update_message_86",
                                "type": "string",
                                "minLength": 1
                            },
                            "collected_by": {
                                "id": "gc_bpp_on_update_message_87",
                                "type": "string",
                                "minLength": 1
                            },
                            "status": {
                                "id": "gc_bpp_on_update_message_88",
                                "type": "string",
                                "minLength": 1
                            },
                            "url": {
                                "id": "gc_bpp_on_update_message_89",
                                "type": "string",
                                "minLength": 1
                            },
                            "params": {
                                "id": "gc_bpp_on_update_message_90",
                                "type": "object",
                                "properties": {
                                    "currency": {
                                        "id": "gc_bpp_on_update_message_91",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "transaction_id": {
                                        "id": "gc_bpp_on_update_message_92",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "amount": {
                                        "id": "gc_bpp_on_update_message_93",
                                        "type": "string",
                                        "minLength": 1
                                    }
                                }
                            },
                            "tags": {
                                "id": "gc_bpp_on_update_message_94",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "gc_bpp_on_update_message_95",
                                    "type": "object",
                                    "properties": {
                                        "descriptor": {
                                            "id": "gc_bpp_on_update_message_96",
                                            "type": "object",
                                            "properties": {
                                                "code": {
                                                    "id": "gc_bpp_on_update_message_97",
                                                    "type": "string",
                                                    "minLength": 1
                                                }
                                            }
                                        },
                                        "list": {
                                            "id": "gc_bpp_on_update_message_98",
                                            "type": "array",
                                            "minItems": 1,
                                            "element": {
                                                "id": "gc_bpp_on_update_message_99",
                                                "type": "object",
                                                "properties": {
                                                    "descriptor": {
                                                        "id": "gc_bpp_on_update_message_100",
                                                        "type": "object",
                                                        "properties": {
                                                            "code": {
                                                                "id": "gc_bpp_on_update_message_101",
                                                                "type": "string",
                                                                "minLength": 1
                                                            }
                                                        }
                                                    },
                                                    "value": {
                                                        "id": "gc_bpp_on_update_message_102",
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
                    "id": "gc_bpp_on_update_message_103",
                    "type": "string",
                    "minLength": 1
                },
                "updated_at": {
                    "id": "gc_bpp_on_update_message_104",
                    "type": "string",
                    "minLength": 1
                }

            }
        }
    },
    "required": ["order"]
}