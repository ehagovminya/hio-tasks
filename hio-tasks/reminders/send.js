// يتشغل تلقائياً كل ساعة من GitHub Actions (مجاناً) ويبعت إشعارات للموبايلات حتى لو التطبيق مقفول.
const admin = require("firebase-admin");
admin.initializeApp({ credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)) });
const db = admin.firestore();
const APP_URL = process.env.APP_URL || "";
const H = 36e5, DAY = 24 * H;
const DL = ["", "الأول", "الثاني", "النهائي"];

(async () => {
  const now = Date.now();
  const users = (await db.collection("users").get()).docs.map(d => ({ id: d.id, ...d.data() })).filter(u => u.approved);
  const tasks = (await db.collection("tasks").where("status", "==", "open").get()).docs;
  const managers = users.filter(u => u.role === "manager");
  const resp = t => t.assignee ? users.filter(u => u.id === t.assignee) : users.filter(u => u.role !== "manager" && u.dept === t.dept);
  let sent = 0;
  const bad = new Map();

  async function push(list, title, body) {
    const tokens = [...new Set(list.flatMap(u => u.fcmTokens || []))];
    if (!tokens.length) return;
    const r = await admin.messaging().sendEachForMulticast({
      tokens, notification: { title, body },
      webpush: { notification: { icon: APP_URL + "icons/icon-192.png", dir: "rtl", lang: "ar" }, fcmOptions: APP_URL ? { link: APP_URL } : undefined }
    });
    r.responses.forEach((x, i) => { if (!x.success) bad.set(tokens[i], 1); });
    sent += r.successCount;
  }

  for (const doc of tasks) {
    const t = doc.data(), n = t.notified || {}, upd = {};
    if (now > t.d3) {
      if (!n.overdue) { await push([...resp(t), ...managers], "⚠️ تكليف متأخر", `${t.title} — ${t.dept}`); upd["notified.overdue"] = true; }
    } else {
      const st = now <= t.d1 ? 1 : now <= t.d2 ? 2 : 3, left = t["d" + st] - now;
      if (left < 3 * H && !n[st + "h"]) { await push(resp(t), `⏰ الموعد ${DL[st]} قرّب جداً`, `${t.title} — باقي أقل من 3 ساعات`); upd[`notified.${st}h`] = true; upd[`notified.${st}d`] = true; }
      else if (left < DAY && !n[st + "d"]) { await push(resp(t), "📌 تذكير بتكليف", `${t.title} — الموعد ${DL[st]} بكرة`); upd[`notified.${st}d`] = true; }
    }
    if (Object.keys(upd).length) await doc.ref.update(upd);
  }
  // تنظيف التوكنز اللي بطلت تشتغل
  for (const u of users) {
    const keep = (u.fcmTokens || []).filter(x => !bad.has(x));
    if (keep.length !== (u.fcmTokens || []).length) await db.doc("users/" + u.id).update({ fcmTokens: keep });
  }
  console.log("notifications sent:", sent);
})().catch(e => { console.error(e); process.exit(1); });
