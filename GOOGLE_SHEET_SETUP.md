# 📊 Google Sheet CRM & Live Reviews Setup

Follow these simple steps to:
1. **Automatically record all stay inquiries** directly into an **`Inquiries`** tab.
2. **Manage live customer reviews & profile photos** from your phone via a **`Reviews`** tab.

---

### Step 1: Set Up Sheet Tabs

In your Google Sheet, create two tabs at the bottom:
1. Tab 1: Rename to **`Inquiries`**
2. Tab 2: Rename to **`Reviews`**

#### Columns for Tab 1: `Inquiries`
| Column | Header Name | Description |
|---|---|---|
| **A** | `Timestamp` | Date & time of inquiry |
| **B** | `Name` | Guest full name |
| **C** | `Phone` | Contact number / WhatsApp |
| **D** | `Email` | Guest email address |
| **E** | `CheckIn` | Check-in date |
| **F** | `CheckOut` | Check-out date |
| **G** | `Guests` | Number of guests |
| **H** | `RoomType` | Room category / Package & estimated quote |
| **I** | `Subject` | Type of inquiry |
| **J** | `Message` | Special notes / requests |
| **K** | `Source` | Which form submitted the lead |
| **L** | `Status` | `New` (default), `Contacted`, `In Progress`, `Resolved`, `Cancelled` |
| **M** | `Notes / Remarks` | Staff notes |

#### Columns for Tab 2: `Reviews`
| Column | Header Name | Description / Example |
|---|---|---|
| **A** | `Name` | Guest name (e.g., `Ananya & Rohan Kulkarni`) |
| **B** | `Location` | City / State (e.g., `Mumbai, Maharashtra`) |
| **C** | `Rating` | Number `1` to `5` (e.g., `5`) |
| **D** | `Category` | One of: `couples`, `family`, `adventure`, or `groups` |
| **E** | `StayDetails` | Room & duration (e.g., `Premium River View Cottage • 2 Nights`) |
| **F** | `Date` | Month & Year (e.g., `March 2026`) |
| **G** | `Title` | Short headline (e.g., `Pure Serenity by the River Stream`) |
| **H** | `Comment` | Full review feedback text |
| **I** | `Highlight` | Quick pill highlight (e.g., `Private Bonfire & River Sound`) |
| **J** | `AvatarUrl` | Profile photo URL (optional - leave blank to show elegant initials circle) |

---

### Step 2: Copy the Google Apps Script

1. Open your Google Sheet and click **Extensions** → **Apps Script**.
2. Replace all existing code with this script:

```javascript
// 1. Handles incoming leads from the website
function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Inquiries") || ss.getActiveSheet();
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
    data.status || 'New',
    data.remarks || ''
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// 2. Returns live reviews from the "Reviews" tab to the website
function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Reviews");
  
  if (!sheet) {
    return ContentService.createTextOutput(JSON.stringify({ reviews: [] }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  var rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) {
    return ContentService.createTextOutput(JSON.stringify({ reviews: [] }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  var reviews = [];
  // Loop through rows skipping the header (row 0)
  for (var i = 1; i < rows.length; i++) {
    var r = rows[i];
    if (!r[0]) continue; // Skip empty rows without a name
    
    reviews.push({
      id: String(i),
      name: String(r[0] || ''),
      location: String(r[1] || ''),
      rating: Number(r[2]) || 5,
      category: String(r[3] || 'couples').toLowerCase(),
      stayDetails: String(r[4] || ''),
      date: String(r[5] || ''),
      title: String(r[6] || ''),
      comment: String(r[7] || ''),
      highlight: String(r[8] || ''),
      avatarUrl: String(r[9] || ''), // Profile photo URL
      initials: (String(r[0] || '').split(' ').map(function(w){ return w[0]; }).join('').slice(0, 2)).toUpperCase()
    });
  }
  
  return ContentService.createTextOutput(JSON.stringify({ reviews: reviews }))
    .setMimeType(ContentService.MimeType.JSON);
}

// 3. ONE-CLICK SETUP HELPER: Run this function once from Apps Script editor
// to automatically create both tabs with headers, styling, and sample rows!
function setupSheetCRM() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Setup Inquiries Tab
  var inqSheet = ss.getSheetByName("Inquiries");
  if (!inqSheet) {
    inqSheet = ss.insertSheet("Inquiries");
  }
  var inqHeaders = [
    'Timestamp', 'Name', 'Phone', 'Email', 'CheckIn', 'CheckOut', 
    'Guests', 'RoomType', 'Subject', 'Message', 'Source', 'Status', 'Notes / Remarks'
  ];
  inqSheet.getRange(1, 1, 1, inqHeaders.length).setValues([inqHeaders]);
  inqSheet.getRange(1, 1, 1, inqHeaders.length)
    .setFontWeight('bold')
    .setBackground('#1E293B')
    .setFontColor('#FFFFFF');
  inqSheet.setFrozenRows(1);
  
  // Setup Reviews Tab
  var revSheet = ss.getSheetByName("Reviews");
  if (!revSheet) {
    revSheet = ss.insertSheet("Reviews");
  }
  var revHeaders = [
    'Name', 'Location', 'Rating', 'Category', 'StayDetails', 
    'Date', 'Title', 'Comment', 'Highlight', 'AvatarUrl'
  ];
  revSheet.getRange(1, 1, 1, revHeaders.length).setValues([revHeaders]);
  revSheet.getRange(1, 1, 1, revHeaders.length)
    .setFontWeight('bold')
    .setBackground('#B45309')
    .setFontColor('#FFFFFF');
  revSheet.setFrozenRows(1);
}
```

3. Click **Save** (💾).
4. Run `setupSheetCRM` once by selecting it in the toolbar function dropdown and clicking **Run**.
5. Click **Deploy** → **Manage deployments** → **Edit (pencil icon)**:
   * **Version:** Choose `New version`
   * Click **Deploy**.

---

### Step 3: Add Webhook URL to `.env.local`

Copy the **Web app URL** generated by Google Apps Script and ensure it is in your `.env.local`:
```bash
GOOGLE_SHEET_WEBHOOK_URL="https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
```

Now, whenever you add a row in the **`Reviews`** tab with a guest's review and optional profile photo URL, it automatically appears live on your website!
