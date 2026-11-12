/**
 * Google Apps Script bridge for HEALTHACON 2026 Survey
 *
 * How to attach to your Google Form (enables silent saving with NO redirect):
 * 1. Open your Google Form in edit mode.
 * 2. Click the three-dots menu (top right) -> "Apps Script".
 * 3. Delete any starter code, paste this entire file, and click Save.
 * 4. Click "Deploy" -> "New deployment" -> gear icon -> "Web app".
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 5. Authorize when prompted, copy the Web App URL (ends in /exec),
 *    and paste it into `https://script.google.com/macros/s/AKfycbzuEpXskgu04tm6-orYj4Iu2Fo-sCQ--rDJHHG79Ogt0AsOCir0Fof6BE5UAZzm2jLbHg/exec` in `app.js`.
 */

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, status: "HEALTHACON 2026 endpoint ready" })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const raw = (e && e.postData && e.postData.contents) ? e.postData.contents : "{}";
    const payload = JSON.parse(raw);

    const form = FormApp.getActiveForm();
    if (!form) {
      throw new Error("This script must be created from inside the Google Form (three-dots menu -> Apps Script).");
    }

    const formResponse = form.createResponse();
    const allItems = form.getItems();

    function findItem(titleFragment, expectedType, fallbackList, fallbackIndex) {
      const match = allItems.find(function (item) {
        return (
          item.getType() === expectedType &&
          item.getTitle().toLowerCase().indexOf(titleFragment.toLowerCase()) !== -1
        );
      });
      if (match) return match;
      return fallbackList[fallbackIndex] || null;
    }

    const mcItems = form.getItems(FormApp.ItemType.MULTIPLE_CHOICE);
    const cbItems = form.getItems(FormApp.ItemType.CHECKBOX);
    const textItems = form.getItems(FormApp.ItemType.TEXT);

    const item1 = findItem("would you join", FormApp.ItemType.MULTIPLE_CHOICE, mcItems, 0);
    const item2 = findItem("first month", FormApp.ItemType.MULTIPLE_CHOICE, mcItems, 1);
    const item3 = findItem("donated online", FormApp.ItemType.MULTIPLE_CHOICE, mcItems, 2);
    const item4 = findItem("trust a case", FormApp.ItemType.CHECKBOX, cbItems, 0);
    const item5 = findItem("your name", FormApp.ItemType.TEXT, textItems, 0);

    if (payload.q1 && item1) {
      formResponse.withItemResponse(
        item1.asMultipleChoiceItem().createResponse(String(payload.q1))
      );
    }

    if (payload.q2 && item2) {
      formResponse.withItemResponse(
        item2.asMultipleChoiceItem().createResponse(String(payload.q2))
      );
    }

    if (payload.q3 && item3) {
      formResponse.withItemResponse(
        item3.asMultipleChoiceItem().createResponse(String(payload.q3))
      );
    }

    if (Array.isArray(payload.q4) && payload.q4.length > 0 && item4) {
      formResponse.withItemResponse(
        item4.asCheckboxItem().createResponse(payload.q4.map(String))
      );
    }

    if (payload.name && item5) {
      formResponse.withItemResponse(
        item5.asTextItem().createResponse(String(payload.name))
      );
    }

    formResponse.submit();

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
