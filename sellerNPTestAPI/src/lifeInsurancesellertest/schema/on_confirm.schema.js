module.exports= {
  "id": "LI_bpp_on_confirm_message_01",
    "type": "object",
    "properties": {
      "order": {
        "id": "LI_bpp_on_confirm_message_02",
        "type": "object",
        "properties": {
          "fulfillments": {
            "id": "LI_bpp_on_confirm_message_03",
            "type": "array",
            "minItems": 1,
            "element": {
              "id": "LI_bpp_on_confirm_message_04",
              "type": "object",
              "properties": {
                "state": {
                  "id": "LI_bpp_on_confirm_message_05",
                  "type": "object",
                  "properties": {
                    "descriptor": {
                      "id": "LI_bpp_on_confirm_message_06",
                      "type": "object",
                      "properties": {
                        "code": {
                          "id": "LI_bpp_on_confirm_message_07",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    }
                  }
                },
                "customer": {
                  "id": "LI_bpp_on_confirm_message_08",
                  "type": "object",
                  "properties": {
                    "contact": {
                      "id": "LI_bpp_on_confirm_message_09",
                      "type": "object",
                      "properties": {
                        "email": {
                          "id": "LI_bpp_on_confirm_message_10",
                          "type": "string",
                          "minLength": 1
                        },
                        "phone": {
                          "id": "LI_bpp_on_confirm_message_11",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    }
                  }
                },
                "id": {
                  "id": "LI_bpp_on_confirm_message_12",
                  "type": "string",
                  "minLength": 1
                },
                "type": {
                  "id": "LI_bpp_on_confirm_message_13",
                  "type": "string",
                  "minLength": 1
                }
              }
            }
          },
          "items": {
            "id": "LI_bpp_on_confirm_message_14",
            "type": "array",
            "minItems": 1,
            "element": {
              "id": "LI_bpp_on_confirm_message_15",
              "type": "object",
              "properties": {
                "add_ons": {
                  "id": "LI_bpp_on_confirm_message_16",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "LI_bpp_on_confirm_message_17",
                    "type": "object",
                    "properties": {
                      "id": {
                        "id": "LI_bpp_on_confirm_message_18",
                        "type": "string",
                        "minLength": 1
                      },
                      "descriptor": {
                        "id": "LI_bpp_on_confirm_message_19",
                        "type": "object",
                        "properties": {
                          "code": {
                            "id": "LI_bpp_on_confirm_message_20",
                            "type": "string",
                            "minLength": 1
                          },
                          "name": {
                            "id": "LI_bpp_on_confirm_message_21",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "quantity": {
                        "id": "LI_bpp_on_confirm_message_22",
                        "type": "object",
                        "properties": {
                          "selected": {
                            "id": "LI_bpp_on_confirm_message_23",
                            "type": "object",
                            "properties": {
                              "count": {
                                "id": "LI_bpp_on_confirm_message_24",
                                "type": "number"
                              }
                            }
                          }
                        }
                      },
                      "price": {
                        "id": "LI_bpp_on_confirm_message_25",
                        "type": "object",
                        "properties": {
                          "value": {
                            "id": "LI_bpp_on_confirm_message_26",
                            "type": "string",
                            "minLength": 1
                          },
                          "currency": {
                            "id": "LI_bpp_on_confirm_message_27",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      }
                    }
                  }
                },
                "descriptor": {
                  "id": "LI_bpp_on_confirm_message_28",
                  "type": "object",
                  "properties": {
                    "name": {
                      "id": "LI_bpp_on_confirm_message_29",
                      "type": "string",
                      "minLength": 1
                    },
                    "short_desc": {
                      "id": "LI_bpp_on_confirm_message_30",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "id": {
                  "id": "LI_bpp_on_confirm_message_31",
                  "type": "string",
                  "minLength": 1
                },
                "parent_item_id": {
                  "id": "LI_bpp_on_confirm_message_32",
                  "type": "string",
                  "minLength": 1
                },
                "price": {
                  "id": "LI_bpp_on_confirm_message_33",
                  "type": "object",
                  "properties": {
                    "currency": {
                      "id": "LI_bpp_on_confirm_message_34",
                      "type": "string",
                      "minLength": 1
                    },
                    "value": {
                      "id": "LI_bpp_on_confirm_message_35",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "fulfillment_ids": {
                  "id": "LI_bpp_on_confirm_message_36",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "LI_bpp_on_confirm_message_37",
                    "type": "object",
                    "properties": {}
                  }
                },
                "tags": {
                  "id": "LI_bpp_on_confirm_message_38",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "LI_bpp_on_confirm_message_39",
                    "type": "object",
                    "properties": {
                      "descriptor": {
                        "id": "LI_bpp_on_confirm_message_40",
                        "type": "object",
                        "properties": {
                          "name": {
                            "id": "LI_bpp_on_confirm_message_41",
                            "type": "string",
                            "minLength": 1
                          },
                          "code": {
                            "id": "LI_bpp_on_confirm_message_42",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "list": {
                        "id": "LI_bpp_on_confirm_message_43",
                        "type": "array",
                        "minItems": 1,
                        "element": {
                          "id": "LI_bpp_on_confirm_message_44",
                          "type": "object",
                          "properties": {
                            "descriptor": {
                              "id": "LI_bpp_on_confirm_message_45",
                              "type": "object",
                              "properties": {
                                "code": {
                                  "id": "LI_bpp_on_confirm_message_46",
                                  "type": "string",
                                  "minLength": 1
                                }
                              }
                            },
                            "value": {
                              "id": "LI_bpp_on_confirm_message_47",
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
                  "id": "LI_bpp_on_confirm_message_48",
                  "type": "object",
                  "properties": {
                    "duration": {
                      "id": "LI_bpp_on_confirm_message_49",
                      "type": "string",
                      "minLength": 1
                    },
                    "label": {
                      "id": "LI_bpp_on_confirm_message_50",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                }
              }
            }
          },
          "id": {
            "id": "LI_bpp_on_confirm_message_51",
            "type": "string",
            "minLength": 1
          },
          "payments": {
            "id": "LI_bpp_on_confirm_message_52",
            "type": "array",
            "minItems": 1,
            "element": {
              "id": "LI_bpp_on_confirm_message_53",
              "type": "object",
              "properties": {
                "collected_by": {
                  "id": "LI_bpp_on_confirm_message_54",
                  "type": "string",
                  "minLength": 1
                },
                "params": {
                  "id": "LI_bpp_on_confirm_message_55",
                  "type": "object",
                  "properties": {
                    "amount": {
                      "id": "LI_bpp_on_confirm_message_56",
                      "type": "string",
                      "minLength": 1
                    },
                    "currency": {
                      "id": "LI_bpp_on_confirm_message_57",
                      "type": "string",
                      "minLength": 1
                    },
                    "transaction_id": {
                      "id": "LI_bpp_on_confirm_message_58",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "status": {
                  "id": "LI_bpp_on_confirm_message_59",
                  "type": "string",
                  "minLength": 1
                },
                "type": {
                  "id": "LI_bpp_on_confirm_message_60",
                  "type": "string",
                  "minLength": 1
                }
              }
            }
          },
          "provider": {
            "id": "LI_bpp_on_confirm_message_61",
            "type": "object",
            "properties": {
              "descriptor": {
                "id": "LI_bpp_on_confirm_message_62",
                "type": "object",
                "properties": {
                  "long_desc": {
                    "id": "LI_bpp_on_confirm_message_63",
                    "type": "string",
                    "minLength": 1
                  },
                  "name": {
                    "id": "LI_bpp_on_confirm_message_64",
                    "type": "string",
                    "minLength": 1
                  },
                  "short_desc": {
                    "id": "LI_bpp_on_confirm_message_65",
                    "type": "string",
                    "minLength": 1
                  },
                  "images": {
                    "id": "LI_bpp_on_confirm_message_66",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                      "id": "LI_bpp_on_confirm_message_67",
                      "type": "object",
                      "properties": {
                        "url": {
                          "id": "LI_bpp_on_confirm_message_68",
                          "type": "string",
                          "minLength": 1
                        },
                        "size_type": {
                          "id": "LI_bpp_on_confirm_message_69",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    }
                  }
                }
              },
              "id": {
                "id": "LI_bpp_on_confirm_message_70",
                "type": "string",
                "minLength": 1
              },
              "tags": {
                "id": "LI_bpp_on_confirm_message_71",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "LI_bpp_on_confirm_message_72",
                  "type": "object",
                  "properties": {
                    "descriptor": {
                      "id": "LI_bpp_on_confirm_message_73",
                      "type": "object",
                      "properties": {
                        "code": {
                          "id": "LI_bpp_on_confirm_message_74",
                          "type": "string",
                          "minLength": 1
                        },
                        "name": {
                          "id": "LI_bpp_on_confirm_message_75",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    },
                    "list": {
                      "id": "LI_bpp_on_confirm_message_76",
                      "type": "array",
                      "minItems": 1,
                      "element": {
                        "id": "LI_bpp_on_confirm_message_77",
                        "type": "object",
                        "properties": {
                          "descriptor": {
                            "id": "LI_bpp_on_confirm_message_78",
                            "type": "object",
                            "properties": {
                              "code": {
                                "id": "LI_bpp_on_confirm_message_79",
                                "type": "string",
                                "minLength": 1
                              },
                              "name": {
                                "id": "LI_bpp_on_confirm_message_80",
                                "type": "string",
                                "minLength": 1
                              }
                            }
                          },
                          "value": {
                            "id": "LI_bpp_on_confirm_message_81",
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
            "id": "LI_bpp_on_confirm_message_82",
            "type": "object",
            "properties": {
              "id": {
                "id": "LI_bpp_on_confirm_message_83",
                "type": "string",
                "minLength": 1
              },
              "breakup": {
                "id": "LI_bpp_on_confirm_message_84",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "LI_bpp_on_confirm_message_85",
                  "type": "object",
                  "properties": {
                    "price": {
                      "id": "LI_bpp_on_confirm_message_86",
                      "type": "object",
                      "properties": {
                        "value": {
                          "id": "LI_bpp_on_confirm_message_87",
                          "type": "string",
                          "minLength": 1
                        },
                        "currency": {
                          "id": "LI_bpp_on_confirm_message_88",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    },
                    "title": {
                      "id": "LI_bpp_on_confirm_message_89",
                      "type": "string",
                      "minLength": 1
                    },
                    "item": {
                      "id": "LI_bpp_on_confirm_message_90",
                      "type": "object",
                      "properties": {
                        "id": {
                          "id": "LI_bpp_on_confirm_message_91",
                          "type": "string",
                          "minLength": 1
                        },
                        "add_ons": {
                          "id": "LI_bpp_on_confirm_message_92",
                          "type": "array",
                          "minItems": 1,
                          "element": {
                            "id": "LI_bpp_on_confirm_message_93",
                            "type": "object",
                            "properties": {
                              "id": {
                                "id": "LI_bpp_on_confirm_message_94",
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
                "id": "LI_bpp_on_confirm_message_95",
                "type": "object",
                "properties": {
                  "currency": {
                    "id": "LI_bpp_on_confirm_message_96",
                    "type": "string",
                    "minLength": 1
                  },
                  "value": {
                    "id": "LI_bpp_on_confirm_message_97",
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              "ttl": {
                "id": "LI_bpp_on_confirm_message_98",
                "type": "string",
                "minLength": 1
              }
            }
          },
          "status": {
            "id": "LI_bpp_on_confirm_message_99",
            "type": "string",
            "minLength": 1
          },
          "documents": {
            "id": "LI_bpp_on_confirm_message_100",
            "type": "array",
            "minItems": 1,
            "element": {
              "id": "LI_bpp_on_confirm_message_101",
              "type": "object",
              "properties": {
                "descriptor": {
                  "id": "LI_bpp_on_confirm_message_102",
                  "type": "object",
                  "properties": {
                    "code": {
                      "id": "LI_bpp_on_confirm_message_103",
                      "type": "string",
                      "minLength": 1
                    },
                    "name": {
                      "id": "LI_bpp_on_confirm_message_104",
                      "type": "string",
                      "minLength": 1
                    },
                    "short_desc": {
                      "id": "LI_bpp_on_confirm_message_105",
                      "type": "string",
                      "minLength": 1
                    },
                    "long_desc": {
                      "id": "LI_bpp_on_confirm_message_106",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "mime_type": {
                  "id": "LI_bpp_on_confirm_message_107",
                  "type": "string",
                  "minLength": 1
                },
                "url": {
                  "id": "LI_bpp_on_confirm_message_108",
                  "type": "string",
                  "minLength": 1
                }
              }
            }
          },
          "tags": {
            "id": "LI_bpp_on_confirm_message_109",
            "type": "array",
            "minItems": 1,
            "element": {
              "id": "LI_bpp_on_confirm_message_110",
              "type": "object",
              "properties": {
                "descriptor": {
                  "id": "LI_bpp_on_confirm_message_111",
                  "type": "object",
                  "properties": {
                    "code": {
                      "id": "LI_bpp_on_confirm_message_112",
                      "type": "string",
                      "minLength": 1
                    },
                    "name": {
                      "id": "LI_bpp_on_confirm_message_113",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "display": {
                  "id": "LI_bpp_on_confirm_message_114",
                  "type": "boolean"
                },
                "list": {
                  "id": "LI_bpp_on_confirm_message_115",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "LI_bpp_on_confirm_message_116",
                    "type": "object",
                    "properties": {
                      "descriptor": {
                        "id": "LI_bpp_on_confirm_message_117",
                        "type": "object",
                        "properties": {
                          "code": {
                            "id": "LI_bpp_on_confirm_message_118",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "value": {
                        "id": "LI_bpp_on_confirm_message_119",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  }
                }
              }
            }
          },
          "created_at": {
            "id": "LI_bpp_on_confirm_message_120",
            "type": "string",
            "minLength": 1
          },
          "updated_at": {
            "id": "LI_bpp_on_confirm_message_121",
            "type": "string",
            "minLength": 1
          },
          "cancellation_terms": {
            "id": "LI_bpp_on_confirm_message_122",
            "type": "array",
            "minItems": 1,
            "element": {
              "id": "LI_bpp_on_confirm_message_123",
              "type": "object",
              "properties": {
                "external_ref": {
                  "id": "LI_bpp_on_confirm_message_124",
                  "type": "object",
                  "properties": {
                    "mimetype": {
                      "id": "LI_bpp_on_confirm_message_125",
                      "type": "string",
                      "minLength": 1
                    },
                    "url": {
                      "id": "LI_bpp_on_confirm_message_126",
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