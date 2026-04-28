import { useState } from "react";

const BASE_URL = "http://localhost:3000";

const ops = [
  { key: "sumar",       label: "+" },
  { key: "restar",      label: "−" },
  { key: "multiplicar", label: "×" },
  { key: "dividir",     label: "÷" },
];

const DIGITS = ["7","8","9","4","5","6","1","2","3","C","0","."];

export default function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [activeInput, setActiveInput] = useState(1);
  const [selectedOp, setSelectedOp] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(null);

  const currentVal = activeInput === 1 ? num1 : num2;
  const setCurrentVal = activeInput === 1 ? setNum1 : setNum2;
  const opMap = { sumar:"+", restar:"−", multiplicar:"×", dividir:"÷" };

  function handleDigit(d) {
    setResultado(null); setError(null);
    if (d === ".") {
      if (currentVal.includes(".")) return;
      setCurrentVal(v => v === "" ? "0." : v + ".");
      return;
    }
    if (currentVal.length >= 12) return;
    setCurrentVal(v => v === "0" ? d : v + d);
  }

  function handleClear() {
    setNum1(""); setNum2(""); setSelectedOp(null);
    setResultado(null); setError(null); setActiveInput(1);
  }

  function handleOp(op) {
    setError(null); setResultado(null); setSelectedOp(op);
    if (num1 !== "") setActiveInput(2);
  }

  async function calcular() {
    if (!num1 || !num2 || !selectedOp) return;
    setLoading(true); setError(null); setResultado(null);
    try {
      const res = await fetch(`${BASE_URL}/calculadora/${num1}/${num2}/${selectedOp}`);
      const data = await res.json();
      setConnected(true);
      if (data.error) {
        setError(data.error);
      } else {
        const r = data.resultado;
        setResultado(Number.isInteger(r) ? r.toString() : parseFloat(r.toFixed(8)).toString());
      }
    } catch {
      setConnected(false);
      setError("sin conexión al servidor");
    } finally {
      setLoading(false);
    }
  }

  const expr = num1 && selectedOp
    ? `${num1} ${opMap[selectedOp]}${num2 ? " " + num2 : ""}`
    : "";

  const displayMain = resultado !== null ? resultado : currentVal || "0";

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet" />
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#0f0f0f", fontFamily:"'Share Tech Mono', monospace" }}>
        <div style={{ background:"#1a1a1a", border:"1px solid #2a2a2a", borderRadius:24, padding:"1.75rem", width:300 }}>

          {/* status */}
          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:"1rem", fontSize:10, letterSpacing:2, color:"#2a2a2a", textTransform:"uppercase" }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background: connected===true?"#00ffb4":connected===false?"#ff4d6d":"#333" }} />
            {connected===null ? "calculadora" : connected ? "backend conectado" : "sin conexión"}
          </div>

          {/* pantalla */}
          <div style={{ background:"#111", border:"1px solid #222", borderRadius:14, padding:"1rem 1.25rem", marginBottom:"1.25rem", minHeight:90, display:"flex", flexDirection:"column", justifyContent:"flex-end", alignItems:"flex-end" }}>
            <span style={{ fontSize:10, color:"#333", letterSpacing:3, textTransform:"uppercase", alignSelf:"flex-start", marginBottom:"auto" }}>resultado</span>
            <div style={{ fontSize:12, color:"#444", marginBottom:4, minHeight:16 }}>{expr}</div>
            {error
              ? <div style={{ fontSize:13, color:"#ff4d6d" }}>{error}</div>
              : <div style={{ fontSize:32, letterSpacing:-1, color: resultado!==null?"#00ffb4":"#555" }}>{displayMain}</div>
            }
          </div>

          {/* cajas num1 / num2 */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginBottom:10 }}>
            {[1,2].map(n => {
              const val = n===1 ? num1 : num2;
              const active = activeInput===n;
              return (
                <div key={n} onClick={() => { setActiveInput(n); setResultado(null); }}
                  style={{ background:active?"#1f2e28":"#161616", border:`1px solid ${active?"#00ffb4":"#222"}`, borderRadius:10, padding:"8px 12px", cursor:"pointer" }}>
                  <div style={{ fontSize:9, color:active?"#00cc90":"#333", letterSpacing:2, textTransform:"uppercase", marginBottom:2 }}>número {n}</div>
                  <div style={{ fontSize:18, color:active?"#00ffb4":"#444" }}>{val||"–"}</div>
                </div>
              );
            })}
          </div>

          {/* operadores */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:6, marginBottom:10 }}>
            {ops.map(op => (
              <button key={op.key} onClick={() => handleOp(op.key)}
                style={{ background:selectedOp===op.key?"#00ffb4":"#1f1f1f", color:selectedOp===op.key?"#0f0f0f":"#555", border:`1px solid ${selectedOp===op.key?"#00ffb4":"#2a2a2a"}`, borderRadius:10, padding:"10px 0", fontSize:20, cursor:"pointer", fontFamily:"inherit" }}>
                {op.label}
              </button>
            ))}
          </div>

          {/* teclado */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:6 }}>
            {DIGITS.map((d,i) => {
              if (d==="C") return <button key="C" onClick={handleClear}
                style={{ background:"#1f1f1f", color:"#ff4d6d", border:"1px solid #2a2a2a", borderRadius:10, padding:"14px 0", fontSize:16, cursor:"pointer", fontFamily:"inherit" }}>C</button>;
              if (d==="0") return <button key="0" onClick={() => handleDigit("0")}
                style={{ gridColumn:"span 2", background:"#1f1f1f", color:"#ccc", border:"1px solid #2a2a2a", borderRadius:10, padding:"14px 0", fontSize:16, cursor:"pointer", fontFamily:"inherit" }}>0</button>;
              return <button key={d+i} onClick={() => handleDigit(d)}
                style={{ background:"#1f1f1f", color:"#ccc", border:"1px solid #2a2a2a", borderRadius:10, padding:"14px 0", fontSize:16, cursor:"pointer", fontFamily:"inherit" }}>{d}</button>;
            })}
          </div>

          {/* igual */}
          <button onClick={calcular} disabled={loading}
            style={{ marginTop:6, width:"100%", background:loading?"#00cc90":"#00ffb4", color:"#0f0f0f", border:"none", borderRadius:10, padding:"15px 0", fontSize:22, cursor:loading?"wait":"pointer", fontFamily:"inherit", fontWeight:"bold" }}>
            {loading ? "..." : "="}
          </button>
        </div>
      </div>
    </>
  );
}