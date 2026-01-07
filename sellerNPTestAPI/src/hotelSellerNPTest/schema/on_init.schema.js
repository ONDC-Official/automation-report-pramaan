module.exports={
    "id": "hotel_bpp_on_init_message_01",
    "type": "object",
    "properties": {
      "order": {
        "id": "hotel_bpp_on_init_message_02",
        "type": "object",
        "properties": {
          "provider": {
            "id": "hotel_bpp_on_init_message_03",
            "type": "object",
            "properties": {
              "id": {
                "id": "hotel_bpp_on_init_message_04",
                "type": "string",
                "minLength": 1
              }
            }
          },
          "items": {
            "id": "hotel_bpp_on_init_message_05",
            "type": "array",
            "minItems": 1,
            "element": {
                "id": "hotel_bpp_on_init_message_06",
              "type": "object",
              "properties": {
                "id": {
                    "id": "hotel_bpp_on_init_message_07",
                  "type": "string",
                  "minLength": 1
                },
                "location_ids": {
                    "id": "hotel_bpp_on_init_message_08",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "hotel_bpp_on_init_message_09",
                    "type": "object",
                    "properties": {}
                  }
                },
                "quantity": {
                    "id": "hotel_bpp_on_init_message_10",
                  "type": "object",
                  "properties": {
                    "selected": {
                        "id": "hotel_bpp_on_init_message_11",
                      "type": "object",
                      "properties": {
                        "count": {
                            "id": "hotel_bpp_on_init_message_12",
                          "type": "number"
                        }
                      }
                    }
                  }
                },
                "add_ons": {
                    "id": "hotel_bpp_on_init_message_13",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "hotel_bpp_on_init_message_14",
                    "type": "object",
                    "properties": {
                      "id": {
                        "id": "hotel_bpp_on_init_message_15",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  }
                }
              }
            }
          },
         
          "billing": {
            "id": "hotel_bpp_on_init_message_34",
            "type": "object",
            "properties": {
              "name": {
                "id": "hotel_bpp_on_init_message_35",
                "type": "string",
                "minLength": 1
              },
              "address": {
                "id": "hotel_bpp_on_init_message_36",
                "type": "string",
                "minLength": 1
              },
              "state": {
                "id": "hotel_bpp_on_init_message_37",
                "type": "object",
                "properties": {
                  "name": {
                    "id": "hotel_bpp_on_init_message_38",
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              "city": {
                "id": "hotel_bpp_on_init_message_39",
                "type": "object",
                "properties": {
                  "name": {
                    "id": "hotel_bpp_on_init_message_40",
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              "organization": {
                "id": "hotel_bpp_on_init_message_41",
                "type": "object",
                "properties": {
                  "descriptor": {
                    "id": "hotel_bpp_on_init_message_42",
                    "type": "object",
                    "properties": {
                      "name": {
                        "id": "hotel_bpp_on_init_message_43",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  },
                  "address": {
                    "id": "hotel_bpp_on_init_message_44",
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              "email": {
                "id": "hotel_bpp_on_init_message_45",
                "type": "string",
                "minLength": 1
              },
              "phone": {
                "id": "hotel_bpp_on_init_message_46",
                "type": "string",
                "minLength": 1
              },
              "tax_id": {
                "id": "hotel_bpp_on_init_message_47",
                "type": "string",
                "minLength": 1
              }
            }
          },
          "fulfillments": {
            "id": "hotel_bpp_on_init_message_48",
            "type": "array",
            "minItems": 1,
            "element": {
                "id": "hotel_bpp_on_init_message_49",
              "type": "object",
              "properties": {
                "id": {
                    "id": "hotel_bpp_on_init_message_50",
                  "type": "string",
                  "minLength": 1
                },
                "customer": {
                    "id": "hotel_bpp_on_init_message_51",
                  "type": "object",
                  "properties": {
                    "person": {
                        "id": "hotel_bpp_on_init_message_52",
                      "type": "object",
                      "properties": {
                        "name": {
                            "id": "hotel_bpp_on_init_message_53",
                          "type": "string",
                          "minLength": 1
                        },
                        "age": {
                            "id": "hotel_bpp_on_init_message_54",
                          "type": "string",
                          "minLength": 1
                        },
                        "dob": {
                            "id": "hotel_bpp_on_init_message_55",
                          "type": "string",
                          "minLength": 1
                        },
                        "gender": {
                            "id": "hotel_bpp_on_init_message_56",
                          "type": "string",
                          "minLength": 1
                        },
                        "creds": {
                            "id": "hotel_bpp_on_init_message_57",
                          "type": "array",
                          "minItems": 1,
                          "element": {
                            "id": "hotel_bpp_on_init_message_58",
                            "type": "object",
                            "properties": {
                              "id": {
                                "id": "hotel_bpp_on_init_message_59",
                                "type": "string",
                                "minLength": 1
                              },
                              "type": {
                                "id": "hotel_bpp_on_init_message_60",
                                "type": "string",
                                "minLength": 1
                              }
                            }
                          }
                        }
                      }
                    },
                    "contact": {
                        "id": "hotel_bpp_on_init_message_61",
                      "type": "object",
                      "properties": {
                        "phone": {
                            "id": "hotel_bpp_on_init_message_62",
                          "type": "string",
                          "minLength": 1
                        },
                        "email": {
                            "id": "hotel_bpp_on_init_message_63",
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
            "id": "hotel_bpp_on_init_message_64",
            "type": "array",
            "minItems": 1,
            "element": {
                "id": "hotel_bpp_on_init_message_65",
              "type": "object",
              "properties": {
                "descriptor": {
                    "id": "hotel_bpp_on_init_message_66",
                  "type": "object",
                  "properties": {
                    "code": {
                        "id": "hotel_bpp_on_init_message_67",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "list": {
                    "id": "hotel_bpp_on_init_message_68",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "hotel_bpp_on_init_message_69",
                    "type": "object",
                    "properties": {
                      "descriptor": {
                        "id": "hotel_bpp_on_init_message_70",
                        "type": "object",
                        "properties": {
                          "code": {
                            "id": "hotel_bpp_on_init_message_71",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "value": {
                        "id": "hotel_bpp_on_init_message_72",
                        "type": "string",
                        "minLength": 0
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