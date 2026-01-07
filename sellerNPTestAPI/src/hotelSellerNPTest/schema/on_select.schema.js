module.exports={
    "id": "hotel_bpp_on_select_message_01",
    "type": "object",
    "properties": {
      "order": {
        "id": "hotel_bpp_on_select_message_02",
        "type": "object",
        "properties": {
          "provider": {
            "id": "hotel_bpp_on_select_message_03",
            "type": "object",
            "properties": {
              "id": {
                "id": "hotel_bpp_on_select_message_04",
                "type": "string",
                "minLength": 1
              }
            }
          },
          "items": {
            "id": "hotel_bpp_on_select_message_05",
            "type": "array",
            "minItems": 1,
            "element": {
                "id": "hotel_bpp_on_select_message_06",
              "type": "object",
              "properties": {
                "id": {
                    "id": "hotel_bpp_on_select_message_07",
                  "type": "string",
                  "minLength": 1
                },
                "add_ons": {
                    "id": "hotel_bpp_on_select_message_08",
                  "type": "array",
                  "minItems": 0,
                  "element": {
                    "id": "hotel_bpp_on_select_message_09",
                    "type": "object",
                    "properties": {
                      "id": {
                        "id": "hotel_bpp_on_select_message_10",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  }
                },
                "payment_ids": {
                    "id": "hotel_bpp_on_select_message_11",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "hotel_bpp_on_select_message_12",
                    "type": "object",
                    "properties": {}
                  }
                }
              }
            }
          },
          "quote": {
            "id": "hotel_bpp_on_select_message_13",
            "type": "object",
            "properties": {
              "price": {
                "id": "hotel_bpp_on_select_message_14",
                "type": "object",
                "properties": {
                  "currency": {
                    "id": "hotel_bpp_on_select_message_15",
                    "type": "string",
                    "minLength": 1
                  },
                  "value": {
                    "id": "hotel_bpp_on_select_message_16",
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              "breakup": {
                "id": "hotel_bpp_on_select_message_17",
                "type": "array",
                "minItems": 1,
                "element": {
                    "id": "hotel_bpp_on_select_message_18",
                  "type": "object",
                  "properties": {
                    "item": {
                        "id": "hotel_bpp_on_select_message_19",
                      "type": "object",
                      "properties": {
                        "id": {
                            "id": "hotel_bpp_on_select_message_20",
                          "type": "string",
                          "minLength": 1
                        },
                        "quantity": {
                            "id": "hotel_bpp_on_select_message_21",
                          "type": "object",
                          "properties": {
                            "selected": {
                                "id": "hotel_bpp_on_select_message_22",
                              "type": "object",
                              "properties": {
                                "count": {
                                    "id": "hotel_bpp_on_select_message_23",
                                  "type": "number"
                                }
                              }
                            }
                          }
                        },
                        "price": {
                            "id": "hotel_bpp_on_select_message_24",
                          "type": "object",
                          "properties": {
                            "currency": {
                                "id": "hotel_bpp_on_select_message_25",
                              "type": "string",
                              "minLength": 1
                            },
                            "value": {
                                "id": "hotel_bpp_on_select_message_26",
                              "type": "string",
                              "minLength": 1
                            }
                          }
                        },
                        "add_ons": {
                            "id": "hotel_bpp_on_select_message_27",
                          "type": "array",
                          "minItems": 1,
                          "element": {
                            "id": "hotel_bpp_on_select_message_28",
                            "type": "object",
                            "properties": {
                              "id": {
                                "id": "hotel_bpp_on_select_message_29",
                                "type": "string",
                                "minLength": 1
                              },
                              "price": {
                                "id": "hotel_bpp_on_select_message_30",
                                "type": "object",
                                "properties": {
                                  "currency": {
                                    "id": "hotel_bpp_on_select_message_31",
                                    "type": "string",
                                    "minLength": 1
                                  },
                                  "value": {
                                    "id": "hotel_bpp_on_select_message_32",
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
                        "id": "hotel_bpp_on_select_message_33",
                      "type": "string",
                      "minLength": 1
                    },
                    "price": {
                        "id": "hotel_bpp_on_select_message_34",
                      "type": "object",
                      "properties": {
                        "currency": {
                            "id": "hotel_bpp_on_select_message_35",
                          "type": "string",
                          "minLength": 1
                        },
                        "value": {
                            "id": "hotel_bpp_on_select_message_36",
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
                "id": "hotel_bpp_on_select_message_37",
                "type": "string",
                "minLength": 1
              }
            }
          },
         
        }
      }
    }
  }
//   "error": {
//     "type": "object",
//     "properties": {
//       "code": {
//         "type": "string",
//         "minLength": 1
//       },
//       "message": {
//         "type": "string",
//         "minLength": 1
//       }
//     }
//   }