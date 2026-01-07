module.exports={
  "id": "LI_bpp_on_init_message_01",
    "type": "object",
    "properties": {
      "order": {
        "id": "LI_bpp_on_init_message_02",
        "type": "object",
        "properties": {
          "fulfillments": {
            "id": "LI_bpp_on_init_message_03",
            "type": "array",
            "minItems": 1,
            "element": {
              "id": "LI_bpp_on_init_message_04",
              "type": "object",
              "properties": {
                "state": {
                  "id": "LI_bpp_on_init_message_05",
                  "type": "object",
                  "properties": {
                    "descriptor": {
                      "id": "LI_bpp_on_init_message_06",
                      "type": "object",
                      "properties": {
                        "code": {
                          "id": "LI_bpp_on_init_message_07",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    }
                  }
                },
                "customer": {
                  "id": "LI_bpp_on_init_message_08",
                  "type": "object",
                  "properties": {
                    "contact": {
                      "id": "LI_bpp_on_init_message_09",
                      "type": "object",
                      "properties": {
                        "email": {
                          "id": "LI_bpp_on_init_message_10",
                          "type": "string",
                          "minLength": 1
                        },
                        "phone": {
                          "id": "LI_bpp_on_init_message_11",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    },
                    "person": {
                      "id": "LI_bpp_on_init_message_12",
                      "type": "object",
                      "properties": {
                        "name": {
                          "id": "LI_bpp_on_init_message_13",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    }
                  }
                },
                "id": {
                  "id": "LI_bpp_on_init_message_14",
                  "type": "string",
                  "minLength": 1
                },
                "type": {
                  "id": "LI_bpp_on_init_message_15",
                  "type": "string",
                  "minLength": 1
                }
              }
            }
          },
          "items": {
            "id": "LI_bpp_on_init_message_16",
            "type": "array",
            "minItems": 1,
            "element": {
              "id": "LI_bpp_on_init_message_17",
              "type": "object",
              "properties": {
                "category_ids": {
                  "id": "LI_bpp_on_init_message_18",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "LI_bpp_on_init_message_19",
                    "type": "object",
                    "properties": {}
                  }
                },
                "descriptor": {
                  "id": "LI_bpp_on_init_message_20",
                  "type": "object",
                  "properties": {
                    "name": {
                      "id": "LI_bpp_on_init_message_21",
                      "type": "string",
                      "minLength": 1
                    },
                    "short_desc": {
                      "id": "LI_bpp_on_init_message_22",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "id": {
                  "id": "LI_bpp_on_init_message_23",
                  "type": "string",
                  "minLength": 1
                },
                "parent_item_id": {
                  "id": "LI_bpp_on_init_message_24",
                  "type": "string",
                  "minLength": 1
                },
                "price": {
                  "id": "LI_bpp_on_init_message_25",
                  "type": "object",
                  "properties": {
                    "currency": {
                      "id": "LI_bpp_on_init_message_26",
                      "type": "string",
                      "minLength": 1
                    },
                    "value": {
                      "id": "LI_bpp_on_init_message_27",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "tags": {
                  "id": "LI_bpp_on_init_message_28",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "LI_bpp_on_init_message_29",
                    "type": "object",
                    "properties": {
                      "descriptor": {
                        "id": "LI_bpp_on_init_message_30",
                        "type": "object",
                        "properties": {
                          "code": {
                            "id": "LI_bpp_on_init_message_31",
                            "type": "string",
                            "minLength": 1
                          },
                          "name": {
                            "id": "LI_bpp_on_init_message_32",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "list": {
                        "id": "LI_bpp_on_init_message_33",
                        "type": "array",
                        "minItems": 1,
                        "element": {
                          "id": "LI_bpp_on_init_message_34",
                          "type": "object",
                          "properties": {
                            "descriptor": {
                              "id": "LI_bpp_on_init_message_35",
                              "type": "object",
                              "properties": {
                                "code": {
                                  "id": "LI_bpp_on_init_message_36",
                                  "type": "string",
                                  "minLength": 1
                                },
                                "name": {
                                  "id": "LI_bpp_on_init_message_37",
                                  "type": "string",
                                  "minLength": 1
                                }
                              }
                            },
                            "value": {
                              "id": "LI_bpp_on_init_message_38",
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
                  "id": "LI_bpp_on_init_message_39",
                  "type": "object",
                  "properties": {
                    "duration": {
                      "id": "LI_bpp_on_init_message_40",
                      "type": "string",
                      "minLength": 1
                    },
                    "label": {
                      "id": "LI_bpp_on_init_message_41",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
               
            
                "add_ons": {
                  "id": "LI_bpp_on_init_message_59",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "LI_bpp_on_init_message_60",
                    "type": "object",
                    "properties": {
                      "id": {
                        "id": "LI_bpp_on_init_message_61",
                        "type": "string",
                        "minLength": 1
                      },
                      "quantity": {
                        "id": "LI_bpp_on_init_message_62",
                        "type": "object",
                        "properties": {
                          "selected": {
                            "id": "LI_bpp_on_init_message_63",
                            "type": "object",
                            "properties": {
                              "count": {
                                "id": "LI_bpp_on_init_message_64",
                                "type": "number"
                              }
                            }
                          }
                        }
                      },
                      "descriptor": {
                        "id": "LI_bpp_on_init_message_65",
                        "type": "object",
                        "properties": {
                          "name": {
                            "id": "LI_bpp_on_init_message_66",
                            "type": "string",
                            "minLength": 1
                          },
                          "code": {
                            "id": "LI_bpp_on_init_message_67",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "price": {
                        "id": "LI_bpp_on_init_message_68",
                        "type": "object",
                        "properties": {
                          "value": {
                            "id": "LI_bpp_on_init_message_69",
                            "type": "string",
                            "minLength": 1
                          },
                          "currency": {
                            "id": "LI_bpp_on_init_message_70",
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
            "id": "LI_bpp_on_init_message_71",
            "type": "object",
            "properties": {
              "descriptor": {
                "id": "LI_bpp_on_init_message_72",
                "type": "object",
                "properties": {
                  "long_desc": {
                    "id": "LI_bpp_on_init_message_73",
                    "type": "string",
                    "minLength": 1
                  },
                  "name": {
                    "id": "LI_bpp_on_init_message_74",
                    "type": "string",
                    "minLength": 1
                  },
                  "short_desc": {
                    "id": "LI_bpp_on_init_message_75",
                    "type": "string",
                    "minLength": 1
                  },
                  "images": {
                    "id": "LI_bpp_on_init_message_76",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                      "id": "LI_bpp_on_init_message_77",
                      "type": "object",
                      "properties": {
                        "url": {
                          "id": "LI_bpp_on_init_message_78",
                          "type": "string",
                          "minLength": 1
                        },
                        "size_type": {
                          "id": "LI_bpp_on_init_message_79",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    }
                  }
                }
              },
              "id": {
                "id": "LI_bpp_on_init_message_80",
                "type": "string",
                "minLength": 1
              },
              "tags": {
                "id": "LI_bpp_on_init_message_81",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "LI_bpp_on_init_message_82",
                  "type": "object",
                  "properties": {
                    "descriptor": {
                      "id": "LI_bpp_on_init_message_83",
                      "type": "object",
                      "properties": {
                        "code": {
                          "id": "LI_bpp_on_init_message_84",
                          "type": "string",
                          "minLength": 1
                        },
                        "name": {
                          "id": "LI_bpp_on_init_message_85",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    },
                    "list": {
                      "id": "LI_bpp_on_init_message_86",
                      "type": "array",
                      "minItems": 1,
                      "element": {
                        "id": "LI_bpp_on_init_message_87",
                        "type": "object",
                        "properties": {
                          "descriptor": {
                            "id": "LI_bpp_on_init_message_88",
                            "type": "object",
                            "properties": {
                              "code": {
                                "id": "LI_bpp_on_init_message_89",
                                "type": "string",
                                "minLength": 1
                              },
                              "name": {
                                "id": "LI_bpp_on_init_message_90",
                                "type": "string",
                                "minLength": 1
                              }
                            }
                          },
                          "value": {
                            "id": "LI_bpp_on_init_message_91",
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
            "id": "LI_bpp_on_init_message_92",
            "type": "object",
            "properties": {
              "id": {
                "id": "LI_bpp_on_init_message_93",
                "type": "string",
                "minLength": 1
              },
              "breakup": {
                "id": "LI_bpp_on_init_message_94",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "LI_bpp_on_init_message_95",
                  "type": "object",
                  "properties": {
                    "price": {
                      "id": "LI_bpp_on_init_message_96",
                      "type": "object",
                      "properties": {
                        "value": {
                          "id": "LI_bpp_on_init_message_97",
                          "type": "string",
                          "minLength": 1
                        },
                        "currency": {
                          "id": "LI_bpp_on_init_message_98",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    },
                    "title": {
                      "id": "LI_bpp_on_init_message_99",
                      "type": "string",
                      "minLength": 1
                    },
                    "item": {
                      "id": "LI_bpp_on_init_message_100",
                      "type": "object",
                      "properties": {
                        "id": {
                          "id": "LI_bpp_on_init_message_101",
                          "type": "string",
                          "minLength": 1
                        },
                        "add_ons": {
                          "id": "LI_bpp_on_init_message_102",
                          "type": "array",
                          "minItems": 1,
                          "element": {
                            "id": "LI_bpp_on_init_message_103",
                            "type": "object",
                            "properties": {
                              "id": {
                                "id": "LI_bpp_on_init_message_104",
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
                "id": "LI_bpp_on_init_message_105",
                "type": "object",
                "properties": {
                  "currency": {
                    "id": "LI_bpp_on_init_message_106",
                    "type": "string",
                    "minLength": 1
                  },
                  "value": {
                    "id": "LI_bpp_on_init_message_107",
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              "ttl": {
                "id": "LI_bpp_on_init_message_108",
                "type": "string",
                "minLength": 1
              }
            }
          },
          
          "tags": {
            "id": "LI_bpp_on_init_message_114",
            "type": "array",
            "minItems": 1,
            "element": {
              "id": "LI_bpp_on_init_message_115",
              "type": "object",
              "properties": {
                "display": {
                  "id": "LI_bpp_on_init_message_116",
                  "type": "boolean"
                },
                "descriptor": {
                  "id": "LI_bpp_on_init_message_117",
                  "type": "object",
                  "properties": {
                    "name": {
                      "id": "LI_bpp_on_init_message_118",
                      "type": "string",
                      "minLength": 1
                    },
                    "code": {
                      "id": "LI_bpp_on_init_message_119",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "list": {
                  "id": "LI_bpp_on_init_message_120",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "LI_bpp_on_init_message_121",
                    "type": "object",
                    "properties": {
                      "descriptor": {
                        "id": "LI_bpp_on_init_message_122",
                        "type": "object",
                        "properties": {
                          "name": {
                            "id": "LI_bpp_on_init_message_123",
                            "type": "string",
                            "minLength": 1
                          },
                          "code": {
                            "id": "LI_bpp_on_init_message_124",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "value": {
                        "id": "LI_bpp_on_init_message_125",
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