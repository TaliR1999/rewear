import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {

  // ─── טעינת משתמש מ-localStorage ─────────────────────
  // כשהאפליקציה נפתחת – בודקים אם יש משתמש שמור
  const [user, setUserState] = useState(() => {
    try {
      const saved = localStorage.getItem("rewear_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // טעינת תרומות מ-localStorage
  const [donations, setDonationsState] = useState(() => {
    try {
      const saved = localStorage.getItem("rewear_donations");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // טעינת תרומות שנשלחו לעמותות
  const [sentDonations, setSentDonationsState] = useState(() => {
    try {
      const saved = localStorage.getItem("rewear_sent");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // ─── שמירה אוטומטית ב-localStorage ──────────────────
  // בכל פעם שהנתונים משתנים – שומרים ב-localStorage
  // useEffect עם dependency array = רץ כשהערך משתנה

  useEffect(() => {
    if (user) {
      localStorage.setItem("rewear_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("rewear_user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("rewear_donations", JSON.stringify(donations));
  }, [donations]);

  useEffect(() => {
    localStorage.setItem("rewear_sent", JSON.stringify(sentDonations));
  }, [sentDonations]);

  // ─── פונקציות ─────────────────────────────────────────

  // שמירת משתמש
  const setUser = (userData) => {
    setUserState(userData);
  };

  // התנתקות
  const logout = () => {
    setUserState(null);
    setDonationsState([]);
    setSentDonationsState([]);
    localStorage.removeItem("rewear_user");
    localStorage.removeItem("rewear_donations");
    localStorage.removeItem("rewear_sent");
  };

  // הוספת תרומה חדשה (שקים שהועלו)
  const addDonation = (bags) => {
    const newDonation = {
      id: Date.now(),
      bags,
      date: new Date().toLocaleDateString("he-IL"),
      status: "ממתין לאיסוף"
    };
    setDonationsState(prev => [...prev, newDonation]);
  };

  // שליחת תרומה לעמותה נבחרת
  // bag = השק שנבחר, org = העמותה שנבחרה
  const sendDonationToOrg = (bag, org) => {
    const newSent = {
      id: Date.now(),
      bag,
      org,
      status: "pending",
      date: new Date().toLocaleDateString("he-IL"),
      pickupScheduled: false,
      // hasChat = האם נפתח צ'אט עם העמותה
      hasChat: false,
    };
    setSentDonationsState(prev => [...prev, newSent]);
  };

  // עדכון סטטוס של תרומה שנשלחה
  // id = ה-id של התרומה, updates = אובייקט עם השינויים
  const updateSentDonation = (id, updates) => {
    setSentDonationsState(prev =>
      prev.map(d => d.id === id ? { ...d, ...updates } : d)
    );
  };

  // חישוב מספר ההתראות הלא-נקראות
  // תרומות שנשלחו ועדיין לא תואם איסוף
  const unreadCount = sentDonations.filter(d => !d.pickupScheduled).length;

  return (
    <UserContext.Provider value={{
      user, setUser, logout,
      donations, addDonation,
      sentDonations, sendDonationToOrg, updateSentDonation,
      unreadCount
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}