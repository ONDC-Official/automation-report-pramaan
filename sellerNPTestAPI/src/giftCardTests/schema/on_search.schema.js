module.exports = {
    "id": "gc_bpp_on_search_message_01",
    "type": "object",
    "properties": {
        "catalog": {
            "id": "gc_bpp_on_search_message_02",
            "type": "object",
            "properties": {
                "fulfillments": {
                    "id": "gc_bpp_on_search_message_03",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "gc_bpp_on_search_message_04",
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "gc_bpp_on_search_message_05",
                                "type": "string",
                                "minLength": 1
                            },
                            "id": "gc_bpp_on_search_message_06",
                            "type": {
                                "id": "gc_bpp_on_search_message_07",
                                "type": "string",
                                "minLength": 1
                            }
                        }
                    }
                },
                "descriptor": {
                    "id": "gc_bpp_on_search_message_08",
                    "type": "object",
                    "properties": {
                        "name": {
                            "id": "gc_bpp_on_search_message_09",
                            "type": "string",
                            "minLength": 1
                        },
                        "symbol": {
                            "id": "gc_bpp_on_search_message_10",
                            "type": "string",
                            "minLength": 1
                        },
                        "short_desc": {
                            "id": "gc_bpp_on_search_message_11",
                            "type": "string",
                            "minLength": 1
                        },
                        "long_desc": {
                            "id": "gc_bpp_on_search_message_12",
                            "type": "string",
                            "minLength": 1
                        },
                        "images": {
                            "id": "gc_bpp_on_search_message_13",
                            "type": "array",
                            "minItems": 1,
                            "element": {
                                "id": "gc_bpp_on_search_message_14",
                                "type": "string",
                                "minLength": 1
                            }
                        }
                    }
                },
                "providers": {
                    "id": "gc_bpp_on_search_message_15",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "gc_bpp_on_search_message_16",
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "gc_bpp_on_search_message_17",
                                "type": "string",
                                "minLength": 1
                            },
                            "ttl": {
                                "id": "gc_bpp_on_search_message_18",
                                "type": "string",
                                "minLength": 1
                            },
                            "time": {
                                "id": "gc_bpp_on_search_message_19",
                                "type": "object",
                                "properties": {
                                    "label": {
                                        "id": "gc_bpp_on_search_message_20",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "timestamp": {
                                        "id": "gc_bpp_on_search_message_21",
                                        "type": "string",
                                        "minLength": 1
                                    }
                                }
                            },
                            "descriptor": {
                                "id": "gc_bpp_on_search_message_22",
                                "type": "object",
                                "properties": {
                                    "name": {
                                        "id": "gc_bpp_on_search_message_23",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "symbol": {
                                        "id": "gc_bpp_on_search_message_24",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "short_desc": {
                                        "id": "gc_bpp_on_search_message_25",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "long_desc": {
                                        "id": "gc_bpp_on_search_message_26",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "images": {
                                        "id": "gc_bpp_on_search_message_27",
                                        "type": "array",
                                        "minItems": 1,
                                        "element": {
                                            "id": "gc_bpp_on_search_message_28",
                                            "type": "string",
                                            "minLength": 1
                                        }
                                    }
                                }
                            },
                            "categories": {
                                "id": "gc_bpp_on_search_message_29",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "gc_bpp_on_search_message_30",
                                    "type": "object",
                                    "properties": {
                                        "id": {
                                            "id": "gc_bpp_on_search_message_31",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "descriptor": {
                                            "id": "gc_bpp_on_search_message_32",
                                            "type": "object",
                                            "properties": {
                                                "code": {
                                                    "id": "gc_bpp_on_search_message_33",
                                                    "type": "string",
                                                    "minLength": 1
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "items": {
                                "id": "gc_bpp_on_search_message_34",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "gc_bpp_on_search_message_35",
                                    "type": "object",
                                    "properties": {
                                        "id": {
                                            "id": "gc_bpp_on_search_message_36",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "descriptor": {
                                            "id": "gc_bpp_on_search_message_37",
                                            "type": "object",
                                            "properties": {
                                                "name": {
                                                    "id": "gc_bpp_on_search_message_38",
                                                    "type": "string",
                                                    "minLength": 1
                                                },
                                                "symbol": {
                                                    "id": "gc_bpp_on_search_message_39",
                                                    "type": "string",
                                                    "minLength": 1
                                                },
                                                "short_desc": {
                                                    "id": "gc_bpp_on_search_message_40",
                                                    "type": "string",
                                                    "minLength": 1
                                                },
                                                "long_desc": {
                                                    "id": "gc_bpp_on_search_message_41",
                                                    "type": "string",
                                                    "minLength": 1
                                                },
                                                "images": {
                                                    "id": "gc_bpp_on_search_message_42",
                                                    "type": "array",
                                                    "minItems": 1,
                                                    "element": {
                                                        "id": "gc_bpp_on_search_message_43",
                                                        "type": "string",
                                                        "minLength": 1
                                                    }
                                                }
                                            }
                                        },
                                        "price": {
                                            "id": "gc_bpp_on_search_message_44",
                                            "type": "object",
                                            "properties": {
                                                "currency": {
                                                    "id": "gc_bpp_on_search_message_45",
                                                    "type": "string",
                                                    "minLength": 1
                                                },
                                                "minimum_value": {
                                                    "id": "gc_bpp_on_search_message_46",
                                                    "type": "string",
                                                    "minLength": 1
                                                },
                                                "maximum_value": {
                                                    "id": "gc_bpp_on_search_message_47",
                                                    "type": "string",
                                                    "minLength": 1
                                                }
                                            }
                                        },
                                        "tags": {
                                            "id": "gc_bpp_on_search_message_48",
                                            "type": "array",
                                            "minItems": 1,
                                            "element": {
                                                "id": "gc_bpp_on_search_message_49",
                                                "type": "object",
                                                "properties": {
                                                    "descriptor": {
                                                        "id": "gc_bpp_on_search_message_50",
                                                        "type": "object",
                                                        "properties": {
                                                            "code": {
                                                                "id": "gc_bpp_on_search_message_51",
                                                                "type": "string",
                                                                "minLength": 1
                                                            }
                                                        }
                                                    },
                                                    "list": {
                                                        "id": "gc_bpp_on_search_message_52",
                                                        "type": "array",
                                                        "minItems": 1,
                                                        "element": {
                                                            "id": "gc_bpp_on_search_message_53",
                                                            "type": "object",
                                                            "properties": {
                                                                "descriptor": {
                                                                    "id": "gc_bpp_on_search_message_54",
                                                                    "type": "object",
                                                                    "properties": {
                                                                        "code": {
                                                                            "id": "gc_bpp_on_search_message_55",
                                                                            "type": "string",
                                                                            "minLength": 1
                                                                        }
                                                                    }
                                                                },
                                                                "value": {
                                                                    "id": "gc_bpp_on_search_message_56",
                                                                    "type": "string",
                                                                    "minLength": 1
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        "category_ids": {
                                            "id": "gc_bpp_on_search_message_57",
                                            "type": "array",
                                            "minItems": 1,
                                            "element": {
                                                "id": "gc_bpp_on_search_message_58",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        },
                                        "fulfillment_ids": {
                                            "id": "gc_bpp_on_search_message_59",
                                            "type": "array",
                                            "minItems": 1,
                                            "element": {
                                                "id": "gc_bpp_on_search_message_60",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    }
                                }
                            },
                            "offers": {
                                "id": "gc_bpp_on_search_message_61",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "gc_bpp_on_search_message_62",
                                    "type": "object",
                                    "properties": {
                                        "id": {
                                            "id": "gc_bpp_on_search_message_63",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "descriptor": {
                                            "id": "gc_bpp_on_search_message_64",
                                            "type": "object",
                                            "properties": {
                                                "name": {
                                                    "id": "gc_bpp_on_search_message_65",
                                                    "type": "string",
                                                    "minLength": 1
                                                },
                                                "code": {
                                                    "id": "gc_bpp_on_search_message_66",
                                                    "type": "string",
                                                    "minLength": 1
                                                },
                                                "short_desc": {
                                                    "id": "gc_bpp_on_search_message_67",
                                                    "type": "string",
                                                    "minLength": 1
                                                },
                                                "long_desc": {
                                                    "id": "gc_bpp_on_search_message_68",
                                                    "type": "string",
                                                    "minLength": 1
                                                },
                                                "images": {
                                                    "id": "gc_bpp_on_search_message_69",
                                                    "type": "array",
                                                    "minItems": 1,
                                                    "element": {
                                                        "id": "gc_bpp_on_search_message_70",
                                                        "type": "string",
                                                        "minLength": 1
                                                    }
                                                }
                                            }
                                        },
                                        "item_ids": {
                                            "id": "gc_bpp_on_search_message_71",
                                            "type": "array",
                                            "minItems": 1,
                                            "element": {
                                                "id": "gc_bpp_on_search_message_72",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        },
                                        "time": {
                                            "id": "gc_bpp_on_search_message_73",
                                            "type": "object",
                                            "properties": {
                                                "label": {
                                                    "id": "gc_bpp_on_search_message_74",
                                                    "type": "string",
                                                    "minLength": 1
                                                },
                                                "range": {
                                                    "id": "gc_bpp_on_search_message_75",
                                                    "type": "object",
                                                    "properties": {
                                                        "start": {
                                                            "id": "gc_bpp_on_search_message_76",
                                                            "type": "string",
                                                            "minLength": 1
                                                        },
                                                        "end": {
                                                            "id": "gc_bpp_on_search_message_77",
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
        }
    },
    "required": ["catalog"]
}