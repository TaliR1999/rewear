import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const handleLogin = () => {
  // בודקים שהשדות לא ריקים לפני המעבר
  if (!email || !password) {
    alert("אנא מלאי אימייל וסיסמה");
    return;
  }
  // אם הכל תקין – עוברים לדף הבית
  navigate("/home");
};

  return (
    <div className="min-h-screen bg-[#F7F7F5] flex flex-col items-center justify-center px-6">

      {/* לוגו */}
      <div className="w-16 h-16 rounded-2xl bg-[#8BAA64] flex items-center justify-center mb-4 shadow-md">
        <span className="text-white text-2xl font-bold">R</span>
      </div>

      {/* כותרת */}
      <h1 className="text-2xl font-bold text-[#0F2347] mb-1">ReWear</h1>
      <p className="text-sm text-[#6F819B] mb-8 text-center">
        ברוכים השבים! התחברו לחשבונכם
      </p>

      {/* טופס */}
      <div className="w-full bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4">

        {/* שדה אימייל */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-[#0F2347]">אימייל</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-[#D9DFE8] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#8BAA64] bg-[#F9FAFB]"
          />
        </div>

        {/* שדה סיסמה */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-[#0F2347]">סיסמה</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-[#D9DFE8] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#8BAA64] bg-[#F9FAFB]"
          />
        </div>

        {/* כפתור התחברות */}
        <button
          onClick={handleLogin}
          className="bg-[#8BAA64] text-white rounded-xl py-3 text-sm font-semibold mt-2 active:bg-[#789553]"
        >
          התחברות
        </button>

      </div>

      {/* לינק הרשמה */}
      <p className="text-sm text-[#6F819B] mt-6">
        אין לך חשבון?{" "}
        <span
            onClick={() => navigate("/register")}
            className="text-green-600 font-semibold cursor-pointer"
                                                                    >
             הרשמה
        </span>
      </p>

    </div>
  );
}