import React from "react";
import "./App.css";
// @ts-ignore
import sun from "./assets/sun.svg";
// @ts-ignore
import moon from "./assets/moon.svg";
import History from "./History";

const App: React.FC = () => {
  const [theme, setTheme] = React.useState<boolean>(true);
  const [calcNum, setCalcNum] = React.useState<string>("0");
  const [memory, setMemory] = React.useState<number>(0);
  const [operator, setOperator] = React.useState<string>("");

  const [historyPopUp, showHistoryPopUp] = React.useState<boolean>(false);

  const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "H", "."];
  const modifiers: string[] = ["AC", "±", "%"];
  const operators: string[] = ["/", "x", "-", "+", "="];

  const [logs, setLogs] = React.useState<string[]>([]);

  const toggleTheme = (theme: boolean) => {
    if (theme) {
      setTheme(true);
    }
    if (!theme) {
      setTheme(false);
    }
  };

  const handleNumbers = (n: number | string) => {
    if (n === "H") {
      showHistoryPopUp(!historyPopUp);
    } else return setCalcNum(calcNum + `${n}`);
  };
  const handleModifier = (e: string) => {
    setOperator("");
    if (e === "AC") {
      setCalcNum("0");
    }
    if (e === "%") {
      setCalcNum((Number(calcNum) / 100).toString());
    }
    if (e === "±") {
      setCalcNum((Number(calcNum) * -1).toString());
    }
  };

  const saveCalc = (
    x1: string,
    x2: number,
    operator: string,
    answer: number
  ) => {
    setLogs([
      ...logs,
      `${Number(x2)} ${operator} ${Number(x1)} = ${Number(answer)}`,
    ]);

    return localStorage.setItem("result", JSON.stringify(logs));
  };

  const sumUp = (e: string) => {
    if (e === "=") {
      if (operator) {
        if (calcNum.length > 8) {
          return setCalcNum("ошибка");
        }
        if (operator === "+") {
          const result = Number(memory) + Number(calcNum);
          setCalcNum(result.toString());
          saveCalc(calcNum, memory, operator, result);
          setOperator("");
        }
        if (operator === "-") {
          const result = Number(memory) - Number(calcNum);
          setCalcNum(result.toString());
          saveCalc(calcNum, memory, operator, result);
          setOperator("");
        }
        if (operator === "/") {
          const result = Number(memory) / Number(calcNum);
          setCalcNum(result.toFixed(4));
          saveCalc(calcNum, memory, operator, result);
          setOperator("");
        }
        if (operator === "x") {
          const result = Number(memory) * Number(calcNum);
          setCalcNum(result.toString());
          saveCalc(calcNum, memory, operator, result);
          setOperator("");
        }
      } else return alert("Выберите нужную операцию!");
    } else {
      setMemory(Number(calcNum));
      setCalcNum("0");
      setOperator(e);
    }
  };

  return (
    <div className={theme ? "grid-container" : "grid-container-dark"}>
      <div className="theme-toggle">
        <img onClick={() => toggleTheme(true)} alt="sun" src={sun} />
        <img onClick={() => toggleTheme(false)} alt="moon" src={moon} />
      </div>
      <div className={theme ? "display" : "display-dark"}>
        {calcNum.toString().length > 12
          ? "Лимит!"
          : Number.isNaN(Number(calcNum))
          ? "Ошибка"
          : Number(calcNum)}
      </div>
      <div className="numbers">
        {numbers.map((n) => {
          return (
            <button
              key={n}
              disabled={n !== "H" && historyPopUp}
              onClick={() => handleNumbers(n)}
              className={theme ? "num-keys" : "num-keys-dark"}
            >
              {n}
            </button>
          );
        })}
      </div>
      <div className="modifiers">
        {modifiers.map((m) => {
          return (
            <button
              key={m}
              disabled={historyPopUp}
              onClick={() => handleModifier(m)}
              className={theme ? "modifiers-keys" : "modifiers-keys-dark"}
            >
              {m}
            </button>
          );
        })}
      </div>
      <div className="operators">
        {operators.map((o) => {
          return (
            <button
              key={o}
              disabled={historyPopUp}
              onClick={() => sumUp(o)}
              className={theme ? "operators-keys" : "operators-keys-dark"}
            >
              {o}
            </button>
          );
        })}
      </div>
      {historyPopUp && <History />}
    </div>
  );
};

export default App;
