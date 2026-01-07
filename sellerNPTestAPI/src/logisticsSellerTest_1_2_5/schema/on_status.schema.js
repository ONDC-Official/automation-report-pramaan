module.exports = {
    "id": "b2c_log_bpp_on_status_message_01",
    "type": "object",
    "properties": {
        "order": {
            "id": "b2c_log_bpp_on_status_message_02",
            "type": "object",
            "properties": {
                "id": {
                    "id": "b2c_log_bpp_on_status_message_03",
                    "type": "string",
                    "minLength": 1
                },
                "state": {
                    "id": "b2c_log_bpp_on_status_message_04",
                    "type": "string",
                    "enum": ["Created", "Accepted", "In-progress", "Completed", "Cancelled"],
                    "minLength": 1
                },
                // "cancellation": {
                //     "id": "b2c_log_bpp_on_status_message_05",
                //     "type": "object",
                //     "properties": {
                //         "cancelled_by": {
                //             "id": "b2c_log_bpp_on_status_message_06",
                //             "type": "string",
                //             "minLength": 1
                //         },
                //         "reason": {
                //             "id": "b2c_log_bpp_on_status_message_07",
                //             "type": "object",
                //             "properties": {
                //                 "id": {
                //                     "id": "b2c_log_bpp_on_status_message_08",
                //                     "type": "string",
                //                     "minLength": 1
                //                 }
                //             }
                //         }
                //     }
                // },
                "provider": {
                    "id": "b2c_log_bpp_on_status_message_09",
                    "type": "object",
                    "properties": {
                        "id": {
                            "id": "b2c_log_bpp_on_status_message_10",
                            "type": "string",
                            "minLength": 1
                        },
                        // "locations": {
                        //     "id": "b2c_log_bpp_on_status_message_11",
                        //     "type": "array",
                        //     "minItems": 1,
                        //     "element": {
                        //         "id": "b2c_log_bpp_on_status_message_12",
                        //         "type": "object",
                        //         "properties": {
                        //             "id": {
                        //                 "id": "b2c_log_bpp_on_status_message_13",
                        //                 "type": "string",
                        //                 "minLength": 1
                        //             }
                        //         }
                        //     }
                        // }
                    }
                },
                "items": {
                    "id": "b2c_log_bpp_on_status_message_14",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "b2c_log_bpp_on_status_message_15",
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "b2c_log_bpp_on_status_message_16",
                                "type": "string",
                                "minLength": 1
                            },
                            "fulfillment_id": {
                                "id": "b2c_log_bpp_on_status_message_17",
                                "type": "string",
                                "minLength": 1
                            },
                            // "category_id": {
                            //     "id": "b2c_log_bpp_on_status_message_18",
                            //     "type": "string",
                            //     "minLength": 1
                            // },
                            // "descriptor": {
                            //     "id": "b2c_log_bpp_on_status_message_19",
                            //     "type": "object",
                            //     "properties": {
                            //         "code": {
                            //             "id": "b2c_log_bpp_on_status_message_20",
                            //             "type": "string",
                            //             "minLength": 1
                            //         }
                            //     }
                            // },
                            "time": {
                                "id": "b2c_log_bpp_on_status_message_21",
                                "type": "object",
                                "properties": {
                                    "label": {
                                        "id": "b2c_log_bpp_on_status_message_22",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "duration": {
                                        "id": "b2c_log_bpp_on_status_message_23",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "timestamp": {
                                        "id": "b2c_log_bpp_on_status_message_24",
                                        "type": "string",
                                        "minLength": 1
                                    }
                                }
                            }
                        },
                        //  "required": {
                        //     "type": "array",
                        //     "element": {
                        //         "allOf": [
                        //             {
                        //                 "if": {
                        //                     "properties": {
                        //                         "type": "params",
                        //                         "flowId": {
                        //                             "const": [
                        //                                 "LOG10_7",
                        //                                 "LOG10COD",
                        //                                 "LOG10SURGFEE",
                        //                             ]
                        //                         }
                        //                     }
                        //                 },
                        //                 "then": [
                        //                     "id",
                        //                     "time",
                        //                     "fulfillment_id",
                        //                     "category_id"
                        //                 ]
                        //             }
                        //         ]
                        //     }
                        // }
                    }
                },
                "quote": {
                    "id": "b2c_log_bpp_on_status_message_25",
                    "type": "object",
                    "properties": {
                        "price": {
                            "id": "b2c_log_bpp_on_status_message_26",
                            "type": "object",
                            "properties": {
                                "currency": {
                                    "id": "b2c_log_bpp_on_status_message_27",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "value": {
                                    "id": "b2c_log_bpp_on_status_message_28",
                                    "type": "string",
                                    "minLength": 1
                                }
                            }
                        },
                        "breakup": {
                            "id": "b2c_log_bpp_on_status_message_29",
                            "type": "array",
                            "minItems": 1,
                            "element": {
                                "id": "b2c_log_bpp_on_status_message_30",
                                "type": "object",
                                "properties": {
                                    "@ondc/org/item_id": {
                                        "id": "b2c_log_bpp_on_status_message_31",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "@ondc/org/title_type": {
                                        "id": "b2c_log_bpp_on_status_message_32",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "price": {
                                        "id": "b2c_log_bpp_on_status_message_33",
                                        "type": "object",
                                        "properties": {
                                            "currency": {
                                                "id": "b2c_log_bpp_on_status_message_34",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "value": {
                                                "id": "b2c_log_bpp_on_status_message_35",
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
                    "id": "b2c_log_bpp_on_status_message_36",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "b2c_log_bpp_on_status_message_37",
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "b2c_log_bpp_on_status_message_38",
                                "type": "string",
                                "minLength": 1
                            },
                            "type": {
                                "id": "b2c_log_bpp_on_status_message_39",
                                "type": "string",
                                "minLength": 1
                            },
                            // "@ondc/org/awb_no": {
                            //     "id": "b2c_log_bpp_on_status_message_40",
                            //     "type": "string",
                            //     "minLength": 1
                            // },
                            "state": {
                                "id": "b2c_log_bpp_on_status_message_41",
                                "type": "object",
                                "properties": {
                                    "descriptor": {
                                        "id": "b2c_log_bpp_on_status_message_42",
                                        "type": "object",
                                        "properties": {
                                            "code": {
                                                "id": "b2c_log_bpp_on_status_message_43",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            // "short_desc": {
                                            //     "id": "b2c_log_bpp_on_status_message_44",
                                            //     "type": "string",
                                            //     "minLength": 1
                                            // }
                                        }
                                    }
                                }
                            },
                            "tracking": {
                                "id": "b2c_log_bpp_on_status_message_45",
                                "type": "boolean"
                            },
                            "start": {
                                "id": "b2c_log_bpp_on_status_message_46",
                                "type": "object",
                                "properties": {
                                    "person": {
                                        "id": "b2c_log_bpp_on_status_message_47",
                                        "type": "object",
                                        "properties": {
                                            "name": {
                                                "id": "b2c_log_bpp_on_status_message_48",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    },
                                    "location": {
                                        "id": "b2c_log_bpp_on_status_message_49",
                                        "type": "object",
                                        "properties": {
                                            "id": {
                                                "id": "b2c_log_bpp_on_status_message_50",
                                                "type": "string",
                                                "optional": true,
                                                "minLength": 1
                                            },
                                            "gps": {
                                                "id": "b2c_log_bpp_on_status_message_51",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "address": {
                                                "id": "b2c_log_bpp_on_status_message_52",
                                                "type": "object",
                                                "properties": {
                                                    "name": {
                                                        "id": "b2c_log_bpp_on_status_message_53",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "building": {
                                                        "id": "b2c_log_bpp_on_status_message_54",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "locality": {
                                                        "id": "b2c_log_bpp_on_status_message_55",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "city": {
                                                        "id": "b2c_log_bpp_on_status_message_56",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "state": {
                                                        "id": "b2c_log_bpp_on_status_message_57",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "country": {
                                                        "id": "b2c_log_bpp_on_status_message_58",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "area_code": {
                                                        "id": "b2c_log_bpp_on_status_message_59",
                                                        "type": "string",
                                                        "minLength": 1
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    "contact": {
                                        "id": "b2c_log_bpp_on_status_message_60",
                                        "type": "object",
                                        "properties": {
                                            "phone": {
                                                "id": "b2c_log_bpp_on_status_message_61",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "email": {
                                                "id": "b2c_log_bpp_on_status_message_62",
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    },
                                    "time": {
                                        "id": "b2c_log_bpp_on_status_message_63",
                                        "type": "object",
                                        "properties": {
                                            "duration": {
                                                "id": "b2c_log_bpp_on_status_message_64",
                                                "type": "string",
                                                "minLength": 1
                                            },
                                            "range": {
                                                "id": "b2c_log_bpp_on_status_message_65",
                                                "type": "object",
                                                "properties": {
                                                    "start": {
                                                        "id": "b2c_log_bpp_on_status_message_66",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "end": {
                                                        "id": "b2c_log_bpp_on_status_message_67",
                                                        "type": "string",
                                                        "minLength": 1
                                                    }
                                                }
                                            },
                                            "timestamp": {
                                                "id": "b2c_log_bpp_on_status_message_68",
                                                "type": "string",
                                                "optional": true,
                                                "minLength": 1
                                            }
                                        },
                                        // "required": {
                                        //     "type": "array",
                                        //     "element": {
                                        //         "allOf": [
                                        //             {
                                        //                 "if": {
                                        //                     "properties": {
                                        //                         "type": "params",
                                        //                         "flowId": {
                                        //                             "const": [
                                        //                                 "LOG10SURGFEE",
                                        //                                 "LOG10_7",
                                        //                                 "LOG10COD"
                                        //                             ],
                                        //                             "if": {
                                        //                                 "properties": {
                                        //                                     "type": "params",
                                        //                                     "step": {
                                        //                                         "const": [
                                        //                                             "III",
                                        //                                             "IV",
                                        //                                             "V"
                                        //                                         ]
                                        //                                     }
                                        //                                 }
                                        //                             }
                                        //                         }
                                        //                     }
                                        //                 },
                                        //                 "then": [
                                        //                     "duration",
                                        //                     "range",
                                        //                     "timestamp",
                                        //                 ]
                                        //             }
                                        //         ]
                                        //     }
                                        // }
                                    },
                                    "instructions": {
                                        "id": "b2c_log_bpp_on_status_message_69",
                                        "type": "object",
                                        "optional": true,
                                        "properties": {
                                            "code": {
                                                "id": "b2c_log_bpp_on_status_message_70",
                                                "type": "string",
                                                "optional": true,
                                                "minLength": 1
                                            },
                                            "name": {
                                                "id": "b2c_log_bpp_on_status_message_71",
                                                "type": "string",
                                                "optional": true,
                                                "minLength": 1
                                            },
                                            "short_desc": {
                                                "id": "b2c_log_bpp_on_status_message_72",
                                                "type": "string",
                                                "optional": true,
                                                "minLength": 1
                                            },
                                            "long_desc": {
                                                "id": "b2c_log_bpp_on_status_message_73",
                                                "type": "string",
                                                "optional": true,
                                                "minLength": 1
                                            },
                                            // "images": {
                                            //     "id": "b2c_log_bpp_on_status_message_74",
                                            //     "type": "array",
                                            //     "minItems": 1,
                                            //     "element": {
                                            //         "id": "b2c_log_bpp_on_status_message_75",
                                            //         "type": "string",
                                            //         "minLength": 1
                                            //     }
                                            // },
                                            "additional_desc": {
                                                "id": "b2c_log_bpp_on_status_message_76",
                                                "type": "object",
                                                "optional": true,
                                                "properties": {
                                                    "content_type": {
                                                        "id": "b2c_log_bpp_on_status_message_77",
                                                        "type": "string",
                                                        "optional": true,
                                                        "minLength": 1
                                                    },
                                                    "url": {
                                                        "id": "b2c_log_bpp_on_status_message_78",
                                                        "type": "string",
                                                        "optional": true,
                                                        "minLength": 1
                                                    }
                                                }
                                            }
                                        },
                                        // "required": {
                                        //     "type": "array",
                                        //     "element": {
                                        //         "allOf": [
                                        //             {
                                        //                 "if": {
                                        //                     "properties": {
                                        //                         "type": "params",
                                        //                         "flowId": {
                                        //                             "const": [
                                        //                                 "LOG10_7",
                                        //                                 "LOG10SURGFEE"
                                        //                             ],
                                        //                             "if": {
                                        //                                 "properties": {
                                        //                                     "type": "params",
                                        //                                     "step": {
                                        //                                         "const": [
                                        //                                             "III",
                                        //                                             "IV",
                                        //                                             "V"
                                        //                                         ]
                                        //                                     }
                                        //                                 }
                                        //                             }
                                        //                         }
                                        //                     }
                                        //                 },
                                        //                 "then": [
                                        //                     "name",
                                        //                     "images"
                                        //                 ]
                                        //             }
                                        //         ]
                                        //     }
                                        // }
                                    },
                                    "authorization": {
                                        "id": "b2c_log_bpp_on_status_message_79",
                                        "optional": true,
                                        "type": "object",
                                        "properties": {
                                            "type": {
                                                "id": "b2c_log_bpp_on_status_message_80",
                                                "type": "string",
                                                "enum": ["OTP"],
                                                "optional": true,
                                                "minLength": 1
                                            },
                                            "token": {
                                                "id": "b2c_log_bpp_on_status_message_81",
                                                "type": "string",
                                                "optional": true,
                                                "minLength": 1
                                            },
                                            "valid_from": {
                                                "id": "b2c_log_bpp_on_status_message_82",
                                                "type": "string",
                                                "optional": true,
                                                "minLength": 1
                                            },
                                            "valid_to": {
                                                "id": "b2c_log_bpp_on_status_message_83",
                                                "type": "string",
                                                "optional": true,
                                                "minLength": 1
                                            }
                                        }
                                    }
                                }
                            },
                            // "end": {
                            //     "id": "b2c_log_bpp_on_status_message_84",
                            //     "type": "object",
                            //     "properties": {
                            //         "person": {
                            //             "id": "b2c_log_bpp_on_status_message_85",
                            //             "type": "object",
                            //             "properties": {
                            //                 "name": {
                            //                     "id": "b2c_log_bpp_on_status_message_86",
                            //                     "type": "string",
                            //                     "minLength": 1
                            //                 }
                            //             }
                            //         },
                            //         "location": {
                            //             "id": "b2c_log_bpp_on_status_message_87",
                            //             "type": "object",
                            //             "properties": {
                            //                 "gps": {
                            //                     "id": "b2c_log_bpp_on_status_message_88",
                            //                     "type": "string",
                            //                     "minLength": 1
                            //                 },
                            //                 "address": {
                            //                     "id": "b2c_log_bpp_on_status_message_89",
                            //                     "type": "object",
                            //                     "properties": {
                            //                         "name": {
                            //                             "id": "b2c_log_bpp_on_status_message_90",
                            //                             "type": "string",
                            //                             "minLength": 1
                            //                         },
                            //                         "building": {
                            //                             "id": "b2c_log_bpp_on_status_message_91",
                            //                             "type": "string",
                            //                             "minLength": 1
                            //                         },
                            //                         "locality": {
                            //                             "id": "b2c_log_bpp_on_status_message_92",
                            //                             "type": "string",
                            //                             "minLength": 1
                            //                         },
                            //                         "city": {
                            //                             "id": "b2c_log_bpp_on_status_message_93",
                            //                             "type": "string",
                            //                             "minLength": 1
                            //                         },
                            //                         "state": {
                            //                             "id": "b2c_log_bpp_on_status_message_94",
                            //                             "type": "string",
                            //                             "minLength": 1
                            //                         },
                            //                         "country": {
                            //                             "id": "b2c_log_bpp_on_status_message_95",
                            //                             "type": "string",
                            //                             "minLength": 1
                            //                         },
                            //                         "area_code": {
                            //                             "id": "b2c_log_bpp_on_status_message_96",
                            //                             "type": "string",
                            //                             "minLength": 1
                            //                         }
                            //                     }
                            //                 }
                            //             }
                            //         },
                            //         "contact": {
                            //             "id": "b2c_log_bpp_on_status_message_97",
                            //             "type": "object",
                            //             "properties": {
                            //                 "phone": {
                            //                     "id": "b2c_log_bpp_on_status_message_98",
                            //                     "type": "string",
                            //                     "minLength": 1
                            //                 },
                            //                 "email": {
                            //                     "id": "b2c_log_bpp_on_status_message_99",
                            //                     "type": "string",
                            //                     "minLength": 1
                            //                 }
                            //             }
                            //         },
                            //         "time": {
                            //             "id": "b2c_log_bpp_on_status_message_100",
                            //             "type": "object",
                            //             "properties": {
                            //                 "range": {
                            //                     "id": "b2c_log_bpp_on_status_message_101",
                            //                     "type": "object",
                            //                     "properties": {
                            //                         "start": {
                            //                             "id": "b2c_log_bpp_on_status_message_102",
                            //                             "type": "string",
                            //                             "minLength": 1
                            //                         },
                            //                         "end": {
                            //                             "id": "b2c_log_bpp_on_status_message_103",
                            //                             "type": "string",
                            //                             "minLength": 1
                            //                         }
                            //                     }
                            //                 },

                            //                 // Added in status.js

                            //                 // "timestamp": {
                            //                 //     "id": "b2c_log_bpp_on_status_message_104",
                            //                 //     "type": "string",
                            //                 //     "minLength": 1
                            //                 // }
                            //             }
                            //         },
                            //         "instructions": {
                            //             "id": "b2c_log_bpp_on_status_message_105",
                            //             "type": "object",
                            //             "optional": true,
                            //             "properties": {
                            //                 "code": {
                            //                     "id": "b2c_log_bpp_on_status_message_106",
                            //                     "type": "string",
                            //                     "optional": true,
                            //                     "minLength": 1
                            //                 },
                            //                 "name": {
                            //                     "id": "b2c_log_bpp_on_status_message_107",
                            //                     "type": "string",
                            //                     "optional": true,
                            //                     "minLength": 1
                            //                 },
                            //                 "short_desc": {
                            //                     "id": "b2c_log_bpp_on_status_message_108",
                            //                     "type": "string",
                            //                     "optional": true,
                            //                     "minLength": 1
                            //                 },
                            //                 "long_desc": {
                            //                     "id": "b2c_log_bpp_on_status_message_109",
                            //                     "type": "string",
                            //                     "optional": true,
                            //                     "minLength": 1
                            //                 }
                            //             }
                            //         },
                            //         "authorization": {
                            //             "id": "b2c_log_bpp_on_status_message_110",
                            //             "type": "object",
                            //             "optional": true,
                            //             "properties": {
                            //                 "type": {
                            //                     "id": "b2c_log_bpp_on_status_message_111",
                            //                     "type": "string",
                            //                     "enum": ["OTP"],
                            //                     "optional": true,
                            //                     "minLength": 1
                            //                 },
                            //                 "token": {
                            //                     "id": "b2c_log_bpp_on_status_message_112",
                            //                     "type": "string",
                            //                     "optional": true,
                            //                     "minLength": 1
                            //                 },
                            //                 "valid_from": {
                            //                     "id": "b2c_log_bpp_on_status_message_113",
                            //                     "type": "string",
                            //                     "optional": true,
                            //                     "minLength": 1
                            //                 },
                            //                 "valid_to": {
                            //                     "id": "b2c_log_bpp_on_status_message_114",
                            //                     "type": "string",
                            //                     "optional": true,
                            //                     "minLength": 1
                            //                 }
                            //             }
                            //         }
                            //     }
                            // },
                            "agent": {
                                "id": "b2c_log_bpp_on_status_message_115",
                                "type": "object",
                                "optional": true,
                                "properties": {
                                    "name": {
                                        "id": "b2c_log_bpp_on_status_message_116",
                                        "type": "string",
                                        "optional": true,
                                        "minLength": 1
                                    },
                                    "phone": {
                                        "id": "b2c_log_bpp_on_status_message_117",
                                        "type": "string",
                                        "optional": true,
                                        "minLength": 1
                                    }
                                }
                            },
                            "vehicle": {
                                "id": "b2c_log_bpp_on_status_message_118",
                                "type": "object",
                                "optional": true,
                                "properties": {
                                    "registration": {
                                        "id": "b2c_log_bpp_on_status_message_119",
                                        "type": "string",
                                        "optional": true,
                                        "minLength": 1
                                    }
                                }
                            },
                            // "@ondc/org/ewaybillno": {
                            //     "id": "b2c_log_bpp_on_status_message_120",
                            //     "type": "string",
                            //     "minLength": 1
                            // },
                            // "@ondc/org/ebnexpirydate": {
                            //     "id": "b2c_log_bpp_on_status_message_121",
                            //     "type": "string",
                            //     "minLength": 1
                            // },
                            "tags": {
                                "id": "b2c_log_bpp_on_status_message_122",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "b2c_log_bpp_on_status_message_123",
                                    "type": "object",
                                    "properties": {
                                        "code": {
                                            "id": "b2c_log_bpp_on_status_message_124",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "list": {
                                            "id": "b2c_log_bpp_on_status_message_125",
                                            "type": "array",
                                            "minItems": 1,
                                            "element": {
                                                "id": "b2c_log_bpp_on_status_message_126",
                                                "type": "object",
                                                "properties": {
                                                    "code": {
                                                        "id": "b2c_log_bpp_on_status_message_127",
                                                        "type": "string",
                                                        "minLength": 1
                                                    },
                                                    "value": {
                                                        "id": "b2c_log_bpp_on_status_message_128",
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
                "payment": {
                    "id": "b2c_log_bpp_on_status_message_129",
                    "type": "object",
                    "properties": {
                        // "@ondc/org/collection_amount": {
                        //     "id": "b2c_log_bpp_on_status_message_130",
                        //     "type": "string",
                        //     "minLength": 1
                        // },
                        "type": {
                            "id": "b2c_log_bpp_on_status_message_131",
                            "type": "string",
                            "minLength": 1
                        },
                        "collected_by": {
                            "id": "b2c_log_bpp_on_status_message_132",
                            "type": "string",
                            "minLength": 1
                        },
                        "@ondc/org/settlement_basis": {
                            "id": "b2c_log_bpp_on_status_message_133",
                            "type": "string",
                            "minLength": 1
                        },
                        "@ondc/org/settlement_window": {
                            "id": "b2c_log_bpp_on_status_message_134",
                            "type": "string",
                            "minLength": 1
                        },
                        "status": {
                            "id": "b2c_log_bpp_on_status_message_135",
                            "type": "string",
                            "minLength": 1
                        },
                        // "time": {
                        //     "id": "b2c_log_bpp_on_status_message_136",
                        //     "type": "object",
                        //     "properties": {
                        //         "timestamp": {
                        //             "id": "b2c_log_bpp_on_status_message_137",
                        //             "type": "string",
                        //             "minLength": 1
                        //         }
                        //     }
                        // },
                        "@ondc/org/settlement_details": {
                            "id": "b2c_log_bpp_on_status_message_138",
                            "type": "array",
                            "minItems": 1,
                            "element": {
                                "id": "b2c_log_bpp_on_status_message_139",
                                "type": "object",
                                "properties": {
                                    "settlement_counterparty": {
                                        "id": "b2c_log_bpp_on_status_message_140",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "settlement_type": {
                                        "id": "b2c_log_bpp_on_status_message_141",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "upi_address": {
                                        "id": "b2c_log_bpp_on_status_message_142",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "settlement_bank_account_no": {
                                        "id": "b2c_log_bpp_on_status_message_143",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    "settlement_ifsc_code": {
                                        "id": "b2c_log_bpp_on_status_message_144",
                                        "type": "string",
                                        "minLength": 1
                                    },
                                    // "settlement_status": {
                                    //     "id": "b2c_log_bpp_on_status_message_145",
                                    //     "type": "string",
                                    //     "minLength": 1
                                    // },
                                    // "settlement_reference": {
                                    //     "id": "b2c_log_bpp_on_status_message_146",
                                    //     "type": "string",
                                    //     "minLength": 1
                                    // },
                                    // "settlement_timestamp": {
                                    //     "id": "b2c_log_bpp_on_status_message_147",
                                    //     "type": "string",
                                    //     "minLength": 1
                                    // }
                                }
                            }
                        }
                    },
                    //  "required": {
                    //         "type": "array",
                    //         "element": {
                    //             "allOf": [
                    //                 {
                    //                     "if": {
                    //                         "properties": {
                    //                             "type": "params",
                    //                             "flowId": {
                    //                                 "const": [
                    //                                     "LOG10_7",
                    //                                     "LOG10COD",
                    //                                     "LOG10SURGFEE",
                    //                                 ]
                    //                             }
                    //                         }
                    //                     },
                    //                     "then": [
                    //                         "collected_by",
                    //                         "@ondc/org/settlement_basis",
                    //                         "@ondc/org/settlement_window",
                    //                         "@ondc/org/settlement_details",
                    //                         "status",
                    //                         "type"
                    //                     ]
                    //                 }
                    //             ]
                    //         }
                    //     }
                },
                "billing": {
                    "id": "b2c_log_bpp_on_status_message_148",
                    "type": "object",
                    "properties": {
                        "name": {
                            "id": "b2c_log_bpp_on_status_message_149",
                            "type": "string",
                            "minLength": 1
                        },
                        "address": {
                            "id": "b2c_log_bpp_on_status_message_150",
                            "type": "object",
                            "properties": {
                                "name": {
                                    "id": "b2c_log_bpp_on_status_message_151",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "building": {
                                    "id": "b2c_log_bpp_on_status_message_152",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "locality": {
                                    "id": "b2c_log_bpp_on_status_message_153",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "city": {
                                    "id": "b2c_log_bpp_on_status_message_154",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "state": {
                                    "id": "b2c_log_bpp_on_status_message_155",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "country": {
                                    "id": "b2c_log_bpp_on_status_message_156",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "area_code": {
                                    "id": "b2c_log_bpp_on_status_message_157",
                                    "type": "string",
                                    "minLength": 1
                                }
                            }
                        },
                        "tax_number": {
                            "id": "b2c_log_bpp_on_status_message_158",
                            "type": "string",
                            "minLength": 1
                        },
                        "phone": {
                            "id": "b2c_log_bpp_on_status_message_159",
                            "type": "string",
                            "minLength": 1
                        },
                        "email": {
                            "id": "b2c_log_bpp_on_status_message_160",
                            "type": "string",
                            "minLength": 1
                        }
                    }
                },
                // "@ondc/org/linked_order": {
                //     "id": "b2c_log_bpp_on_status_message_161",
                //     "type": "object",
                //     "properties": {
                //         "items": {
                //             "id": "b2c_log_bpp_on_status_message_162",
                //             "type": "array",
                //             "minItems": 1,
                //             "element": {
                //                 "id": "b2c_log_bpp_on_status_message_163",
                //                 "type": "object",
                //                 "properties": {
                //                     "category_id": {
                //                         "id": "b2c_log_bpp_on_status_message_164",
                //                         "type": "string",
                //                         "minLength": 1
                //                     },
                //                     "descriptor": {
                //                         "id": "b2c_log_bpp_on_status_message_165",
                //                         "type": "object",
                //                         "properties": {
                //                             "name": {
                //                                 "id": "b2c_log_bpp_on_status_message_166",
                //                                 "type": "string",
                //                                 "minLength": 1
                //                             }
                //                         }
                //                     },
                //                     "quantity": {
                //                         "id": "b2c_log_bpp_on_status_message_167",
                //                         "type": "object",
                //                         "properties": {
                //                             "count": {
                //                                 "id": "b2c_log_bpp_on_status_message_168",
                //                                 "type": "number"
                //                             },
                //                             "measure": {
                //                                 "id": "b2c_log_bpp_on_status_message_169",
                //                                 "type": "object",
                //                                 "properties": {
                //                                     "unit": {
                //                                         "id": "b2c_log_bpp_on_status_message_170",
                //                                         "type": "string",
                //                                         "minLength": 1
                //                                     },
                //                                     "value": {
                //                                         "id": "b2c_log_bpp_on_status_message_171",
                //                                         "type": "number"
                //                                     }
                //                                 }
                //                             }
                //                         }
                //                     },
                //                     "price": {
                //                         "id": "b2c_log_bpp_on_status_message_172",
                //                         "type": "object",
                //                         "properties": {
                //                             "currency": {
                //                                 "id": "b2c_log_bpp_on_status_message_173",
                //                                 "type": "string",
                //                                 "minLength": 1
                //                             },
                //                             "value": {
                //                                 "id": "b2c_log_bpp_on_status_message_174",
                //                                 "type": "string",
                //                                 "minLength": 1
                //                             }
                //                         }
                //                     }
                //                 }
                //             }
                //         },
                //         "provider": {
                //             "id": "b2c_log_bpp_on_status_message_175",
                //             "type": "object",
                //             "properties": {
                //                 // "descriptor": {
                //                 //     "id": "b2c_log_bpp_on_status_message_176",
                //                 //     "type": "object",
                //                 //     "properties": {
                //                 //         "name": {
                //                 //             "id": "b2c_log_bpp_on_status_message_177",
                //                 //             "type": "string",
                //                 //             "minLength": 1
                //                 //         }
                //                 //     }
                //                 // },
                //                 "address": {
                //                     "id": "b2c_log_bpp_on_status_message_178",
                //                     "type": "object",
                //                     "properties": {
                //                         "name": {
                //                             "id": "b2c_log_bpp_on_status_message_179",
                //                             "type": "string",
                //                             "minLength": 1
                //                         },
                //                         "building": {
                //                             "id": "b2c_log_bpp_on_status_message_180",
                //                             "type": "string",
                //                             "minLength": 1
                //                         },
                //                         // "street": {
                //                         //     "id": "b2c_log_bpp_on_status_message_181",
                //                         //     "type": "string",
                //                         //     "minLength": 1
                //                         // },
                //                         "locality": {
                //                             "id": "b2c_log_bpp_on_status_message_182",
                //                             "type": "string",
                //                             "minLength": 1
                //                         },
                //                         "city": {
                //                             "id": "b2c_log_bpp_on_status_message_183",
                //                             "type": "string",
                //                             "minLength": 1
                //                         },
                //                         "state": {
                //                             "id": "b2c_log_bpp_on_status_message_184",
                //                             "type": "string",
                //                             "minLength": 1
                //                         },
                //                         "area_code": {
                //                             "id": "b2c_log_bpp_on_status_message_185",
                //                             "type": "string",
                //                             "minLength": 1
                //                         }
                //                     }
                //                 }
                //             }
                //         },
                //         "order": {
                //             "id": "b2c_log_bpp_on_status_message_186",
                //             "type": "object",
                //             "properties": {
                //                 "id": {
                //                     "id": "b2c_log_bpp_on_status_message_187",
                //                     "type": "string",
                //                     "minLength": 1
                //                 },
                //                 "weight": {
                //                     "id": "b2c_log_bpp_on_status_message_188",
                //                     "type": "object",
                //                     "properties": {
                //                         "unit": {
                //                             "id": "b2c_log_bpp_on_status_message_189",
                //                             "type": "string",
                //                             "minLength": 1
                //                         },
                //                         "value": {
                //                             "id": "b2c_log_bpp_on_status_message_190",
                //                             "type": "number"
                //                         }
                //                     }
                //                 },
                //                 "dimensions": {
                //                     "id": "b2c_log_bpp_on_status_message_191",
                //                     "type": "object",
                //                     "properties": {
                //                         "length": {
                //                             "id": "b2c_log_bpp_on_status_message_192",
                //                             "type": "object",
                //                             "properties": {
                //                                 "unit": {
                //                                     "id": "b2c_log_bpp_on_status_message_193",
                //                                     "type": "string",
                //                                     "minLength": 1
                //                                 },
                //                                 "value": {
                //                                     "id": "b2c_log_bpp_on_status_message_194",
                //                                     "type": "number"
                //                                 }
                //                             }
                //                         },
                //                         "breadth": {
                //                             "id": "b2c_log_bpp_on_status_message_195",
                //                             "type": "object",
                //                             "properties": {
                //                                 "unit": {
                //                                     "id": "b2c_log_bpp_on_status_message_196",
                //                                     "type": "string",
                //                                     "minLength": 1
                //                                 },
                //                                 "value": {
                //                                     "id": "b2c_log_bpp_on_status_message_197",
                //                                     "type": "number"
                //                                 }
                //                             }
                //                         },
                //                         "height": {
                //                             "id": "b2c_log_bpp_on_status_message_198",
                //                             "type": "object",
                //                             "properties": {
                //                                 "unit": {
                //                                     "id": "b2c_log_bpp_on_status_message_199",
                //                                     "type": "string",
                //                                     "minLength": 1
                //                                 },
                //                                 "value": {
                //                                     "id": "b2c_log_bpp_on_status_message_200",
                //                                     "type": "number"
                //                                 }
                //                             }
                //                         }
                //                     }
                //                 }
                //             }
                //         }
                //     }
                // },
                // "tags": {
                //     "id": "b2c_log_bpp_on_status_message_201",
                //     "type": "array",
                //     "minItems": 1,
                //     "element": {
                //         "id": "b2c_log_bpp_on_status_message_202",
                //         "type": "object",
                //         "properties": {
                //             "code": {
                //                 "id": "b2c_log_bpp_on_status_message_203",
                //                 "type": "string",
                //                 "minLength": 1
                //             },
                //             "list": {
                //                 "id": "b2c_log_bpp_on_status_message_204",
                //                 "type": "array",
                //                 "minItems": 1,
                //                 "element": {
                //                     "id": "b2c_log_bpp_on_status_message_205",
                //                     "type": "object",
                //                     "properties": {
                //                         "code": {
                //                             "id": "b2c_log_bpp_on_status_message_206",
                //                             "type": "string",
                //                             "minLength": 1
                //                         },
                //                         "value": {
                //                             "id": "b2c_log_bpp_on_status_message_207",
                //                             "type": "string",
                //                             "minLength": 1
                //                         }
                //                     }
                //                 }
                //             }
                //         }
                //     }
                // },
                "updated_at": {
                    "id": "b2c_log_bpp_on_status_message_218",
                    "type": "string",
                    "minLength": 1
                }
            }
        }
    }
}