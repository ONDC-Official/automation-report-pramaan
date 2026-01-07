module.exports = {
  "id": "LI_bpp_on_search_message_01",
    "type": "object",
    "properties": {
      "catalog": {
        "id": "LI_bpp_on_search_message_02",
        "type": "object",
        "properties": {
          "descriptor": {
            "id": "LI_bpp_on_search_message_03",
            "type": "object",
            "properties": {
              "name": {
                "id": "LI_bpp_on_search_message_04",
                "type": "string",
                "minLength": 1
              }
            }
          },
          "providers": {
            "id": "LI_bpp_on_search_message_05",
            "type": "array",
            "minItems": 1,
            "element": {
              "id": "LI_bpp_on_search_message_06",
              "type": "object",
              "properties": {
                "id": {
                  "id": "LI_bpp_on_search_message_07",
                  "type": "string",
                  "minLength": 1
                },
                "descriptor": {
                  "id": "LI_bpp_on_search_message_08",
                  "type": "object",
                  "properties": {
                    "images": {
                      "id": "LI_bpp_on_search_message_09",
                      "type": "array",
                      "minItems": 1,
                      "element": {
                        "id": "LI_bpp_on_search_message_10",
                        "type": "object",
                        "properties": {
                          "url": {
                            "id": "LI_bpp_on_search_message_11",
                            "type": "string",
                            "minLength": 1
                          },
                          "size_type": {
                            "id": "LI_bpp_on_search_message_12",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      }
                    },
                    "name": {
                      "id": "LI_bpp_on_search_message_13",
                      "type": "string",
                      "minLength": 1
                    },
                    "short_desc": {
                      "id": "LI_bpp_on_search_message_14",
                      "type": "string",
                      "minLength": 1
                    },
                    "long_desc": {
                      "id": "LI_bpp_on_search_message_15",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "categories": {
                  "id": "LI_bpp_on_search_message_16",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "LI_bpp_on_search_message_17",
                    "type": "object",
                    "properties": {
                      "id": {
                        "id": "LI_bpp_on_search_message_18",
                        "type": "string",
                        "minLength": 1
                      },
                      "descriptor": {
                        "id": "LI_bpp_on_search_message_19",
                        "type": "object",
                        "properties": {
                          "code": {
                            "id": "LI_bpp_on_search_message_20",
                            "type": "string",
                            "minLength": 1
                          },
                          "name": {
                            "id": "LI_bpp_on_search_message_21",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      }
                    }
                  }
                },
                "items": {
                  "id": "LI_bpp_on_search_message_22",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "LI_bpp_on_search_message_23",
                    "type": "object",
                    "properties": {
                      "id": {
                        "id": "LI_bpp_on_search_message_24",
                        "type": "string",
                        "minLength": 1
                      },
                      "descriptor": {
                        "id": "LI_bpp_on_search_message_25",
                        "type": "object",
                        "properties": {
                          "code": {
                            "id": "LI_bpp_on_search_message_26",
                            "type": "string",
                            "minLength": 1
                          },
                          "name": {
                            "id": "LI_bpp_on_search_message_27",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "category_ids": {
                        "id": "LI_bpp_on_search_message_28",
                        "type": "array",
                        "minItems": 1,
                        "element": {
                          "id": "LI_bpp_on_search_message_29",
                          "type": "object",
                          "properties": {}
                        }
                      },
                      "matched": {
                        "id": "LI_bpp_on_search_message_30",
                        "type": "boolean"
                      },
                      "recommended": {
                        "id": "LI_bpp_on_search_message_31",
                        "type": "boolean"
                      },
                      "tags": {
                        "id": "LI_bpp_on_search_message_32",
                        "type": "array",
                        "minItems": 1,
                        "element": {
                          "id": "LI_bpp_on_search_message_33",
                          "type": "object",
                          "properties": {
                            "descriptor": {
                              "id": "LI_bpp_on_search_message_34",
                              "type": "object",
                              "properties": {
                                "code": {
                                  "id": "LI_bpp_on_search_message_35",
                                  "type": "string",
                                  "minLength": 1
                                },
                                "name": {
                                  "id": "LI_bpp_on_search_message_36",
                                  "type": "string",
                                  "minLength": 1
                                }
                              }
                            },
                            "list": {
                              "id": "LI_bpp_on_search_message_37",
                              "type": "array",
                              "minItems": 1,
                              "element": {
                                "id": "LI_bpp_on_search_message_38",
                                "type": "object",
                                "properties": {
                                  "descriptor": {
                                    "id": "LI_bpp_on_search_message_39",
                                    "type": "object",
                                    "properties": {
                                      "code": {
                                        "id": "LI_bpp_on_search_message_40",
                                        "type": "string",
                                        "minLength": 1
                                      },
                                      "name": {
                                        "id": "LI_bpp_on_search_message_41",
                                        "type": "string",
                                        "minLength": 1
                                      }
                                    }
                                  },
                                  "value": {
                                    "id": "LI_bpp_on_search_message_42",
                                    "type": "string",
                                    "minLength": 1
                                  }
                                }
                              }
                            }
                          }
                        }
                      },
                      "add_ons": {
                        "id": "LI_bpp_on_search_message_43",
                        "type": "array",
                        "minItems": 1,
                        "element": {
                          "id": "LI_bpp_on_search_message_44",
                          "type": "object",
                          "properties": {
                            "id": {
                              "id": "LI_bpp_on_search_message_45",
                              "type": "string",
                              "minLength": 1
                            },
                            "quantity": {
                              "id": "LI_bpp_on_search_message_46",
                              "type": "object",
                              "properties": {
                                "available": {
                                  "id": "LI_bpp_on_search_message_47",
                                  "type": "object",
                                  "properties": {
                                    "count": {
                                      "id": "LI_bpp_on_search_message_48",
                                      "type": "number"
                                    }
                                  }
                                }
                              }
                            },
                            "descriptor": {
                              "id": "LI_bpp_on_search_message_49",
                              "type": "object",
                              "properties": {
                                "name": {
                                  "id": "LI_bpp_on_search_message_50",
                                  "type": "string",
                                  "minLength": 1
                                },
                                "code": {
                                  "id": "LI_bpp_on_search_message_51",
                                  "type": "string",
                                  "minLength": 1
                                }
                              }
                            },
                            "price": {
                              "id": "LI_bpp_on_search_message_52",
                              "type": "object",
                              "properties": {
                                "value": {
                                  "id": "LI_bpp_on_search_message_53",
                                  "type": "string",
                                  "minLength": 1
                                },
                                "currency": {
                                  "id": "LI_bpp_on_search_message_54",
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
                "tags": {
                  "id": "LI_bpp_on_search_message_55",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "LI_bpp_on_search_message_56",
                    "type": "object",
                    "properties": {
                      "descriptor": {
                        "id": "LI_bpp_on_search_message_57",
                        "type": "object",
                        "properties": {
                          "code": {
                            "id": "LI_bpp_on_search_message_58",
                            "type": "string",
                            "minLength": 1
                          },
                          "name": {
                            "id": "LI_bpp_on_search_message_59",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "list": {
                        "id": "LI_bpp_on_search_message_60",
                        "type": "array",
                        "minItems": 1,
                        "element": {
                          "id": "LI_bpp_on_search_message_61",
                          "type": "object",
                          "properties": {
                            "descriptor": {
                              "id": "LI_bpp_on_search_message_62",
                              "type": "object",
                              "properties": {
                                "code": {
                                  "id": "LI_bpp_on_search_message_63",
                                  "type": "string",
                                  "minLength": 1
                                },
                                "name": {
                                  "id": "LI_bpp_on_search_message_64",
                                  "type": "string",
                                  "minLength": 1
                                }
                              }
                            },
                            "value": {
                              "id": "LI_bpp_on_search_message_65",
                              "type": "string",
                              "minLength": 1
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "payments": {
                  "id": "LI_bpp_on_search_message_66",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "LI_bpp_on_search_message_67",
                    "type": "object",
                    "properties": {
                      "collected_by": {
                        "id": "LI_bpp_on_search_message_68",
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
            "id": "LI_bpp_on_search_message_69",
            "type": "array",
            "minItems": 1,
            "element": {
              "id": "LI_bpp_on_search_message_70",
              "type": "object",
              "properties": {
                "display": {
                  "id": "LI_bpp_on_search_message_71",
                  "type": "boolean"
                },
                "descriptor": {
                  "id": "LI_bpp_on_search_message_72",
                  "type": "object",
                  "properties": {
                    "name": {
                      "id": "LI_bpp_on_search_message_73",
                      "type": "string",
                      "minLength": 1
                    },
                    "code": {
                      "id": "LI_bpp_on_search_message_74",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "list": {
                  "id": "LI_bpp_on_search_message_75",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "LI_bpp_on_search_message_76",
                    "type": "object",
                    "properties": {
                      "descriptor": {
                        "id": "LI_bpp_on_search_message_77",
                        "type": "object",
                        "properties": {
                          "name": {
                            "id": "LI_bpp_on_search_message_78",
                            "type": "string",
                            "minLength": 1
                          },
                          "code": {
                            "id": "LI_bpp_on_search_message_79",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "value": {
                        "id": "LI_bpp_on_search_message_80",
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