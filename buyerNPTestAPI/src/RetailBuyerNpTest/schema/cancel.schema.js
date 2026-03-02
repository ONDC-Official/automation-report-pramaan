module.exports = {
    "type": "object",
    "properties": {
        "order_id": {
            "type": "string",
            "minLength": 1,
            "maxLength": 32
        },
        "cancellation_reason_id": {
            "type": "string",
            "minLength": 1,
            "enum": ["002", "021", "022", "023", "024", "051", "011", "013", "014", "016", "018", "052", "053"]
        }
    }
}