module.exports = {
  "id": "gc_bpp_on_confirm_message_01",
  "type": "object",
  "properties": {
    "order": {
      "id": "gc_bpp_on_confirm_message_02",
      "type": "object",
      "properties": {
        "id": {
          "id": "gc_bpp_on_confirm_message_03",
          "type": "string",
          "minLength": 1
        },
        "status": {
          "id": "gc_bpp_on_confirm_message_04",
          "type": "string",
          "minLength": 1
        },
        "fulfillments": {
          "id": "gc_bpp_on_confirm_message_5",
          "type": "array",
          "minItems": 1,
          "element": {
            "id": "gc_bpp_on_confirm_message_6",
            "type": "object",
            "properties": {
              "id": {
                "id": "gc_bpp_on_confirm_message_7",
                "type": "string",
                "minLength": 1
              },
              "type": {
                "id": "gc_bpp_on_confirm_message_8",
                "type": "string",
                "minLength": 1
              },
              "customer": {
                "id": "gc_bpp_on_confirm_message_9",
                "type": "object",
                "properties": {
                  "person": {
                    "id": "gc_bpp_on_confirm_message_10",
                    "type": "object",
                    "properties": {
                      "name": {
                        "id": "gc_bpp_on_confirm_message_11",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  },
                  "contact": {
                    "id": "gc_bpp_on_confirm_message_12",
                    "type": "object",
                    "properties": {
                      "phone": {
                        "id": "gc_bpp_on_confirm_message_13",
                        "type": "string",
                        "minLength": 1
                      },
                      "email": {
                        "id": "gc_bpp_on_confirm_message_14",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  }
                }
              },
              "stops": {
                "id": "gc_bpp_on_confirm_message_15",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "gc_bpp_on_confirm_message_16",
                  "type": "object",
                  "properties": {
                    "id": {
                      "id": "gc_bpp_on_confirm_message_17",
                      "type": "string",
                      "minLength": 1
                    },
                    "contact": {
                      "id": "gc_bpp_on_confirm_message_18",
                      "type": "object",
                      "properties": {
                        "phone": {
                          "id": "gc_bpp_on_confirm_message_19",
                          "type": "string",
                          "minLength": 1
                        },
                        "email": {
                          "id": "gc_bpp_on_confirm_message_20",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    },
                    "person": {
                      "id": "gc_bpp_on_confirm_message_21",
                      "type": "object",
                      "properties": {
                        "name": {
                          "id": "gc_bpp_on_confirm_message_22",
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
          "id": "gc_bpp_on_confirm_message_23",
          "type": "object",
          "properties": {
            "id": {
              "id": "gc_bpp_on_confirm_message_24",
              "type": "string",
              "minLength": 1
            }
          }
        },
        "items": {
          "id": "gc_bpp_on_confirm_message_25",
          "type": "array",
          "minItems": 1,
          "element": {
            "id": "gc_bpp_on_confirm_message_26",
            "type": "object",
            "properties": {
              "id": {
                "id": "gc_bpp_on_confirm_message_27",
                "type": "string",
                "minLength": 1
              },
              "quantity": {
                "id": "gc_bpp_on_confirm_message_28",
                "type": "object",
                "properties": {
                  "selected": {
                    "id": "gc_bpp_on_confirm_message_29",
                    "type": "object",
                    "properties": {
                      "count": {
                        "id": "gc_bpp_on_confirm_message_30",
                        "type": "number"
                      }
                    }
                  }
                }
              },
              "price": {
                "id": "gc_bpp_on_confirm_message_31",
                "type": "object",
                "properties": {
                  "currency": {
                    "id": "gc_bpp_on_confirm_message_32",
                    "type": "string",
                    "minLength": 1
                  },
                  "value": {
                    "id": "gc_bpp_on_confirm_message_33",
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              "fulfillment_ids": {
                "id": "gc_bpp_on_confirm_message_34",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "gc_bpp_on_confirm_message_35",
                  "type": "string",
                  "minLength": 1
                }
              },
              "cancellation_terms": {
                "id": "gc_bpp_on_confirm_message_36",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "gc_bpp_on_confirm_message_37",
                  "type": "object",
                  "properties": {
                    "cancel_eligible": {
                      "id": "gc_bpp_on_confirm_message_38",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                }
              },
              "return_terms": {
                "id": "gc_bpp_on_confirm_message_39",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "gc_bpp_on_confirm_message_40",
                  "type": "object",
                  "properties": {
                    "return_eligible": {
                      "id": "gc_bpp_on_confirm_message_41",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                }
              },
              "tags": {
                "id": "gc_bpp_on_confirm_message_42",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "gc_bpp_on_confirm_message_43",
                  "type": "object",
                  "properties": {
                    "descriptor": {
                      "id": "gc_bpp_on_confirm_message_44",
                      "type": "object",
                      "properties": {
                        "code": {
                          "id": "gc_bpp_on_confirm_message_45",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    },
                    "list": {
                      "id": "gc_bpp_on_confirm_message_46",
                      "type": "array",
                      "minItems": 1,
                      "element": {
                        "id": "gc_bpp_on_confirm_message_47",
                        "type": "object",
                        "properties": {
                          "descriptor": {
                            "id": "gc_bpp_on_confirm_message_48",
                            "type": "object",
                            "properties": {
                              "code": {
                                "id": "gc_bpp_on_confirm_message_49",
                                "type": "string",
                                "minLength": 1
                              }
                            }
                          },
                          "value": {
                            "id": "gc_bpp_on_confirm_message_50",
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
        "billing": {
          "id": "gc_bpp_on_confirm_message_51",
          "type": "object",
          "properties": {
            "name": {
              "id": "gc_bpp_on_confirm_message_52",
              "type": "string",
              "minLength": 1
            },
            "address": {
              "id": "gc_bpp_on_confirm_message_53",
              "type": "string",
              "minLength": 1
            },
            "city": {
              "id": "gc_bpp_on_confirm_message_54",
              "type": "object",
              "properties": {
                "name": {
                  "id": "gc_bpp_on_confirm_message_55",
                  "type": "string",
                  "minLength": 1
                },
                "code": {
                  "id": "gc_bpp_on_confirm_message_56",
                  "type": "string",
                  "minLength": 1
                }
              }
            },
            "state": {
              "id": "gc_bpp_on_confirm_message_57",
              "type": "object",
              "properties": {
                "name": {
                  "id": "gc_bpp_on_confirm_message_58",
                  "type": "string",
                  "minLength": 1
                },
                "code": {
                  "id": "gc_bpp_on_confirm_message_59",
                  "type": "string",
                  "minLength": 1
                }
              }
            },
            "email": {
              "id": "gc_bpp_on_confirm_message_60",
              "type": "string",
              "minLength": 1
            },
            "phone": {
              "id": "gc_bpp_on_confirm_message_61",
              "type": "string",
              "minLength": 1
            }
          }
        },
        "offers": {
          "id": "gc_bpp_on_confirm_message_62",
          "type": "array",
          "minItems": 1,
          "element": {
            "id": "gc_bpp_on_confirm_message_63",
            "type": "object",
            "properties": {
              "id": {
                "id": "gc_bpp_on_confirm_message_64",
                "type": "string",
                "minLength": 1
              },
              "item_ids": {
                "id": "gc_bpp_on_confirm_message_65",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "gc_bpp_on_confirm_message_66",
                  "type": "string",
                  "minLength": 1
                }
              }
            }
          }
        },
        "quote": {
          "id": "gc_bpp_on_confirm_message_67",
          "type": "object",
          "properties": {
            "price": {
              "id": "gc_bpp_on_confirm_message_68",
              "type": "object",
              "properties": {
                "currency": {
                  "id": "gc_bpp_on_confirm_message_69",
                  "type": "string",
                  "minLength": 1
                },
                "value": {
                  "id": "gc_bpp_on_confirm_message_70",
                  "type": "string",
                  "minLength": 1
                }
              }
            },
            "breakup": {
              "id": "gc_bpp_on_confirm_message_71",
              "type": "array",
              "minItems": 1,
              "element": {
                "id": "gc_bpp_on_confirm_message_72",
                "type": "object",
                "properties": {
                  "item": {
                    "id": "gc_bpp_on_confirm_message_73",
                    "type": "object",
                    "properties": {
                      "id": {
                        "id": "gc_bpp_on_confirm_message_74",
                        "type": "string",
                        "minLength": 1
                      },
                      "quantity": {
                        "id": "gc_bpp_on_confirm_message_75",
                        "type": "object",
                        "properties": {
                          "selected": {
                            "id": "gc_bpp_on_confirm_message_76",
                            "type": "object",
                            "properties": {
                              "count": {
                                "id": "gc_bpp_on_confirm_message_77",
                                "type": "number"
                              }
                            }
                          }
                        }
                      },
                      "price": {
                        "id": "gc_bpp_on_confirm_message_78",
                        "type": "object",
                        "properties": {
                          "currency": {
                            "id": "gc_bpp_on_confirm_message_79",
                            "type": "string",
                            "minLength": 1
                          },
                          "value": {
                            "id": "gc_bpp_on_confirm_message_80",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      }
                    }
                  },
                  "title": {
                    "id": "gc_bpp_on_confirm_message_81",
                    "type": "string",
                    "minLength": 1
                  },
                  "price": {
                    "id": "gc_bpp_on_confirm_message_82",
                    "type": "object",
                    "properties": {
                      "currency": {
                        "id": "gc_bpp_on_confirm_message_83",
                        "type": "string",
                        "minLength": 1
                      },
                      "value": {
                        "id": "gc_bpp_on_confirm_message_84",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  }
                }
              }
            },
            "ttl": {
              "id": "gc_bpp_on_confirm_message_85",
              "type": "string",
              "minLength": 1
            }
          }
        },
        "payments": {
          "id": "gc_bpp_on_confirm_message_86",
          "type": "array",
          "minItems": 1,
          "element": {
            "id": "gc_bpp_on_confirm_message_87",
            "type": "object",
            "properties": {
              "id": {
                "id": "gc_bpp_on_confirm_message_88",
                "type": "string",
                "minLength": 1
              },
              "collected_by": {
                "id": "gc_bpp_on_confirm_message_89",
                "type": "string",
                "minLength": 1
              },
              "status": {
                "id": "gc_bpp_on_confirm_message_90",
                "type": "string",
                "minLength": 1
              },
              "url": {
                "id": "gc_bpp_on_confirm_message_91",
                "type": "string",
                "minLength": 1
              },
              "params": {
                "id": "gc_bpp_on_confirm_message_92",
                "type": "object",
                "properties": {
                  "currency": {
                    "id": "gc_bpp_on_confirm_message_93",
                    "type": "string",
                    "minLength": 1
                  },
                  "transaction_id": {
                    "id": "gc_bpp_on_confirm_message_94",
                    "type": "string",
                    "minLength": 1
                  },
                  "amount": {
                    "id": "gc_bpp_on_confirm_message_95",
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              "tags": {
                "id": "gc_bpp_on_confirm_message_96",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "gc_bpp_on_confirm_message_97",
                  "type": "object",
                  "properties": {
                    "descriptor": {
                      "id": "gc_bpp_on_confirm_message_98",
                      "type": "object",
                      "properties": {
                        "code": {
                          "id": "gc_bpp_on_confirm_message_99",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    },
                    "list": {
                      "id": "gc_bpp_on_confirm_message_100",
                      "type": "array",
                      "minItems": 1,
                      "element": {
                        "id": "gc_bpp_on_confirm_message_101",
                        "type": "object",
                        "properties": {
                          "descriptor": {
                            "id": "gc_bpp_on_confirm_message_102",
                            "type": "object",
                            "properties": {
                              "code": {
                                "id": "gc_bpp_on_confirm_message_103",
                                "type": "string",
                                "minLength": 1
                              }
                            }
                          },
                          "value": {
                            "id": "gc_bpp_on_confirm_message_104",
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
        "created_at": {
          "id": "gc_bpp_on_confirm_message_105",
          "type": "string",
          "minLength": 1
        },
        "updated_at": {
          "id": "gc_bpp_on_confirm_message_106",
          "type": "string",
          "minLength": 1
        }

      }
    }
  },
  "required": ["order"]

}