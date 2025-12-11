// 유틸: 안전 파싱
const val = (id) => {
  const v = document.getElementById(id).value;
  return v === "" ? 0 : parseInt(v, 10);
};

const setText = (id, text, cls) => {
  const el = document.getElementById(id);
  el.textContent = text;
  el.classList.remove("ok", "warn");
  if (cls) el.classList.add(cls);
};

const showError = (msg) => document.getElementById("error").textContent = msg;
const clearError = () => showError("");

// 각 섹션 합계/남은 점수 업데이트
function updateWeights() {
  const A1 = val("A1"), A2 = val("A2");
  const sum = A1 + A2, remain = 100 - sum;
  const ok = sum === 100 && inRange(A1, 10, 90) && inRange(A2, 10, 90);
  setText("weights-summary", `현재 합산 가중치: ${sum}, 사용 가능 가중치: ${remain}`, ok ? "ok" : "warn");
}

function updateAcademic() {
  const A11 = val("A11"), A12 = val("A12"), A13 = val("A13");
  const sum = A11 + A12 + A13, remain = 10 - sum;
  const ok = sum === 10 && inRange(A11, 1, 8) && inRange(A12, 1, 8) && inRange(A13, 1, 8);
  setText("academic-summary", `현재 합산 점수: ${sum}, 사용 가능 점수: ${remain}`, ok ? "ok" : "warn");
}

function updateArts() {
  const A21 = val("A21"), A22 = val("A22"), A23 = val("A23");
  const sum = A21 + A22 + A23, remain = 10 - sum;
  const ok = sum === 10 && inRange(A21, 1, 8) && inRange(A22, 1, 8) && inRange(A23, 1, 8);
  setText("arts-summary", `현재 합산 점수: ${sum}, 사용 가능 점수: ${remain}`, ok ? "ok" : "warn");
}

function updateNonKnowledge() {
  const B1 = val("B1"), B2 = val("B2"), B3 = val("B3"), B4 = val("B4"), B5 = val("B5");
  const sum = B1 + B2 + B3 + B4 + B5, remain = 50 - sum;
  const ok = sum === 50 &&
             inRange(B1, 5, 30) && inRange(B2, 5, 30) &&
             inRange(B3, 5, 30) && inRange(B4, 5, 30) &&
             inRange(B5, 5, 30);
  setText("nonknowledge-summary", `현재 합산 점수: ${sum}, 사용 가능 점수: ${remain}`, ok ? "ok" : "warn");
}

// 범위 체크
function inRange(x, min, max) {
  return Number.isInteger(x) && x >= min && x <= max;
}

// 최종 계산
function calculate() {
  clearError();

  const A1 = val("A1"), A2 = val("A2");
  const A11 = val("A11"), A12 = val("A12"), A13 = val("A13");
  const A21 = val("A21"), A22 = val("A22"), A23 = val("A23");
  const B1 = val("B1"), B2 = val("B2"), B3 = val("B3"), B4 = val("B4"), B5 = val("B5");
  const name = document.getElementById("name").value.trim() || "이름 미입력";

 // 상세 오류 표시 (상단)
    if (!inRange(A1, 10, 90) || !inRange(A2, 10, 90)) {
    showError(`언수외 가중치, 예체능 가중치는 10 미만 혹은 90 초과일 수 없습니다. (언수외 가중치: ${A1}, 예체능 가증치: ${A2})`);
    return;
  }
  if ((A1 + A2) !== 100) {
    showError(`가중치의 합계는 100이어야 합니다. 현재 합계: ${A1 + A2} (언수외 가중치: ${A1}, 예체능 가증치: ${A2})`);
    return;
  }
  if (!inRange(A11, 1, 8) || !inRange(A12, 1, 8) || !inRange(A13, 1, 8)) {
    showError(`언어 점수, 수리 점수, 외국어(전공) 점수는 1 미만 혹은 8 초과일 수 없습니다. (언어 점수: ${A11}, 수리 점수: {A12}, 외국어(전공) 점수: ${A13})`);
    return;
  }
  if ((A11 + A12 + A13) !== 10) {
    showError(`언수외 점수의 합계는 10이어야 합니다. 현재 합계: ${A11 + A12 + A13} (언어 점수: ${A11}, 수리 점수: {A12}, 외국어(전공) 점수: ${A13})`);
    return;
  }
  if (!inRange(A21, 1, 8) || !inRange(A22, 1, 8) || !inRange(A23, 1, 8)) {
    showError(`음악 점수, 미술 점수, 체육 점수는 1 미만 혹은 8 초과일 수 없습니다. (음악 점수: ${A21}, 미술 점수: ${A22}, 체육 점수: ${A23})`);
    return;
  }
  if ((A21 + A22 + A23) !== 10) {
    showError(`예체능 점수의 합계는 10이어야 합니다. 현재 합계: ${A21 + A22 + A23} (음악 점수: ${A21}, 미술 점수: ${A22}, 체육 점수: ${A23})`);
    return;
  }
if (!inRange(B1, 5, 30) || !inRange(B2, 5, 30) || !inRange(B3, 5, 30) || !inRange(B4, 5, 30) || !inRange(B5, 5, 30)) {
    showError(`체력 점수, 외모 점수, 언변 점수, 재력 점수, 집안 점수는 5 미만 혹은 30 초과일 수 없습니다. (체력 점수: ${B1}, 외모 점수: ${B2}, 언변 점수: ${B3}, 재력 점수: ${B4}, 집안 점수: ${B5})`);
    return;
  }
  if ((B1 + B2 + B3 + B4 + B5) !== 50) {
    showError(`비지식 점수의 합계는 50이어야 합니다. 현재 합계: ${B1 + B2 + B3 + B4 + B5} (체력 점수: ${B1}, 외모 점수: ${B2}, 언변 점수: ${B3}, 재력 점수: ${B4}, 집안 점수: ${B5})`);
    return;
  }

  // 계산
  const AA1 = A1 * 0.1, AA2 = A2 * 0.1;
  const AA11 = A11 * AA1, AA12 = A12 * AA1, AA13 = A13 * AA1;
  const AA21 = A21 * AA2, AA22 = A22 * AA2, AA23 = A23 * AA2;
  const AA110 = Math.floor(AA11 * 10) / 10;
  const AA120 = Math.floor(AA12 * 10) / 10;
  const AA130 = Math.floor(AA13 * 10) / 10;
  const AA210 = Math.floor(AA21 * 10) / 10;
  const AA220 = Math.floor(AA22 * 10) / 10;
  const AA230 = Math.floor(AA23 * 10) / 10;

  document.getElementById("result").innerHTML = `
    <h3>${name}의 최종 능력치</h3>
    <p><b>[언수외]</b><br>
      언어: ${AA110} / 수리: ${AA120} / 외국어(전공): ${AA130}
    </p>
    <p><b>[예체능]</b><br>
      음악: ${AA210} / 미술: ${AA220} / 체육: ${AA230}
    </p>
    <p><b>[비지식]</b><br>
      체력: ${B1} / 외모: ${B2} / 언변: ${B3} / 재력: ${B4} / 집안: ${B5}
    </p>
  `;
}

// 이벤트 바인딩 및 초기 표시
document.addEventListener("DOMContentLoaded", () => {
  // 입력 변화 감지
  ["A1","A2"].forEach(id => document.getElementById(id).addEventListener("input", updateWeights));
  ["A11","A12","A13"].forEach(id => document.getElementById(id).addEventListener("input", updateAcademic));
  ["A21","A22","A23"].forEach(id => document.getElementById(id).addEventListener("input", updateArts));
  ["B1","B2","B3","B4","B5"].forEach(id => document.getElementById(id).addEventListener("input", updateNonKnowledge));

  // 계산 버튼
  document.getElementById("calc-btn").addEventListener("click", calculate);

  // 초기 표시 (빈 값은 0으로 가정)
  updateWeights();
  updateAcademic();
  updateArts();
  updateNonKnowledge();
});