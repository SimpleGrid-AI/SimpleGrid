/**
 * @OnlyCurrentDoc
 *
 * SimpleGrid ABM pipeline — sheet hook.
 *
 * The @OnlyCurrentDoc line above limits Google's permission to this one
 * spreadsheet. Without it, the consent screen asks for all of the account's
 * Sheets, even though the script only ever opens this one.
 *
 * Paste into the "Case study GTM" sheet: Extensions → Apps Script.
 * The cloud agent talks to this web app to read the task rows and write its
 * own status columns back. People keep working in the sheet as normal.
 *
 * One-time setup:
 *   1. Run setup() once from the editor (▶ Run) and approve the permissions.
 *      It adds the dropdowns and creates the secret token.
 *   2. Deploy → New deployment → type "Web app".
 *      Execute as: Me.  Who has access: Anyone.  Deploy, copy the /exec URL.
 *   3. Run showToken() and copy the token from the execution log.
 *   4. In the cloud environment settings add two environment variables:
 *        SHEET_HOOK_URL   = the /exec URL
 *        SHEET_HOOK_TOKEN = the token
 *
 * "Anyone" only means the URL needs no Google sign-in. Every request must
 * carry the token, and the agent can only write the columns listed in
 * AGENT_COLUMNS — never Review Status (except putting it back to Pending
 * after a revision) and never anything the GTM team fills in.
 */

var HEADER_ID = 'ID';

// Columns the agent may write, by their header text in the sheet.
var AGENT_COLUMNS = [
  'Agent Status',
  'PR Link',
  'Task Status',
  'Live URL / Last Updated',
  'Screen shots'
];

var DROPDOWNS = {
  'Handover to Agent': ['Not yet', 'Ready', 'Hold'],
  'Agent Status': ['Queued', 'Building', 'PR open', 'Revising', 'Needs info', 'Failed', 'Done'],
  'Task Status': ['Open', 'In review', 'Live', 'Closed'],
  'Review Status': ['Pending', 'Changes requested', 'OK - Deploy', 'Rejected']
};

/* ------------------------------------------------------------- Web app */

function doPost(e) {
  var req;
  try {
    req = JSON.parse(e.postData.contents);
  } catch (err) {
    return reply({ ok: false, error: 'Body must be JSON.' });
  }
  var token = PropertiesService.getScriptProperties().getProperty('SHEET_HOOK_TOKEN');
  if (!token || req.token !== token) return reply({ ok: false, error: 'Bad token.' });

  if (req.action === 'read') return reply({ ok: true, rows: readRows() });
  if (req.action === 'update') {
    var lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      return reply(updateRow(req.id, req.fields || {}));
    } finally {
      lock.releaseLock();
    }
  }
  return reply({ ok: false, error: 'Unknown action. Use "read" or "update".' });
}

function doGet() {
  return reply({ ok: true, hint: 'POST JSON {token, action: "read" | "update"}.' });
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/* --------------------------------------------------------------- Sheet */

// The header row is the first row (of the first 30) that has "ID" in it.
// Section titles and the counters sit above it, so its position can move.
function table() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var values = sheet.getDataRange().getValues();
  for (var r = 0; r < Math.min(values.length, 30); r++) {
    var col = values[r].map(function (v) { return String(v).trim(); }).indexOf(HEADER_ID);
    if (col !== -1) {
      return {
        sheet: sheet,
        values: values,
        headerRow: r,
        headers: values[r].map(function (v) { return String(v).trim(); }),
        idCol: col
      };
    }
  }
  throw new Error('No header row with "' + HEADER_ID + '" found.');
}

function readRows() {
  var t = table();
  var rows = [];
  for (var r = t.headerRow + 1; r < t.values.length; r++) {
    var id = String(t.values[r][t.idCol]).trim();
    if (!id) continue;
    var row = { _row: r + 1 };
    t.headers.forEach(function (h, c) {
      if (h) row[h] = t.values[r][c] instanceof Date ? t.values[r][c].toISOString() : String(t.values[r][c]);
    });
    rows.push(row);
  }
  return rows;
}

function updateRow(id, fields) {
  var t = table();
  var r = -1;
  for (var i = t.headerRow + 1; i < t.values.length; i++) {
    if (String(t.values[i][t.idCol]).trim() === String(id).trim()) { r = i; break; }
  }
  if (r === -1) return { ok: false, error: 'No row with ID ' + id + '.' };

  var written = [];
  var refused = [];
  Object.keys(fields).forEach(function (name) {
    var value = fields[name];
    // The one reviewer column the agent may touch: back to Pending after a revision.
    var allowed = AGENT_COLUMNS.indexOf(name) !== -1 || (name === 'Review Status' && value === 'Pending');
    var c = t.headers.indexOf(name);
    if (!allowed || c === -1) { refused.push(name); return; }
    t.sheet.getRange(r + 1, c + 1).setValue(value);
    written.push(name);
  });
  return { ok: refused.length === 0, id: id, written: written, refused: refused };
}

/* --------------------------------------------------------------- Setup */

function setup() {
  var props = PropertiesService.getScriptProperties();
  if (!props.getProperty('SHEET_HOOK_TOKEN')) {
    props.setProperty('SHEET_HOOK_TOKEN', Utilities.getUuid() + Utilities.getUuid().replace(/-/g, ''));
  }
  var t = table();
  var lastRow = Math.max(t.sheet.getMaxRows(), t.headerRow + 200);
  Object.keys(DROPDOWNS).forEach(function (name) {
    var c = t.headers.indexOf(name);
    if (c === -1) return;
    var rule = SpreadsheetApp.newDataValidation().requireValueInList(DROPDOWNS[name], true).setAllowInvalid(false).build();
    t.sheet.getRange(t.headerRow + 2, c + 1, lastRow - t.headerRow - 1, 1).setDataValidation(rule);
  });
  Logger.log('Setup done. Now deploy as a web app, then run showToken().');
}

function showToken() {
  Logger.log(PropertiesService.getScriptProperties().getProperty('SHEET_HOOK_TOKEN'));
}
