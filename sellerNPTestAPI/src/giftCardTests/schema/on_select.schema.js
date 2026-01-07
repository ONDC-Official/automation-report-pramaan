module.exports = {
    "id": "gc_bpp_on_select_message_01",
    "type": "object",
    "properties": {
        "order": {
            "id": "gc_bpp_on_select_message_02",
            "type": "object",
            "properties": {
                "fulfillments": {
                    "id": "gc_bpp_on_select_message_03",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "gc_bpp_on_select_message_04",
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "gc_bpp_on_select_message_05",
                                "type": "string",
                                "minLength": 1
                            },
                            "id": "gc_bpp_on_select_message_06",
                            "type": {
                                "id": "gc_bpp_on_select_message_07",
                                "type": "string",
                                "minLength": 1
                            }
                        }
                    }
                },
                "provider": {
                    "id": "gc_bpp_on_select_message_8",
                    "type": "object",
                    "properties": {
                        "id": {
                            "id": "gc_bpp_on_select_message_9",
                            "type": "string",
                            "minLength": 1
                        },
                        "ttl": {
                            "id": "gc_bpp_on_select_message_10",
                            "type": "string",
                            "minLength": 1
                        },
                        "descriptor": {
                            "id": "gc_bpp_on_select_message_11",
                            "type": "object",
                            "properties": {
                                "name": {
                                    "id": "gc_bpp_on_select_message_12",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "symbol": {
                                    "id": "gc_bpp_on_select_message_13",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "short_desc": {
                                    "id": "gc_bpp_on_select_message_14",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "long_desc": {
                                    "id": "gc_bpp_on_select_message_15",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "images": {
                                    "id": "gc_bpp_on_select_message_16",
                                    "type": "array",
                                    "minItems": 1,
                                    "element": {
                                        "id": "gc_bpp_on_select_message_17",
                                        "type": "string",
                                        "minLength": 1
                                    }
                                }
                            }
                        },
                        "categories": {
                            "id": "gc_bpp_on_select_message_18",
                            "type": "array",
                            "minItems": 1,
                            "element": {
                                "id": "gc_bpp_on_select_message_19",
                                "type": "object",
                                "properties": {
                                    "id": {
                                        "id": "gc_bpp_on_select_message_20",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "descriptor": {
                                        "id": "gc_bpp_on_select_message_21",
                                        "type": "object",
                                        "properties": {
                                            "code": {
                                                "id": "gc_bpp_on_select_message_22",
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
                "items": {
                    "id": "gc_bpp_on_select_message_23",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "gc_bpp_on_select_message_24",
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "gc_bpp_on_select_message_25",
                                "type": "string",
                                "minLength": 1
                            },
                            "descriptor": {
                                "id": "gc_bpp_on_select_message_26",
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "id": "gc_bpp_on_select_message_27",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "symbol": {
                                        "id": "gc_bpp_on_select_message_28",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "short_desc": {
                                        "id": "gc_bpp_on_select_message_29",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "long_desc": {
                                        "id": "gc_bpp_on_select_message_30",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "images": {
                                        "id": "gc_bpp_on_select_message_31",
                                        "type": "array",
                                        "minItems": 1,
                                        "element": {
                                            "id": "gc_bpp_on_select_message_32",
                                            "type": "string",
                                            "minLength": 1
                                        }
                                    }
                                }
                            },
                            "price": {
                                "id": "gc_bpp_on_select_message_33",
                                "type": "object",
                                "properties": {
                                    "currency": {
                                        "id": "gc_bpp_on_select_message_34",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "minimum_value": {
                                        "id": "gc_bpp_on_select_message_35",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "maximum_value": {
                                        "id": "gc_bpp_on_select_message_36",
                                        "type": "string",
                                        "minLength": 1
                                    }
                                }
                            },
                            "category_ids": {
                                "id": "gc_bpp_on_select_message_37",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "gc_bpp_on_select_message_38",
                                    "type": "string",
                                    "minLength": 1
                                }
                            },
                            "fulfillment_ids": {
                                "id": "gc_bpp_on_select_message_39",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "gc_bpp_on_select_message_40",
                                    "type": "string",
                                    "minLength": 1
                                }
                            },
                            "cancellation_terms": {
                                "id": "gc_bpp_on_select_message_41",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "gc_bpp_on_select_message_42",
                                    "type": "object",
                                    "properties": {
                                        "cancel_eligible": {
                                            "id": "gc_bpp_on_select_message_43",
                                            "type": "string",
                                            "minLength": 1
                                        }
                                    }
                                }
                            },
                            "return_terms": {
                                "id": "gc_bpp_on_select_message_44",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "gc_bpp_on_select_message_45",
                                    "type": "object",
                                    "properties": {
                                        "return_eligible": {
                                            "id": "gc_bpp_on_select_message_46",
                                            "type": "string",
                                            "minLength": 1
                                        }
                                    }
                                }
                            },
                            "tags": {
                                "id": "gc_bpp_on_select_message_47",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "gc_bpp_on_select_message_48",
                                    "type": "object",
                                    "properties": {
                                        "descriptor": {
                                            "id": "gc_bpp_on_select_message_49",
                                            "type": "object",
                                            "properties": {
                                                "code": {
                                                    "id": "gc_bpp_on_select_message_50",
                                                    "type": "string",
                                                    "minLength": 1
                                                }
                                            }
                                        },
                                        "list": {
                                            "id": "gc_bpp_on_select_message_51",
                                            "type": "array",
                                            "minItems": 1,
                                            "element": {
                                                "id": "gc_bpp_on_select_message_52",
                                                "type": "object",
                                                "properties": {
                                                    "descriptor": {
                                                        "id": "gc_bpp_on_select_message_53",
                                                        "type": "object",
                                                        "properties": {
                                                            "code": {
                                                                "id": "gc_bpp_on_select_message_54",
                                                                "type": "string",
                                                                "minLength": 1
                                                            }
                                                        }
                                                    },
                                                    "value": {
                                                        "id": "gc_bpp_on_select_message_55",
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
                "offers": {
                    "id": "gc_bpp_on_select_message_56",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "gc_bpp_on_select_message_57",
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "gc_bpp_on_select_message_58",
                                "type": "string",
                                "minLength": 1
                            },
                            "item_ids": {
                                "id": "gc_bpp_on_select_message_59",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "gc_bpp_on_select_message_60",
                                    "type": "string",
                                    "minLength": 1
                                }
                            }
                        }
                    }
                },
                "quote": {
                    "id": "gc_bpp_on_select_message_61",
                    "type": "object",
                    "properties": {
                        "price": {
                            "id": "gc_bpp_on_select_message_62",
                            "type": "object",
                            "properties": {
                                "currency": {
                                    "id": "gc_bpp_on_select_message_63",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "value": {
                                    "id": "gc_bpp_on_select_message_64",
                                    "type": "string",
                                    "minLength": 1
                                }
                            }
                        },
                        "breakup": {
                            "id": "gc_bpp_on_select_message_65",
                            "type": "array",
                            "minItems": 1,
                            "element": {
                                "id": "gc_bpp_on_select_message_66",
                                "type": "object",
                                "properties": {
                                    "item": {
                                        "id": "gc_bpp_on_select_message_67",
                                        "type": "object",
                                        "properties": {
                                            "id": {
                                                "id": "gc_bpp_on_select_message_68",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "quantity": {
                                                "id": "gc_bpp_on_select_message_69",
                                                "type": "object",
                                                "properties": {
                                                    "selected": {
                                                        "id": "gc_bpp_on_select_message_70",
                                                        "type": "object",
                                                        "properties": {
                                                            "count": {
                                                                "id": "gc_bpp_on_select_message_71",
                                                                "type": "number"
                                                            }
                                                        }
                                                    }
                                                }
                                            },
                                            "price": {
                                                "id": "gc_bpp_on_select_message_72",
                                                "type": "object",
                                                "properties": {
                                                    "currency": {
                                                        "id": "gc_bpp_on_select_message_73",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "value": {
                                                        "id": "gc_bpp_on_select_message_74",
                                                        "type": "string",
                                                        "minLength": 1
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "title": {
                                        "id": "gc_bpp_on_select_message_75",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "price": {
                                        "id": "gc_bpp_on_select_message_76",
                                        "type": "object",
                                        "properties": {
                                            "currency": {
                                                "id": "gc_bpp_on_select_message_77",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "value": {
                                                "id": "gc_bpp_on_select_message_78",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "ttl": {
                            "id": "gc_bpp_on_select_message_79",
                            "type": "string",
                            "minLength": 1
                        }
                    }
                }

            }
        }
    },
    "required": ["order"]
}
