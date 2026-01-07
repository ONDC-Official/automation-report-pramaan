module.exports = {

    "id": "wc_log_bpp_on_select_message_01",
    "type": "object",
    "properties": {
        "order": {
            "id": "wc_log_bpp_on_select_message_02",
            "type": "object",
            "properties": {
                "provider": {
                    "id": "wc_log_bpp_on_select_message_03",
                    "type": "object",
                    "properties": {
                        "id": {
                            "id": "wc_log_bpp_on_select_message_04",
                            "type": "string",
                            "minLength": 1
                        },
                        "descriptor": {
                            "id": "wc_log_bpp_on_select_message_05",
                            "type": "object",
                            "properties": {
                                "images": {
                                    "id": "wc_log_bpp_on_select_message_06",
                                    "type": "array",
                                    "minItems": 1,
                                    "element": {
                                        "id": "wc_log_bpp_on_select_message_07",
                                        "type": "object",
                                        "properties": {
                                            "size_type": {
                                                "id": "wc_log_bpp_on_select_message_08",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "url": {
                                                "id": "wc_log_bpp_on_select_message_09",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    }
                                },
                                "long_desc": {
                                    "id": "wc_log_bpp_on_select_message_10",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "name": {
                                    "id": "wc_log_bpp_on_select_message_11",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "short_desc": {
                                    "id": "wc_log_bpp_on_select_message_12",
                                    "type": "string",
                                    "minLength": 1
                                }
                            }
                        },
                        "tags": {
                            "id": "wc_log_bpp_on_select_message_13",
                            "type": "array",
                            "minItems": 1,
                            "element": {
                                "id": "wc_log_bpp_on_select_message_14",
                                "type": "object",
                                "properties": {
                                    "descriptor": {
                                        "id": "wc_log_bpp_on_select_message_15",
                                        "type": "object",
                                        "properties": {
                                            "code": {
                                                "id": "wc_log_bpp_on_select_message_16",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "name": {
                                                "id": "wc_log_bpp_on_select_message_17",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    },
                                    "list": {
                                        "id": "wc_log_bpp_on_select_message_18",
                                        "type": "array",
                                        "minItems": 1,
                                        "element": {
                                            "id": "wc_log_bpp_on_select_message_19",
                                            "type": "object",
                                            "properties": {
                                                "descriptor": {
                                                    "id": "wc_log_bpp_on_select_message_20",
                                                    "type": "object",
                                                    "properties": {
                                                        "code": {
                                                            "id": "wc_log_bpp_on_select_message_21",
                                                            "type": "string",
                                                            "minLength": 1
                                                        },
                                                        "name": {
                                                            "id": "wc_log_bpp_on_select_message_22",
                                                            "type": "string",
                                                            "minLength": 1
                                                        }
                                                    }
                                                },
                                                "value": {
                                                    "id": "wc_log_bpp_on_select_message_23",
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
                    "id": "wc_log_bpp_on_select_message_24",
                    "type": "object",
                    "properties": {
                        "id": {
                            "id": "wc_log_bpp_on_select_message_25",
                            "type": "string",
                            "minLength": 1
                        },
                        "price": {
                            "id": "wc_log_bpp_on_select_message_26",
                            "type": "object",
                            "properties": {
                                "currency": {
                                    "id": "wc_log_bpp_on_select_message_27",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "value": {
                                    "id": "wc_log_bpp_on_select_message_28",
                                    "type": "string",
                                    "minLength": 1
                                }
                            }
                        },
                        "breakup": {
                            "id": "wc_log_bpp_on_select_message_29",
                            "type": "array",
                            "minItems": 1,
                            "element": {
                                "id": "wc_log_bpp_on_select_message_30",
                                "type": "object",
                                "properties": {
                                    "title": {
                                        "id": "wc_log_bpp_on_select_message_31",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "price": {
                                        "id": "wc_log_bpp_on_select_message_32",
                                        "type": "object",
                                        "properties": {
                                            "value": {
                                                "id": "wc_log_bpp_on_select_message_33",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "currency": {
                                                "id": "wc_log_bpp_on_select_message_34",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "ttl": {
                            "id": "wc_log_bpp_on_select_message_35",
                            "type": "string",
                            "minLength": 1
                        }
                    }

                },
                "items": {
                    "id": "wc_log_bpp_on_select_message_36",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "wc_log_bpp_on_select_message_37",
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "wc_log_bpp_on_select_message_38",
                                "type": "string",
                                "minLength": 1
                            },
                            "parent_item_id": {
                                "id": "wc_log_bpp_on_select_message_39",
                                "type": "string",
                                "minLength": 1
                            },
                            "descriptor": {
                                "id": "wc_log_bpp_on_select_message_40",
                                "type": "object",
                                "properties": {
                                    "code": {
                                        "id": "wc_log_bpp_on_select_message_41",
                                        "type": "string",
                                        "minLength": 1,
                                         "enum":["LOAN"]
                                    },
                                    "name": {
                                        "id": "wc_log_bpp_on_select_message_42",
                                        "type": "string",
                                        "minLength": 1
                                    }
                                }
                            },
                            "category_ids": {
                                "id": "wc_log_bpp_on_select_message_43",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "wc_log_bpp_on_select_message_44",
                                    "type": "object",
                                    "properties": {}
                                }
                            },
                            "fulfillment_ids": {
                                "id": "wc_log_bpp_on_select_message_45",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "wc_log_bpp_on_select_message_46",
                                    "type": "object",
                                    "properties": {}
                                }
                            },
                            "price": {
                                "id": "wc_log_bpp_on_select_message_47",
                                "type": "object",
                                "properties": {
                                    "currency": {
                                        "id": "wc_log_bpp_on_select_message_48",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "value": {
                                        "id": "wc_log_bpp_on_select_message_49",
                                        "type": "string",
                                        "minLength": 1
                                    }
                                }
                            },
                            "tags": {
                                "id": "wc_log_bpp_on_select_message_50",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "wc_log_bpp_on_select_message_51",
                                    "type": "object",
                                    "properties": {
                                        "descriptor": {
                                            "id": "wc_log_bpp_on_select_message_52",
                                            "type": "object",
                                            "properties": {
                                                "code": {
                                                    "id": "wc_log_bpp_on_select_message_53",
                                                    "type": "string",
                                                    "minLength": 1
                                                },
                                                "name": {
                                                    "id": "wc_log_bpp_on_select_message_54",
                                                    "type": "string",
                                                    "minLength": 1
                                                }
                                            }
                                        },
                                        "list": {
                                            "id": "wc_log_bpp_on_select_message_55",
                                            "type": "array",
                                            "minItems": 1,
                                            "element": {
                                                "id": "wc_log_bpp_on_select_message_56",
                                                "type": "object",
                                                "properties": {
                                                    "descriptor": {
                                                        "id": "wc_log_bpp_on_select_message_57",
                                                        "type": "object",
                                                        "properties": {
                                                            "code": {
                                                                "id": "wc_log_bpp_on_select_message_58",
                                                                "type": "string",
                                                                "minLength": 1
                                                            },
                                                            "name": {
                                                                "id": "wc_log_bpp_on_select_message_59",
                                                                "type": "string",
                                                                "minLength": 1
                                                            }
                                                        }
                                                    },
                                                    "value": {
                                                        "id": "wc_log_bpp_on_select_message_60",
                                                        "type": "string",
                                                        "minLength": 1
                                                    }
                                                }
                                            }
                                        },
                                        "display": {
                                            "id": "wc_log_bpp_on_select_message_61",
                                            "type": "boolean"
                                        }
                                    }
                                }
                            },
                            "xinput": {
                                "id": "wc_log_bpp_on_select_message_62",
                                "type": "object",
                                "properties": {
                                    "form": {
                                        "id": "wc_log_bpp_on_select_message_63",
                                        "type": "object",
                                        "properties": {
                                            "id": {
                                                "id": "wc_log_bpp_on_select_message_64",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    },
                                    "form_response": {
                                        "id": "wc_log_bpp_on_select_message_65",
                                        "type": "object",
                                        "properties": {
                                            "status": {
                                                "id": "wc_log_bpp_on_select_message_66",
                                                "type": "string",
                                                "minLength": 1,
                                                 "enum":["PENDING","APPROVED","REJECTED","EXPIRED","SUCCESS"]
                                            },
                                            "submission_id": {
                                                "id": "wc_log_bpp_on_select_message_67",
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
                "fulfillments": {
                    "id": "wc_log_bpp_on_select_message_68",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "wc_log_bpp_on_select_message_69",
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "wc_log_bpp_on_select_message_70",
                                "type": "string",
                                "minLength": 1
                            },
                            "customer": {
                                "id": "wc_log_bpp_on_select_message_71",
                                "type": "object",
                                "properties": {
                                    "person": {
                                        "id": "wc_log_bpp_on_select_message_72",
                                        "type": "object",
                                        "properties": {
                                            "name": {
                                                "id": "wc_log_bpp_on_select_message_73",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "dob": {
                                                "id": "wc_log_bpp_on_select_message_74",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "gender": {
                                                "id": "wc_log_bpp_on_select_message_75",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "creds": {
                                                "id": "wc_log_bpp_on_select_message_76",
                                                "type": "array",
                                                "minItems": 1,
                                                "element": {
                                                    "id": "wc_log_bpp_on_select_message_77",
                                                    "type": "object",
                                                    "properties": {
                                                        "id": {
                                                            "id": "wc_log_bpp_on_select_message_78",
                                                            "type": "string",
                                                            "minLength": 1
                                                        },
                                                        "type": {
                                                            "id": "wc_log_bpp_on_select_message_79",
                                                            "type": "string",
                                                            "minLength": 1
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "contact": {
                                        "id": "wc_log_bpp_on_select_message_80",
                                        "type": "object",
                                        "properties": {
                                            "email": {
                                                "id": "wc_log_bpp_on_select_message_81",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "phone": {
                                                "id": "wc_log_bpp_on_select_message_82",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    }
                                }
                            },
                            "tags": {
                                "id": "wc_log_bpp_on_select_message_83",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "wc_log_bpp_on_select_message_84",
                                    "type": "object",
                                    "properties": {
                                        "descriptor": {
                                            "id": "wc_log_bpp_on_select_message_85",
                                            "type": "object",
                                            "properties": {
                                                "code": {
                                                    "id": "wc_log_bpp_on_select_message_86",
                                                    "type": "string",
                                                    "minLength": 1
                                                },
                                                "name": {
                                                    "id": "wc_log_bpp_on_select_message_87",
                                                    "type": "string",
                                                    "minLength": 1
                                                }
                                            }
                                        },
                                        "list": {
                                            "id": "wc_log_bpp_on_select_message_88",
                                            "type": "array",
                                            "minItems": 1,
                                            "element": {
                                                "id": "wc_log_bpp_on_select_message_89",
                                                "type": "object",
                                                "properties": {
                                                    "descriptor": {
                                                        "id": "wc_log_bpp_on_select_message_90",
                                                        "type": "object",
                                                        "properties": {
                                                            "code": {
                                                                "id": "wc_log_bpp_on_select_message_91",
                                                                "type": "string",
                                                                "minLength": 1
                                                            },
                                                            "name": {
                                                                "id": "wc_log_bpp_on_select_message_92",
                                                                "type": "string",
                                                                "minLength": 1
                                                            }
                                                        }
                                                    },
                                                    "value": {
                                                        "id": "wc_log_bpp_on_select_message_93",
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
}