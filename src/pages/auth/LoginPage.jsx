import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function LoginPage() {

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  // שולפים את user כדי לבדוק אם כבר מחובר
  const { user } = useUser();

  const handleLogin = () => {
    if (!email || !password) {
      alert("אנא מלאי אימייל וסיסמה");
      return;
    }

    // ניווט לפי סוג המשתמש השמור
    // אם user קיים ויש לו type="org" → דף עמותה
    // אחרת → דף משתמש פרטי
    if (user && user.type === "org") {
      navigate("/org/home");
    } else if (user && user.type === "shop") {
      navigate("/home"); // בשלב הבא נבנה דף לחנות
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen bg-rw-bg flex flex-col items-center justify-center px-6">

      {/* לוגו */}
      <div className="w-16 h-16 rounded-2xl bg-rw-logo flex items-center justify-center mb-5">
        <span className="text-white text-2xl font-bold">R</span>
      </div>

      {/* כותרת */}
      <h1 className="text-2xl font-bold text-rw-title mb-1">ReWear</h1>
      <p className="text-rw-sub text-sm mb-8 text-center">
        ברוכים השבים! התחברו לחשבונכם
      </p>

      {/* טופס */}
      <div className="w-full bg-rw-card rounded-2xl shadow-sm p-6 flex flex-col gap-4">

        {/* אימייל */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-rw-sub">אימייל</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            dir="ltr"
            className="border border-rw-border rounded-xl px-4 py-3
                       text-sm text-left outline-none focus:border-rw-btn bg-rw-input"
          />
        </div>

        {/* סיסמה */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-rw-sub">סיסמה</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-rw-border rounded-xl px-4 py-3
                       text-sm outline-none focus:border-rw-btn bg-rw-input"
          />
        </div>

        {/* כפתור התחברות */}
        <button
          onClick={handleLogin}
          className="bg-rw-btn text-white rounded-xl py-3
                     text-sm font-semibold mt-2 active:bg-rw-btn-hover"
        >
          התחברות
        </button>

      </div>

      {/* לינק הרשמה */}
      <p className="text-sm text-rw-sub mt-6">
        אין לך חשבון?{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-rw-green font-semibold cursor-pointer"
        >
          הרשמה
        </span>
      </p>

    </div>
  );
}