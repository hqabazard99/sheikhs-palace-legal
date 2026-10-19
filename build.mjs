// Builds index.html, support/index.html and 404.html from the privacy page's look (one template, three pages).
//   node build.mjs           (then commit; GitHub Pages serves the folder)
// The contact email lives once, in privacy/index.html, as the mailto link; every page uses the same one.
import { readFileSync, writeFileSync } from "node:fs";

const tpl = readFileSync("privacy/index.html", "utf8");
const email = (tpl.match(/mailto:([^"]+)"/) || [])[1];
const head = tpl.slice(0, tpl.indexOf("<main"));
const foot = tpl.slice(tpl.indexOf("<footer>"));
const page = (rel, titleEn, titleAr, en, ar) => {
  const fix = (s) => (rel ? s : s.replaceAll('href="../', 'href="./').replaceAll('src="../', 'src="./'));
  return fix(head.replace(/<title>[^<]*<\/title>/, `<title>${titleEn}</title>`))
    + `<main data-lang="en" data-title-en="${titleEn}" class="on">\n${en}\n</main>\n\n<main data-lang="ar" data-title-ar="${titleAr}">\n${ar}\n</main>\n\n`
    + fix(foot);
};
const mail = `<a href="mailto:${email}">${email}</a>`;

writeFileSync("support/index.html", page(true, "Support · Sheikh's Palace", "الدعم · قصر الشيخ", `
<h1>Support</h1>
<p>Need help with Sheikh's Palace? Write to ${mail}. We usually answer within two working days, in English or Arabic.</p>
<h2>Questions</h2>
<p><strong>I bought a coin pack but did not get it.</strong> Open the Bazaar and tap <em>Restore purchases</em>. The coins also arrive by themselves the next time the game opens. If not, email us the date of the purchase.</p>
<p><strong>I changed phones and lost my progress.</strong> Progress is saved only on the phone that played it; there are no accounts yet. Purchases come back with <em>Restore purchases</em>.</p>
<p><strong>How do I stop the full-screen ads?</strong> They are shown only to players who have never bought anything. Any coin pack switches them off for good. Videos for rewards are always your choice.</p>
<p><strong>How do I change my ad privacy choice?</strong> In Europe: <em>Settings → Privacy choices</em> in the game. On iPhone: <em>Settings → Privacy &amp; Security → Tracking</em>.</p>
<p><strong>How do I turn off reminders?</strong> In your phone's settings, under Notifications for Sheikh's Palace.</p>
<p>Read the <a href="../privacy/">Privacy Policy</a>.</p>`, `
<h1>الدعم</h1>
<p>تحتاج مساعدة في قصر الشيخ؟ راسلنا على ${mail}. نرد عادة خلال يومي عمل، بالعربية أو الإنجليزية.</p>
<h2>أسئلة</h2>
<p><strong>اشتريت حزمة عملات ولم تصلني.</strong> افتح البازار واضغط <em>استعادة المشتريات</em>. تصل العملات أيضاً تلقائياً عند فتح اللعبة في المرة التالية. وإن لم تصل فراسلنا بتاريخ الشراء.</p>
<p><strong>غيّرت هاتفي وفقدت تقدمي.</strong> يُحفظ التقدم على الهاتف الذي لعبت عليه فقط، ولا توجد حسابات بعد. وتعود المشتريات عبر <em>استعادة المشتريات</em>.</p>
<p><strong>كيف أوقف الإعلانات بملء الشاشة؟</strong> تظهر فقط للاعبين الذين لم يشتروا شيئاً، وأي حزمة عملات توقفها نهائياً. أما فيديوهات المكافآت فهي باختيارك دائماً.</p>
<p><strong>كيف أغيّر خيار خصوصية الإعلانات؟</strong> في أوروبا: <em>الإعدادات ← خيارات الخصوصية</em> داخل اللعبة. وعلى iPhone: <em>الإعدادات ← الخصوصية والأمن ← التتبع</em>.</p>
<p><strong>كيف أوقف التذكيرات؟</strong> من إعدادات هاتفك، ضمن الإشعارات الخاصة بقصر الشيخ.</p>
<p>اقرأ <a href="../privacy/">سياسة الخصوصية</a>.</p>`));

const home = (rel) => page(rel, "Sheikh's Palace", "قصر الشيخ", `
<h1>Sheikh's Palace</h1>
<p>Match gems, beat 400 levels and rebuild a Gulf city, from the old harbor to the Sheikh's palace.</p>
<p><a href="${rel ? "../" : "./"}privacy/">Privacy Policy</a> · <a href="${rel ? "../" : "./"}support/">Support</a></p>`, `
<h1>قصر الشيخ</h1>
<p>طابق الجواهر، واجتز 400 مرحلة، وأعد بناء مدينة خليجية من الميناء القديم حتى قصر الشيخ.</p>
<p><a href="${rel ? "../" : "./"}privacy/">سياسة الخصوصية</a> · <a href="${rel ? "../" : "./"}support/">الدعم</a></p>`);
writeFileSync("index.html", home(false));
// GitHub Pages serves 404.html from the site root for any missing page; absolute links keep it working anywhere.
writeFileSync("404.html", home(false).replaceAll('href="./', 'href="/sheikhs-palace-legal/').replaceAll('src="./', 'src="/sheikhs-palace-legal/'));
console.log("built with contact", email);
