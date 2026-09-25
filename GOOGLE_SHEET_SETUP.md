# 📊 Google Sheet CRM Integration Setup

Follow these simple steps to record and manage all website inquiries as a CRM inside your Google Sheet.

---

### Step 1: Set Up Sheet Columns

In your Google Sheet, ensure row 1 has the following 13 columns:

| Column | Header Name | Description |
|---|---|---|
| **A** | `Timestamp` | Date & time when inquiry was made |
| **B** | `Name` | Guest full name |
| **C** | `Phone` | Contact number / WhatsApp |
| **D** | `Email` | Guest email address (if provided) |
| **E** | `CheckIn` | Requested check-in date |
| **F** | `CheckOut` | Requested check-out date |
| **G** | `Guests` | Number of adults / guests |
| **H** | `RoomType` | Room category / Package name |
| **I** | `Subject` | Type of inquiry |
| **J** | `Message` | Special notes / requests |
| **K** | `Source` | Which page/modal submitted the lead |
| **L** | `Status` | `New` (default), `Contacted`, `In Progress`, `Resolved`, `Cancelled`, `Spam` |
| **M** | `Notes / Remarks` | Staff notes (e.g. "Called, confirmed for 12 Oct", "Advance ₹2k received") |

---

### Step 2: Update Your Google Apps Script

1. Open your Google Sheet and click **Extensions** → **Apps Script**.
2. Replace the code with this updated script that automatically sets incoming leads to **`New`** and leaves the **Notes / Remarks** column ready for your staff:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    data.timestamp || new Date().toLocaleString(),
    data.name || '',
    data.phone || '',
    data.email || '',
    data.checkIn || '',
    data.checkOut || '',
    data.guests || '',
    data.roomType || '',
    data.subject || '',
    data.message || '',
    data.source || 'Website',
    data.status || 'New',       // Defaults to New
    data.remarks || ''          // Empty for staff notes
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// OPTIONAL HELPER: Run this function once from the editor to automatically 
// create colored dropdown chips for Status and style your header row!
function setupSheetCRM() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Format Header Row
  var headers = [
    'Timestamp', 'Name', 'Phone', 'Email', 'CheckIn', 'CheckOut', 
    'Guests', 'RoomType', 'Subject', 'Message', 'Source', 'Status', 'Notes / Remarks'
  ];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#1E293B')
    .setFontColor('#FFFFFF');
  sheet.setFrozenRows(1);
  
  // Create Dropdown Validation for Column L (Status) from row 2 to 1000
  var statusRange = sheet.getRange('L2:L1000');
  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['New', 'Contacted', 'In Progress', 'Resolved', 'Cancelled', 'Spam'], true)
    .setAllowInvalid(false)
    .build();
  statusRange.setDataValidation(rule);
}
```

3. Click **Save** (💾).
4. Click **Deploy** → **Manage deployments** → **Edit (pencil icon)** → choose **Version: New version** → click **Deploy**.

---

### Step 3: Add Dropdown Colors in Google Sheets (Manual Alternative)

If you prefer using Google Sheet's built-in interface for colored chips:
1. Select Column **L** (the `Status` column).
2. Click **Data** → **Data validation** → **Add rule**.
3. Under **Criteria**, choose **Dropdown**.
4. Add the statuses and pick colors:
   - 🟢 **New** (Green / Emerald)
   - 🟡 **Contacted** (Yellow)
   - 🟠 **In Progress** (Orange)
   - 🔵 **Resolved** (Blue)
   - ⚪ **Cancelled** (Gray)
   - 🔴 **Spam** (Red)
5. Click **Done**.
