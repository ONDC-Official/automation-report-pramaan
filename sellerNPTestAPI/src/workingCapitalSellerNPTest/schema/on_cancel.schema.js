module.exports = {
  id: "wc_log_bpp_on_cancel_message_01",
  type: "object",
  properties: {
    order: {
      id: "wc_log_bpp_on_cancel_message_02",
      type: "object",
      properties: {
        id: {
          id: "wc_log_bpp_on_cancel_message_03",
          type: "string",
          minLength: 1,
        },
        status: {
          id: "wc_log_bpp_on_cancel_message_04",
          type: "string",
          minLength: 1,
        },
        provider: {
          id: "wc_log_bpp_on_cancel_message_05",
          type: "object",
          properties: {
            id: {
              id: "wc_log_bpp_on_cancel_message_06",
              type: "string",
              minLength: 1,
            },
            descriptor: {
              id: "wc_log_bpp_on_cancel_message_07",
              type: "object",
              properties: {
                images: {
                  id: "wc_log_bpp_on_cancel_message_08",
                  type: "array",
                  minItems: 1,
                  element: {
                    id: "wc_log_bpp_on_cancel_message_09",
                    type: "object",
                    properties: {
                      size_type: {
                        id: "wc_log_bpp_on_cancel_message_10",
                        type: "string",
                        minLength: 1,
                      },
                      url: {
                        id: "wc_log_bpp_on_cancel_message_11",
                        type: "string",
                        minLength: 1,
                      },
                    },
                  },
                },
                long_desc: {
                  id: "wc_log_bpp_on_cancel_message_12",
                  type: "string",
                  minLength: 1,
                },
                name: {
                  id: "wc_log_bpp_on_cancel_message_13",
                  type: "string",
                  minLength: 1,
                },
                short_desc: {
                  id: "wc_log_bpp_on_cancel_message_14",
                  type: "string",
                  minLength: 1,
                },
              },
            },
            tags: {
              id: "wc_log_bpp_on_cancel_message_15",
              type: "array",
              minItems: 1,
              element: {
                id: "wc_log_bpp_on_cancel_message_16",
                type: "object",
                properties: {
                  descriptor: {
                    id: "wc_log_bpp_on_cancel_message_17",
                    type: "object",
                    properties: {
                      code: {
                        id: "wc_log_bpp_on_cancel_message_18",
                        type: "string",
                        minLength: 1,
                      },
                      name: {
                        id: "wc_log_bpp_on_cancel_message_19",
                        type: "string",
                        minLength: 1,
                      },
                    },
                  },
                  list: {
                    id: "wc_log_bpp_on_cancel_message_20",
                    type: "array",
                    minItems: 1,
                    element: {
                      id: "wc_log_bpp_on_cancel_message_21",
                      type: "object",
                      properties: {
                        descriptor: {
                          id: "wc_log_bpp_on_cancel_message_22",
                          type: "object",
                          properties: {
                            code: {
                              id: "wc_log_bpp_on_cancel_message_23",
                              type: "string",
                              minLength: 1,
                            },
                            name: {
                              id: "wc_log_bpp_on_cancel_message_24",
                              type: "string",
                              minLength: 1,
                            },
                          },
                        },
                        value: {
                          id: "wc_log_bpp_on_cancel_message_25",
                          type: "string",
                          minLength: 1,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        quote: {
          id: "wc_log_bpp_on_cancel_message_26",
          type: "object",
          properties: {
            id: {
              id: "wc_log_bpp_on_cancel_message_27",
              type: "string",
              minLength: 1,
            },
            price: {
              id: "wc_log_bpp_on_cancel_message_28",
              type: "object",
              properties: {
                currency: {
                  id: "wc_log_bpp_on_cancel_message_29",
                  type: "string",
                  minLength: 1,
                },
                value: {
                  id: "wc_log_bpp_on_cancel_message_30",
                  type: "string",
                  minLength: 1,
                },
              },
            },
            breakup: {
              id: "wc_log_bpp_on_cancel_message_31",
              type: "array",
              minItems: 1,
              element: {
                id: "wc_log_bpp_on_cancel_message_32",
                type: "object",
                properties: {
                  title: {
                    id: "wc_log_bpp_on_cancel_message_33",
                    type: "string",
                    minLength: 1,
                  },
                  price: {
                    id: "wc_log_bpp_on_cancel_message_34",
                    type: "object",
                    properties: {
                      value: {
                        id: "wc_log_bpp_on_cancel_message_35",
                        type: "string",
                        minLength: 1,
                      },
                      currency: {
                        id: "wc_log_bpp_on_cancel_message_36",
                        type: "string",
                        minLength: 1,
                      },
                    },
                  },
                },
              },
            },
            ttl: {
              id: "wc_log_bpp_on_cancel_message_37",
              type: "string",
              minLength: 1,
            },
          },
        },
        items: {
          id: "wc_log_bpp_on_cancel_message_38",
          type: "array",
          minItems: 1,
          element: {
            id: "wc_log_bpp_on_cancel_message_39",
            type: "object",
            properties: {
              id: {
                id: "wc_log_bpp_on_cancel_message_40",
                type: "string",
                minLength: 1,
              },
              parent_item_id: {
                id: "wc_log_bpp_on_cancel_message_41",
                type: "string",
                minLength: 1,
              },
              descriptor: {
                id: "wc_log_bpp_on_cancel_message_42",
                type: "object",
                properties: {
                  code: {
                    id: "wc_log_bpp_on_cancel_message_43",
                    type: "string",
                    minLength: 1,
                  },
                  name: {
                    id: "wc_log_bpp_on_cancel_message_44",
                    type: "string",
                    minLength: 1,
                  },
                },
              },
              category_ids: {
                id: "wc_log_bpp_on_cancel_message_45",
                type: "array",
                minItems: 1,
                element: {
                  id: "wc_log_bpp_on_cancel_message_46",
                  type: "string",
                  minLength: 1,
                },
              },
              fulfillment_ids: {
                id: "wc_log_bpp_on_cancel_message_47",
                type: "array",
                minItems: 1,
                element: {
                  id: "wc_log_bpp_on_cancel_message_48",
                  type: "string",
                  minLength: 1,
                },
              },
              price: {
                id: "wc_log_bpp_on_cancel_message_49",
                type: "object",
                properties: {
                  currency: {
                    id: "wc_log_bpp_on_cancel_message_50",
                    type: "string",
                    minLength: 1,
                  },
                  value: {
                    id: "wc_log_bpp_on_cancel_message_51",
                    type: "string",
                    minLength: 1,
                  },
                },
              },
              tags: {
                id: "wc_log_bpp_on_cancel_message_52",
                type: "array",
                minItems: 1,
                element: {
                  "id": "wc_log_bpp_on_cancel_message_53",
                  type: "object",
                  properties: {
                    descriptor: {
                       "id": "wc_log_bpp_on_cancel_message_54",
                      type: "object",
                      properties: {
                        code: {
                           "id": "wc_log_bpp_on_cancel_message_55",
                          type: "string",
                          minLength: 1,
                        },
                        name: {
                           "id": "wc_log_bpp_on_cancel_message_56",
                          type: "string",
                          minLength: 1,
                        },
                      },
                    },
                    list: {
                       "id": "wc_log_bpp_on_cancel_message_57",
                      type: "array",
                      minItems: 1,
                      element: {
                         "id": "wc_log_bpp_on_cancel_message_58",
                        type: "object",
                        properties: {
                          descriptor: {
                             "id": "wc_log_bpp_on_cancel_message_59",
                            type: "object",
                            properties: {
                              code: {
                                 "id": "wc_log_bpp_on_cancel_message_60",
                                type: "string",
                                minLength: 1,
                              },
                              name: {
                                 "id": "wc_log_bpp_on_cancel_message_61",
                                type: "string",
                                minLength: 1,
                              },
                            },
                          },
                          value: {
                             "id": "wc_log_bpp_on_cancel_message_62",
                            type: "string",
                            minLength: 1,
                          },
                        },
                      },
                    },
                    display: {
                       "id": "wc_log_bpp_on_cancel_message_63",
                      type: "boolean",
                    },
                  },
                },
              },
            },
          },
        },
        payments: {
           "id": "wc_log_bpp_on_cancel_message_64",
          type: "array",
          minItems: 1,
          element: {
             "id": "wc_log_bpp_on_cancel_message_65",
            type: "object",
            properties: {
              id: {
                 "id": "wc_log_bpp_on_cancel_message_66",
                type: "string",
                minLength: 1,
              },
              collected_by: {
                 "id": "wc_log_bpp_on_cancel_message_67",
                type: "string",
                minLength: 1,
              },
              params: {
                 "id": "wc_log_bpp_on_cancel_message_68",
                type: "object",
                properties: {
                  amount: {
                     "id": "wc_log_bpp_on_cancel_message_69",
                    type: "string",
                    minLength: 1,
                  },
                  currency: {
                     "id": "wc_log_bpp_on_cancel_message_70",
                    type: "string",
                    minLength: 1,
                  },
                },
              },
              status: {
                 "id": "wc_log_bpp_on_cancel_message_71",
                type: "string",
                minLength: 1,
              },
              type: {
                 "id": "wc_log_bpp_on_cancel_message_72",
                type: "string",
                minLength: 1,
              },
            },
          },
        },
        cancellation_terms: {
           "id": "wc_log_bpp_on_cancel_message_73",
          type: "array",
          minItems: 1,
          element: {
             "id": "wc_log_bpp_on_cancel_message_74",
            type: "object",
            properties: {
              fulfillment_state: {
                 "id": "wc_log_bpp_on_cancel_message_75",
                type: "object",
                properties: {
                  descriptor: {
                     "id": "wc_log_bpp_on_cancel_message_76",
                    type: "object",
                    properties: {
                      code: {
                         "id": "wc_log_bpp_on_cancel_message_77",
                        type: "string",
                        minLength: 1,
                      },
                    },
                  },
                },
              },
              cancellation_fee: {
                 "id": "wc_log_bpp_on_cancel_message_78",
                type: "object",
                properties: {
                  percentage: {
                     "id": "wc_log_bpp_on_cancel_message_79",
                    type: "string",
                    minLength: 1,
                  },
                },
              },
            },
          },
        },
        documents: {
           "id": "wc_log_bpp_on_cancel_message_80",
          type: "array",
          minItems: 1,
          element: {
             "id": "wc_log_bpp_on_cancel_message_81",
            type: "object",
            properties: {
              descriptor: {
                 "id": "wc_log_bpp_on_cancel_message_82",
                type: "object",
                properties: {
                  code: {
                     "id": "wc_log_bpp_on_cancel_message_83",
                    type: "string",
                    minLength: 1,
                  },
                  name: {
                     "id": "wc_log_bpp_on_cancel_message_84",
                    type: "string",
                    minLength: 1,
                  },
                  short_desc: {
                     "id": "wc_log_bpp_on_cancel_message_85",
                    type: "string",
                    minLength: 1,
                  },
                  long_desc: {
                     "id": "wc_log_bpp_on_cancel_message_86",
                    type: "string",
                    minLength: 1,
                  },
                },
              },
              mime_type: {
                 "id": "wc_log_bpp_on_cancel_message_87",
                type: "string",
                minLength: 1,
              },
              url: {
                 "id": "wc_log_bpp_on_cancel_message_88",
                type: "string",
                minLength: 1,
              },
            },
          },
        },
        tags: {
           "id": "wc_log_bpp_on_cancel_message_89",
          type: "array",
          minItems: 1,
          element: {
             "id": "wc_log_bpp_on_cancel_message_90",
            type: "object",
            properties: {
              display: {
                 "id": "wc_log_bpp_on_cancel_message_91",
                type: "boolean",
              },
              descriptor: {
                 "id": "wc_log_bpp_on_cancel_message_92",
                type: "object",
                properties: {
                  name: {
                     "id": "wc_log_bpp_on_cancel_message_93",
                    type: "string",
                    minLength: 1,
                  },
                  code: {
                     "id": "wc_log_bpp_on_cancel_message_94",
                    type: "string",
                    minLength: 1,
                  },
                },
              },
              list: {
                 "id": "wc_log_bpp_on_cancel_message_95",
                type: "array",
                minItems: 1,
                element: {
                   "id": "wc_log_bpp_on_cancel_message_96",
                  type: "object",
                  properties: {
                    descriptor: {
                       "id": "wc_log_bpp_on_cancel_message_97",
                      type: "object",
                      properties: {
                        code: {
                           "id": "wc_log_bpp_on_cancel_message_98",
                          type: "string",
                          minLength: 1,
                        },
                      },
                    },
                    value: {
                       "id": "wc_log_bpp_on_cancel_message_99",
                      type: "string",
                      minLength: 1,
                    },
                  },
                },
              },
            },
          },
        },
        fulfillments: {
           "id": "wc_log_bpp_on_cancel_message_100",
          type: "array",
          minItems: 1,
          element: {
             "id": "wc_log_bpp_on_cancel_message_101",
            type: "object",
            properties: {
              id: {
                 "id": "wc_log_bpp_on_cancel_message_102",
                type: "string",
                minLength: 1,
              },
              customer: {
                 "id": "wc_log_bpp_on_cancel_message_103",
                type: "object",
                properties: {
                  person: {
                     "id": "wc_log_bpp_on_cancel_message_104",
                    type: "object",
                    properties: {
                      name: {
                         "id": "wc_log_bpp_on_cancel_message_105",
                        type: "string",
                        minLength: 1,
                      },
                      dob: {
                         "id": "wc_log_bpp_on_cancel_message_106",
                        type: "string",
                        minLength: 1,
                      },
                      gender: {
                         "id": "wc_log_bpp_on_cancel_message_107",
                        type: "string",
                        minLength: 1,
                      },
                      creds: {
                         "id": "wc_log_bpp_on_cancel_message_108",
                        type: "array",
                        minItems: 1,
                        element: {
                           "id": "wc_log_bpp_on_cancel_message_109",
                          type: "object",
                          properties: {
                            id: {
                               "id": "wc_log_bpp_on_cancel_message_110",
                              type: "string",
                              minLength: 1,
                            },
                            type: {
                              "id": "wc_log_bpp_on_cancel_message_111",
                              type: "string",
                              minLength: 1,
                            },
                          },
                        },
                      },
                    },
                  },
                  contact: {
                    "id": "wc_log_bpp_on_cancel_message_112",
                    type: "object",
                    properties: {
                      email: {
                        "id": "wc_log_bpp_on_cancel_message_113",
                        type: "string",
                        minLength: 1,
                      },
                      phone: {
                        "id": "wc_log_bpp_on_cancel_message_114",
                        type: "string",
                        minLength: 1,
                      },
                    },
                  },
                },
              },
              tags: {
                "id": "wc_log_bpp_on_cancel_message_115",
                type: "array",
                minItems: 1,
                element: {
                  "id": "wc_log_bpp_on_cancel_message_116",
                  type: "object",
                  properties: {
                    descriptor: {
                      "id": "wc_log_bpp_on_cancel_message_117",
                      type: "object",
                      properties: {
                        code: {
                          "id": "wc_log_bpp_on_cancel_message_118",
                          type: "string",
                          minLength: 1,
                        },
                        name: {
                          "id": "wc_log_bpp_on_cancel_message_119",
                          type: "string",
                          minLength: 1,
                        },
                      },
                    },
                    list: {
                      "id": "wc_log_bpp_on_cancel_message_120",
                      type: "array",
                      minItems: 1,
                      element: {
                         "id": "wc_log_bpp_on_cancel_message_121",
                        type: "object",
                        properties: {
                          descriptor: {
                             "id": "wc_log_bpp_on_cancel_message_122",
                            type: "object",
                            properties: {
                              code: {
                                 "id": "wc_log_bpp_on_cancel_message_123",
                                type: "string",
                                minLength: 1,
                              },
                              name: {
                                 "id": "wc_log_bpp_on_cancel_message_124",
                                type: "string",
                                minLength: 1,
                              },
                            },
                          },
                          value: {
                             "id": "wc_log_bpp_on_cancel_message_125",
                            type: "string",
                            minLength: 1,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        created_at: {
           "id": "wc_log_bpp_on_cancel_message_126",
          type: "string",
          minLength: 1,
        },
        updated_at: {
           "id": "wc_log_bpp_on_cancel_message_127",
          type: "string",
          minLength: 1,
        },
      },
    },
  },
};
