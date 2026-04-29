// Submission flow: POSTs to FormSubmit (https://formsubmit.co), which forwards
// every submission as an email to SG_INVITE_TO. No backend required.
//
// ONE-TIME ACTIVATION: the very first submission triggers FormSubmit to send a
// confirmation email to SG_INVITE_TO with an activation link. Click that link
// once - every submission after that lands in the inbox automatically.
const SG_INVITE_TO = 'hello@simplegrid.ai';
const SG_FORM_ENDPOINT = 'https://formsubmit.co/ajax/' + SG_INVITE_TO;
function InviteModal({
  onClose
}) {
  const [state, setState] = React.useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = React.useState('');
  const submit = async e => {
    e.preventDefault();
    setState('submitting');
    const form = e.target;
    const data = new FormData(form);
    try {
      const res = await fetch(SG_FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: data
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && (json.success === 'true' || json.success === true)) {
        setState('success');
      } else {
        setErrorMsg(json.message || 'Something went wrong. Please try again or email hello@simplegrid.ai directly.');
        setState('error');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again or email hello@simplegrid.ai directly.');
      setState('error');
    }
  };
  if (state === 'success') {
    return /*#__PURE__*/React.createElement("div", {
      className: "modal-overlay",
      onClick: e => {
        if (e.target === e.currentTarget) onClose();
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal",
      style: {
        position: 'relative',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      "aria-label": "Close invite confirmation",
      onClick: onClose,
      style: {
        position: 'absolute',
        top: 14,
        right: 16,
        background: 'none',
        border: 'none',
        fontSize: 22,
        color: 'var(--fg3)',
        cursor: 'pointer',
        lineHeight: 1
      }
    }, "\xD7"), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: 'rgba(16,185,129,0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '8px auto 18px'
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "28",
      height: "28",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "#10B981",
      strokeWidth: "3",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("polyline", {
      points: "20 6 9 17 4 12"
    }))), /*#__PURE__*/React.createElement("h2", {
      style: {
        marginBottom: 8
      }
    }, "Request received"), /*#__PURE__*/React.createElement("p", {
      className: "sub",
      style: {
        marginBottom: 24
      }
    }, "Thanks. We'll review and get back within 48 hours."), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "btn btn-primary",
      onClick: onClose,
      style: {
        width: '100%',
        justifyContent: 'center'
      }
    }, "Close")));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: e => {
      if (e.target === e.currentTarget) onClose();
    }
  }, /*#__PURE__*/React.createElement("form", {
    className: "modal",
    onSubmit: submit,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Close invite request",
    onClick: onClose,
    style: {
      position: 'absolute',
      top: 14,
      right: 16,
      background: 'none',
      border: 'none',
      fontSize: 22,
      color: 'var(--fg3)',
      cursor: 'pointer',
      lineHeight: 1
    }
  }, "\xD7"), /*#__PURE__*/React.createElement("h2", null, "Request an invite"), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, "A few partner slots open each cycle. Tell us about you."), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_subject",
    value: "New invite request - SimpleGrid"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_template",
    value: "table"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_captcha",
    value: "false"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "_honey",
    style: {
      display: 'none'
    },
    tabIndex: -1,
    autoComplete: "off"
  }), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "invite-name"
  }, "Your name"), /*#__PURE__*/React.createElement("input", {
    id: "invite-name",
    type: "text",
    name: "name",
    placeholder: "Mike",
    required: true,
    autoFocus: true,
    disabled: state === 'submitting'
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "invite-org"
  }, "Organization"), /*#__PURE__*/React.createElement("input", {
    id: "invite-org",
    type: "text",
    name: "organization",
    placeholder: "Ridgeline Manufacturing",
    required: true,
    disabled: state === 'submitting'
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "invite-email"
  }, "Work email"), /*#__PURE__*/React.createElement("input", {
    id: "invite-email",
    type: "email",
    name: "email",
    placeholder: "mike@ridgeline.com",
    required: true,
    disabled: state === 'submitting'
  })), state === 'error' && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 12px',
      background: 'rgba(239,68,68,0.08)',
      border: '1px solid rgba(239,68,68,0.25)',
      borderRadius: 'var(--radius-md)',
      color: '#B91C1C',
      fontSize: 13,
      marginBottom: 12,
      lineHeight: 1.45
    }
  }, errorMsg), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    disabled: state === 'submitting',
    style: {
      width: '100%',
      justifyContent: 'center',
      marginTop: 4,
      opacity: state === 'submitting' ? 0.7 : 1
    }
  }, state === 'submitting' ? 'Sending…' : 'Request an Invite →'), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11,
      color: 'var(--fg3)',
      textAlign: 'center',
      marginTop: 14,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      fontWeight: 600
    }
  }, "We respond within 48 hours \xB7 Select partners only")));
}
window.InviteModal = InviteModal;