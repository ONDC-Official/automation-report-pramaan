module.exports = {
  "id": "wc_log_bpp_on_update_message_01",
  "type": "object",
  "properties": {
    "order": {
      "id": "wc_log_bpp_on_update_message_02",
      "type": "object",
      "properties": {
        "id": {
          "id": "wc_log_bpp_on_update_message_03",
          "type": "string",
          "minLength": 1
        },

        "status": {
          "id": "wc_log_bpp_on_update_message_06",
          "type": "string",
          "minLength": 1
        },
        "provider": {
          "id": "wc_log_bpp_on_update_message_07",
          "type": "object",
          "properties": {
            "id": {
              "id": "wc_log_bpp_on_update_message_08",
              "type": "string",
              "minLength": 1
            },
            "descriptor": {
              "id": "wc_log_bpp_on_update_message_09",
              "type": "object",
              "properties": {
                "images": {
                  "id": "wc_log_bpp_on_update_message_10",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "wc_log_bpp_on_update_message_11",
                    "type": "object",
                    "properties": {
                      "size_type": {
                        "id": "wc_log_bpp_on_update_message_12",
                        "type": "string",
                        "minLength": 1
                      },
                      "url": {
                        "id": "wc_log_bpp_on_update_message_13",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  }
                },
                "long_desc": {
                  "id": "wc_log_bpp_on_update_message_14",
                  "type": "string",
                  "minLength": 1
                },
                "name": {
                  "id": "wc_log_bpp_on_update_message_15",
                  "type": "string",
                  "minLength": 1
                },
                "short_desc": {
                  "id": "wc_log_bpp_on_update_message_16",
                  "type": "string",
                  "minLength": 1
                }
              }
            },
            "tags": {
              "id": "wc_log_bpp_on_update_message_17",
              "type": "array",
              "minItems": 1,
              "element": {
                "id": "wc_log_bpp_on_update_message_18",
                "type": "object",
                "properties": {
                  "descriptor": {
                    "id": "wc_log_bpp_on_update_message_19",
                    "type": "object",
                    "properties": {
                      "code": {
                        "id": "wc_log_bpp_on_update_message_20",
                        "type": "string",
                        "minLength": 1
                      },
                      "name": {
                        "id": "wc_log_bpp_on_update_message_21",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  },
                  "list": {
                    "id": "wc_log_bpp_on_update_message_22",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                      "id": "wc_log_bpp_on_update_message_23",
                      "type": "object",
                      "properties": {
                        "descriptor": {
                          "id": "wc_log_bpp_on_update_message_24",
                          "type": "object",
                          "properties": {
                            "code": {
                              "id": "wc_log_bpp_on_update_message_25",
                              "type": "string",
                              "minLength": 1
                            },
                            "name": {
                              "id": "wc_log_bpp_on_update_message_26",
                              "type": "string",
                              "minLength": 1
                            }
                          }
                        },
                        "value": {
                          "id": "wc_log_bpp_on_update_message_27",
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
          "id": "wc_log_bpp_on_update_message_28",
          "type": "object",
          "properties": {
            "id": {
              "id": "wc_log_bpp_on_update_message_29",
              "type": "string",
              "minLength": 1
            },
            "price": {
              "id": "wc_log_bpp_on_update_message_30",
              "type": "object",
              "properties": {
                "currency": {
                  "id": "wc_log_bpp_on_update_message_31",
                  "type": "string",
                  "minLength": 1
                },
                "value": {
                  "id": "wc_log_bpp_on_update_message_32",
                  "type": "string",
                  "minLength": 1
                }
              }
            },
            "breakup": {
              "id": "wc_log_bpp_on_update_message_33",
              "type": "array",
              "minItems": 1,
              "element": {
                "id": "wc_log_bpp_on_update_message_34",
                "type": "object",
                "properties": {
                  "title": {
                    "id": "wc_log_bpp_on_update_message_35",
                    "type": "string",
                    "minLength": 1
                  },
                  "price": {
                    "id": "wc_log_bpp_on_update_message_36",
                    "type": "object",
                    "properties": {
                      "value": {
                        "id": "wc_log_bpp_on_update_message_37",
                        "type": "string",
                        "minLength": 1
                      },
                      "currency": {
                        "id": "wc_log_bpp_on_update_message_38",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  }
                }
              }
            },
            "ttl": {
              "id": "wc_log_bpp_on_update_message_39",
              "type": "string",
              "minLength": 1
            }
          }
        },

        "cancellation_terms": {
          "id": "wc_log_bpp_on_update_message_78",
          "type": "array",
          "minItems": 1,
          "element": {
            "id": "wc_log_bpp_on_update_message_79",
            "type": "object",
            "properties": {
              "fulfillment_state": {
                "id": "wc_log_bpp_on_update_message_80",
                "type": "object",
                "properties": {
                  "descriptor": {
                    "id": "wc_log_bpp_on_update_message_81",
                    "type": "object",
                    "properties": {
                      "code": {
                        "id": "wc_log_bpp_on_update_message_82",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  }
                }
              },
              "cancellation_fee": {
                "id": "wc_log_bpp_on_update_message_83",
                "type": "object",
                "properties": {
                  "percentage": {
                    "id": "wc_log_bpp_on_update_message_84",
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              "external_ref": {
                "id": "wc_log_bpp_on_update_message_85",
                "type": "object",
                "properties": {
                  "mimetype": {
                    "id": "wc_log_bpp_on_update_message_86",
                    "type": "string",
                    "minLength": 1
                  },
                  "url": {
                    "id": "wc_log_bpp_on_update_message_87",
                    "type": "string",
                    "minLength": 1
                  }
                }
              }
            }
          }
        },
        "documents": {
          "id": "wc_log_bpp_on_update_message_88",
          "type": "array",
          "minItems": 1,
          "element": {
            "id": "wc_log_bpp_on_update_message_89",
            "type": "object",
            "properties": {
              "descriptor": {
                "id": "wc_log_bpp_on_update_message_90",
                "type": "object",
                "properties": {
                  "code": {
                    "id": "wc_log_bpp_on_update_message_91",
                    "type": "string",
                    "minLength": 1
                  },
                  "name": {
                    "id": "wc_log_bpp_on_update_message_92",
                    "type": "string",
                    "minLength": 1
                  },
                  "short_desc": {
                    "id": "wc_log_bpp_on_update_message_93",
                    "type": "string",
                    "minLength": 1
                  },
                  "long_desc": {
                    "id": "wc_log_bpp_on_update_message_94",
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              "mime_type": {
                "id": "wc_log_bpp_on_update_message_95",
                "type": "string",
                "minLength": 1
              },
              "url": {
                "id": "wc_log_bpp_on_update_message_96",
                "type": "string",
                "minLength": 1
              }
            }
          }
        },
        "tags": {
          "id": "wc_log_bpp_on_update_message_97",
          "type": "array",
          "minItems": 1,
          "element": {
            "id": "wc_log_bpp_on_update_message_98",
            "type": "object",
            "properties": {
              "display": {
                "id": "wc_log_bpp_on_update_message_99",
                "type": "boolean"
              },
              "descriptor": {
                "id": "wc_log_bpp_on_update_message_100",
                "type": "object",
                "properties": {
                  "name": {
                    "id": "wc_log_bpp_on_update_message_101",
                    "type": "string",
                    "minLength": 1
                  },
                  "code": {
                    "id": "wc_log_bpp_on_update_message_102",
                    "type": "string",
                    "minLength": 1
                  }
                }
              },
              "list": {
                "id": "wc_log_bpp_on_update_message_103",
                "type": "array",
                "minItems": 1,
                "element": {
                  "id": "wc_log_bpp_on_update_message_104",
                  "type": "object",
                  "properties": {
                    "descriptor": {
                      "id": "wc_log_bpp_on_update_message_105",
                      "type": "object",
                      "properties": {
                        "code": {
                          "id": "wc_log_bpp_on_update_message_106",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    },
                    "value": {
                      "id": "wc_log_bpp_on_update_message_107",
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
          "id": "wc_log_bpp_on_update_message_134",
          "type": "string",
          "minLength": 1
        },
        "updated_at": {
          "id": "wc_log_bpp_on_update_message_135",
          "type": "string",
          "minLength": 1
        }
      }
    }
  }
}