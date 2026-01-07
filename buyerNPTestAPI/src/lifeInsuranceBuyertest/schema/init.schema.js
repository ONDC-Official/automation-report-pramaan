module.exports={
  "id": "LI_bap_init_message_01",
    "type": "object",
    "properties": {
      "order": {
        "id": "LI_bap_init_message_02",
        "type": "object",
        "properties": {
          "fulfillments": {
            "id": "LI_bap_init_message_03",
            "type": "array",
            "minItems": 1,
            "element": {
              "id": "LI_bap_init_message_04",
              "type": "object",
              "properties": {
                "state": {
                  "id": "LI_bap_init_message_05",
                  "type": "object",
                  "properties": {
                    "descriptor": {
                      "id": "LI_bap_init_message_06",
                      "type": "object",
                      "properties": {
                        "code": {
                          "id": "LI_bap_init_message_07",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    }
                  }
                },
                "customer": {
                  "id": "LI_bap_init_message_08",
                  "type": "object",
                  "properties": {
                    "contact": {
                      "id": "LI_bap_init_message_09",
                      "type": "object",
                      "properties": {
                        "email": {
                          "id": "LI_bap_init_message_10",
                          "type": "string",
                          "minLength": 1
                        },
                        "phone": {
                          "id": "LI_bap_init_message_11",
                          "type": "string",
                          "minLength": 1
                        }
                      }
                    },
                    "person": {
                      "id": "LI_bap_init_message_12",
                      "type": "object",
                      "properties": {
                        "name": {
                          "id": "LI_bap_init_message_13",
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
          "items": {
            "id": "LI_bap_init_message_14",
            "type": "array",
            "minItems": 1,
            "element": {
              "id": "LI_bap_init_message_15",
              "type": "object",
              "properties": {
                "add_ons": {
                  "id": "LI_bap_init_message_16",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "LI_bap_init_message_17",
                    "type": "object",
                    "properties": {
                      "id": {
                        "id": "LI_bap_init_message_18",
                        "type": "string",
                        "minLength": 1
                      },
                      "quantity": {
                        "id": "LI_bap_init_message_19",
                        "type": "object",
                        "properties": {
                          "selected": {
                            "id": "LI_bap_init_message_20",
                            "type": "object",
                            "properties": {
                              "count": {
                                "id": "LI_bap_init_message_21",
                                "type": "number"
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                },
                "id": {
                  "id": "LI_bap_init_message_22",
                  "type": "string",
                  "minLength": 1
                },
                "parent_item_id": {
                  "id": "LI_bap_init_message_23",
                  "type": "string",
                  "minLength": 1
                }
              }
            }
          },
          "provider": {
            "id": "LI_bap_init_message_24",
            "type": "object",
            "properties": {
              "id": {
                "id": "LI_bap_init_message_25",
                "type": "string",
                "minLength": 1
              }
            }
          },
        
          "tags": {
            "id": "LI_bap_init_message_31",
            "type": "array",
            "minItems": 1,
            "element": {
              "id": "LI_bap_init_message_32",
              "type": "object",
              "properties": {
                "descriptor": {
                  "id": "LI_bap_init_message_33",
                  "type": "object",
                  "properties": {
                    "code": {
                      "id": "LI_bap_init_message_34",
                      "type": "string",
                      "minLength": 1
                    },
                    "name": {
                      "id": "LI_bap_init_message_35",
                      "type": "string",
                      "minLength": 1
                    }
                  }
                },
                "display": {
                  "id": "LI_bap_init_message_36",
                  "type": "boolean"
                },
                "list": {
                  "id": "LI_bap_init_message_37",
                  "type": "array",
                  "minItems": 1,
                  "element": {
                    "id": "LI_bap_init_message_38",
                    "type": "object",
                    "properties": {
                      "descriptor": {
                        "id": "LI_bap_init_message_39",
                        "type": "object",
                        "properties": {
                          "code": {
                            "id": "LI_bap_init_message_40",
                            "type": "string",
                            "minLength": 1
                          }
                        }
                      },
                      "value": {
                        "id": "LI_bap_init_message_41",
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