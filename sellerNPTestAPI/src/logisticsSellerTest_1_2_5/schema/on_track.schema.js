module.exports = {
    "id": "b2c_log_bpp_on_track_message_01",
    "type": "object",
    "properties": {
        "tracking": {
            "id": "b2c_log_bpp_on_track_message_02",
            "type": "object",
            "properties": {
                "id": {
                    "id": "b2c_log_bpp_on_track_message_03",
                    "type": "string",
                    "minLength": 1
                },
                "url": {
                    "id": "b2c_log_bpp_on_track_message_04",
                    "type": "string",
                    "minLength": 1
                },
                "location": {
                    "id": "b2c_log_bpp_on_track_message_05",
                    "type": "object",
                    "properties": {
                        "gps": {
                            "id": "b2c_log_bpp_on_track_message_06",
                            "type": "string",
                            "minLength": 1
                        },
                        "time": {
                            "id": "b2c_log_bpp_on_track_message_07",
                            "type": "object",
                            "properties": {
                                "timestamp": {
                                    "id": "b2c_log_bpp_on_track_message_08",
                                    "type": "string",
                                    "minLength": 1
                                }
                            }
                        },
                        "updated_at": {
                            "id": "b2c_log_bpp_on_track_message_09",
                            "type": "string",
                            "minLength": 1
                        }
                    }
                },
                "status": {
                    "id": "b2c_log_bpp_on_track_message_10",
                    "type": "string",
                    "minLength": 1
                },
                "tags": {
                    "id": "b2c_log_bpp_on_track_message_11",
                    "type": "array",
                    "minItems": 1,
                    "element": {
                        "id": "b2c_log_bpp_on_track_message_12",
                        "type": "object",
                        "properties": {
                            "code": {
                                "id": "b2c_log_bpp_on_track_message_13",
                                "type": "string",
                                "minLength": 1
                            },
                            "list": {
                                "id": "b2c_log_bpp_on_track_message_14",
                                "type": "array",
                                "minItems": 1,
                                "element": {
                                    "id": "b2c_log_bpp_on_track_message_15",
                                    "type": "object",
                                    "properties": {
                                        "code": {
                                            "id": "b2c_log_bpp_on_track_message_16",
                                            "type": "string",
                                            "minLength": 1
                                        },
                                        "value": {
                                            "id": "b2c_log_bpp_on_track_message_17",
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