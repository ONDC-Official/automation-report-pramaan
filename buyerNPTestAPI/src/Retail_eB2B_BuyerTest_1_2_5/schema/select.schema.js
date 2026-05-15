module.exports = {
  "id": "retail_bap_select_message_01",
  "type": "object",
  "properties": {
    "order": {
      "id": "retail_bap_select_message_02",
      "type": "object",
      "properties": {
        "provider": {
          "id": "retail_bap_select_message_03",
          "type": "object",
          "properties": {
            "id": {
              "id": "retail_bap_select_message_04",
              "type": "string",
              "minLength": 1
            },
            "locations": {
              "id": "retail_bap_select_message_05",
              "type": "array",
              "minItems": 1,
              "element": {
                "id": "retail_bap_select_message_06",
                "type": "object",
                "properties": {
                  "id": {
                    "id": "retail_bap_select_message_07",
                    "type": "string",
                    "minLength": 1
                  }
                },
                "required": ["id"]
              }
            }
          },
          "required": ["id", "locations"]
        },

        "items": {
          "id": "retail_bap_select_message_08",
          "type": "array",
          "minItems": 1,
          "element": {
            "id": "retail_bap_select_message_09",
            "type": "object",
            "properties": {
              "id": {
                "id": "retail_bap_select_message_10",
                "type": "string",
                "minLength": 1
              },
              "parent_item_id": {
                "id": "retail_bap_select_message_23",
                "type": "string",
                "minLength": 1,
                "optional": true
              },
              "location_id": {
                "id": "retail_bap_select_message_11",
                "type": "string",
                "minLength": 1
              },
              "quantity": {
                "id": "retail_bap_select_message_12",
                "type": "object",
                "properties": {
                  "count": {
                    "id": "retail_bap_select_message_13",
                    "type": "number"
                  }
                },
                "required": ["count"]
              },
              "tags": {
                "id": "retail_bap_select_message_24",
                "type": "array",
                "optional": true,
                "minItems": 1,
                "element": {
                  "id": "retail_bap_select_message_25",
                  "type": "object",
                  "properties": {
                    "code": {
                      "id": "retail_bap_select_message_25",
                      "type": "string",
                      "minLength": 1,
                      "enum": ["type", "parent"]
                    },
                    "list": {
                      "id": "retail_bap_select_message_26",
                      "type": "array",
                      "minItems": 1,
                      "element": {
                        "allOf": [
                          {
                            "if": {
                              "properties": {
                                "code": {
                                  "const": "type"
                                }
                              }
                            },
                            "then": {
                              "id": "retail_bap_select_message_27",
                              "type": "object",
                              "properties": {
                                "code": {
                                  "id": "retail_bap_select_message_28",
                                  "type": "string",
                                  "minLength": 1,
                                  "enum": ["type"]
                                },
                                "value": {
                                  "id": "retail_bap_select_message_29",
                                  "type": "string",
                                  "minLength": 1,
                                  "enum": ["item", "customization"]
                                }
                              }
                            }
                          },
                          {
                            "if": {
                              "properties": {
                                "code": {
                                  "const": "id"
                                }
                              }
                            },
                            "then": {
                              "id": "retail_bap_select_message_30",
                              "type": "object",
                              "properties": {
                                "code": {
                                  "id": "retail_bap_select_message_31",
                                  "type": "string",
                                  "minLength": 1,
                                  "enum": ["id"]
                                },
                                "value": {
                                  "id": "retail_bap_select_message_32",
                                  "type": "string",
                                  "minLength": 1
                                }
                              }
                            }
                          }
                        ]
                      }
                    }
                  },
                  "required": ["code", "list"]
                }
              }
            },
            "required": ["id", "location_id", "quantity"]
          }
        },

        "offers": {
          "id": "retail_bap_select_message_33",
          "type": "array",
          "minItems": 1,
          "optional": true,
          "element": {
            "id": "retail_bap_select_message_34",
            "type": "object",
            "properties": {
              "id": {
                "id": "retail_bap_select_message_35",
                "type": "string",
                "minLength": 1
              }
            },
            "required": ["id"]
          }
        },

        "fulfillments": {
          "id": "retail_bap_select_message_14",
          "type": "array",
          "minItems": 1,
          "element": {
            "id": "retail_bap_select_message_15",
            "type": "object",
            "properties": {
              "customer": {
                "id": "retail_bap_select_message_36",
                "type": "object",
                "properties": {
                  "id": {
                    "id": "retail_bap_select_message_37",
                    "type": "string",
                    "optional": true,
                    "minLength": 1
                  },
                  "person": {
                    "id": "retail_bap_select_message_38",
                    "type": "object",
                    "optional": true,
                    "properties": {
                      "creds": {
                        "id": "retail_bap_select_message_39",
                        "type": "array",
                        "minItems": 1,
                        "element": {
                          "id": "retail_bap_select_message_40",
                          "type": "object",
                          "properties": {
                            "id": {
                              "id": "retail_bap_select_message_41",
                              "type": "string",
                              "minLength": 1
                            },
                            "type": {
                              "id": "retail_bap_select_message_42",
                              "type": "string",
                              "minLength": 1
                            }
                          },
                          "required": ["id", "type"]
                        }
                      }
                    },
                  },
                  "organization": {
                    "id": "retail_bap_select_message_43",
                    "type": "object",
                    "optional": true,
                    "properties": {
                      "descriptor": {
                        "id": "retail_bap_select_message_44",
                        "type": "object",
                        "properties": {
                          "name": {
                            "id": "retail_bap_select_message_45",
                            "type": "string",
                            "minLength": 1
                          }
                        },
                        "required": ["name"]
                      },
                      "address": {
                        "id": "retail_bap_select_message_46",
                        "optional": true,
                        "type": "string",
                        "minLength": 1
                      },
                      "city": {
                        "id": "retail_bap_select_message_47",
                        "type": "object",
                        "properties": {
                          "code": {
                            "id": "retail_bap_select_message_48",
                            "type": "string",
                            "minLength": 1
                          }
                        },
                        "required": ["code"]
                      },
                      "state": {
                        "id": "retail_bap_select_message_49",
                        "type": "object",
                        "properties": {
                          "code": {
                            "id": "retail_bap_select_message_50",
                            "type": "string",
                            "minLength": 1
                          }
                        },
                        "required": ["code"]
                      }
                    },
                  },
                  "contact": {
                    "id": "retail_bap_select_message_51",
                    "type": "object",
                    "optional": true,
                    "properties": {
                      "phone": {
                        "id": "retail_bap_select_message_52",
                        "type": "string",
                        "minLength": 1
                      },
                      "email": {
                        "id": "retail_bap_select_message_53",
                        "type": "string",
                        "optional": true,
                        "minLength": 1
                      }
                    },
                    "required": ["phone", "email"]
                  }
                },
              },

              "end": {
                "id": "retail_bap_select_message_16",
                "type": "object",
                "properties": {
                  "location": {
                    "id": "retail_bap_select_message_17",
                    "type": "object",
                    "properties": {
                      "gps": {
                        "id": "retail_bap_select_message_18",
                        "type": "string",
                        "minLength": 1,
                        "pattern": "^-?\\d{1,3}\\.\\d+,-?\\d{1,3}\\.\\d+$",
                        "errorMessage": "GPS must be in 'lat,lng' format."
                      },
                      "address": {
                        "id": "retail_bap_select_message_19",
                        "type": "object",
                        "properties": {
                          "area_code": {
                            "id": "retail_bap_select_message_20",
                            "type": "string",
                            "minLength": 1
                          }
                        },
                        "required": ["area_code"]
                      }
                    },
                    "required": ["gps", "address"]
                  }
                },
                "required": ["location"]
              }
            },
            "required": ["customer", "end"]
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
                  "type": "params",
                  "flow": {
                    "const": ["RET_11B_EB2B", "RET_11_EB2B"]
                  }
                }
              },
              "then": ["provider", "items", "fulfillments", "offers"]
            },
            {
              "if": {
                "properties": {
                  "type": "params",
                  "action": {
                    "const": "select"
                  }
                }
              },
              "then": ["provider", "items", "fulfillments"]
            }
          ]
        }
      }
    }
  }
};
