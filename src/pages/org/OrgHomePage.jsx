import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const KPI_DATA = [
  { id: 1, label: "ציון אימפקט",    value: "98",    change: "+6% החודש",  positive: true, icon: "🌿" },
  { id: 2, label: "פריטים שהתקבלו", value: "1,240", change: "+12% השבוע", positive: true, icon: "📦" },
];

const URGENT_NEEDS = [
  { id: 1, title: "מעילים ובגדי חורף", description: "חסר ברשימת עבור נשים בסיכון (S-L)", icon: "🧥" },
];

const PENDING_DONATIONS = [
  { id: 1, donor: "הילה כהן",   description: "3 שקיות, שמיכות תינוק", avatar: "ה" },
  { id: 2, donor: "יוסי אברהם", description: "2 שקיות, בגדי גברים",   avatar: "י" },
  { id: 3, donor: "דנה לוי",    description: "שקית 1, נעלי נשים",      avatar: "ד" },
];

function OrgBottomNav({ active }) {
  const navigate = useNavigate();
  const items = [
    { id: "home",     icon: "🏠", label: "בית",    path: "/org/home" },
    { id: "requests", icon: "📋", label: "בקשות",  path: "/org/requests" },
    { id: "messages", icon: "💬", label: "הודעות", path: "/org/messages" },
    { id: "profile",  icon: "👤", label: "פרופיל", path: "/org/profile" },
  ];
  return (
    <nav className="sticky bottom-0 w-full bg-rw-card border-t border-rw-border
                    flex justify-around items-center py-3 px-4 z-50">
      {items.map((item) => (
        <button key={item.id} onClick={() => navigate(item.path)}
          className="flex flex-col items-center gap-1">
          <span className="text-xl">{item.icon}</span>
          <span className={`text-xs font-semibold
            ${active === item.id ? "text-rw-btn" : "text-rw-sub"}`}>
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
}

export default function OrgHomePage() {

  const navigate = useNavigate();
  const { user } = useUser();

  // בודקים localStorage ישירות – לא user מה-Context
  // כי Context מתעדכן אסינכרונית
  useEffect(() => {
    const saved = localStorage.getItem("rewear_user");
    if (!saved) {
      navigate("/");
    }
  }, []);

  // שולפים את שם העמותה מ-localStorage אם user עדיין לא מעודכן
  const savedUser = JSON.parse(localStorage.getItem("rewear_user") || "{}");
  const orgName = user?.orgName || savedUser?.orgName || 'עמותת "לב חם"';

  return (
    <div className="min-h-screen bg-rw-bg pb-24 overflow-y-auto">

      {/* Header */}
      <div className="bg-rw-card px-5 pt-6 pb-4 shadow-sm
                      flex items-center justify-between">
        <div className="flex flex-col items-end">
          <h1 className="font-bold text-rw-title text-base">
            {orgName}
          </h1>
          <p className="text-rw-sub text-xs mt-0.5">סיוע לנשים במצבי סיכון</p>
        </div>
        <div className="relative">
         <div
    onClick={() => navigate("/org/notifications")}
    className="w-10 h-10 bg-rw-input rounded-xl
               flex items-center justify-center cursor-pointer">
  
    <span className="text-lg">🔔</span>
  </div>
  </div>
  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-400
                  rounded-full flex items-center justify-center">
    <span className="text-white text-xs font-bold">3</span>
  </div>
</div>

      <div className="px-5 pt-5 flex flex-col gap-6">

        {/* לוח בקרה */}
        <div>
          <h2 className="font-bold text-rw-title text-base mb-3">לוח בקרה</h2>
          <div className="grid grid-cols-2 gap-4">
            {KPI_DATA.map((kpi) => (
              <div key={kpi.id}
                className="bg-rw-card rounded-2xl p-4 shadow-sm flex flex-col items-end gap-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-rw-sub">{kpi.label}</span>
                  <span className="text-xl">{kpi.icon}</span>
                </div>
                <span className="text-2xl font-bold text-rw-title">{kpi.value}</span>
                <span className={`text-xs font-medium
                  ${kpi.positive ? "text-green-500" : "text-red-400"}`}>
                  {kpi.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* צרכים דחופים */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-rw-green text-sm cursor-pointer">✏️ עריכה</span>
            <h2 className="font-bold text-rw-title text-base">צרכים דחופים</h2>
          </div>
          <div className="flex flex-col gap-3">
            {URGENT_NEEDS.map((need) => (
              <div key={need.id}
                className="bg-rw-card rounded-2xl shadow-sm p-4
                           flex items-center justify-between">
                <div className="flex flex-col items-end gap-1">
                  <span className="font-semibold text-rw-title text-sm">{need.title}</span>
                  <span className="text-rw-sub text-xs">{need.description}</span>
                </div>
                <div className="w-10 h-10 bg-rw-input rounded-xl
                                flex items-center justify-center">
                  <span className="text-xl">{need.icon}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* תרומות ממתינות */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-rw-green text-sm cursor-pointer">הצג הכל</span>
            <div className="flex items-center gap-2">
              <span className="bg-rw-btn text-white text-xs rounded-full
                               w-5 h-5 flex items-center justify-center font-bold">
                5
              </span>
              <h2 className="font-bold text-rw-title text-base">תרומות ממתינות</h2>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {PENDING_DONATIONS.map((donation) => (
              <div key={donation.id}
                className="bg-rw-card rounded-2xl shadow-sm p-4
                           flex items-center justify-between">
                <button
                  onClick={() => alert(`ניהול תרומה של ${donation.donor}`)}
                  className="bg-rw-btn text-white rounded-xl px-4 py-2
                             text-xs font-semibold active:bg-rw-btn-hover">
                  ניהול
                </button>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end gap-0.5">
                    <span className="font-semibold text-rw-title text-sm">{donation.donor}</span>
                    <span className="text-rw-sub text-xs">{donation.description}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-rw-logo
                                  flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{donation.avatar}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <OrgBottomNav active="home" />
    </div>

    
  );
}