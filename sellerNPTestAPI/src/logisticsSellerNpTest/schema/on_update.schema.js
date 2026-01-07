module.exports = {
    "id": "b2c_log_bpp_on_update_message_01",
    "type": "object",
    "properties": {
        "order": {
            "id": "b2c_log_bpp_on_update_message_02",
            "type": "object",
            "properties": {
                "id": {
                    "id": "b2c_log_bpp_on_update_message_03",
                    "type": "string",
                    "minLength": 1
                },
                "state": {
                    "id": "b2c_log_bpp_on_update_message_04",
                    "type": "string",
                    "minLength": 1
                },
                "provider": {
                    "id": "b2c_log_bpp_on_update_message_05",
                    "type": "object",
                    "properties": {
                        "id": {
                            "id": "b2c_log_bpp_on_update_message_06",
                            "type": "string",
                            "minLength": 1
                        }
                    }
                },
                "items": {
                    "id": "b2c_log_bpp_on_update_message_07",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "b2c_log_bpp_on_update_message_08",
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "b2c_log_bpp_on_update_message_09",
                                "type": "string",
                                "minLength": 1
                            },
                            "category_id": {
                                "id": "b2c_log_bpp_on_update_message_10",
                                "type": "string",
                                "minLength": 1
                            },
                            "fulfillment_id": {
                                "id": "b2c_log_bpp_on_update_message_11",
                                "type": "string",
                                "minLength": 1
                            },
                            "descriptor": {
                                "id": "b2c_log_bpp_on_update_message_12",
                                "type": "object",
                                "properties": {
                                    "code": {
                                        "id": "b2c_log_bpp_on_update_message_13",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "name": {
                                        "id": "b2c_log_bpp_on_update_message_14",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "long_desc": {
                                        "id": "b2c_log_bpp_on_update_message_15",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "short_desc": {
                                        "id": "b2c_log_bpp_on_update_message_16",
                                        "type": "string",
                                        "minLength": 1
                                    }
                                }
                            },
                            "time": {
                                "id": "b2c_log_bpp_on_update_message_17",
                                "type": "object",
                                "properties": {
                                    "label": {
                                        "id": "b2c_log_bpp_on_update_message_18",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "duration": {
                                        "id": "b2c_log_bpp_on_update_message_19",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "timestamp": {
                                        "id": "b2c_log_bpp_on_update_message_20",
                                        "type": "string",
                                        "minLength": 1
                                    }
                                }
                            }
                        }
                    }
                },
                "billing": {
                    "id": "b2c_log_bpp_on_update_message_21",
                    "type": "object",
                    "properties": {
                        "name": {
                            "id": "b2c_log_bpp_on_update_message_22",
                            "type": "string",
                            "minLength": 1
                        },
                        "address": {
                            "id": "b2c_log_bpp_on_update_message_23",
                            "type": "object",
                            "properties": {
                                "name": {
                                    "id": "b2c_log_bpp_on_update_message_24",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "building": {
                                    "id": "b2c_log_bpp_on_update_message_25",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "locality": {
                                    "id": "b2c_log_bpp_on_update_message_26",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "city": {
                                    "id": "b2c_log_bpp_on_update_message_27",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "state": {
                                    "id": "b2c_log_bpp_on_update_message_28",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "country": {
                                    "id": "b2c_log_bpp_on_update_message_29",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "area_code": {
                                    "id": "b2c_log_bpp_on_update_message_30",
                                    "type": "string",
                                    "minLength": 1
                                }
                            }
                        },
                        "tax_number": {
                            "id": "b2c_log_bpp_on_update_message_31",
                            "type": "string",
                            "minLength": 1
                        },
                        "phone": {
                            "id": "b2c_log_bpp_on_update_message_32",
                            "type": "string",
                            "minLength": 1
                        },
                        "email": {
                            "id": "b2c_log_bpp_on_update_message_33",
                            "type": "string",
                            "minLength": 1
                        },
                        "created_at": {
                            "id": "b2c_log_bpp_on_update_message_34",
                            "type": "string",
                            "minLength": 1
                        },
                        "updated_at": {
                            "id": "b2c_log_bpp_on_update_message_35",
                            "type": "string",
                            "minLength": 1
                        }
                    }
                },
                "fulfillments": {
                    "id": "b2c_log_bpp_on_update_message_36",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "b2c_log_bpp_on_update_message_37",
                        "type": "object",
                        "properties": {
                            "type": {
                                "id": "b2c_log_bpp_on_update_message_39",
                                "type": "string",
                                "minLength": 1
                            },
                            "state": {
                                "id": "b2c_log_bpp_on_update_message_40",
                                "type": "object",
                                "properties": {
                                    "descriptor": {
                                        "id": "b2c_log_bpp_on_update_message_41",
                                        "type": "object",
                                        "properties": {
                                            "code": {
                                                "id": "b2c_log_bpp_on_update_message_42",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    }
                                }
                            },
                            "tracking": {
                                "id": "b2c_log_bpp_on_update_message_43",
                                "type": "boolean"
                            },
                            "start": {
                                "id": "b2c_log_bpp_on_update_message_44",
                                "type": "object",
                                "properties": {
                                    "person": {
                                        "id": "b2c_log_bpp_on_update_message_45",
                                        "type": "object",
                                        "properties": {
                                            "name": {
                                                "id": "b2c_log_bpp_on_update_message_46",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    },
                                    "location": {
                                        "id": "b2c_log_bpp_on_update_message_47",
                                        "type": "object",
                                        "properties": {
                                            "gps": {
                                                "id": "b2c_log_bpp_on_update_message_48",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "address": {
                                                "id": "b2c_log_bpp_on_update_message_49",
                                                "type": "object",
                                                "properties": {
                                                    "name": {
                                                        "id": "b2c_log_bpp_on_update_message_50",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "building": {
                                                        "id": "b2c_log_bpp_on_update_message_51",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "locality": {
                                                        "id": "b2c_log_bpp_on_update_message_52",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "city": {
                                                        "id": "b2c_log_bpp_on_update_message_53",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "state": {
                                                        "id": "b2c_log_bpp_on_update_message_54",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "country": {
                                                        "id": "b2c_log_bpp_on_update_message_55",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "area_code": {
                                                        "id": "b2c_log_bpp_on_update_message_56",
                                                        "type": "string",
                                                        "minLength": 1
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "contact": {
                                        "id": "b2c_log_bpp_on_update_message_57",
                                        "type": "object",
                                        "properties": {
                                            "phone": {
                                                "id": "b2c_log_bpp_on_update_message_58",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "email": {
                                                "id": "b2c_log_bpp_on_update_message_59",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    },
                                    "time": {
                                        "id": "b2c_log_bpp_on_update_message_60",
                                        "type": "object",
                                        "properties": {
                                            "duration": {
                                                "id": "b2c_log_bpp_on_update_message_61",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "range": {
                                                "id": "b2c_log_bpp_on_update_message_62",
                                                "type": "object",
                                                "properties": {
                                                    "start": {
                                                        "id": "b2c_log_bpp_on_update_message_63",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "end": {
                                                        "id": "b2c_log_bpp_on_update_message_64",
                                                        "type": "string",
                                                        "minLength": 1
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "instructions": {
                                        "id": "b2c_log_bpp_on_update_message_65",
                                        "type": "object",
                                        "properties": {
                                            "code": {
                                                "id": "b2c_log_bpp_on_update_message_66",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "short_desc": {
                                                "id": "b2c_log_bpp_on_update_message_67",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    }
                                }
                            },
                            "end": {
                                "id": "b2c_log_bpp_on_update_message_68",
                                "type": "object",
                                "properties": {
                                    "person": {
                                        "id": "b2c_log_bpp_on_update_message_69",
                                        "type": "object",
                                        "properties": {
                                            "name": {
                                                "id": "b2c_log_bpp_on_update_message_70",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    },
                                    "location": {
                                        "id": "b2c_log_bpp_on_update_message_71",
                                        "type": "object",
                                        "properties": {
                                            "gps": {
                                                "id": "b2c_log_bpp_on_update_message_72",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "address": {
                                                "id": "b2c_log_bpp_on_update_message_73",
                                                "type": "object",
                                                "properties": {
                                                    "name": {
                                                        "id": "b2c_log_bpp_on_update_message_74",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "building": {
                                                        "id": "b2c_log_bpp_on_update_message_75",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "locality": {
                                                        "id": "b2c_log_bpp_on_update_message_76",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "city": {
                                                        "id": "b2c_log_bpp_on_update_message_77",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "state": {
                                                        "id": "b2c_log_bpp_on_update_message_78",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "country": {
                                                        "id": "b2c_log_bpp_on_update_message_79",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "area_code": {
                                                        "id": "b2c_log_bpp_on_update_message_80",
                                                        "type": "string",
                                                        "minLength": 1
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "contact": {
                                        "id": "b2c_log_bpp_on_update_message_81",
                                        "type": "object",
                                        "properties": {
                                            "phone": {
                                                "id": "b2c_log_bpp_on_update_message_82",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "email": {
                                                "id": "b2c_log_bpp_on_update_message_83",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    },
                                    "instructions": {
                                        "id": "b2c_log_bpp_on_update_message_84",
                                        "type": "object",
                                        "properties": {
                                            "code": {
                                                "id": "b2c_log_bpp_on_update_message_85",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "short_desc": {
                                                "id": "b2c_log_bpp_on_update_message_86",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    },
                                    "time": {
                                        "id": "b2c_log_bpp_on_update_message_87",
                                        "type": "object",
                                        "properties": {
                                            "range": {
                                                "id": "b2c_log_bpp_on_update_message_88",
                                                "type": "object",
                                                "properties": {
                                                    "start": {
                                                        "id": "b2c_log_bpp_on_update_message_89",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "end": {
                                                        "id": "b2c_log_bpp_on_update_message_90",
                                                        "type": "string",
                                                        "minLength": 1
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "tags": {
                                "id": "b2c_log_bpp_on_update_message_91",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "b2c_log_bpp_on_update_message_92",
                                    "type": "object",
                                    "properties": {
                                        "code": {
                                            "id": "b2c_log_bpp_on_update_message_93",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "list": {
                                            "id": "b2c_log_bpp_on_update_message_94",
                                            "type": "array",
                                            "minItems": 1,
                                            "element": {
                                                "id": "b2c_log_bpp_on_update_message_95",
                                                "type": "object",
                                                "properties": {
                                                    "code": {
                                                        "id": "b2c_log_bpp_on_update_message_96",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "value": {
                                                        "id": "b2c_log_bpp_on_update_message_97",
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
                "quote": {
                    "id": "b2c_log_bpp_on_update_message_98",
                    "type": "object",
                    "properties": {
                        "price": {
                            "id": "b2c_log_bpp_on_update_message_99",
                            "type": "object",
                            "properties": {
                                "currency": {
                                    "id": "b2c_log_bpp_on_update_message_100",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "value": {
                                    "id": "b2c_log_bpp_on_update_message_101",
                                    "type": "string",
                                    "minLength": 1
                                }
                            }
                        },
                        "breakup": {
                            "id": "b2c_log_bpp_on_update_message_102",
                            "type": "array",
                            "minItems": 1,
                            "element": {
                                "id": "b2c_log_bpp_on_update_message_103",
                                "type": "object",
                                "properties": {
                                    "@ondc/org/item_id": {
                                        "id": "b2c_log_bpp_on_update_message_104",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "@ondc/org/title_type": {
                                        "id": "b2c_log_bpp_on_update_message_105",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "price": {
                                        "id": "b2c_log_bpp_on_update_message_106",
                                        "type": "object",
                                        "properties": {
                                            "currency": {
                                                "id": "b2c_log_bpp_on_update_message_107",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "value": {
                                                "id": "b2c_log_bpp_on_update_message_108",
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
                "payment": {
                    "id": "b2c_log_bpp_on_update_message_109",
                    "type": "object",
                    "properties": {
                        "type": {
                            "id": "b2c_log_bpp_on_update_message_110",
                            "type": "string",
                            "minLength": 1
                        },
                        "collected_by": {
                            "id": "b2c_log_bpp_on_update_message_111",
                            "type": "string",
                            "minLength": 1
                        },
                        "@ondc/org/settlement_details": {
                            "id": "b2c_log_bpp_on_update_message_112",
                            "type": "array",
                            "minItems": 1,
                            "element": {
                                "id": "b2c_log_bpp_on_update_message_113",
                                "type": "object",
                                "properties": {
                                    "settlement_counterparty": {
                                        "id": "b2c_log_bpp_on_update_message_114",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "settlement_type": {
                                        "id": "b2c_log_bpp_on_update_message_115",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "upi_address": {
                                        "id": "b2c_log_bpp_on_update_message_116",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "settlement_bank_account_no": {
                                        "id": "b2c_log_bpp_on_update_message_117",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "settlement_ifsc_code": {
                                        "id": "b2c_log_bpp_on_update_message_118",
                                        "type": "string",
                                        "minLength": 1
                                    }
                                }
                            }
                        }
                    }
                },
                "@ondc/org/linked_order": {
                    "id": "b2c_log_bpp_on_update_message_119",
                    "type": "object",
                    "properties": {
                        "items": {
                            "id": "b2c_log_bpp_on_update_message_120",
                            "type": "array",
                            "minItems": 1,
                            "element": {
                                "id": "b2c_log_bpp_on_update_message_121",
                                "type": "object",
                                "properties": {
                                    "category_id": {
                                        "id": "b2c_log_bpp_on_update_message_122",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "descriptor": {
                                        "id": "b2c_log_bpp_on_update_message_123",
                                        "type": "object",
                                        "properties": {
                                            "name": {
                                                "id": "b2c_log_bpp_on_update_message_124",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    },
                                    "quantity": {
                                        "id": "b2c_log_bpp_on_update_message_125",
                                        "type": "object",
                                        "properties": {
                                            "count": {
                                                "id": "b2c_log_bpp_on_update_message_126",
                                                "type": "number"
                                            },
                                            "measure": {
                                                "id": "b2c_log_bpp_on_update_message_127",
                                                "type": "object",
                                                "properties": {
                                                    "unit": {
                                                        "id": "b2c_log_bpp_on_update_message_128",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "value": {
                                                        "id": "b2c_log_bpp_on_update_message_129",
                                                        "type": "number"
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "price": {
                                        "id": "b2c_log_bpp_on_update_message_130",
                                        "type": "object",
                                        "properties": {
                                            "currency": {
                                                "id": "b2c_log_bpp_on_update_message_131",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "value": {
                                                "id": "b2c_log_bpp_on_update_message_132",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "provider": {
                            "id": "b2c_log_bpp_on_update_message_133",
                            "type": "object",
                            "properties": {
                                "descriptor": {
                                    "id": "b2c_log_bpp_on_update_message_134",
                                    "type": "object",
                                    "properties": {
                                        "name": {
                                            "id": "b2c_log_bpp_on_update_message_135",
                                            "type": "string",
                                            "minLength": 1
                                        }
                                    }
                                },
                                "address": {
                                    "id": "b2c_log_bpp_on_update_message_136",
                                    "type": "object",
                                    "properties": {
                                        "name": {
                                            "id": "b2c_log_bpp_on_update_message_137",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "building": {
                                            "id": "b2c_log_bpp_on_update_message_138",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "locality": {
                                            "id": "b2c_log_bpp_on_update_message_139",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "city": {
                                            "id": "b2c_log_bpp_on_update_message_140",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "state": {
                                            "id": "b2c_log_bpp_on_update_message_141",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "area_code": {
                                            "id": "b2c_log_bpp_on_update_message_142",
                                            "type": "string",
                                            "minLength": 1
                                        }
                                    }
                                }
                            }
                        },
                        "order": {
                            "id": "b2c_log_bpp_on_update_message_143",
                            "type": "object",
                            "properties": {
                                "id": {
                                    "id": "b2c_log_bpp_on_update_message_144",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "weight": {
                                    "id": "b2c_log_bpp_on_update_message_145",
                                    "type": "object",
                                    "properties": {
                                        "unit": {
                                            "id": "b2c_log_bpp_on_update_message_146",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "value": {
                                            "id": "b2c_log_bpp_on_update_message_147",
                                            "type": "number"
                                        }
                                    }
                                },
                                "dimensions": {
                                    "id": "b2c_log_bpp_on_update_message_148",
                                    "type": "object",
                                    "properties": {
                                        "length": {
                                            "id": "b2c_log_bpp_on_update_message_149",
                                            "type": "object",
                                            "properties": {
                                                "unit": {
                                                    "id": "b2c_log_bpp_on_update_message_150",
                                                    "type": "string",
                                                    "minLength": 1
                                                },
                                                "value": {
                                                    "id": "b2c_log_bpp_on_update_message_151",
                                                    "type": "number"
                                                }
                                            }
                                        },
                                        "breadth": {
                                            "id": "b2c_log_bpp_on_update_message_152",
                                            "type": "object",
                                            "properties": {
                                                "unit": {
                                                    "id": "b2c_log_bpp_on_update_message_153",
                                                    "type": "string",
                                                    "minLength": 1
                                                },
                                                "value": {
                                                    "id": "b2c_log_bpp_on_update_message_154",
                                                    "type": "number"
                                                }
                                            }
                                        },
                                        "height": {
                                            "id": "b2c_log_bpp_on_update_message_155",
                                            "type": "object",
                                            "properties": {
                                                "unit": {
                                                    "id": "b2c_log_bpp_on_update_message_156",
                                                    "type": "string",
                                                    "minLength": 1
                                                },
                                                "value": {
                                                    "id": "b2c_log_bpp_on_update_message_157",
                                                    "type": "number"
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
                    "id": "b2c_log_bpp_on_update_message_158",
                    "type": "string",
                    "minLength": 1
                },
                "updated_at": {
                    "id": "b2c_log_bpp_on_update_message_159",
                    "type": "string",
                    "minLength": 1
                }
            }
        }
    },
    "required": ["order"]
}