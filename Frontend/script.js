const API = "http://127.0.0.1:5000/expenses";

function getIcon(category) {
  var cat = (category || "").toLowerCase();
  if (cat.includes("food") || cat.includes("eat") || cat.includes("lunch") || cat.includes("dinner") || cat.includes("breakfast")) return "🍕";
  if (cat.includes("travel") || cat.includes("cab") || cat.includes("bus") || cat.includes("auto") || cat.includes("train"))       return "🚌";
  if (cat.includes("bill") || cat.includes("elec") || cat.includes("rent") || cat.includes("util"))                                return "💡";
  if (cat.includes("shop") || cat.includes("cloth") || cat.includes("buy") || cat.includes("amazon"))                             return "🛍️";
  if (cat.includes("health") || cat.includes("med") || cat.includes("doctor") || cat.includes("pharma"))                          return "💊";
  if (cat.includes("edu") || cat.includes("book") || cat.includes("course") || cat.includes("study"))                             return "📚";
  if (cat.includes("entertain") || cat.includes("movie") || cat.includes("game") || cat.includes("fun"))                          return "🎬";
  return "📌";
}
 
function catColor(category) {
  var cat = (category || "").toLowerCase();
  if (cat.includes("food")   || cat.includes("eat"))    return "#fff4ed";
  if (cat.includes("travel") || cat.includes("cab"))    return "#eff6ff";
  if (cat.includes("bill")   || cat.includes("elec"))   return "#fefce8";
  if (cat.includes("shop")   || cat.includes("cloth"))  return "#fdf4ff";
  if (cat.includes("health") || cat.includes("med"))    return "#f0fdf4";
  if (cat.includes("edu")    || cat.includes("book"))   return "#f0f9ff";
  if (cat.includes("entertain"))                        return "#fff1f2";
  return "#f5f6fa";
}

function barColor(index) {
  var colors = ["#4f6ef7", "#9b59f5", "#f97316", "#22c55e", "#ef4444", "#06b6d4", "#f59e0b"];
  return colors[index % colors.length];
}
 

function loadDashboard() {
  fetch(API)
    .then(function(r) { return r.json(); })
    .then(function(expenses) {
 
      var total = expenses.reduce(function(sum, e) { return sum + Number(e.amount); }, 0);
      document.getElementById("totalSpent").textContent = "₹" + total.toFixed(2);
 
      var now = new Date();
      var thisMonth = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0");
      var monthExp = expenses.filter(function(e) { return e.date && e.date.startsWith(thisMonth); });
      var monthTotal = monthExp.reduce(function(sum, e) { return sum + Number(e.amount); }, 0);
      document.getElementById("monthSpent").textContent = "₹" + monthTotal.toFixed(2);
      var monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      document.getElementById("monthName").textContent = monthNames[now.getMonth()] + " " + now.getFullYear();
 
      document.getElementById("txnCount").textContent = expenses.length;
 
      var catMap = {};
      expenses.forEach(function(e) {
        catMap[e.category] = (catMap[e.category] || 0) + Number(e.amount);
      });
 
      var cats = Object.keys(catMap).map(function(k) { return { name: k, total: catMap[k] }; });
      cats.sort(function(a, b) { return b.total - a.total; });
 
      if (cats.length > 0) {
        document.getElementById("topCat").textContent = getIcon(cats[0].name) + " " + cats[0].name;
      }
 
      var maxCat = cats.length > 0 ? cats[0].total : 1;
      var catHtml = "";
      cats.slice(0, 5).forEach(function(cat, i) {
        var pct = Math.round((cat.total / maxCat) * 100);
        catHtml += '<div class="cat-row">';
        catHtml +=   '<div class="cat-info">';
        catHtml +=     '<div class="cat-icon-box" style="background:' + catColor(cat.name) + '">' + getIcon(cat.name) + '</div>';
        catHtml +=     '<div>';
        catHtml +=       '<div class="cat-name">' + cat.name + '</div>';
        catHtml +=     '</div>';
        catHtml +=   '</div>';
        catHtml +=   '<div class="cat-bar-wrap"><div class="cat-bar-fill" style="width:' + pct + '%;background:' + barColor(i) + '"></div></div>';
        catHtml +=   '<div class="cat-amount">₹' + cat.total.toFixed(0) + '</div>';
        catHtml += '</div>';
      });
      document.getElementById("categoryList").innerHTML = catHtml || '<p class="empty">No data yet.</p>';

      var recent = expenses.slice(0, 5);
      var recHtml = "";
      recent.forEach(function(e) {
        recHtml += '<div class="recent-row">';
        recHtml +=   '<div class="recent-left">';
        recHtml +=     '<div class="recent-icon" style="background:' + catColor(e.category) + '">' + getIcon(e.category) + '</div>';
        recHtml +=     '<div>';
        recHtml +=       '<div class="recent-cat">' + e.category + '</div>';
        recHtml +=       '<div class="recent-note">' + (e.note || "No note") + '</div>';
        recHtml +=     '</div>';
        recHtml +=   '</div>';
        recHtml +=   '<div style="text-align:right">';
        recHtml +=     '<div class="recent-amt">₹' + Number(e.amount).toFixed(2) + '</div>';
        recHtml +=     '<div class="recent-date">' + (e.date || "") + '</div>';
        recHtml +=   '</div>';
        recHtml += '</div>';
      });
      document.getElementById("recentList").innerHTML = recHtml || '<p class="empty">No expenses yet.</p>';
    })
    .catch(function(err) {
      console.error("Dashboard load error:", err);
    });
}