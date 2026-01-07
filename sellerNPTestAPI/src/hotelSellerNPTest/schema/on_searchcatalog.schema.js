module.exports={
  "id": "hotel_bpp_on_search_message_01",
    "type": "object",
    "properties": {
      "catalog": {
        "id": "hotel_bpp_on_search_message_02",
        "type": "object",
        "properties": {
          "providers": {
            "id": "hotel_bpp_on_search_message_03",
            "type": "array",
            "minItems": 1,
            "element": {
              "id": "hotel_bpp_on_search_message_04",
              "type": "object",
              "properties": {
                "id": {
                  "id": "hotel_bpp_on_search_message_05",
                  "type": "string",
                  "minLength": 1
                },
                "categories": {
                  "id": "hotel_bpp_on_search_message_06",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "hotel_bpp_on_search_message_07",
                    "type": "object",
                    "properties": {
                      "id": {
                        "id": "hotel_bpp_on_search_message_08",
                        "type": "string",
                        "minLength": 1
                      },
                      "descriptor": {
                        "id": "hotel_bpp_on_search_message_09",
                        "type": "object",
                        "properties": {
                          "name": {
                            "id": "hotel_bpp_on_search_message_10",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      }
                    }
                  }
                },
                "items": {
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
                          "additional_desc": {
                            "id": "hotel_bpp_on_search_message_20",
                            "type": "object",
                            "properties": {
                              "url": {
                                "id": "hotel_bpp_on_search_message_21",
                                "type": "string",
                                "minLength": 1
                              },
                              "content_type": {
                                "id": "hotel_bpp_on_search_message_22",
                                "type": "string",
                                "minLength": 1
                              }
                            }
                          },
                          "images": {
                            "id": "hotel_bpp_on_search_message_23",
                            "type": "array",
                            "minItems": 1,
                            "element": {
                              "id": "hotel_bpp_on_search_message_24",
                              "type": "object",
                              "properties": {
                                "url": {
                                  "id": "hotel_bpp_on_search_message_25",
                                  "type": "string",
                                  "minLength": 1
                                }
                              }
                            }
                          }
                        }
                      },
                      "price": {
                        "id": "hotel_bpp_on_search_message_26",
                        "type": "object",
                        "properties": {
                          "currency": {
                            "id": "hotel_bpp_on_search_message_27",
                            "type": "string",
                            "minLength": 1
                          },
                          "value": {
                            "id": "hotel_bpp_on_search_message_28",
                            "type": "string",
                            "minLength": 1
                          },
                          "maximum_value": {
                            "id": "hotel_bpp_on_search_message_29",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "quantity": {
                        "id": "hotel_bpp_on_search_message_30",
                        "type": "object",
                        "properties": {
                          "available": {
                            "id": "hotel_bpp_on_search_message_31",
                            "type": "object",
                            "properties": {
                              "count": {
                                "id": "hotel_bpp_on_search_message_32",
                                "type": "number"
                              }
                            }
                          },
                          "maximum": {
                            "id": "hotel_bpp_on_search_message_33",
                            "type": "object",
                            "properties": {
                              "count": {
                                "id": "hotel_bpp_on_search_message_34",
                                "type": "number"
                              }
                            }
                          }
                        }
                      },
                      "location_ids": {
                        "id": "hotel_bpp_on_search_message_35",
                        "type": "array",
                        "minItems": 1,
                        "element": {
                          "id": "hotel_bpp_on_search_message_36",
                          "type": "object",
                          "properties": {}
                        }
                      },
                      "category_ids": {
                        "id": "hotel_bpp_on_search_message_37",
                        "type": "array",
                        "minItems": 1,
                        "element": {
                          "id": "hotel_bpp_on_search_message_38",
                          "type": "object",
                          "properties": {}
                        }
                      },
                      "payment_ids": {
                        "id": "hotel_bpp_on_search_message_39",
                        "type": "array",
                        "minItems": 1,
                        "element": {
                          "id": "hotel_bpp_on_search_message_40",
                          "type": "object",
                          "properties": {}
                        }
                      },
                      "add_ons": {
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
                            "descriptor": {
                              "id": "hotel_bpp_on_search_message_44",
                              "type": "object",
                              "properties": {
                                "name": {
                                  "id": "hotel_bpp_on_search_message_45",
                                  "type": "string",
                                  "minLength": 1
                                },
                                "short_desc": {
                                  "id": "hotel_bpp_on_search_message_46",
                                  "type": "string",
                                  "minLength": 1
                                }
                              }
                            },
                            "price": {
                              "id": "hotel_bpp_on_search_message_47",
                              "type": "object",
                              "properties": {
                                "currency": {
                                  "id": "hotel_bpp_on_search_message_48",
                                  "type": "string",
                                  "minLength": 1
                                },
                                "value": {
                                  "id": "hotel_bpp_on_search_message_49",
                                  "type": "string",
                                  "minLength": 1
                                },
                                "maximum_value": {
                                  "id": "hotel_bpp_on_search_message_50",
                                  "type": "string",
                                  "minLength": 1
                                }
                              }
                            }
                          }
                        }
                      },
                      "cancellation_terms": {
                        "id": "hotel_bpp_on_search_message_51",
                        "type": "array",
                        "minItems": 1,
                        "element": {
                          "id": "hotel_bpp_on_search_message_52",
                          "type": "object",
                          "properties": {
                            "external_ref": {
                              "id": "hotel_bpp_on_search_message_53",
                              "type": "object",
                              "properties": {
                                "mimetype": {
                                  "id": "hotel_bpp_on_search_message_54",
                                  "type": "string",
                                  "minLength": 1
                                },
                                "url": {
                                  "id": "hotel_bpp_on_search_message_55",
                                  "type": "string",
                                  "minLength": 1
                                }
                              }
                            }
                          }
                        }
                      },
                      "recommended": {
                        "id": "hotel_bpp_on_search_message_56",
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