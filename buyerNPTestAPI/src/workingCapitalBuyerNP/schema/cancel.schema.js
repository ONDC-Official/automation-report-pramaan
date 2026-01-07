module.exports = {
  id: "wc_log_bap_cancel_message_01",
  type: "object",
  properties: {
    cancellation_reason_id: {
      id: "wc_log_bap_cancel_message_02",
      type: "string",
      minLength: 1,
    },
    descriptor: {
      id: "wc_log_bap_cancel_message_03",
      type: "object",
      properties: {
        short_desc: {
          id: "wc_log_bap_cancel_message_04",
          type: "string",
          minLength: 1,
        },
      },
    },
    order_id: {
      id: "wc_log_bap_cancel_message_05",
      type: "string",
      minLength: 1,
    },
  },
};
