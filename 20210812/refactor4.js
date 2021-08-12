/*
 * 다형성을 살려서 이제 연극 장르에 따라 amount for가 다르므로, 각각 다르게 계산 하도록 해보자.
 */
const invoice = require("./invoices.json");
const plays = require("./plays.json");

/* statement */
function renderPlainText(data) {
  let result = `청구 내역 (고객명: ${data.customer})\n`;

  for (let perf of data.performances) {
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
  }

  result += `총액: ${usd(data.totalAmount)}\n`;
  result += `적립 포인트: ${data.totalVolumeCredit}점\n`;

  return result;
}

function renderHtml(data) {
  let result = `<h1>청구 내역 (고객명: ${data.customer})\n</h1>`;

  result += `<table>\n`;

  result += "<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>";

  for (let perf of data.performances) {
    result += `<tr><td>${perf.play.name}</td><td>${perf.audience}</td><td>${usd(
      perf.amount
    )}</td></tr>`;
  }

  result += `</table>\n`;

  result += `<p>총액: <em>${usd(data.totalAmount / 100)}</em></p>\n`;
  result += `<p>적립 포인트: <em>${data.totalVolumeCredit}점</em></p>\n`;

  return result;
}

function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}

function statementHtml(invoice, plays) {
  return renderHtml(createStatementData(invoice, plays));
}

function createStatementData(invoice, plays) {
  const statementData = {};

  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredit = totalVolumeCredit(statementData);

  return statementData;
}

/* performance */
class PerformanceCalculator {
  constructor(performance, play) {
    this.performance = performance;
    this.play = play;
  }

  get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0);
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let thisAmount = 40000;

    if (this.performance.audience > 30) {
      thisAmount += 1000 * (this.performance.audience - 30);
    }

    return thisAmount;
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let thisAmount = 30000;

    if (this.performance.audience > 20) {
      thisAmount += 10000 + 500 * (this.performance.audience - 20);
    }

    thisAmount += 300 * this.performance.audience;

    return thisAmount;
  }

  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
}

function createCalculator(perf, play) {
  switch (play.type) {
    case "comedy":
      return new ComedyCalculator(perf, play);
    case "tragedy":
      return new TragedyCalculator(perf, play);
    default:
      throw new Error(`알수없는 장르 : ${this.play.type}`);
  }
}

function enrichPerformance(perf) {
  const result = Object.assign({}, perf);
  const calculator = createCalculator(perf, playFor(perf));

  result.play = calculator.play;
  result.amount = calculator.amount;
  result.volumeCredits = calculator.volumeCredits;
  result.audience = perf.audience;

  return result;
}

function totalAmount(data) {
  return data.performances.reduce((total, p) => total + p.amount, 0);
}

function totalVolumeCredit(data) {
  return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
}

function playFor(perf) {
  return plays[perf.playID];
}

function usd(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(number / 100);
}

console.log(statement(invoice[0], plays));
console.log(statementHtml(invoice[0], plays));
