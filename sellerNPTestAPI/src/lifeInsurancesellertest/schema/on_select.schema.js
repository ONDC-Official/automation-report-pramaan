module.exports={
  "id": "LI_bpp_on_select_message_01",
    "type": "object",
    "properties": {
      "order": {
        "id": "LI_bpp_on_select_message_02",
        "type": "object",
        "properties": {
          "items": {
            "id": "LI_bpp_on_select_message_03",
            "type": "array",
            "minItems": 1,
            "element": {
              "id": "LI_bpp_on_select_message_04",
              "type": "object",
              "properties": {
                "category_ids": {
                  "id": "LI_bpp_on_select_message_05",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "LI_bpp_on_select_message_06",
                    "type": "object",
                    "properties": {}
                  }
                },
                "descriptor": {
                  "id": "LI_bpp_on_select_message_07",
                  "type": "object",
                  "properties": {
                    "name": {
                      "id": "LI_bpp_on_select_message_08",
                      "type": "string",
                      "minLength": 1
                    },
                    "short_desc": {
                      "id": "LI_bpp_on_select_message_09",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "id": {
                  "id": "LI_bpp_on_select_message_10",
                  "type": "string",
                  "minLength": 1
                },
                "parent_item_id": {
                  "id": "LI_bpp_on_select_message_11",
                  "type": "string",
                  "minLength": 1
                },
                "price": {
                  "id": "LI_bpp_on_select_message_12",
                  "type": "object",
                  "properties": {
                    "currency": {
                      "id": "LI_bpp_on_select_message_13",
                      "type": "string",
                      "minLength": 1
                    },
                    "value": {
                      "id": "LI_bpp_on_select_message_14",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "tags": {
                  "id": "LI_bpp_on_select_message_15",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "LI_bpp_on_select_message_16",
                    "type": "object",
                    "properties": {
                      "descriptor": {
                        "id": "LI_bpp_on_select_message_17",
                        "type": "object",
                        "properties": {
                          "code": {
                            "id": "LI_bpp_on_select_message_18",
                            "type": "string",
                            "minLength": 1
                          },
                          "name": {
                            "id": "LI_bpp_on_select_message_19",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "list": {
                        "id": "LI_bpp_on_select_message_20",
                        "type": "array",
                        "minItems": 1,
                        "element": {
                          "id": "LI_bpp_on_select_message_21",
                          "type": "object",
                          "properties": {
                            "descriptor": {
                              "id": "LI_bpp_on_select_message_22",
                              "type": "object",
                              "properties": {
                                "code": {
                                  "id": "LI_bpp_on_select_message_23",
                                  "type": "string",
                                  "minLength": 1
                                },
                                "name": {
                                  "id": "LI_bpp_on_select_message_24",
                                  "type": "string",
                                  "minLength": 1
                                }
                              }
                            },
                            "value": {
                              "id": "LI_bpp_on_select_message_25",
                              "type": "string",
                              "minLength": 1
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "time": {
                  "id": "LI_bpp_on_select_message_26",
                  "type": "object",
                  "properties": {
                    "duration": {
                      "id": "LI_bpp_on_select_message_27",
                      "type": "string",
                      "minLength": 1
                    },
                    "label": {
                      "id": "LI_bpp_on_select_message_28",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "add_ons": {
                  "id": "LI_bpp_on_select_message_29",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "LI_bpp_on_select_message_30",
                    "type": "object",
                    "properties": {
                      "id": {
                        "id": "LI_bpp_on_select_message_31",
                        "type": "string",
                        "minLength": 1
                      },
                      "quantity": {
                        "id": "LI_bpp_on_select_message_32",
                        "type": "object",
                        "properties": {
                          "selected": {
                            "id": "LI_bpp_on_select_message_33",
                            "type": "object",
                            "properties": {
                              "count": {
                                "id": "LI_bpp_on_select_message_34",
                                "type": "number"
                              }
                            }
                          }
                        }
                      },
                      "descriptor": {
                        "id": "LI_bpp_on_select_message_35",
                        "type": "object",
                        "properties": {
                          "name": {
                            "id": "LI_bpp_on_select_message_36",
                            "type": "string",
                            "minLength": 1
                          },
                          "code": {
                            "id": "LI_bpp_on_select_message_37",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "price": {
                        "id": "LI_bpp_on_select_message_38",
                        "type": "object",
                        "properties": {
                          "value": {
                            "id": "LI_bpp_on_select_message_39",
                            "type": "string",
                            "minLength": 1
                          },
                          "currency": {
                            "id": "LI_bpp_on_select_message_40",
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
          "provider": {
            "id": "LI_bpp_on_select_message_41",
            "type": "object",
            "properties": {
              "descriptor": {
                "id": "LI_bpp_on_select_message_42",
                "type": "object",
                "properties": {
                  "long_desc": {
                    "id": "LI_bpp_on_select_message_43",
                    "type": "string",
                    "minLength": 1
                  },
                  "name": {
                    "id": "LI_bpp_on_select_message_44",
                    "type": "string",
                    "minLength": 1
                  },
                  "short_desc": {
                    "id": "LI_bpp_on_select_message_45",
                    "type": "string",
                    "minLength": 1
                  },
                  "images": {
                    "id": "LI_bpp_on_select_message_46",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                      "id": "LI_bpp_on_select_message_47",
                      "type": "object",
                      "properties": {
                        "url": {
                          "id": "LI_bpp_on_select_message_48",
                          "type": "string",
                          "minLength": 1
                        },
                        "size_type": {
                          "id": "LI_bpp_on_select_message_49",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    }
                  }
                }
              },
              "id": {
                "id": "LI_bpp_on_select_message_50",
                "type": "string",
                "minLength": 1
              },
              "tags": {
                "id": "LI_bpp_on_select_message_51",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "LI_bpp_on_select_message_52",
                  "type": "object",
                  "properties": {
                    "descriptor": {
                      "id": "LI_bpp_on_select_message_53",
                      "type": "object",
                      "properties": {
                        "code": {
                          "id": "LI_bpp_on_select_message_54",
                          "type": "string",
                          "minLength": 1
                        },
                        "name": {
                          "id": "LI_bpp_on_select_message_55",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    },
                    "list": {
                      "id": "LI_bpp_on_select_message_56",
                      "type": "array",
                      "minItems": 1,
                      "element": {
                        "id": "LI_bpp_on_select_message_57",
                        "type": "object",
                        "properties": {
                          "descriptor": {
                            "id": "LI_bpp_on_select_message_58",
                            "type": "object",
                            "properties": {
                              "code": {
                                "id": "LI_bpp_on_select_message_59",
                                "type": "string",
                                "minLength": 1
                              },
                              "name": {
                                "id": "LI_bpp_on_select_message_60",
                                "type": "string",
                                "minLength": 1
                              }
                            }
                          },
                          "value": {
                            "id": "LI_bpp_on_select_message_61",
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
            "id": "LI_bpp_on_select_message_62",
            "type": "object",
            "properties": {
              "id": {
                "id": "LI_bpp_on_select_message_63",
                "type": "string",
                "minLength": 1
              },
              "breakup": {
                "id": "LI_bpp_on_select_message_64",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "LI_bpp_on_select_message_65",
                  "type": "object",
                  "properties": {
                    "price": {
                      "id": "LI_bpp_on_select_message_66",
                      "type": "object",
                      "properties": {
                        "value": {
                          "id": "LI_bpp_on_select_message_67",
                          "type": "string",
                          "minLength": 1
                        },
                        "currency": {
                          "id": "LI_bpp_on_select_message_68",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    },
                    "title": {
                      "id": "LI_bpp_on_select_message_69",
                      "type": "string",
                      "minLength": 1
                    },
                    "item": {
                      "id": "LI_bpp_on_select_message_70",
                      "type": "object",
                      "properties": {
                        "id": {
                          "id": "LI_bpp_on_select_message_71",
                          "type": "string",
                          "minLength": 1
                        },
                        "add_ons": {
                          "id": "LI_bpp_on_select_message_72",
                          "type": "array",
                          "minItems": 1,
                          "element": {
                            "id": "LI_bpp_on_select_message_73",
                            "type": "object",
                            "properties": {
                              "id": {
                                "id": "LI_bpp_on_select_message_74",
                                "type": "string",
                                "minLength": 1
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "required": {
                    "type": "array",
                    "element": {
                      "allOf": [
                        {
                          "if": {
                            "properties": {
                              "title": {
                                "const": "BASE_PRICE"
                              }
                            }
                          },
                          "then": [
                            "title",
                            "price"
                  
                          ]
                        },
                        {
                          "if": {
                            "properties": {
                              "title": {
                                "const": "OFFER"
                              }
                            }
                          },
                          "then": [
                            "title",
                            "price"
                          ]
                        },
                        {
                          "if": {
                            "properties": {
                              "title": {
                                "const": "CONVIENCE_FEE"
                              }
                            }
                          },
                          "then": [
                            "title",
                            "price",
                          ]
                        },
                        {
                          "if": {
                            "properties": {
                              "title": {
                                "const": "TAX"
                              }
                            }
                          },
                          "then": [
                            "title",
                            "price"
                          ]
                        },
                        {
                          "if": {
                            "properties": {
                              "title": {
                                "const": "PROCESSING_FEE"
                              }
                            }
                          },
                          "then": [
                            "title",
                            "price"
                          ]
                        },
                        {
                          "if": {
                            "properties": {
                              "title": {
                                "const": "ADD_ONS"
                              }
                            }
                          },
                          "then": [
                            "title",
                            "price",
                            "item"
                          ]
                        }
                      ]
                    }
                  }
                }
              },
              "price": {
                "id": "LI_bpp_on_select_message_75",
                "type": "object",
                "properties": {
                  "currency": {
                    "id": "LI_bpp_on_select_message_76",
                    "type": "string",
                    "minLength": 1
                  },
                  "value": {
                    "id": "LI_bpp_on_select_message_77",
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              "ttl": {
                "id": "LI_bpp_on_select_message_78",
                "type": "string",
                "minLength": 1
              }
            }
          },
          "payments": {
            "id": "LI_bpp_on_select_message_79",
            "type": "array",
            "minItems": 1,
            "element": {
              "id": "LI_bpp_on_select_message_80",
              "type": "object",
              "properties": {
                "collected_by": {
                  "id": "LI_bpp_on_select_message_81",
                  "type": "string",
                  "minLength": 1
                },
                "status": {
                  "id": "LI_bpp_on_select_message_82",
                  "type": "string",
                  "minLength": 1
                },
                "type": {
                  "id": "LI_bpp_on_select_message_83",
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