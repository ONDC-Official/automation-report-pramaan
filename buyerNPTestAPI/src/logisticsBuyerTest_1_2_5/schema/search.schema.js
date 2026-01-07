module.exports = {
    "id": "b2c_log_bap_search_message_01",
    "type": "object",
    "properties": {
        "intent": {
            "id": "b2c_log_bap_search_message_02",
            "type": "object",
            "properties": {
                "category": {
                    "id": "b2c_log_bap_search_message_03",
                    "type": "object",
                    "properties": {
                        // "id": {
                        //     "id": "b2c_log_bap_search_message_04",
                        //     "type": "string",
                        //     "minLength": 1
                        // }
                    }
                },
                // "item": {
                //     "id": "b2c_log_bap_search_message_05",
                //     "type": "object",
                //     "properties": {
                //         "descriptor": {
                //             "id": "b2c_log_bap_search_message_06",
                //             "type": "object",
                //             "properties": {
                //                 "code": {
                //                     "id": "b2c_log_bap_search_message_07",
                //                     "type": "string",
                //                     "minLength": 1
                //                 }
                //             }
                //         }
                //     }
                // },
                "provider": {
                    "id": "b2c_log_bap_search_message_08",
                    "type": "object",
                    "properties": {
                        "time": {
                            "id": "b2c_log_bap_search_message_09",
                            "type": "object",
                            "properties": {
                                "days": {
                                    "id": "b2c_log_bap_search_message_10",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "schedule": {
                                    "id": "b2c_log_bap_search_message_11",
                                    "type": "object",
                                    "properties": {
                                        "holidays": {
                                            "id": "b2c_log_bap_search_message_12",
                                            "type": "array",
                                             "optional": true,
                                            "minItems": 1,
                                            "element": {
                                                "type": "string",
                                                "minLength": 1
                                            }
                                        }
                                    }
                                },
                                "duration": {
                                    "id": "b2c_log_bap_search_message_13",
                                    "type": "string",
                                    "minLength": 1
                                },
                                "range": {
                                    "id": "b2c_log_bap_search_message_14",
                                    "type": "object",
                                    "properties": {
                                        "start": {
                                            "id": "b2c_log_bap_search_message_15",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "end": {
                                            "id": "b2c_log_bap_search_message_16",
                                            "type": "string",
                                            "minLength": 1
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "fulfillment": {
                    "id": "b2c_log_bap_search_message_17",
                    "type": "object",
                    "properties": {
                        "type": {
                            "id": "b2c_log_bap_search_message_18",
                            "type": "string",
                            "minLength": 1
                        },
                        "start": {
                            "id": "b2c_log_bap_search_message_19",
                            "type": "object",
                            "properties": {
                                "location": {
                                    "id": "b2c_log_bap_search_message_20",
                                    "type": "object",
                                    "properties": {
                                        "id": {
                                            "id": "b2c_log_bap_search_message_21",
                                            "type": "string",
                                             "optional": true,
                                            "minLength": 1
                                        },
                                        "gps": {
                                            "id": "b2c_log_bap_search_message_22",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "address": {
                                            "id": "b2c_log_bap_search_message_23",
                                            "type": "object",
                                            "properties": {
                                                "area_code": {
                                                    "id": "b2c_log_bap_search_message_24",
                                                    "type": "string",
                                                    "minLength": 1
                                                }
                                            }
                                        }
                                    }
                                },
                                // "authorization": {
                                //     "id": "b2c_log_bap_search_message_25",
                                //     "type": "object",
                                //     "properties": {
                                //         "type": {
                                //             "id": "b2c_log_bap_search_message_26",
                                //             "type": "string",
                                //             "minLength": 1
                                //         }
                                //     }
                                // }
                            }
                        },
                        // "end": {
                        //     "id": "b2c_log_bap_search_message_27",
                        //     "type": "object",
                        //     "properties": {
                        //         "location": {
                        //             "id": "b2c_log_bap_search_message_28",
                        //             "type": "object",
                        //             "properties": {
                        //                 "gps": {
                        //                     "id": "b2c_log_bap_search_message_29",
                        //                     "type": "string",
                        //                     "minLength": 1
                        //                 },
                        //                 "address": {
                        //                     "id": "b2c_log_bap_search_message_30",
                        //                     "type": "object",
                        //                     "properties": {
                        //                         "area_code": {
                        //                             "id": "b2c_log_bap_search_message_31",
                        //                             "type": "string",
                        //                             "minLength": 1
                        //                         }
                        //                     }
                        //                 }
                        //             }
                        //         },
                        //         // "authorization": {
                        //         //     "id": "b2c_log_bap_search_message_32",
                        //         //     "type": "object",
                        //         //     "properties": {
                        //         //         "type": {
                        //         //             "id": "b2c_log_bap_search_message_33",
                        //         //             "type": "string",
                        //         //             "minLength": 1
                        //         //         }
                        //         //     }
                        //         // }
                        //     }
                        // },
                        // "tags": {
                        //     "id": "b2c_log_bap_search_message_34",
                        //     "type": "array",
                        //      "optional": true,
                        //     "minItems": 1,
                        //     "element": {
                        //         "type": "object",
                        //         "properties": {
                        //             "code": {
                        //                 "id": "b2c_log_bap_search_message_35",
                        //                 "type": "string",
                        //                 "minLength": 1
                        //             },
                        //             "list": {
                        //                 "id": "b2c_log_bap_search_message_36",
                        //                 "type": "array",
                        //                 "minItems": 1,
                        //                 "element": {
                        //                     "type": "object",
                        //                     "properties": {
                        //                         "code": {
                        //                             "id": "b2c_log_bap_search_message_37",
                        //                             "type": "string",
                        //                             "minLength": 1
                        //                         },
                        //                         "value": {
                        //                             "id": "b2c_log_bap_search_message_38",
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
                },
                "payment": {
                    "id": "b2c_log_bap_search_message_39",
                    "type": "object",
                    "properties": {
                        "type": {
                            "id": "b2c_log_bap_search_message_40",
                            "type": "string",
                            "minLength": 1
                        },
                        // "@ondc/org/collection_amount": {
                        //     "id": "b2c_log_bap_search_message_41",
                        //     "type": "string",
                        //     "minLength": 1
                        // }
                    }
                },
                // "@ondc/org/payload_details": {
                //     "id": "b2c_log_bap_search_message_42",
                //     "type": "object",
                //     "properties": {
                //         "weight": {
                //             "id": "b2c_log_bap_search_message_43",
                //             "type": "object",
                //             "properties": {
                //                 "unit": {
                //                     "id": "b2c_log_bap_search_message_44",
                //                     "type": "string",
                //                     "minLength": 1
                //                 },
                //                 "value": {
                //                     "id": "b2c_log_bap_search_message_45",
                //                     "type": "number"
                //                 }
                //             }
                //         },
                //         "dimensions": {
                //             "id": "b2c_log_bap_search_message_46",
                //             "type": "object",
                //             "properties": {
                //                 "length": {
                //                     "id": "b2c_log_bap_search_message_47",
                //                     "type": "object",
                //                     "properties": {
                //                         "unit": {
                //                             "id": "b2c_log_bap_search_message_48",
                //                             "type": "string",
                //                             "minLength": 1
                //                         },
                //                         "value": {
                //                             "id": "b2c_log_bap_search_message_49",
                //                             "type": "number"
                //                         }
                //                     }
                //                 },
                //                 "breadth": {
                //                     "id": "b2c_log_bap_search_message_50",
                //                     "type": "object",
                //                     "properties": {
                //                         "unit": {
                //                             "id": "b2c_log_bap_search_message_51",
                //                             "type": "string",
                //                             "minLength": 1
                //                         },
                //                         "value": {
                //                             "id": "b2c_log_bap_search_message_52",
                //                             "type": "number"
                //                         }
                //                     }
                //                 },
                //                 "height": {
                //                     "id": "b2c_log_bap_search_message_53",
                //                     "type": "object",
                //                     "properties": {
                //                         "unit": {
                //                             "id": "b2c_log_bap_search_message_54",
                //                             "type": "string",
                //                             "minLength": 1
                //                         },
                //                         "value": {
                //                             "id": "b2c_log_bap_search_message_55",
                //                             "type": "number"
                //                         }
                //                     }
                //                 }
                //             }
                //         },
                //         "category": {
                //             "id": "b2c_log_bap_search_message_56",
                //             "type": "string",
                //             "minLength": 1
                //         },
                //         "value": {
                //             "id": "b2c_log_bap_search_message_57",
                //             "type": "object",
                //             "properties": {
                //                 "currency": {
                //                     "id": "b2c_log_bap_search_message_58",
                //                     "type": "string",
                //                     "minLength": 1
                //                 },
                //                 "value": {
                //                     "id": "b2c_log_bap_search_message_59",
                //                     "type": "string",
                //                     "minLength": 1
                //                 }
                //             }
                //         },
                //         "dangerous_goods": {
                //             "id": "b2c_log_bap_search_message_60",
                //             "type": "boolean"
                //         }
                //     }
                // },
                "tags": {
                    "id": "b2c_log_bap_search_message_61",
                    "type": "array",
                     "optional": true,
                    "minItems": 1,
                    "element": {
                        "type": "object",
                        "properties": {
                            "code": {
                                "id": "b2c_log_bap_search_message_62",
                                "type": "string",
                                "minLength": 1
                            },
                            "list": {
                                "id": "b2c_log_bap_search_message_63",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "type": "object",
                                    "properties": {
                                        "code": {
                                            "id": "b2c_log_bap_search_message_64",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "value": {
                                            "id": "b2c_log_bap_search_message_65",
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