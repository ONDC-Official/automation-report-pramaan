module.exports= {
  "id": "LI_bap_confirm_message_01",
    "type": "object",
    "properties": {
      "order": {
        "id": "LI_bap_confirm_message_02",
        "type": "object",
        "properties": {
          "fulfillments": {
            "id": "LI_bap_confirm_message_03",
            "type": "array",
            "minItems": 1,
            "element": {
              "id": "LI_bap_confirm_message_04",
              "type": "object",
              "properties": {
                "state": {
                  "id": "LI_bap_confirm_message_05",
                  "type": "object",
                  "properties": {
                    "descriptor": {
                      "id": "LI_bap_confirm_message_06",
                      "type": "object",
                      "properties": {
                        "code": {
                          "id": "LI_bap_confirm_message_07",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    }
                  }
                },
                "customer": {
                  "id": "LI_bap_confirm_message_08",
                  "type": "object",
                  "properties": {
                    "contact": {
                      "id": "LI_bap_confirm_message_09",
                      "type": "object",
                      "properties": {
                        "email": {
                          "id": "LI_bap_confirm_message_10",
                          "type": "string",
                          "minLength": 1
                        },
                        "phone": {
                          "id": "LI_bap_confirm_message_11",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    },
                    "person": {
                      "id": "LI_bap_confirm_message_12",
                      "type": "object",
                      "properties": {
                        "name": {
                          "id": "LI_bap_confirm_message_13",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    }
                  }
                },
                "id": {
                  "id": "LI_bap_confirm_message_14",
                  "type": "string",
                  "minLength": 1
                },
                "type": {
                  "id": "LI_bap_confirm_message_15",
                  "type": "string",
                  "minLength": 1
                }
              }
            }
          },
          "items": {
            "id": "LI_bap_confirm_message_16",
            "type": "array",
            "minItems": 1,
            "element": {
              "id": "LI_bap_confirm_message_17",
              "type": "object",
              "properties": {
                "category_ids": {
                  "id": "LI_bap_confirm_message_18",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "LI_bap_confirm_message_19",
                    "type": "object",
                    "properties": {}
                  }
                },
                "descriptor": {
                  "id": "LI_bap_confirm_message_20",
                  "type": "object",
                  "properties": {
                    "name": {
                      "id": "LI_bap_confirm_message_21",
                      "type": "string",
                      "minLength": 1
                    },
                    "short_desc": {
                      "id": "LI_bap_confirm_message_22",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "id": {
                  "id": "LI_bap_confirm_message_23",
                  "type": "string",
                  "minLength": 1
                },
                "parent_item_id": {
                  "id": "LI_bap_confirm_message_24",
                  "type": "string",
                  "minLength": 1
                },
                "price": {
                  "id": "LI_bap_confirm_message_25",
                  "type": "object",
                  "properties": {
                    "currency": {
                      "id": "LI_bap_confirm_message_26",
                      "type": "string",
                      "minLength": 1
                    },
                    "value": {
                      "id": "LI_bap_confirm_message_27",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "tags": {
                  "id": "LI_bap_confirm_message_28",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "LI_bap_confirm_message_29",
                    "type": "object",
                    "properties": {
                      "descriptor": {
                        "id": "LI_bap_confirm_message_30",
                        "type": "object",
                        "properties": {
                          "code": {
                             "id": "LI_bap_confirm_message_31",
                            "type": "string",
                            "minLength": 1
                          },
                          "name": {
                             "id": "LI_bap_confirm_message_32",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "list": {
                         "id": "LI_bap_confirm_message_33",
                        "type": "array",
                        "minItems": 1,
                        "element": {
                           "id": "LI_bap_confirm_message_34",
                          "type": "object",
                          "properties": {
                            "descriptor": {
                               "id": "LI_bap_confirm_message_35",
                              "type": "object",
                              "properties": {
                                "code": {
                                   "id": "LI_bap_confirm_message_36",
                                  "type": "string",
                                  "minLength": 1
                                },
                                "name": {
                                   "id": "LI_bap_confirm_message_37",
                                  "type": "string",
                                  "minLength": 1
                                }
                              }
                            },
                            "value": {
                               "id": "LI_bap_confirm_message_38",
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
                   "id": "LI_bap_confirm_message_39",
                  "type": "object",
                  "properties": {
                    "duration": {
                       "id": "LI_bap_confirm_message_40",
                      "type": "string",
                      "minLength": 1
                    },
                    "label": {
                      "id": "LI_bap_confirm_message_41",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "add_ons": {
                  "id": "LI_bap_confirm_message_42",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "LI_bap_confirm_message_43",
                    "type": "object",
                    "properties": {
                      "id": {
                        "id": "LI_bap_confirm_message_44",
                        "type": "string",
                        "minLength": 1
                      },
                      "quantity": {
                        "id": "LI_bap_confirm_message_45",
                        "type": "object",
                        "properties": {
                          "selected": {
                            "id": "LI_bap_confirm_message_46",
                            "type": "object",
                            "properties": {
                              "count": {
                                "id": "LI_bap_confirm_message_47",
                                "type": "number"
                              }
                            }
                          }
                        }
                      },
                      "descriptor": {
                        "id": "LI_bap_confirm_message_48",
                        "type": "object",
                        "properties": {
                          "name": {
                            "id": "LI_bap_confirm_message_49",
                            "type": "string",
                            "minLength": 1
                          },
                          "code": {
                            "id": "LI_bap_confirm_message_50",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "price": {
                         "id": "LI_bap_confirm_message_51",
                        "type": "object",
                        "properties": {
                          "value": {
                             "id": "LI_bap_confirm_message_52",
                            "type": "string",
                            "minLength": 1
                          },
                          "currency": {
                             "id": "LI_bap_confirm_message_53",
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
             "id": "LI_bap_confirm_message_54",
            "type": "object",
            "properties": {
              "id": {
                 "id": "LI_bap_confirm_message_55",
                "type": "string",
                "minLength": 1
              }
            }
          },
          "payments": {
             "id": "LI_bap_confirm_message_56",
            "type": "array",
            "minItems": 1,
            "element": {
               "id": "LI_bap_confirm_message_57",
              "type": "object",
              "properties": {
                "collected_by": {
                   "id": "LI_bap_confirm_message_58",
                  "type": "string",
                  "minLength": 1
                },
                "params": {
                   "id": "LI_bap_confirm_message_59",
                  "type": "object",
                  "properties": {
                    "amount": {
                       "id": "LI_bap_confirm_message_60",
                      "type": "string",
                      "minLength": 1
                    },
                    "currency": {
                      "id": "LI_bap_confirm_message_61",
                      "type": "string",
                      "minLength": 1
                    },
                    "transaction_id": {
                      "id": "LI_bap_confirm_message_62",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "status": {
                  "id": "LI_bap_confirm_message_63",
                  "type": "string",
                  "minLength": 1
                },
                "type": {
                  "id": "LI_bap_confirm_message_64",
                  "type": "string",
                  "minLength": 1
                }
              }
            }
          },
          "tags": {
            "id": "LI_bap_confirm_message_65",
            "type": "array",
            "minItems": 1,
            "element": {
              "id": "LI_bap_confirm_message_66",
              "type": "object",
              "properties": {
                "descriptor": {
                  "id": "LI_bap_confirm_message_67",
                  "type": "object",
                  "properties": {
                    "code": {
                      "id": "LI_bap_confirm_message_68",
                      "type": "string",
                      "minLength": 1
                    },
                    "name": {
                      "id": "LI_bap_confirm_message_69",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "display": {
                  "id": "LI_bap_confirm_message_70",
                  "type": "boolean"
                },
                "list": {
                   "id": "LI_bap_confirm_message_71",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                     "id": "LI_bap_confirm_message_72",
                    "type": "object",
                    "properties": {
                      "descriptor": {
                         "id": "LI_bap_confirm_message_73",
                        "type": "object",
                        "properties": {
                          "code": {
                             "id": "LI_bap_confirm_message_74",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "value": {
                         "id": "LI_bap_confirm_message_75",
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