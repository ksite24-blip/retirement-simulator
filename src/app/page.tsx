"use client";

import Link from "next/link";
import { useState, useMemo, useEffect, useRef } from "react";
import { usePostHog } from "posthog-js/react";
import { getUtmParams } from "@/lib/utm";

// ランダムにパラパラ動き続けるスロット数字
function useSlotNumber(min: number, max: number, interval: number = 80) {
  const [value, setValue] = useState(min);
  useEffect(() => {
    const timer = setInterval(() => {
      setValue(Math.floor(Math.random() * (max - min + 1)) + min);
    }, interval);
    return () => clearInterval(timer);
  }, [min, max, interval]);
  return value;
}

function useCountUp(target: number, duration: number = 800) {
  const [display, setDisplay] = useState(target);
  const prevTarget = useRef(target);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (prevTarget.current === target) return;
    const start = prevTarget.current;
    const diff = target - start;
    const startTime = performance.now();

    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + diff * eased));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        prevTarget.current = target;
      }
    }

    frameRef.current = requestAnimationFrame(step);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [target, duration]);

  return display;
}

const NOTICE_DAYS = 30;
const BONUS_MONTHS_SALARY = 1;

const WAGE_DAILY_CAP_UNDER30 = 7065;
const WAGE_DAILY_CAP_30_TO_44 = 7845;
const WAGE_DAILY_CAP_45_TO_59 = 8635;
const WAGE_DAILY_CAP_60_64 = 7955;
const WAGE_DAILY_FLOOR = 2730;

const BENEFIT_RATE_UNDER60 = 0.5;
const BENEFIT_RATE_60_64 = 0.45;

type LeaveReason = "self" | "company";

function parseBonusMonths(input: string): number[] {
  return input
    .split(/[,、\s]+/)
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => !isNaN(n) && n >= 1 && n <= 12)
    .sort((a, b) => a - b);
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function getNextBonusMonth(
  now: Date,
  bonusMonths: number[]
): { month: number; year: number } | null {
  if (bonusMonths.length === 0) return null;
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  for (const m of bonusMonths) {
    if (m > currentMonth) return { month: m, year: currentYear };
    if (m === currentMonth) {
      const next = bonusMonths[0];
      return { month: next, year: currentYear + 1 };
    }
  }
  return { month: bonusMonths[0], year: currentYear + 1 };
}

function formatDate(d: Date): string {
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

function getWageDailyCap(age: number): number {
  if (age < 30) return WAGE_DAILY_CAP_UNDER30;
  if (age < 45) return WAGE_DAILY_CAP_30_TO_44;
  if (age < 60) return WAGE_DAILY_CAP_45_TO_59;
  if (age <= 64) return WAGE_DAILY_CAP_60_64;
  return WAGE_DAILY_CAP_60_64;
}

function getBenefitRate(age: number): number {
  return age >= 60 && age <= 64 ? BENEFIT_RATE_60_64 : BENEFIT_RATE_UNDER60;
}

function getBenefitDaysCompany(age: number, yearsOfService: number): number | null {
  const y = yearsOfService;
  if (age < 30) {
    if (y < 1) return 90; if (y < 5) return 90; if (y < 10) return 120;
    if (y < 20) return 180; return 180;
  }
  if (age < 35) {
    if (y < 1) return 120; if (y < 5) return 180; if (y < 10) return 210;
    if (y < 20) return 240; return 240;
  }
  if (age < 45) {
    if (y < 1) return 150; if (y < 5) return 240; if (y < 10) return 270;
    if (y < 20) return 270; return 270;
  }
  if (age < 60) {
    if (y < 1) return 180; if (y < 5) return 240; if (y < 10) return 270;
    if (y < 20) return 330; return 330;
  }
  if (age <= 64) {
    if (y < 1) return 150; if (y < 5) return 180; if (y < 10) return 210;
    if (y < 20) return 240; return 240;
  }
  return null;
}

function getBenefitDaysSelf(yearsOfService: number): number {
  if (yearsOfService < 1) return 90;
  if (yearsOfService < 5) return 90;
  if (yearsOfService < 10) return 120;
  if (yearsOfService < 20) return 150;
  return 150;
}

export default function TaishokuSimulatorPage() {
  const posthog = usePostHog();
  const [paidLeave, setPaidLeave] = useState<string>("10");
  const [salary, setSalary] = useState<string>("300000");
  const [bonusMonthsInput, setBonusMonthsInput] = useState<string>("6, 12");
  const [age, setAge] = useState<string>("35");
  const [yearsOfService, setYearsOfService] = useState<string>("5");

  const [leaveReason, setLeaveReason] = useState<LeaveReason>("self");

  const result = useMemo(() => {
    const paidLeaveNum = Math.max(0, parseInt(paidLeave, 10) || 0);
    const salaryNum = Math.max(0, parseInt(salary.replace(/,/g, ""), 10) || 0);
    const bonusMonths = parseBonusMonths(bonusMonthsInput);
    const ageNum = Math.min(64, Math.max(18, parseInt(age, 10) || 30));
    const yearsNum = Math.min(40, Math.max(0, parseFloat(yearsOfService) || 1));

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dailyRate = salaryNum / 30;

    const freeFromDate = addDays(today, NOTICE_DAYS);
    const paidLeaveValue = dailyRate * paidLeaveNum;
    const nextBonus = getNextBonusMonth(today, bonusMonths);
    const bonusAmount = bonusMonths.length > 0 ? salaryNum * BONUS_MONTHS_SALARY : 0;

    const wageDailyRaw = salaryNum / 30;
    const wageDailyCap = getWageDailyCap(ageNum);
    const wageDaily = Math.min(wageDailyCap, Math.max(WAGE_DAILY_FLOOR, Math.round(wageDailyRaw)));
    const benefitRate = getBenefitRate(ageNum);
    const benefitDaily = Math.floor(wageDaily * benefitRate);

    const benefitDays =
      leaveReason === "company"
        ? getBenefitDaysCompany(ageNum, yearsNum) ?? getBenefitDaysSelf(yearsNum)
        : getBenefitDaysSelf(yearsNum);

    const hasRestriction = leaveReason === "self";
    const unemploymentTotal = benefitDaily * benefitDays;
    const restrictionStartDate = hasRestriction ? addDays(freeFromDate, 7) : null;

    const workDays = Math.min(NOTICE_DAYS, 22);
    const salaryUntilResign = dailyRate * workDays;
    const totalAtShortest = salaryUntilResign + paidLeaveValue + unemploymentTotal;
    const totalIfWaitForBonus = nextBonus ? totalAtShortest + bonusAmount : totalAtShortest;
    const diff = totalAtShortest - totalIfWaitForBonus;
    const isLoss = diff < 0;

    return {
      freeFromDate, paidLeaveValue, paidLeaveNum, bonusAmount, nextBonus,
      salaryNum, diff, isLoss, wageDaily, benefitDaily, benefitDays,
      hasRestriction, unemploymentTotal, restrictionStartDate, ageNum, yearsNum,
    };
  }, [paidLeave, salary, bonusMonthsInput, age, yearsOfService, leaveReason]);

  const animatedUnemployment = useCountUp(result.unemploymentTotal);
  const animatedPaidLeave = useCountUp(Math.round(result.paidLeaveValue));

  // 1桁ずつ独立して動くスロットタイル
  const d1 = useSlotNumber(0, 9, 55);
  const d2 = useSlotNumber(0, 9, 70);
  const d3 = useSlotNumber(0, 9, 85);

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 to-blue-50 text-neutral-800">

      {/* 警告バナー */}
      <div className="bg-red-600 py-2 text-center text-sm font-bold text-white tracking-wide">
        ▲ 転職シーズン到来！退職前に受給額を必ずチェック ▲
      </div>

      {/* ヒーローセクション */}
      <div className="bg-gradient-to-b from-sky-200 to-sky-50 px-4 pt-8 pb-10 text-center">

        <p className="text-sm font-bold text-sky-700 mb-2">
          ＼ 退職したらもらえる金額をチェック ／
        </p>

        <h1
          className="text-4xl font-black text-neutral-900 mb-4 sm:text-5xl"
          style={{
            fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', sans-serif",
            fontWeight: 900,
            whiteSpace: "nowrap",
          }}
        >
          退職シミュレーター
        </h1>

        {/* 簡単バッジ */}
        <div className="inline-block rounded-full bg-emerald-500 px-5 py-1.5 text-sm font-bold text-white mb-6 shadow-md">
          ⚡ 簡単入力 30秒！
        </div>

        {/* スロットタイル */}
        <div className="flex items-center justify-center gap-1 mb-2">
          {/* 桁タイル × 3 */}
          {[d1, d2, d3].map((digit, i) => (
            <div
              key={i}
              className="flex h-24 w-16 items-center justify-center rounded-xl bg-slate-800 shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)] sm:h-28 sm:w-20"
            >
              <span
                className="text-5xl font-black text-white sm:text-6xl"
                style={{
                  fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', sans-serif",
                  fontWeight: 900,
                  userSelect: "none",
                }}
              >
                {digit}
              </span>
            </div>
          ))}

          {/* 単位 */}
          <span
            className="ml-2 text-3xl font-black text-neutral-800 sm:text-4xl"
            style={{ fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif", fontWeight: 900 }}
          >
            万円
          </span>
        </div>

        {/* 退職時の受給額ラベル */}
        <div className="inline-block rounded-full bg-pink-100 border border-pink-300 px-4 py-1 text-sm font-bold text-pink-700 mb-6">
          退職時の受給額は？
        </div>

        {/* 信頼バッジ */}
        <div className="flex justify-center gap-3">
          <div className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-bold text-white shadow-md">
            ✅ 完全無料
          </div>
          <div className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-bold text-white shadow-md">
            ✅ 登録不要
          </div>
          <div className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-bold text-white shadow-md">
            ✅ 即時診断
          </div>
        </div>

        <p className="mt-6 text-sm font-bold text-sky-700">
          👇 下の項目を入力すると、あなたの数字が表示されます
        </p>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">

        {/* ヒーローカード */}
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-md text-center">
          <div className="inline-block rounded-full bg-emerald-100 px-4 py-1 text-sm font-bold text-emerald-700 mb-3">
            ⚡ 簡単入力 30秒！
          </div>
          <p className="text-sm text-neutral-500 mb-2">あなたの失業保険受給額（目安）</p>
          <p className="text-5xl font-black text-sky-600 tracking-tight tabular-nums">
            ¥{animatedUnemployment.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-neutral-400">※ 下の項目を入力すると自動で更新されます</p>

          {/* 信頼バッジ */}
          <div className="mt-4 flex justify-center gap-3">
            <div className="rounded-lg bg-sky-50 border border-sky-200 px-3 py-2 text-xs text-sky-700 font-medium">
              ✅ 完全無料
            </div>
            <div className="rounded-lg bg-sky-50 border border-sky-200 px-3 py-2 text-xs text-sky-700 font-medium">
              ✅ 登録不要
            </div>
            <div className="rounded-lg bg-sky-50 border border-sky-200 px-3 py-2 text-xs text-sky-700 font-medium">
              ✅ 即時診断
            </div>
          </div>
        </div>

        {/* 入力セクション */}
        <section className="mb-6">
          <h2 className="mb-3 text-center text-sm font-bold text-neutral-600">
            👇 情報を入力してください
          </h2>
          <div className="space-y-4 rounded-2xl bg-white p-5 shadow-md sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-bold text-neutral-700">有給残日数</label>
                <input
                  type="number"
                  min={0}
                  value={paidLeave}
                  onChange={(e) => setPaidLeave(e.target.value)}
                  className="mt-1 w-full rounded-xl border-2 border-sky-200 bg-sky-50 px-3 py-3 text-neutral-900 text-lg font-semibold focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
                  placeholder="例: 10"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-neutral-700">月収（円）</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value.replace(/[^0-9,]/g, ""))}
                  className="mt-1 w-full rounded-xl border-2 border-sky-200 bg-sky-50 px-3 py-3 text-neutral-900 text-lg font-semibold focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
                  placeholder="例: 300000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-neutral-700">ボーナス月（カンマ区切り）</label>
              <input
                type="text"
                value={bonusMonthsInput}
                onChange={(e) => setBonusMonthsInput(e.target.value)}
                className="mt-1 w-full rounded-xl border-2 border-sky-200 bg-sky-50 px-3 py-3 text-neutral-900 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
                placeholder="例: 6, 12"
              />
              <p className="mt-1 text-xs text-neutral-400">6と12なら6月・12月支給とみなします</p>
            </div>

            <hr className="border-sky-100" />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-bold text-neutral-700">年齢</label>
                <input
                  type="number"
                  min={18}
                  max={64}
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="mt-1 w-full rounded-xl border-2 border-sky-200 bg-sky-50 px-3 py-3 text-neutral-900 text-lg font-semibold focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
                  placeholder="35"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-neutral-700">勤続年数</label>
                <input
                  type="number"
                  min={0}
                  max={40}
                  step={0.5}
                  value={yearsOfService}
                  onChange={(e) => setYearsOfService(e.target.value)}
                  className="mt-1 w-full rounded-xl border-2 border-sky-200 bg-sky-50 px-3 py-3 text-neutral-900 text-lg font-semibold focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
                  placeholder="例: 5"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-neutral-700">離職理由</label>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <label className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 p-3 transition-all ${leaveReason === "self" ? "border-sky-500 bg-sky-50 text-sky-700 font-bold" : "border-neutral-200 bg-white text-neutral-600"}`}>
                  <input
                    type="radio"
                    name="leaveReason"
                    checked={leaveReason === "self"}
                    onChange={() => setLeaveReason("self")}
                    className="hidden"
                  />
                  <span className="text-sm">自己都合</span>
                </label>
                <label className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 p-3 transition-all ${leaveReason === "company" ? "border-sky-500 bg-sky-50 text-sky-700 font-bold" : "border-neutral-200 bg-white text-neutral-600"}`}>
                  <input
                    type="radio"
                    name="leaveReason"
                    checked={leaveReason === "company"}
                    onChange={() => setLeaveReason("company")}
                    className="hidden"
                  />
                  <span className="text-sm">会社都合</span>
                </label>
              </div>
              {result.hasRestriction && (
                <p className="mt-2 text-xs text-amber-600 bg-amber-50 rounded-lg p-2">
                  ⚠️ 自己都合の場合、給付制限（約3ヶ月）があります。
                </p>
              )}
            </div>
          </div>
        </section>

        {/* 試算結果 */}
        <section className="mb-6">
          <h2 className="mb-3 text-center text-sm font-bold text-neutral-600">📊 診断結果</h2>

          <div className="space-y-3">

            {/* メイン：失業保険 */}
            <div className="rounded-2xl bg-white p-5 shadow-md border-l-4 border-sky-500">
              <p className="text-xs font-bold text-sky-600 uppercase tracking-wider">失業保険（基本手当）</p>
              <p className="mt-2 text-4xl font-black text-neutral-900 tabular-nums">
                ¥{animatedUnemployment.toLocaleString()}
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-sky-50 p-2">
                  <p className="text-xs text-neutral-500">日額</p>
                  <p className="text-sm font-bold text-neutral-800">¥{result.benefitDaily.toLocaleString()}</p>
                </div>
                <div className="rounded-lg bg-sky-50 p-2">
                  <p className="text-xs text-neutral-500">給付日数</p>
                  <p className="text-sm font-bold text-neutral-800">{result.benefitDays}日</p>
                </div>
                <div className="rounded-lg bg-sky-50 p-2">
                  <p className="text-xs text-neutral-500">賃金日額</p>
                  <p className="text-sm font-bold text-neutral-800">¥{result.wageDaily.toLocaleString()}</p>
                </div>
              </div>
              {result.hasRestriction && result.restrictionStartDate && (
                <p className="mt-2 text-xs text-amber-600">
                  ⚠️ 支給開始目安：{formatDate(result.restrictionStartDate)}以降
                </p>
              )}
            </div>

            {/* 有給 */}
            <div className="rounded-2xl bg-white p-5 shadow-md border-l-4 border-emerald-500">
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">有給休暇の価値</p>
              <p className="mt-2 text-3xl font-black text-neutral-900 tabular-nums">
                ¥{animatedPaidLeave.toLocaleString()}
              </p>
              <p className="mt-1 text-xs text-neutral-500">{result.paidLeaveNum}日分 / 請求する権利があります</p>
            </div>

            {/* 最短退職日 */}
            <div className="rounded-2xl bg-white p-5 shadow-md border-l-4 border-violet-500">
              <p className="text-xs font-bold text-violet-600 uppercase tracking-wider">最短退職可能日</p>
              <p className="mt-2 text-2xl font-black text-neutral-900">{formatDate(result.freeFromDate)}</p>
              <p className="mt-1 text-xs text-neutral-500">今すぐ申し出れば{NOTICE_DAYS}日後から自由</p>
            </div>

            {/* ボーナス比較 */}
            {result.nextBonus && (
              <div className="rounded-2xl bg-white p-5 shadow-md border-l-4 border-amber-500">
                <p className="text-xs font-bold text-amber-600 uppercase tracking-wider">ボーナスとの比較</p>
                <p className="mt-2 text-lg font-bold text-neutral-900">
                  {result.isLoss ? "⚠️ ボーナスまで待つ方が" : "✅ 早期退職の方が"}
                  <span className="text-2xl text-amber-600 ml-1">
                    ¥{Math.abs(Math.round(result.diff)).toLocaleString()}
                  </span>
                  {result.isLoss ? " 多い" : " 多い"}
                </p>
                <p className="mt-1 text-xs text-neutral-500">
                  次回ボーナス：{result.nextBonus?.year}年{result.nextBonus?.month}月（目安 ¥{result.bonusAmount.toLocaleString()}）
                </p>
              </div>
            )}

            {/* 社会保険 */}
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-xs font-bold text-neutral-500 mb-2">💡 退職後の社会保険について</p>
              <p className="text-xs text-neutral-500 leading-relaxed">
                健康保険は「任意継続」か「国民健康保険」を選択。収入減少時は国保の減額・免除申請が可能です。
                年金は国民年金（第1号）へ切替。所得が少ない場合は免除・猶予制度を活用できます。
              </p>
            </div>
          </div>
        </section>

        {/* LINE登録ボックス */}
        <div className="mb-4 rounded-2xl border-2 border-green-400 bg-green-50 p-5 text-center">
          <p className="text-xs font-bold text-green-600 mb-1">🎁 無料プレゼント</p>
          <p className="text-base font-black text-neutral-800 mb-1">
            あなたの ¥{result ? Math.round(result.unemploymentTotal).toLocaleString() : "---"} を<br />
            確実に受け取るための<br />
            <span className="text-green-600">チェックリストを無料配布中</span>
          </p>
          <div className="my-3 text-left inline-block">
            <p className="text-xs text-neutral-600 mb-1">✅ 退職前にやるべき手続きリスト</p>
            <p className="text-xs text-neutral-600 mb-1">✅ 申請を忘れると損する給付金一覧</p>
            <p className="text-xs text-neutral-600">✅ 工場を辞めた人の3日間ロードマップ</p>
          </div>
          <a
            href="https://line.me/R/ti/p/%40156qjqbm"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => posthog?.capture('line_register_clicked', { ...getUtmParams() })}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#06C755] px-6 py-4 text-base font-black text-white shadow-[0_4px_0_#048a3a] transition-all active:translate-y-1 active:shadow-[0_2px_0_#048a3a] hover:bg-[#05b54c]"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0"><path d="M12 2C6.48 2 2 6.03 2 11c0 3.07 1.67 5.77 4.24 7.45L5.5 22l4.08-1.97C10.32 20.33 11.15 20.5 12 20.5c5.52 0 10-4.03 10-9S17.52 2 12 2z"/></svg>
            LINEで無料で受け取る
          </a>
          <p className="mt-2 text-xs text-neutral-400">登録無料・いつでも解除できます</p>
        </div>


        {/* 免責 */}
        <footer className="pb-8">
          <p className="text-center text-xs leading-relaxed text-neutral-400">
            本シミュレーションは目安であり、実際の給付額・給付日数・社会保険は就業規則・雇用保険法等に基づき異なる場合があります。確定はハローワーク・年金事務所等でご確認ください。
          </p>
        </footer>
      </div>
    </main>
  );
}
