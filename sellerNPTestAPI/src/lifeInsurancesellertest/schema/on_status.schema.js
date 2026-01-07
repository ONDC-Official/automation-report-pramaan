module.exports ={
    "id": "LI_bpp_on_status_message_01",
    "type": "object",
    "properties": {
      "order": {
        "id": "LI_bpp_on_status_message_02",
        "type": "object",
        "properties": {
          "fulfillments": {
            "id": "LI_bpp_on_status_message_03",
            "type": "array",
            "minItems": 1,
            "element": {
                "id": "LI_bpp_on_status_message_04",
              "type": "object",
              "properties": {
                "state": {
                    "id": "LI_bpp_on_status_message_05",
                  "type": "object",
                  "properties": {
                    "descriptor": {
                        "id": "LI_bpp_on_status_message_06",
                      "type": "object",
                      "properties": {
                        "code": {
                            "id": "LI_bpp_on_status_message_07",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    }
                  }
                },
                "customer": {
                    "id": "LI_bpp_on_status_message_08",
                  "type": "object",
                  "properties": {
                    "contact": {
                        "id": "LI_bpp_on_status_message_09",
                      "type": "object",
                      "properties": {
                        "email": {
                            "id": "LI_bpp_on_status_message_10",
                          "type": "string",
                          "minLength": 1
                        },
                        "phone": {
                            "id": "LI_bpp_on_status_message_11",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    },
                    "person": {
                        "id": "LI_bpp_on_status_message_12",
                      "type": "object",
                      "properties": {
                        "name": {
                            "id": "LI_bpp_on_status_message_13",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    }
                  }
                },
                "id": {
                    "id": "LI_bpp_on_status_message_14",
                  "type": "string",
                  "minLength": 1
                },
                "type": {
                    "id": "LI_bpp_on_status_message_15",
                  "type": "string",
                  "minLength": 1
                }
              }
            }
          },
          "items": {
            "id": "LI_bpp_on_status_message_16",
            "type": "array",
            "minItems": 1,
            "element": {
                "id": "LI_bpp_on_status_message_17",
              "type": "object",
              "properties": {
                "category_ids": {
                    "id": "LI_bpp_on_status_message_18",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "LI_bpp_on_status_message_19",
                    "type": "object",
                    "properties": {}
                  }
                },
                "descriptor": {
                    "id": "LI_bpp_on_status_message_20",
                  "type": "object",
                  "properties": {
                    "name": {
                     "id": "LI_bpp_on_status_message_21",
                      "type": "string",
                      "minLength": 1
                    },
                    "short_desc": {
                        "id": "LI_bpp_on_status_message_22",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "id": {
                    "id": "LI_bpp_on_status_message_23",
                  "type": "string",
                  "minLength": 1
                },
                "parent_item_id": {
                    "id": "LI_bpp_on_status_message_24",
                  "type": "string",
                  "minLength": 1
                },
                "price": {
                    "id": "LI_bpp_on_status_message_25",
                  "type": "object",
                  "properties": {
                    "currency": {
                        "id": "LI_bpp_on_status_message_26",
                      "type": "string",
                      "minLength": 1
                    },
                    "value": {
                        "id": "LI_bpp_on_status_message_27",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "tags": {
                    "id": "LI_bpp_on_status_message_28",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "LI_bpp_on_status_message_29",
                    "type": "object",
                    "properties": {
                      "descriptor": {
                        "id": "LI_bpp_on_status_message_30",
                        "type": "object",
                        "properties": {
                          "code": {
                            "id": "LI_bpp_on_status_message_31",
                            "type": "string",
                            "minLength": 1
                          },
                          "name": {
                            "id": "LI_bpp_on_status_message_32",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "list": {
                        "id": "LI_bpp_on_status_message_33",
                        "type": "array",
                        "minItems": 1,
                        "element": {
                            "id": "LI_bpp_on_status_message_34",
                          "type": "object",
                          "properties": {
                            "descriptor": {
                                "id": "LI_bpp_on_status_message_35",
                              "type": "object",
                              "properties": {
                                "code": {
                                    "id": "LI_bpp_on_status_message_36",
                                  "type": "string",
                                  "minLength": 1
                                },
                                "name": {
                                    "id": "LI_bpp_on_status_message_37",
                                  "type": "string",
                                  "minLength": 1
                                }
                              }
                            },
                            "value": {
                                "id": "LI_bpp_on_status_message_38",
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
                    "id": "LI_bpp_on_status_message_39",
                  "type": "object",
                  "properties": {
                    "duration": {
                        "id": "LI_bpp_on_status_message_40",
                      "type": "string",
                      "minLength": 1
                    },
                    "label": {
                        "id": "LI_bpp_on_status_message_41",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "add_ons": {
                    "id": "LI_bpp_on_status_message_42",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "LI_bpp_on_status_message_43",
                    "type": "object",
                    "properties": {
                      "id": {
                        "id": "LI_bpp_on_status_message_44",
                        "type": "string",
                        "minLength": 1
                      },
                      "quantity": {
                        "id": "LI_bpp_on_status_message_45",
                        "type": "object",
                        "properties": {
                          "selected": {
                            "id": "LI_bpp_on_status_message_46",
                            "type": "object",
                            "properties": {
                              "count": {
                                "id": "LI_bpp_on_status_message_47",
                                "type": "number"
                              }
                            }
                          }
                        }
                      },
                      "descriptor": {
                        "id": "LI_bpp_on_status_message_48",
                        "type": "object",
                        "properties": {
                          "name": {
                            "id": "LI_bpp_on_status_message_49",
                            "type": "string",
                            "minLength": 1
                          },
                          "code": {
                            "id": "LI_bpp_on_status_message_50",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "price": {
                        "id": "LI_bpp_on_status_message_51",
                        "type": "object",
                        "properties": {
                          "value": {
                            "id": "LI_bpp_on_status_message_52",
                            "type": "string",
                            "minLength": 1
                          },
                          "currency": {
                            "id": "LI_bpp_on_status_message_53",
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
            "id": "LI_bpp_on_status_message_54",
            "type": "object",
            "properties": {
              "descriptor": {
                "id": "LI_bpp_on_status_message_55",
                "type": "object",
                "properties": {
                  "long_desc": {
                    "id": "LI_bpp_on_status_message_56",
                    "type": "string",
                    "minLength": 1
                  },
                  "name": {
                    "id": "LI_bpp_on_status_message_57",
                    "type": "string",
                    "minLength": 1
                  },
                  "short_desc": {
                    "id": "LI_bpp_on_status_message_58",
                    "type": "string",
                    "minLength": 1
                  },
                  "images": {
                    "id": "LI_bpp_on_status_message_59",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "LI_bpp_on_status_message_60",
                      "type": "object",
                      "properties": {
                        "url": {
                            "id": "LI_bpp_on_status_message_61",
                          "type": "string",
                          "minLength": 1
                        },
                        "size_type": {
                            "id": "LI_bpp_on_status_message_62",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    }
                  }
                }
              },
              "id": {
                "id": "LI_bpp_on_status_message_63",
                "type": "string",
                "minLength": 1
              },
              "tags": {
                "id": "LI_bpp_on_status_message_64",
                "type": "array",
                "minItems": 1,
                "element": {
                    "id": "LI_bpp_on_status_message_65",
                  "type": "object",
                  "properties": {
                    "descriptor": {
                        "id": "LI_bpp_on_status_message_66",
                      "type": "object",
                      "properties": {
                        "code": {
                            "id": "LI_bpp_on_status_message_67",
                          "type": "string",
                          "minLength": 1
                        },
                        "name": {
                            "id": "LI_bpp_on_status_message_68",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    },
                    "list": {
                        "id": "LI_bpp_on_status_message_69",
                      "type": "array",
                      "minItems": 1,
                      "element": {
                        "id": "LI_bpp_on_status_message_70",
                        "type": "object",
                        "properties": {
                          "descriptor": {
                            "id": "LI_bpp_on_status_message_71",
                            "type": "object",
                            "properties": {
                              "code": {
                                "id": "LI_bpp_on_status_message_72",
                                "type": "string",
                                "minLength": 1
                              },
                              "name": {
                                "id": "LI_bpp_on_status_message_73",
                                "type": "string",
                                "minLength": 1
                              }
                            }
                          },
                          "value": {
                            "id": "LI_bpp_on_status_message_74",
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
            "id": "LI_bpp_on_status_message_75",
            "type": "object",
            "properties": {
              "id": {
                "id": "LI_bpp_on_status_message_76",
                "type": "string",
                "minLength": 1
              },
              "breakup": {
                "id": "LI_bpp_on_status_message_77",
                "type": "array",
                "minItems": 1,
                "element": {
                    "id": "LI_bpp_on_status_message_78",
                  "type": "object",
                  "properties": {
                    "price": {
                        "id": "LI_bpp_on_status_message_79",
                      "type": "object",
                      "properties": {
                        "value": {
                            "id": "LI_bpp_on_status_message_80",
                          "type": "string",
                          "minLength": 1
                        },
                        "currency": {
                            "id": "LI_bpp_on_status_message_81",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    },
                    "title": {
                        "id": "LI_bpp_on_status_message_82",
                      "type": "string",
                      "minLength": 1
                    },
                    "item": {
                        "id": "LI_bpp_on_status_message_83",
                      "type": "object",
                      "properties": {
                        "id": {
                            "id": "LI_bpp_on_status_message_84",
                          "type": "string",
                          "minLength": 1
                        },
                        "add_ons": {
                            "id": "LI_bpp_on_status_message_85",
                          "type": "array",
                          "minItems": 1,
                          "element": {
                            "id": "LI_bpp_on_status_message_86",
                            "type": "object",
                            "properties": {
                              "id": {
                                "id": "LI_bpp_on_status_message_87",
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
                "id": "LI_bpp_on_status_message_88",
                "type": "object",
                "properties": {
                  "currency": {
                    "id": "LI_bpp_on_status_message_89",
                    "type": "string",
                    "minLength": 1
                  },
                  "value": {
                    "id": "LI_bpp_on_status_message_90",
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              "ttl": {
                "id": "LI_bpp_on_status_message_91",
                "type": "string",
                "minLength": 1
              }
            }
          },
          "tags": {
            "id": "LI_bpp_on_status_message_102",
            "type": "array",
            "minItems": 1,
            "element": {
                "id": "LI_bpp_on_status_message_103",
              "type": "object",
              "properties": {
                "descriptor": {
                    "id": "LI_bpp_on_status_message_104",
                  "type": "object",
                  "properties": {
                    "code": {
                        "id": "LI_bpp_on_status_message_105",
                      "type": "string",
                      "minLength": 1
                    },
                    "name": {
                        "id": "LI_bpp_on_status_message_106",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "display": {
                    "id": "LI_bpp_on_status_message_107",
                  "type": "boolean"
                },
                "list": {
                    "id": "LI_bpp_on_status_message_108",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "LI_bpp_on_status_message_109",
                    "type": "object",
                    "properties": {
                      "descriptor": {
                        "id": "LI_bpp_on_status_message_110",
                        "type": "object",
                        "properties": {
                          "code": {
                            "id": "LI_bpp_on_status_message_111",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "value": {
                        "id": "LI_bpp_on_status_message_112",
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