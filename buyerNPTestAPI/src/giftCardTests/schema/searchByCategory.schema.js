module.exports = {
    "id": "gc_bap_search_01",
    "type": "object",
    "properties": {
        "intent": {
            "id": "gc_bap_search_02",
            "type": "object",
            "properties": {
                "category": {
                    "id": "gc_bap_search_03",
                    "type": "object",
                    "properties": {
                        "descriptor": {
                            "id": "gc_bap_search_04",
                            "type": "object",
                            "properties": {
                                "code": {
                                    "id": "gc_bap_search_05",
                                    "type": "string",
                                    "minLength": 1
                                }
                            }
                        }
                    }
                },
                "payment": {
                    "id": "gc_bap_search_06",
                    "type": "object",
                    "properties": {
                        "tags": {
                            "id": "gc_bap_search_07",
                            "type": "array",
                            "minItems": 1,
                            "element": {
                                "id": "gc_bap_search_08",
                                "type": "object",
                                "properties": {
                                    "descriptor": {
                                        "id": "gc_bap_search_09",
                                        "type": "object",
                                        "properties": {
                                            "code": {
                                                "id": "gc_bap_search_10",
                                                "type": "string",
                                                "minLength": 1,
                                                "enum": ["BUYER_FINDER_FEES"]
                                            }
                                        }
                                    },
                                    "list": {
                                        "id": "gc_bap_search_11",
                                        "type": "array",
                                        "minItems": 1,
                                        "element": {
                                            "id": "gc_bap_search_12",
                                            "type": "object",
                                            "properties": {
                                                "descriptor": {
                                                    "id": "gc_bap_search_13",
                                                    "type": "object",
                                                    "properties": {
                                                        "code": {
                                                            "id": "gc_bap_search_14",
                                                            "type": "string",
                                                            "minLength": 1,
                                                            "enum": ["BUYER_FINDER_FEES_PERCENTAGE"]
                                                        }
                                                    }
                                                },
                                                "value": {
                                                    "id": "gc_bap_search_15",
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
    },
    "required": ["intent"]
}