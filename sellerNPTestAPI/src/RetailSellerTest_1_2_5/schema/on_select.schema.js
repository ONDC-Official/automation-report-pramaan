
module.exports={
   "id": "retail_bpp_on_select_message_01",
      "type": "object",
      "properties": {
        "order": {
           "id": "retail_bpp_on_select_message_02",
          "type": "object",
          "properties": {
            "provider": {
               "id": "retail_bpp_on_select_message_03",
              "type": "object",
              "properties": {
                "id": {
                   "id": "retail_bpp_on_select_message_04",
                  "type": "string",
                  "minLength": 1
                },
                "locations": {
                   "id": "retail_bpp_on_select_message_05",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                     "id": "retail_bpp_on_select_message_06",
                    "type": "object",
                    "properties": {
                      "id": {
                         "id": "retail_bpp_on_select_message_07",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  }
                }
              }
            },
            "items": {
               "id": "retail_bpp_on_select_message_08",
              "type": "array",
              "minItems": 1,
              "element": {
                 "id": "retail_bpp_on_select_message_09",
                "type": "object",
                "properties": {
                  "fulfillment_id": {
                     "id": "retail_bpp_on_select_message_10",
                    "type": "string",
                    "minLength": 1
                  },
                  "id": {
                     "id": "retail_bpp_on_select_message_11",
                    "type": "string",
                    "minLength": 1
                  },
                  "parent_item_id": {
                    "id": "retail_bpp_on_select_message_147",
                    "type": "string",
                    "optional": true
                  },
                  "quantity": {
                    "id": "retail_bpp_on_select_message_148",
                    "type": "object",
                    "optional": true,
                    "properties": {
                      "count": {
                        "id": "retail_bpp_on_select_message_149",
                        "type": "number",
                        "optional": true
                      }
                    }
                  },
                  "tags": {
                    "id": "retail_bpp_on_select_message_150",
                    "type": "array",
                    "optional": true,
                    "minItems": 1,
                    "element": {
                      "id": "retail_bpp_on_select_message_151",
                      "type": "object",
                      "properties": {
                        "code": {
                          "id": "retail_bpp_on_select_message_152",
                          "type": "string",
                          "enums": ["parent", "type"]
                        },
                        "list": {
                          "id": "retail_bpp_on_select_message_153",
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
                                  "id": "retail_bpp_on_select_message_154",
                                  "type": "object",
                                  "properties": {
                                    "code": {
                                      "id": "retail_bpp_on_select_message_155",
                                      "type": "string",
                                      "enum": ["type"]
                                    },
                                    "value": {
                                      "id": "retail_bpp_on_select_message_156",
                                      "type": "string",
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
                                  "id": "retail_bpp_on_select_message_157",
                                  "type": "object",
                                  "properties": {
                                    "code": {
                                      "id": "retail_bpp_on_select_message_158",
                                      "type": "string",
                                      "enum": ["id"]
                                    },
                                    "value": {
                                      "id": "retail_bpp_on_select_message_159",
                                      "type": "string"
                                    }
                                  }
                                }
                              }
                            ]
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
                            "type": "params",
                            "domain": {
                              "const": [
                                "ONDC:RET10",
                                "ONDC:RET12",
                                "ONDC:RET13",
                                "ONDC:RET14",
                                "ONDC:RET15",
                                "ONDC:RET16",
                                "ONDC:RET17",
                                "ONDC:RET18",
                                "ONDC:RET19",
                                "ONDC:RET1A",
                                "ONDC:RET1B",
                                "ONDC:RET1C",
                                "ONDC:RET1D"
                              ]
                            }
                          }
                        },
                        "then": [
                          "id",
                          "fulfillment_id"
                        ]
                      },
                      {
                        "if": {
                          "properties": {
                            "type": "params",
                            "domain": {
                              "const": [
                                "ONDC:RET11"
                              ]
                            }
                          }
                        },
                        "then": [
                          "id",
                          "fulfillment_id",
                          "parent_item_id",
                          "tags"
                        ]
                      }
                    ]
                  }
                }
              }
            },
            "fulfillments": {
               "id": "retail_bpp_on_select_message_12",
              "type": "array",
              "minItems": 1,
              "element": {
                 "id": "retail_bpp_on_select_message_13",
                "type": "object",
                "properties": {
                  "id": {
                     "id": "retail_bpp_on_select_message_14",
                    "type": "string",
                    "minLength": 1
                  },
                  "type": {
                     "id": "retail_bpp_on_select_message_15",
                    "type": "string",
                    "minLength": 1
                  },
                  "@ondc/org/provider_name": {
                     "id": "retail_bpp_on_select_message_16",
                    "type": "string",
                    "minLength": 1
                  },
                  "tracking": {
                     "id": "retail_bpp_on_select_message_17",
                    "type": "boolean"
                  },
                  "@ondc/org/category": {
                     "id": "retail_bpp_on_select_message_18",
                    "type": "string",
                    "minLength": 1
                  },
                  "@ondc/org/TAT": {
                     "id": "retail_bpp_on_select_message_19",
                    "type": "string",
                    "minLength": 1
                  },
                  "state": {
                     "id": "retail_bpp_on_select_message_20",
                    "type": "object",
                    "properties": {
                      "descriptor": {
                         "id": "retail_bpp_on_select_message_21",
                        "type": "object",
                        "properties": {
                          "code": {
                             "id": "retail_bpp_on_select_message_22",
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
            "quote": {
               "id": "retail_bpp_on_select_message_23",
              "type": "object",
              "properties": {
                "price": {
                   "id": "retail_bpp_on_select_message_24",
                  "type": "object",
                  "properties": {
                    "currency": {
                       "id": "retail_bpp_on_select_message_25",
                      "type": "string",
                      "minLength": 1
                    },
                    "value": {
                       "id": "retail_bpp_on_select_message_26",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "breakup": {
                   "id": "retail_bpp_on_select_message_27",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                     "id": "retail_bpp_on_select_message_28",
                    "type": "object",
                    "properties": {
                      "@ondc/org/item_id": {
                         "id": "retail_bpp_on_select_message_29",
                        "type": "string",
                        "minLength": 1
                      },
                      "@ondc/org/item_quantity": {
                         "id": "retail_bpp_on_select_message_30",
                        "type": "object",
                        "optional": true,
                        "properties": {
                          "count": {
                             "id": "retail_bpp_on_select_message_31",
                            "type": "number"
                          }
                        }
                      },
                      "title": {
                         "id": "retail_bpp_on_select_message_32",
                        "type": "string",
                        "minLength": 1
                      },
                      "@ondc/org/title_type": {
                         "id": "retail_bpp_on_select_message_33",
                        "type": "string",
                        "minLength": 1,
                        "passKeysToParams": ["@ondc/org/title_type"]
                      },
                      "price": {
                         "id": "retail_bpp_on_select_message_34",
                        "type": "object",
                        "properties": {
                          "currency": {
                             "id": "retail_bpp_on_select_message_35",
                            "type": "string",
                            "minLength": 1
                          },
                          "value": {
                             "id": "retail_bpp_on_select_message_36",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "item": {
                         "id": "retail_bpp_on_select_message_37",
                        "type": "object",
                        "optional": true,
                        "properties": {
                          "parent_item_id": {
                            "id": "retail_bpp_on_select_message_160",
                            "type": "string",
                            "optional": true
                          },
                          "quantity": {
                             "id": "retail_bpp_on_select_message_38",
                            "type": "object",
                            "optional": true,
                            "properties": {
                              "available": {
                                 "id": "retail_bpp_on_select_message_39",
                                "type": "object",
                                "properties": {
                                  "count": {
                                     "id": "retail_bpp_on_select_message_40",
                                    "type": "string",
                                    "minLength": 1
                                  }
                                }
                              },
                              "maximum": {
                                "id": "retail_bpp_on_select_message_41",
                                "type": "object",
                                "properties": {
                                  "count": {
                                    "id": "retail_bpp_on_select_message_42",
                                    "type": "string",
                                    "minLength": 1
                                  }
                                }
                              }
                            }
                          },
                          "price": {
                            "id": "retail_bpp_on_select_message_43",
                            "type": "object",
                            "optional": true,
                            "properties": {
                              "currency": {
                                "id": "retail_bpp_on_select_message_44",
                                "type": "string",
                                "minLength": 1
                              },
                              "value": {
                                "id": "retail_bpp_on_select_message_45",
                                "type": "string",
                                "minLength": 1
                              }
                            }
                          },
                          "tags": {
                            "id": "retail_bpp_on_select_message_161",
                            "type": "array",
                            "optional": true,
                            "element": {
                              "id": "retail_bpp_on_select_message_162",
                              "type": "object",
                              "properties": {
                                "code": {
                                  "id": "retail_bpp_on_select_message_163",
                                  "type": "string",
                                  "enum": [
                                    "type",
                                    "parent",
                                    "child",
                                    "origin",
                                    "veg_nonveg",
                                    "custom_group",
                                    "quote"
                                  ]
                                },
                                "list": {
                                  "id": "retail_bpp_on_select_message_164",
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
                                          "type": "object",
                                          "properties": {
                                            "code": {
                                              "id": "retail_bpp_on_select_message_165",
                                              "type": "string",
                                              "enum": ["type"]
                                            },
                                            "value": {
                                              "id": "retail_bpp_on_select_message_166",
                                              "type": "string",
                                              "enum": ["item", "customization", "fulfillment"]
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
                                          "type": "object",
                                          "properties": {
                                            "code": {
                                              "id": "retail_bpp_on_select_message_167",
                                              "type": "string",
                                              "enum": ["id"]
                                            },
                                            "value": {
                                              "id": "retail_bpp_on_select_message_168",
                                              "type": "string"
                                            }
                                          }
                                        }
                                      },
                                      {
                                        "if": {
                                          "properties": {
                                            "code": {
                                              "const": "country"
                                            }
                                          }
                                        },
                                        "then": {
                                          "type": "object",
                                          "properties": {
                                            "code": {
                                              "id": "retail_bpp_on_select_message_169",
                                              "type": "string",
                                              "enum": ["country"]
                                            },
                                            "value": {
                                              "id": "retail_bpp_on_select_message_170",
                                              "type": "string",
                                              "pattern": "^[A-Z]{3}$", "minLength": 1, "errorMessage": "Country must be in ISO 3166-1 format (three-letter country code)"
                                            }
                                          }
                                        }
                                      },
                                      {
                                        "if": {
                                          "properties": {
                                            "code": {
                                              "const": "veg"
                                            }
                                          }
                                        },
                                        "then": {
                                          "type": "object",
                                          "properties": {
                                            "code": {
                                              "id": "retail_bpp_on_select_message_171",
                                              "type": "string",
                                              "enum": ["veg"]
                                            },
                                            "value": {
                                              "id": "retail_bpp_on_select_message_172",
                                              "type": "string",
                                              "enum": ["yes", "no"]
                                            }
                                          }
                                        }
                                      },
                                      {
                                        "if": {
                                          "properties": {
                                            "code": {
                                              "const": "default"
                                            }
                                          }
                                        },
                                        "then": {
                                          "type": "object",
                                          "properties": {
                                            "code": {
                                              "id": "retail_bpp_on_select_message_173",
                                              "type": "string",
                                              "enum": ["default"]
                                            },
                                            "value": {
                                              "id": "retail_bpp_on_select_message_174",
                                              "type": "string",
                                              "enum": ["yes", "no"]
                                            }
                                          }
                                        }
                                      }
                                    ]
                                  }
                                }
                              },
                              "required": [
                                "code",
                                "list"
                              ],
                              "additionalProperties": false
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
                                    "@ondc/org/title_type": {
                                      "const": "item"
                                    },
                                    "domain": {
                                      "const": [
                                        "ONDC:RET11"
                                      ]
                                    }
                                  }
                                },
                                "then": [
                                  "parent_item_id",
                                  "quantity",
                                  "price",
                                  "tags"
                                ]
                              },
                              {
                                "if": {
                                  "properties": {
                                    "type": "params",
                                    "@ondc/org/title_type": {
                                      "const": "item"
                                    },
                                    "domain": {
                                      "const": [
                                        "ONDC:RET10",
                                        "ONDC:RET12",
                                        "ONDC:RET13",
                                        "ONDC:RET14",
                                        "ONDC:RET15",
                                        "ONDC:RET16",
                                        "ONDC:RET17",
                                        "ONDC:RET18",
                                        "ONDC:RET19",
                                        "ONDC:RET1A",
                                        "ONDC:RET1B",
                                        "ONDC:RET1C",
                                        "ONDC:RET1D"
                                      ]
                                    }
                                  }
                                },
                                "then": [
                                  "quantity",
                                  "price"
                                ]
                              }
                            ]
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
                                                        "@ondc/org/title_type": {
                                                            "const": "item"
                                                        }
                                                    }
                                                },
                                                "then": [
                                                    "@ondc/org/item_id",
                                                    "title",
                                                    "@ondc/org/item_quantity",
                                                    "@ondc/org/title_type",
                                                    "price",
                                                    "item"
                                                ]
                                            },
                                            {
                                                "if": {
                                                    "properties": {
                                                        "@ondc/org/title_type": {
                                                            "const": "delivery"
                                                        }
                                                    }
                                                },
                                                "then": [
                                                    "@ondc/org/item_id",
                                                    "@ondc/org/title_type",
                                                    "title",
                                                    "price"
                                                ]
                                            },
                                            {
                                                "if": {
                                                    "properties": {
                                                        "@ondc/org/title_type": {
                                                            "const": ["packing", "misc", "tax"]
                                                        }
                                                    }
                                                },
                                                "then": [
                                                    "@ondc/org/item_id",
                                                    "@ondc/org/title_type",
                                                    "title",
                                                    "price",
                                                ]
                                            },
                                            {
                                                "if": {
                                                    "properties": {
                                                        "@ondc/org/title_type": {
                                                            "const": ["tax"]
                                                        }
                                                    }
                                                },
                                                "then": [
                                                    "@ondc/org/item_id",
                                                    "@ondc/org/title_type",
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
                  "id": "retail_bpp_on_select_message_46",
                  "type": "string",
                  "minLength": 1
                }
              }
            }
          }
        }
      }
    }