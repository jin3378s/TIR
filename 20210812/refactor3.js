/*
 * HTML로 출력 하고 싶다.
 */
const invoice = require("./invoices.json");
const plays = require("./plays.json");

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

function enrichPerformance(perf) {
  const result = Object.assign({}, perf);

  result.play = playFor(result);
  result.amount = amountFor(result);
  result.volumeCredits = volumeCreditFor(result);
  result.audience = perf.audience;

  return result;
}

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

function totalAmount(data) {
  return data.performances.reduce((total, p) => total + p.amount, 0);
}

function totalVolumeCredit(data) {
  return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
}

function playFor(perf) {
  return plays[perf.playID];
}

function amountFor(perf) {
  let thisAmount = 0;

  switch (playFor(perf).type) {
    case "tragedy":
      thisAmount = 40000;

      if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30);
      }
      break;

    case "comedy":
      thisAmount = 30000;
      if (perf.audience > 20) {
        thisAmount += 10000 + 500 * (perf.audience - 20);
      }
      thisAmount += 300 * perf.audience;
      break;

    default:
      throw new Error(`알수없는 장르 : ${playFor(perf).type}`);
  }

  return thisAmount;
}

function usd(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(number / 100);
}

function volumeCreditFor(perf) {
  let volumeCredits = 0;

  volumeCredits += Math.max(perf.audience - 30, 0);
  // 희극 관객 5명 마다 추가 포인트.
  if ("comedy" === playFor(perf).type) {
    volumeCredits += Math.floor(perf.audience / 5);
  }
  return volumeCredits;
}

console.log(statement(invoice[0], plays));
console.log(statementHtml(invoice[0], plays));
