// max id - 22
module.exports = {
    "id": "gc_bap_select_01",
    "type": "object",
    "properties": {
        "order": {
            "id": "gc_bap_select_02",
            "type": "object",
            "properties": {
                "provider": {
                    "id": "gc_bap_select_03",
                    "type": "object",
                    "properties": {
                        "id": {
                            "id": "gc_bap_select_04",
                            "type": "string", "minLength": 1
                        }
                    },
                    "required": ["id"]
                },
                "fulfillments": {
                    "id": "gc_bap_select_05",
                    "type": "array",
                    "element": {
                        "id": "gc_bap_select_06",
                        "type": "object",
                        "properties": {
                            "id": "gc_bap_select_07",
                            "type": {
                                "id": "gc_bap_select_08",
                                "type": "string", 
                                "enum": ["ONLINE_EMAIL", "ONLINE_SMS", "ONLINE_EMAIL_SMS", "BPP_ONLINE_EMAIL_SMS", "BAP"]
                            }
                        },
                        "required": ["type"]
                    }
                },
                "items": {
                    "id": "gc_bap_select_09",
                    "type": "array",
                    "element": {
                        "id": "gc_bap_select_10",
                        "type": "object",
                        "properties": {
                            "id": {
                                "id": "gc_bap_select_11",
                                "type": "string", "minLength": 1
                            },
                            "quantity": {
                                "id": "gc_bap_select_12",
                                "type": "object",
                                "properties": {
                                    "selected": {
                                        "id": "gc_bap_select_13",
                                        "type": "object",
                                        "properties": {
                                            "count": {
                                                "id": "gc_bap_select_14",
                                                "type": "number", "minimum": 1
                                            }
                                        },
                                        "required": ["count"]
                                    }
                                },
                                "required": ["selected"]
                            },
                            "price": {
                                "id": "gc_bap_select_20",
                                "type": "object",
                                "optional": true,
                                "properties": {
                                    "currency": {
                                        "id": "gc_bap_select_21",
                                        "type": "string",
                                        "compliance": "currency",
                                        "optional": true
                                    },
                                    "offered_value": {
                                        "id": "gc_bap_select_22",
                                        "type": "string",
                                        "optional": true
                                    }
                                }
                            }
                        },
                        "required": ["id", "quantity"]
                    }
                },
                "offers": {
                    "id": "gc_bap_select_15",
                    "type": "array",
                    "optional": true,
                    "element": {
                        "id": "gc_bap_select_16",
                        "type": "object",
                        "optional": true,
                        "properties": {
                            "id": {
                                "id": "gc_bap_select_17",
                                "optional": true,
                                "type": "string",
                                "minLength": 1
                            },
                            "item_ids": {
                                "id": "gc_bap_select_18",
                                "type": "array",
                                "optional": true,
                                "element": {
                                    "id": "gc_bap_select_19",
                                    "optional": true,
                                    "type": "string"
                                }
                            }
                        },
                        "required": ["id", "item_ids"]
                    }
                }
            },
            "required": ["provider", "fulfillments", "items"]
        }
    },
    "required": ["order"]
}
