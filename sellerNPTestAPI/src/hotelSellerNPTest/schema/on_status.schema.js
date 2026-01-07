module.exports= {
    "id": "hotel_bpp_on_status_message_01",
    "type": "object",
    "properties": {
      "order": {
        "id": "hotel_bpp_on_status_message_02",
        "type": "object",
        "properties": {
          "id": {
            "id": "hotel_bpp_on_status_message_03",
            "type": "string",
            "minLength": 1
          },
          "status": {
            "id": "hotel_bpp_on_status_message_04",
            "type": "string",
            "minLength": 1
          },
          "provider": {
            "id": "hotel_bpp_on_status_message_05",
            "type": "object",
            "properties": {
              "id": {
                "id": "hotel_bpp_on_status_message_06",
                "type": "string",
                "minLength": 1
              }
            }
          },
          "items": {
            "id": "hotel_bpp_on_status_message_07",
            "type": "array",
            "minItems": 1,
            "element": {
                "id": "hotel_bpp_on_status_message_08",
              "type": "object",
              "properties": {
                "id": {
                    "id": "hotel_bpp_on_status_message_09",
                  "type": "string",
                  "minLength": 1
                },
                "location_ids": {
                    "id": "hotel_bpp_on_status_message_10",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "hotel_bpp_on_status_message_11",
                    "type": "object",
                    "properties": {}
                  }
                },
                "quantity": {
                    "id": "hotel_bpp_on_status_message_12",
                  "type": "object",
                  "properties": {
                    "selected": {
                        "id": "hotel_bpp_on_status_message_13",
                      "type": "object",
                      "properties": {
                        "count": {
                            "id": "hotel_bpp_on_status_message_14",
                          "type": "number"
                        }
                      }
                    }
                  }
                },
                "add_ons": {
                    "id": "hotel_bpp_on_status_message_15",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "hotel_bpp_on_status_message_16",
                    "type": "object",
                    "properties": {
                      "id": {
                        "id": "hotel_bpp_on_status_message_17",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  }
                }
              }
            }
          },
          "quote": {
            "id": "hotel_bpp_on_status_message_18",
            "type": "object",
            "properties": {
              "price": {
                "id": "hotel_bpp_on_status_message_19",
                "type": "object",
                "properties": {
                  "currency": {
                    "id": "hotel_bpp_on_status_message_20",
                    "type": "string",
                    "minLength": 1
                  },
                  "value": {
                    "id": "hotel_bpp_on_status_message_21",
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              "breakup": {
                "id": "hotel_bpp_on_status_message_22",
                "type": "array",
                "minItems": 1,
                "element": {
                    "id": "hotel_bpp_on_status_message_23",
                  "type": "object",
                  "properties": {
                    "item": {
                        "id": "hotel_bpp_on_status_message_24",
                      "type": "object",
                      "properties": {
                        "id": {
                            "id": "hotel_bpp_on_status_message_25",
                          "type": "string",
                          "minLength": 1
                        },
                        "quantity": {
                            "id": "hotel_bpp_on_status_message_26",
                          "type": "object",
                          "properties": {
                            "selected": {
                                "id": "hotel_bpp_on_status_message_27",
                              "type": "object",
                              "properties": {
                                "count": {
                                    "id": "hotel_bpp_on_status_message_28",
                                  "type": "number"
                                }
                              }
                            }
                          }
                        },
                        "price": {
                            "id": "hotel_bpp_on_status_message_29",
                          "type": "object",
                          "properties": {
                            "currency": {
                                "id": "hotel_bpp_on_status_message_30",
                              "type": "string",
                              "minLength": 1
                            },
                            "value": {
                                "id": "hotel_bpp_on_status_message_31",
                              "type": "string",
                              "minLength": 1
                            }
                          }
                        },
                        "add_ons": {
                            "id": "hotel_bpp_on_status_message_32",
                          "type": "array",
                          "minItems": 1,
                          "element": {
                            "id": "hotel_bpp_on_status_message_33",
                            "type": "object",
                            "properties": {
                              "id": {
                                "id": "hotel_bpp_on_status_message_34",
                                "type": "string",
                                "minLength": 1
                              },
                              "price": {
                                "id": "hotel_bpp_on_status_message_35",
                                "type": "object",
                                "properties": {
                                  "currency": {
                                    "id": "hotel_bpp_on_status_message_36",
                                    "type": "string",
                                    "minLength": 1
                                  },
                                  "value": {
                                    "id": "hotel_bpp_on_status_message_37",
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
                    "title": {
                        "id": "hotel_bpp_on_status_message_38",
                      "type": "string",
                      "minLength": 1
                    },
                    "price": {
                        "id": "hotel_bpp_on_status_message_39",
                      "type": "object",
                      "properties": {
                        "currency": {
                            "id": "hotel_bpp_on_status_message_40",
                          "type": "string",
                          "minLength": 1
                        },
                        "value": {
                            "id": "hotel_bpp_on_status_message_41",
                          "type": "string",
                          "minLength": 1
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
                                "const": "Deluxe Room accommodation with Breakfast Included"
                              }
                            }
                          },
                          "then": [
                            "title",
                            "price",
                            "item"
                          ]
                        },
                        {
                          "if": {
                            "properties": {
                              "title": {
                                "const": "Service Tax @ 9%"
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
                                "const": "GST @ 12%"
                              }
                            }
                          },
                          "then": [
                            "title",
                            "price",
                          ]
                        }
                      ]
                    }
                  }
                }
              },
              "ttl": {
                "id": "hotel_bpp_on_status_message_42",
                "type": "string",
                "minLength": 1
              }
            }
          },
          
          "billing": {
            "id": "hotel_bpp_on_status_message_67",
            "type": "object",
            "properties": {
              "name": {
                "id": "hotel_bpp_on_status_message_68",
                "type": "string",
                "minLength": 1
              },
              "address": {
                "id": "hotel_bpp_on_status_message_69",
                "type": "string",
                "minLength": 1
              },
              "state": {
                "id": "hotel_bpp_on_status_message_70",
                "type": "object",
                "properties": {
                  "name": {
                    "id": "hotel_bpp_on_status_message_71",
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              "city": {
                "id": "hotel_bpp_on_status_message_72",
                "type": "object",
                "properties": {
                  "name": {
                    "id": "hotel_bpp_on_status_message_73",
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              "organization": {
                "id": "hotel_bpp_on_status_message_74",
                "type": "object",
                "properties": {
                  "descriptor": {
                    "id": "hotel_bpp_on_status_message_75",
                    "type": "object",
                    "properties": {
                      "name": {
                        "id": "hotel_bpp_on_status_message_76",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  },
                  "address": {
                    "id": "hotel_bpp_on_status_message_77",
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              "email": {
                "id": "hotel_bpp_on_status_message_78",
                "type": "string",
                "minLength": 1
              },
              "phone": {
                "id": "hotel_bpp_on_status_message_79",
                "type": "string",
                "minLength": 1
              },
              "tax_id": {
                "id": "hotel_bpp_on_status_message_80",
                "type": "string",
                "minLength": 1
              }
            }
          },
          "fulfillments": {
            "id": "hotel_bpp_on_status_message_81",
            "type": "array",
            "minItems": 1,
            "element": {
              "id": "hotel_bpp_on_status_message_82",
              "type": "object",
              "properties": {
                "id": {
                  "id": "hotel_bpp_on_status_message_83",
                  "type": "string",
                  "minLength": 1
                },
                "customer": {
                  "id": "hotel_bpp_on_status_message_84",
                  "type": "object",
                  "properties": {
                    "person": {
                      "id": "hotel_bpp_on_status_message_85",
                      "type": "object",
                      "properties": {
                        "name": {
                          "id": "hotel_bpp_on_status_message_86",
                          "type": "string",
                          "minLength": 1
                        },
                        "age": {
                          "id": "hotel_bpp_on_status_message_87",
                          "type": "string",
                          "minLength": 1
                        },
                        "dob": {
                          "id": "hotel_bpp_on_status_message_88",
                          "type": "string",
                          "minLength": 1
                        },
                        "gender": {
                          "id": "hotel_bpp_on_status_message_89",
                          "type": "string",
                          "minLength": 1
                        },
                        "creds": {
                          "id": "hotel_bpp_on_status_message_90",
                          "type": "array",
                          "minItems": 1,
                          "element": {
                            "id": "hotel_bpp_on_status_message_91",
                            "type": "object",
                            "properties": {
                              "id": {
                                "id": "hotel_bpp_on_status_message_92",
                                "type": "string",
                                "minLength": 1
                              },
                              "type": {
                                "id": "hotel_bpp_on_status_message_93",
                                "type": "string",
                                "minLength": 1
                              }
                            }
                          }
                        }
                      }
                    },
                    "contact": {
                      "id": "hotel_bpp_on_status_message_94",
                      "type": "object",
                      "properties": {
                        "phone": {
                          "id": "hotel_bpp_on_status_message_95",
                          "type": "string",
                          "minLength": 1
                        },
                        "email": {
                          "id": "hotel_bpp_on_status_message_96",
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
          "tags": {
            "id": "hotel_bpp_on_status_message_97",
            "type": "array",
            "minItems": 1,
            "element": {
              "id": "hotel_bpp_on_status_message_98",
              "type": "object",
              "properties": {
                "descriptor": {
                  "id": "hotel_bpp_on_status_message_99",
                  "type": "object",
                  "properties": {
                    "code": {
                      "id": "hotel_bpp_on_status_message_100",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "list": {
                  "id": "hotel_bpp_on_status_message_101",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "hotel_bpp_on_status_message_102",
                    "type": "object",
                    "properties": {
                      "descriptor": {
                        "id": "hotel_bpp_on_status_message_103",
                        "type": "object",
                        "properties": {
                          "code": {
                            "id": "hotel_bpp_on_status_message_104",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "value": {
                        "id": "hotel_bpp_on_status_message_105",
                        "type": "string",
                        "minLength": 0
                      }
                    }
                  }
                }
              }
            }
          },
          "documents": {
            "id": "hotel_bpp_on_status_message_106",
            "type": "array",
            "minItems": 1,
            "element": {
              "id": "hotel_bpp_on_status_message_107",
              "type": "object",
              "properties": {
                "descriptor": {
                  "id": "hotel_bpp_on_status_message_108",
                  "type": "object",
                  "properties": {
                    "code": {
                      "id": "hotel_bpp_on_status_message_109",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "url": {
                  "id": "hotel_bpp_on_status_message_110",
                  "type": "string",
                  "minLength": 1
                }
              }
            }
          },
          "updated_at": {
            "id": "hotel_bpp_on_status_message_111",
            "type": "string",
            "minLength": 1
          }
        }
      }
    }
  }