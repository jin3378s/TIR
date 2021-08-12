/* 계산 로직은 싹다 빼서 인라인으로 독립 시켜보자 */

const invoice = require("./invoices.json");
const plays = require("./plays.json");

function statement(invoice, plays) {
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;

  for (let perf of invoice.performances) {
    result += ` ${playFor(perf).name}: ${usd(
      amountFor(perf, playFor(perf)) / 100
    )} (${perf.audience / 5}석)\n`;
  }

  function totalAmount() {
    let totalAmount = 0;

    for (let perf of invoice.performances) {
      totalAmount += amountFor(perf, playFor(perf));
    }

    return totalAmount;
  }

  result += `총액: ${usd(totalAmount() / 100)}\n`;
  result += `적립 포인트: ${totalVolumeCredit()}점\n`;

  return result;
}

function totalVolumeCredit() {
  let volumeCredits = 0;

  for (let perf of invoice[0].performances) {
    volumeCredits += volumeCreditFor(perf);
  }

  return volumeCredits;
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

function playFor(perf) {
  return plays[perf.playID];
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

function usd(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(number / 100);
}

console.log(statement(invoice[0], plays));
