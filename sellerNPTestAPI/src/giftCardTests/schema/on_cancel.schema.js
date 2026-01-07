module.exports = {
    "id": "gc_bpp_on_cancel_message_01",
    "type": "object",
    "properties": {
        "order": {
            "id": "gc_bpp_on_cancel_message_02",
            "type": "object",
            "properties": {
                "id": {
                    "id": "gc_bpp_on_cancel_message_03",
                    "type": "string",
                    "minLength": 1
                },
                "status": {
                    "id": "gc_bpp_on_cancel_message_04",
                    "type": "string",
                    "minLength": 1
                },
                "tags": {
                    "id": "gc_bpp_on_cancel_message_05",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "gc_bpp_on_cancel_message_06",
                        "type": "object",
                        "properties": {
                            "descriptor": {
                                "id": "gc_bpp_on_cancel_message_07",
                                "type": "object",
                                "properties": {
                                    "code": {
                                        "id": "gc_bpp_on_cancel_message_08",
                                        "type": "string",
                                        "minLength": 1
                                    }
                                }
                            },
                            "lists": {
                                "id": "gc_bpp_on_cancel_message_09",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "gc_bpp_on_cancel_message_010",
                                    "type": "object",
                                    "properties": {
                                        "descriptor": {
                                            "id": "gc_bpp_on_cancel_message_011",
                                            "type": "object",
                                            "properties": {
                                                "code": {
                                                    "id": "gc_bpp_on_cancel_message_012",
                                                    "type": "string",
                                                    "minLength": 1
                                                }
                                            }
                                        },
                                        "value": {
                                            "id": "gc_bpp_on_cancel_message_013",
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
    },
    "required": ["order"]
}