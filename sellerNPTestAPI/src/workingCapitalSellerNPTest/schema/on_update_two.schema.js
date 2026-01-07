module.exports =  {
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
              "id": "wc_log_bpp_on_update_message_04",
              "type": "string",
              "minLength": 1
            },
            "provider": {
              "id": "wc_log_bpp_on_update_message_05",
              "type": "object",
              "properties": {
                "id": {
                  "id": "wc_log_bpp_on_update_message_06",
                  "type": "string",
                  "minLength": 1
                },
                "descriptor": {
                  "id": "wc_log_bpp_on_update_message_07",
                  "type": "object",
                  "properties": {
                    "images": {
                      "id": "wc_log_bpp_on_update_message_08",
                      "type": "array",
                      "minItems": 1,
                      "element": {
                        "id": "wc_log_bpp_on_update_message_09",
                        "type": "object",
                        "properties": {
                          "size_type": {
                            "id": "wc_log_bpp_on_update_message_10",
                            "type": "string",
                            "minLength": 1
                          },
                          "url": {
                            "id": "wc_log_bpp_on_update_message_11",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      }
                    },
                    "long_desc": {
                      "id": "wc_log_bpp_on_update_message_12",
                      "type": "string",
                      "minLength": 1
                    },
                    "name": {
                      "id": "wc_log_bpp_on_update_message_13",
                      "type": "string",
                      "minLength": 1
                    },
                    "short_desc": {
                      "id": "wc_log_bpp_on_update_message_14",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "tags": {
                  "id": "wc_log_bpp_on_update_message_15",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "wc_log_bpp_on_update_message_16",
                    "type": "object",
                    "properties": {
                      "descriptor": {
                        "id": "wc_log_bpp_on_update_message_17",
                        "type": "object",
                        "properties": {
                          "code": {
                            "id": "wc_log_bpp_on_update_message_18",
                            "type": "string",
                            "minLength": 1
                          },
                          "name": {
                            "id": "wc_log_bpp_on_update_message_19",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "list": {
                        "id": "wc_log_bpp_on_update_message_20",
                        "type": "array",
                        "minItems": 1,
                        "element": {
                          "id": "wc_log_bpp_on_update_message_21",
                          "type": "object",
                          "properties": {
                            "descriptor": {
                              "id": "wc_log_bpp_on_update_message_22",
                              "type": "object",
                              "properties": {
                                "code": {
                                  "id": "wc_log_bpp_on_update_message_23",
                                  "type": "string",
                                  "minLength": 1
                                },
                                "name": {
                                  "id": "wc_log_bpp_on_update_message_24",
                                  "type": "string",
                                  "minLength": 1
                                }
                              }
                            },
                            "value": {
                              "id": "wc_log_bpp_on_update_message_25",
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
              "id": "wc_log_bpp_on_update_message_26",
              "type": "object",
              "properties": {
                "id": {
                  "id": "wc_log_bpp_on_update_message_27",
                  "type": "string",
                  "minLength": 1
                },
                "price": {
                  "id": "wc_log_bpp_on_update_message_28",
                  "type": "object",
                  "properties": {
                    "currency": {
                      "id": "wc_log_bpp_on_update_message_29",
                      "type": "string",
                      "minLength": 1
                    },
                    "value": {
                      "id": "wc_log_bpp_on_update_message_30",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "breakup": {
                  "id": "wc_log_bpp_on_update_message_31",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "wc_log_bpp_on_update_message_32",
                    "type": "object",
                    "properties": {
                      "title": {
                        "id": "wc_log_bpp_on_update_message_33",
                        "type": "string",
                        "minLength": 1
                      },
                      "price": {
                        "id": "wc_log_bpp_on_update_message_34",
                        "type": "object",
                        "properties": {
                          "value": {
                            "id": "wc_log_bpp_on_update_message_35",
                            "type": "string",
                            "minLength": 1
                          },
                          "currency": {
                            "id": "wc_log_bpp_on_update_message_36",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      }
                    }
                  }
                },
                "ttl": {
                  "id": "wc_log_bpp_on_update_message_37",
                  "type": "string",
                  "minLength": 1
                }
              }
            },
            
            "documents": {
              "id": "wc_log_bpp_on_update_message_38",
              "type": "array",
              "minItems": 1,
              "element": {
                "id": "wc_log_bpp_on_update_message_39",
                "type": "object",
                "properties": {
                  "descriptor": {
                    "id": "wc_log_bpp_on_update_message_40",
                    "type": "object",
                    "properties": {
                      "code": {
                        "id": "wc_log_bpp_on_update_message_41",
                        "type": "string",
                        "minLength": 1
                      },
                      "name": {
                        "id": "wc_log_bpp_on_update_message_42",
                        "type": "string",
                        "minLength": 1
                      },
                      "short_desc": {
                        "id": "wc_log_bpp_on_update_message_43",
                        "type": "string",
                        "minLength": 1
                      },
                      "long_desc": {
                        "id": "wc_log_bpp_on_update_message_44",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  },
                  "mime_type": {
                    "id": "wc_log_bpp_on_update_message_45",
                    "type": "string",
                    "minLength": 1
                  },
                  "url": {
                    "id": "wc_log_bpp_on_update_message_46",
                    "type": "string",
                    "minLength": 1
                  }
                }
              }
            },
            "tags": {
              "id": "wc_log_bpp_on_update_message_47",
              "type": "array",
              "minItems": 1,
              "element": {
                "id": "wc_log_bpp_on_update_message_48",
                "type": "object",
                "properties": {
                  "display": {
                    "id": "wc_log_bpp_on_update_message_49",
                    "type": "boolean"
                  },
                  "descriptor": {
                    "id": "wc_log_bpp_on_update_message_50",
                    "type": "object",
                    "properties": {
                      "name": {
                        "id": "wc_log_bpp_on_update_message_51",
                        "type": "string",
                        "minLength": 1
                      },
                      "code": {
                        "id": "wc_log_bpp_on_update_message_52",
                        "type": "string",
                        "minLength": 1
                      }
                    }
                  },
                  "list": {
                    "id": "wc_log_bpp_on_update_message_53",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                      "id": "wc_log_bpp_on_update_message_54",
                      "type": "object",
                      "properties": {
                        "descriptor": {
                          "id": "wc_log_bpp_on_update_message_55",
                          "type": "object",
                          "properties": {
                            "code": {
                              "id": "wc_log_bpp_on_update_message_56",
                              "type": "string",
                              "minLength": 1
                            }
                          }
                        },
                        "value": {
                          "id": "wc_log_bpp_on_update_message_57",
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
              "id": "wc_log_bpp_on_update_message_58",
              "type": "string",
              "minLength": 1
            },
            "updated_at": {
              "id": "wc_log_bpp_on_update_message_59",
              "type": "string",
              "minLength": 1
            }
          }
        }
      }
  }