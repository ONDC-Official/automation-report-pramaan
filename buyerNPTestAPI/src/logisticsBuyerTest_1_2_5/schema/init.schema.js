module.exports = {
    "id": "b2c_log_bap_init_message_01",
    "type": "object",
    "properties": {
        "order": {
            "id": "b2c_log_bap_init_message_02",
            "type": "object",
            "properties": {
                "provider": {
                    "id": "b2c_log_bap_init_message_03",
                    "type": "object",
                    "properties": {
                        "id": {
                            "id": "b2c_log_bap_init_message_04",
                            "type": "string",
                            "minLength": 1
                        },
                        // "locations": {
                        //     "id": "b2c_log_bap_init_message_05",
                        //     "type": "array",
                        //     "minItems": 1,
                        //     "element": {
                        //         "type": "object",
                        //         "properties": {
                        //             "id": {
                        //                 "id": "b2c_log_bap_init_message_06",
                        //                 "type": "string",
                        //                 "minLength": 1
                        //             }
                        //         }
                        //     }
                        // }
                    }
                },
                "items": {
                    "id": "b2c_log_bap_init_message_07",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "b2c_log_bap_init_message_08",
                                "type": "string",
                                "minLength": 1
                            },
                            "fulfillment_id": {
                                "id": "b2c_log_bap_init_message_09",
                                "type": "string",
                                "minLength": 1
                            },
                            // "category_id": {
                            //     "id": "b2c_log_bap_init_message_10",
                            //     "type": "string",
                            //     "minLength": 1
                            // }
                        }
                    }
                },
                "fulfillments": {
                    "id": "b2c_log_bap_init_message_11",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "b2c_log_bap_init_message_12",
                                "type": "string",
                                "minLength": 1
                            },
                            "type": {
                                "id": "b2c_log_bap_init_message_13",
                                "type": "string",
                                "minLength": 1
                            },
                            "start": {
                                "id": "b2c_log_bap_init_message_14",
                                "type": "object",
                                "properties": {
                                    "location": {
                                        "id": "b2c_log_bap_init_message_15",
                                        "type": "object",
                                        "properties": {
                                            "id": {
                                                "id": "b2c_log_bap_init_message_16",
                                                "type": "string",
                                                "optional": true,
                                                "minLength": 1
                                            },
                                            "gps": {
                                                "id": "b2c_log_bap_init_message_17",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "address": {
                                                "id": "b2c_log_bap_init_message_18",
                                                "type": "object",
                                                "properties": {
                                                    "name": {
                                                        "id": "b2c_log_bap_init_message_19",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "building": {
                                                        "id": "b2c_log_bap_init_message_20",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "locality": {
                                                        "id": "b2c_log_bap_init_message_21",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "city": {
                                                        "id": "b2c_log_bap_init_message_22",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "state": {
                                                        "id": "b2c_log_bap_init_message_23",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "country": {
                                                        "id": "b2c_log_bap_init_message_24",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "area_code": {
                                                        "id": "b2c_log_bap_init_message_25",
                                                        "type": "string",
                                                        "minLength": 1
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "contact": {
                                        "id": "b2c_log_bap_init_message_26",
                                        "type": "object",
                                        "properties": {
                                            "phone": {
                                                "id": "b2c_log_bap_init_message_27",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "email": {
                                                "id": "b2c_log_bap_init_message_28",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    }
                                }
                            },
                            // "end": {
                            //     "id": "b2c_log_bap_init_message_29",
                            //     "type": "object",
                            //     "properties": {
                            //         "location": {
                            //             "id": "b2c_log_bap_init_message_30",
                            //             "type": "object",
                            //             "optional": true,
                            //             "properties": {
                            //                 "gps": {
                            //                     "id": "b2c_log_bap_init_message_31",
                            //                     "type": "string",
                            //                     "minLength": 1
                            //                 },
                            //                 "address": {
                            //                     "id": "b2c_log_bap_init_message_32",
                            //                     "type": "object",
                            //                     "properties": {
                            //                         "name": {
                            //                             "id": "b2c_log_bap_init_message_33",
                            //                             "type": "string",
                            //                             "minLength": 1
                            //                         },
                            //                         "building": {
                            //                             "id": "b2c_log_bap_init_message_34",
                            //                             "type": "string",
                            //                             "minLength": 1
                            //                         },
                            //                         "locality": {
                            //                             "id": "b2c_log_bap_init_message_35",
                            //                             "type": "string",
                            //                             "minLength": 1
                            //                         },
                            //                         "city": {
                            //                             "id": "b2c_log_bap_init_message_36",
                            //                             "type": "string",
                            //                             "minLength": 1
                            //                         },
                            //                         "state": {
                            //                             "id": "b2c_log_bap_init_message_37",
                            //                             "type": "string",
                            //                             "minLength": 1
                            //                         },
                            //                         "country": {
                            //                             "id": "b2c_log_bap_init_message_38",
                            //                             "type": "string",
                            //                             "minLength": 1
                            //                         },
                            //                         "area_code": {
                            //                             "id": "b2c_log_bap_init_message_39",
                            //                             "type": "string",
                            //                             "minLength": 1
                            //                         }
                            //                     }
                            //                 }
                            //             }
                            //         },
                            //         "contact": {
                            //             "id": "b2c_log_bap_init_message_40",
                            //             "type": "object",
                            //             "properties": {
                            //                 "phone": {
                            //                     "id": "b2c_log_bap_init_message_41",
                            //                     "type": "string",
                            //                     "minLength": 1
                            //                 },
                            //                 "email": {
                            //                     "id": "b2c_log_bap_init_message_42",
                            //                     "type": "string",
                            //                     "minLength": 1
                            //                 }
                            //             }
                            //         }
                            //     }
                            // },
                            // "tags": {
                            //     "id": "b2c_log_bap_init_message_43",
                            //     "type": "array",
                            //     "optional": true,
                            //     "minItems": 1,
                            //     "element": {
                            //         "type": "object",
                            //         "properties": {
                            //             "code": {
                            //                 "id": "b2c_log_bap_init_message_44",
                            //                 "type": "string",
                            //                 "minLength": 1
                            //             },
                            //             "list": {
                            //                 "id": "b2c_log_bap_init_message_45",
                            //                 "type": "array",
                            //                 "minItems": 1,
                            //                 "element": {
                            //                     "type": "object",
                            //                     "properties": {
                            //                         "code": {
                            //                             "id": "b2c_log_bap_init_message_46",
                            //                             "type": "string",
                            //                             "minLength": 1
                            //                         },
                            //                         "value": {
                            //                             "id": "b2c_log_bap_init_message_47",
                            //                             "type": "string",
                            //                             "minLength": 1
                            //                         }
                            //                     }
                            //                 }
                            //             }
                            //         }
                            //     }
                            // }
                        }
                    }
                },
                "billing": {
                    "id": "b2c_log_bap_init_message_48",
                    "type": "object",
                    "properties": {
                        "name": {
                            "id": "b2c_log_bap_init_message_49",
                            "type": "string",
                            "minLength": 1
                        },
                        "address": {
                            "id": "b2c_log_bap_init_message_50",
                            "type": "object",
                            "properties": {
                                "name": {
                                    "id": "b2c_log_bap_init_message_51",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "building": {
                                    "id": "b2c_log_bap_init_message_52",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "locality": {
                                    "id": "b2c_log_bap_init_message_53",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "city": {
                                    "id": "b2c_log_bap_init_message_54",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "state": {
                                    "id": "b2c_log_bap_init_message_55",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "country": {
                                    "id": "b2c_log_bap_init_message_56",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "area_code": {
                                    "id": "b2c_log_bap_init_message_57",
                                    "type": "string",
                                    "minLength": 1
                                }
                            }
                        },
                        "tax_number": {
                            "id": "b2c_log_bap_init_message_58",
                            "type": "string",
                            "minLength": 1
                        },
                        "phone": {
                            "id": "b2c_log_bap_init_message_59",
                            "type": "string",
                            "minLength": 1
                        },
                        "email": {
                            "id": "b2c_log_bap_init_message_60",
                            "type": "string",
                            "minLength": 1
                        },
                        "created_at": {
                            "id": "b2c_log_bap_init_message_61",
                            "type": "string",
                            "minLength": 1
                        },
                        "updated_at": {
                            "id": "b2c_log_bap_init_message_62",
                            "type": "string",
                            "minLength": 1
                        }
                    }
                },
                "payment": {
                    "id": "b2c_log_bap_init_message_63",
                    "type": "object",
                    "properties": {
                        "collected_by": {
                            "id": "b2c_log_bap_init_message_64",
                            "type": "string",
                            "minLength": 1
                        },
                        "type": {
                            "id": "b2c_log_bap_init_message_65",
                            "type": "string",
                            "minLength": 1
                        },
                        "@ondc/org/settlement_basis": {
                            "id": "b2c_log_bap_init_message_66",
                            "type": "string",
                            "minLength": 1
                        },
                        "@ondc/org/settlement_window": {
                            "id": "b2c_log_bap_init_message_67",
                            "type": "string",
                            "minLength": 1
                        },
                        "@ondc/org/settlement_details": {
                            "id": "b2c_log_bap_init_message_68",
                            "type": "array",
                            "optional": true,
                            "minItems": 1,
                            "element": {
                                "type": "object",
                                "properties": {
                                    "settlement_counterparty": {
                                        "id": "b2c_log_bap_init_message_69",
                                        "type": "string",
                                        "optional": true,
                                        "minLength": 1,
                                        "enum": ["lbnp", "lsp"]
                                    },
                                    "settlement_type": {
                                        "id": "b2c_log_bap_init_message_70",
                                        "type": "string",
                                        "optional": true,
                                        "minLength": 1,
                                        "enum": ["upi", "neft", "rtgs"]
                                    },
                                    "beneficiary_name": {
                                        "id": "b2c_log_bap_init_message_71",
                                        "type": "string",
                                        "optional": true,
                                        "minLength": 1
                                    },
                                    "upi_address": {
                                        "id": "b2c_log_bap_init_message_72",
                                        "type": "string",
                                        "optional": true,
                                        "minLength": 1
                                    },
                                    "settlement_bank_account_no": {
                                        "id": "b2c_log_bap_init_message_73",
                                        "type": "string",
                                        "optional": true,
                                        "minLength": 1
                                    },
                                    "settlement_ifsc_code": {
                                        "id": "b2c_log_bap_init_message_74",
                                        "type": "string",
                                        "optional": true,
                                        "minLength": 1
                                    }
                                }
                            }
                        }
                    }
                },
                "tags": {
                    "id": "b2c_log_bap_init_message_75",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "type": "object",
                        "properties": {
                            "code": {
                                "id": "b2c_log_bap_init_message_76",
                                "type": "string",
                                "minLength": 1
                            },
                            "list": {
                                "id": "b2c_log_bap_init_message_77",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "type": "object",
                                    "properties": {
                                        "code": {
                                            "id": "b2c_log_bap_init_message_78",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "value": {
                                            "id": "b2c_log_bap_init_message_79",
                                            "type": "string",
                                            "minLength": 1,
                                            "enum": ["yes", "no"]
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
};