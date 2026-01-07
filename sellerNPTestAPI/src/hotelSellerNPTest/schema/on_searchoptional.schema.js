module.exports= {
  "id": "hotel_bpp_on_search_message_01",
    "type": "object",
    "properties": {
      "catalog": {
      "id": "hotel_bpp_on_search_message_02",
        "type": "object",
        "properties": {
          "descriptor": {
          "id": "hotel_bpp_on_search_message_03",
            "type": "object",
            "properties": {
              "name": {
              "id": "hotel_bpp_on_search_message_04",
                "type": "string",
                "minLength": 1
              },
              "code": {
              "id": "hotel_bpp_on_search_message_05",
                "type": "string",
                "minLength": 1
              },
              "short_desc": {
              "id": "hotel_bpp_on_search_message_06",
                "type": "string",
                "minLength": 1
              },
              "long_desc": {
                "id": "hotel_bpp_on_search_message_07",
                "type": "string",
                "minLength": 1
              },
              "images": {
                "id": "hotel_bpp_on_search_message_08",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "hotel_bpp_on_search_message_09",
                  "type": "object",
                  "properties": {
                    "url": {
                      "id": "hotel_bpp_on_search_message_10",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                }
              }
            }
          },
          "providers": {
            "id": "hotel_bpp_on_search_message_11",
            "type": "array",
            "minItems": 1,
            "element": {
              "id": "hotel_bpp_on_search_message_12",
              "type": "object",
              "properties": {
                "id": {
                  "id": "hotel_bpp_on_search_message_13",
                  "type": "string",
                  "minLength": 1
                },
                "time": {
                  "id": "hotel_bpp_on_search_message_14",
                  "type": "object",
                  "properties": {
                    "label": {
                      "id": "hotel_bpp_on_search_message_15",
                      "type": "string",
                      "minLength": 1
                    },
                    "timestamp": {
                      "id": "hotel_bpp_on_search_message_16",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "descriptor": {
                  "id": "hotel_bpp_on_search_message_17",
                  "type": "object",
                  "properties": {
                    "name": {
                      "id": "hotel_bpp_on_search_message_18",
                      "type": "string",
                      "minLength": 1
                    },
                    "code": {
                      "id": "hotel_bpp_on_search_message_19",
                      "type": "string",
                      "minLength": 1
                    },
                    "short_desc": {
                      "id": "hotel_bpp_on_search_message_20",
                      "type": "string",
                      "minLength": 1
                    },
                    "long_desc": {
                      "id": "hotel_bpp_on_search_message_21",
                      "type": "string",
                      "minLength": 1
                    },
                    "images": {
                      "id": "hotel_bpp_on_search_message_22",
                      "type": "array",
                      "minItems": 1,
                      "element": {
                        "id": "hotel_bpp_on_search_message_23",
                        "type": "object",
                        "properties": {
                          "url": {
                            "id": "hotel_bpp_on_search_message_24",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      }
                    }
                  }
                },
                "locations": {
                  "id": "hotel_bpp_on_search_message_25",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "hotel_bpp_on_search_message_26",
                    "type": "object",
                    "properties": {
                      "id": {
                        "id": "hotel_bpp_on_search_message_27",
                        "type": "string",
                        "minLength": 1
                      },
                      "gps": {
                        "id": "hotel_bpp_on_search_message_28",
                        "type": "string",
                        "minLength": 1
                      },
                      "address": {
                        "id": "hotel_bpp_on_search_message_29",
                        "type": "string",
                        "minLength": 1
                      },
                      "city": {
                        "id": "hotel_bpp_on_search_message_30",
                        "type": "object",
                        "properties": {
                          "name": {
                            "id": "hotel_bpp_on_search_message_31",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "state": {
                        "id": "hotel_bpp_on_search_message_32",
                        "type": "object",
                        "properties": {
                          "name": {
                            "id": "hotel_bpp_on_search_message_33",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "area_code": {
                        "id": "hotel_bpp_on_search_message_34",
                        "type": "string",
                        "minLength": 1
                      },
                      "rating": {
                        "id": "hotel_bpp_on_search_message_35",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  }
                },
                "categories": {
                  "id": "hotel_bpp_on_search_message_36",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "hotel_bpp_on_search_message_37",
                    "type": "object",
                    "properties": {
                      "id": {
                        "id": "hotel_bpp_on_search_message_38",
                        "type": "string",
                        "minLength": 1
                      },
                      "descriptor": {
                        "id": "hotel_bpp_on_search_message_39",
                        "type": "object",
                        "properties": {
                          "name": {
                            "id": "hotel_bpp_on_search_message_40",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      }
                    }
                  }
                },
                "payments": {
                  "id": "hotel_bpp_on_search_message_41",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "hotel_bpp_on_search_message_42",
                    "type": "object",
                    "properties": {
                      "id": {
                        "id": "hotel_bpp_on_search_message_43",
                        "type": "string",
                        "minLength": 1
                      },
                      "type": {
                        "id": "hotel_bpp_on_search_message_44",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  }
                },
                "items": {
                  "id": "hotel_bpp_on_search_message_45",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "hotel_bpp_on_search_message_46",
                    "type": "object",
                    "properties": {
                      "id": {
                        "id": "hotel_bpp_on_search_message_47",
                        "type": "string",
                        "minLength": 1
                      },
                      "time": {
                        "id": "hotel_bpp_on_search_message_48",
                        "type": "object",
                        "properties": {
                          "label": {
                            "id": "hotel_bpp_on_search_message_49",
                            "type": "string",
                            "minLength": 1
                          },
                          "timestamp": {
                            "id": "hotel_bpp_on_search_message_50",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "descriptor": {
                        "id": "hotel_bpp_on_search_message_51",
                        "type": "object",
                        "properties": {
                          "name": {
                            "id": "hotel_bpp_on_search_message_52",
                            "type": "string",
                            "minLength": 1
                          },
                          "code": {
                            "id": "hotel_bpp_on_search_message_53",
                            "type": "string",
                            "minLength": 1
                          },
                          "additional_desc": {
                            "id": "hotel_bpp_on_search_message_54",
                            "type": "object",
                            "properties": {
                              "url": {
                                "id": "hotel_bpp_on_search_message_55",
                                "type": "string",
                                "minLength": 1
                              },
                              "content_type": {
                                "id": "hotel_bpp_on_search_message_56",
                                "type": "string",
                                "minLength": 1
                              }
                            }
                          },
                          "images": {
                            "id": "hotel_bpp_on_search_message_57",
                            "type": "array",
                            "minItems": 1,
                            "element": {
                              "id": "hotel_bpp_on_search_message_58",
                              "type": "object",
                              "properties": {
                                "url": {
                                  "id": "hotel_bpp_on_search_message_59",
                                  "type": "string",
                                  "minLength": 1
                                }
                              }
                            }
                          }
                        }
                      },
                      "price": {
                        "id": "hotel_bpp_on_search_message_60",
                        "type": "object",
                        "properties": {
                          "currency": {
                            "id": "hotel_bpp_on_search_message_61",
                            "type": "string",
                            "minLength": 1
                          },
                          "value": {
                            "id": "hotel_bpp_on_search_message_62",
                            "type": "string",
                            "minLength": 1
                          },
                          "maximum_value": {
                            "id": "hotel_bpp_on_search_message_63",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "quantity": {
                        "id": "hotel_bpp_on_search_message_64",
                        "type": "object",
                        "properties": {
                          "available": {
                            "id": "hotel_bpp_on_search_message_65",
                            "type": "object",
                            "properties": {
                              "count": {
                                "id": "hotel_bpp_on_search_message_66",
                                "type": "number"
                              }
                            }
                          },
                          "maximum": {
                            "id": "hotel_bpp_on_search_message_67",
                            "type": "object",
                            "properties": {
                              "count": {
                                "id": "hotel_bpp_on_search_message_68",
                                "type": "number"
                              }
                            }
                          }
                        }
                      },
                      "location_ids": {
                        "id": "hotel_bpp_on_search_message_69",
                        "type": "array",
                        "minItems": 1,
                        "element": {
                          "id": "hotel_bpp_on_search_message_70",
                          "type": "object",
                          "properties": {}
                        }
                      },
                      "category_ids": {
                        "id": "hotel_bpp_on_search_message_71",
                        "type": "array",
                        "minItems": 1,
                        "element": {
                          "id": "hotel_bpp_on_search_message_72",
                          "type": "object",
                          "properties": {}
                        }
                      },
                      "payment_ids": {
                        "id": "hotel_bpp_on_search_message_73",
                        "type": "array",
                        "minItems": 1,
                        "element": {
                          "id": "hotel_bpp_on_search_message_74",
                          "type": "object",
                          "properties": {}
                        }
                      },
                      "add_ons": {
                        "id": "hotel_bpp_on_search_message_75",
                        "type": "array",
                        "minItems": 1,
                        "element": {
                          "id": "hotel_bpp_on_search_message_76",
                          "type": "object",
                          "properties": {
                            "id": {
                              "id": "hotel_bpp_on_search_message_77",
                              "type": "string",
                              "minLength": 1
                            },
                            "descriptor": {
                              "id": "hotel_bpp_on_search_message_78",
                              "type": "object",
                              "properties": {
                                "name": {
                                  "id": "hotel_bpp_on_search_message_79",
                                  "type": "string",
                                  "minLength": 1
                                },
                                "short_desc": {
                                  "id": "hotel_bpp_on_search_message_80",
                                  "type": "string",
                                  "minLength": 1
                                }
                              }
                            },
                            "price": {
                              "id": "hotel_bpp_on_search_message_81",
                              "type": "object",
                              "properties": {
                                "currency": {
                                  "id": "hotel_bpp_on_search_message_82",
                                  "type": "string",
                                  "minLength": 1
                                },
                                "value": {
                                  "id": "hotel_bpp_on_search_message_83",
                                  "type": "string",
                                  "minLength": 1
                                },
                                "maximum_value": {
                                  "id": "hotel_bpp_on_search_message_84",
                                  "type": "string",
                                  "minLength": 1
                                }
                              }
                            }
                          }
                        }
                      },
                      "cancellation_terms": {
                        "id": "hotel_bpp_on_search_message_85",
                        "type": "array",
                        "minItems": 1,
                        "element": {
                          "id": "hotel_bpp_on_search_message_86",
                          "type": "object",
                          "properties": {
                            "external_ref": {
                              "id": "hotel_bpp_on_search_message_87",
                              "type": "object",
                              "properties": {
                                "mimetype": {
                                  "id": "hotel_bpp_on_search_message_88",
                                  "type": "string",
                                  "minLength": 1
                                },
                                "url": {
                                  "id": "hotel_bpp_on_search_message_89",
                                  "type": "string",
                                  "minLength": 1
                                }
                              }
                            }
                          }
                        }
                      },
                      "recommended": {
                        "id": "hotel_bpp_on_search_message_90",
                        "type": "boolean"
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